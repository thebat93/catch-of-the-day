// Основной компонент с главным приложением
import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
    constructor() {
        super();
        // изначальное состояние
        this.addFish = this.addFish.bind(this); // присобачиваем обратно потерянный this для каждого метода 
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.state = {
            fishes: {},
            order: {}
        };
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
                <Order />
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
            </div>
        )
    }
}

export default App;