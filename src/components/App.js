// Основной компонент с главным приложением
import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
    constructor() {
        super();
        // изначальное состояние
        this.addFish = this.addFish.bind(this); // присобачиваем обратно потерянный this для каждого метода 
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.state = {
            fishes: {},
            order: {}
        };
    }

    // событие жизненного цикла: перед рендерингом...
    componentWillMount() { // ...синхронизировать состояние с БД
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`,
        {
            context: this,
            state: 'fishes'
        });

        const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`);
        if(localStorageRef) { // если в LocalStorage есть заказы...
            this.setState({ // ...то обновляем состояние
                order: JSON.parse(localStorageRef)
            });
        }
    }

    // событие жизненного цикла: после разрушения компонента...
    componentWillUnmount() { // ...разорвать соединение
        base.removeBinding(this.ref);
    }

    // событие жизненного цикла: когда props или state меняются...
    componentWillUpdate(nextProps, nextState) { // ...обновить заказы в LocalStorage
        localStorage.setItem(`order-${this.props.match.params.storeId}`, JSON.stringify(nextState.order));
    }

    addFish(fish) { // добавить рыбу
        // обновить состояние
        const fishes = {...this.state.fishes}; // копируем состояние
        // добавляем новую рыбу
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        // установить состояние
        this.setState({ fishes: fishes });
    }

    updateFish(key, updatedFish) { // обновить рыбу при изменеии склада
        // обновить состояние
        const fishes = {...this.state.fishes}; // копируем состояние
        // обновляем рыбу
        fishes[key] = updatedFish;
        // установить состояние
        this.setState({fishes}); // = this.setState({ fishes: fishes });
    }

    loadSamples() { // загрузить примеры из файла
        this.setState ({
            fishes: sampleFishes
        });
    }

    addToOrder(key) { // добавить заказ
        const order = {...this.state.order}; // копируем состояние
        // обновить или добавить новые рыбы
        order[key] = order[key] + 1 || 1; // обновляем количество
        // обновить состояние
        this.setState({ order: order });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Store" />
                    <ul className="list-of-fishes">
                        {
                            /* проходим по объекту рыб */
                            Object
                                .keys(this.state.fishes)
                                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
                        }
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order}
                    params={this.props.match.params}
                />
                <Inventory 
                    addFish={this.addFish} 
                    loadSamples={this.loadSamples}
                    fishes={this.state.fishes}
                    updateFish={this.updateFish}
                />
            </div>
        )
    }
}

export default App;