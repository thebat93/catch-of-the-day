import React from 'react';
import { formatPrice } from '../helpers'; // что-то типа пайпа для отображения цены в долларах

class Fish extends React.Component {
    render() {
        const { details, index } = this.props;
        const isAvailable = details.status === 'available'; // флаг: рыба доступна или продана
        const buttonText = isAvailable ? 'Add To Order' : 'Sold Out'; // изменение названия кнопки
        return (
            <li className="menu-fish">
                <img src={details.image} alt={details.name} />
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{formatPrice(details.price)}</span>
                </h3>
                <p>{details.desc}</p>
                <button onClick={() => this.props.addToOrder(index)} disabled={!isAvailable}>{buttonText}</button>
            </li>
        )
    }
}

export default Fish;