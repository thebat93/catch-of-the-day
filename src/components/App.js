// Основной компонент с главным приложением
import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
    constructor() {
        super();
        // изначальное состояние
        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.state = {
            fishes: {},
            order: {}
        };
    }

    addFish(fish) {
        // обновить состояние
        const fishes = {...this.state.fishes}; // копируем состояние
        // добавляем новую рыбу
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        // установить состояние
        this.setState({ fishes: fishes });
    }

    loadSamples() {
        this.setState ({
            fishes: sampleFishes
        });
    }
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Store" />
                    <ul className="list-of-fishes">
                    </ul>
                </div>
                <Order />
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
            </div>
        )
    }
}

export default App;