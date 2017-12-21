// Список заказов
import React from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';

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
                <span>
                    <CSSTransitionGroup
                        component="span"
                        className="count"
                        transitionName="count"
                        transitionEnterTimeout={250}
                        transitionLeaveTimeout={250}
                    >
                        <span key={count}>{count}</span>
                    </CSSTransitionGroup> 
                    lbs {fish.name} {removeButton}
                </span>
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
                { /* Применяем анимацию к списку */ }
                <CSSTransitionGroup 
                    className="order"
                    component="ul"
                    transitionName="order"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total:</strong>
                        {formatPrice(total)}
                    </li>
                </CSSTransitionGroup>
            </div>
        )
    }
}

Order.propTypes = {
    fishes: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    removeFromOrder: PropTypes.func.isRequired
}

export default Order;