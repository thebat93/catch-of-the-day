// Склад
import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
    constructor() {
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, key) { // обработчик изменения инпутов
        const fish = this.props.fishes[key];
        // обновить состояние
        const updatedFish = {
            ...fish, // берем старый объект...
            [e.target.name]: e.target.value // ... и обновляем вычисленное свойство значением из инпута
        };
        this.props.updateFish(key, updatedFish);
    }

    renderInventory(key) { // рендеринг каждого элемента склада
        const fish = this.props.fishes[key];
        return (
            <div className="fish-edit" key={key}>
                <input 
                    name="name" 
                    type="text" 
                    value={fish.name} 
                    placeholder="Fish Name"
                    onChange={(e) => this.handleChange(e, key)}
                />
                <input 
                    name="price" 
                    type="text" 
                    value={fish.price} 
                    placeholder="Fish Price"
                    onChange={(e) => this.handleChange(e, key)}
                />
                <select 
                    name="status"
                    type="text"
                    value={fish.status}
                    placeholder="Fish Status"
                    onChange={(e) => this.handleChange(e, key)}
                >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out</option>
                </select>
                <textarea 
                    name="desc" 
                    type="text" 
                    value={fish.desc} 
                    placeholder="Fish Desc"
                    onChange={(e) => this.handleChange(e, key)}
                />
                <input
                    name="image" 
                    type="text" 
                    value={fish.image} 
                    placeholder="Fish Image"
                    onChange={(e) => this.handleChange(e, key)}
                />
                <button onClick={(e) => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }
    render() {
        return (
            <div>
                <h2>Inventory</h2>
                { Object.keys(this.props.fishes).map(this.renderInventory) }
                <AddFishForm addFish={ this.props.addFish } />
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        )
    }
}

export default Inventory;