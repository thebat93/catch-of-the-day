// Список заказов
import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
    constructor() {
        super();
        this.renderOrder = this.renderOrder.bind(this);
    }
    renderOrder(key) { // функция для рендера каждого заказа из списка
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        // сохраняем кнопку (JSX) в переменную
        const removeButton = (<button onClick={() => this.props.removeFromOrder(key)}>&times;</button>);

        if (!fish || fish.status === 'unavailable') { // если рыбы нет или она была распродана
            return <li key={key}>Sorry, {fish ? fish.name : 'the fish'} is no longer available{removeButton}</li>
        } 
        // если рыба есть, то рендерим элемент списка
        return (
            <li key={key}>
                <span>{count}lbs {fish.name} {removeButton}</span>
                <span className="price">{formatPrice(count * fish.price)}</span>
            </li>
        )
    }
    render() {
        const orderIds = Object.keys(this.props.order); // положить все ID в массив
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if (isAvailable) {
                return prevTotal + (count * fish.price || 0);
            }
            return prevTotal;
        }, 0); // итоговая сумма
        return (
            <div className="order-wrap">
                <h2>Your Order</h2>
                <ul className="order">
                    {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total:</strong>
                        {formatPrice(total)}
                    </li>
                </ul>
            </div>
        )
    }
}

export default Order;