import React from 'react';
import { formatPrice } from '../helpers'; // что-то типа пайпа для отображения цены в долларах

class Fish extends React.Component {
    render() {
        const details = this.props.details;
        return (
            <li className="menu-fish">
                <img src={details.image} alt={details.name} />
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{formatPrice(details.price)}</span>
                </h3>
                <p>{details.desc}</p>
                <button>Add To Order</button>
            </li>
        )
    }
}

export default Fish;