// Хедер над списком рыб
import React from 'react';
import PropTypes from 'prop-types';

// Stateless Functional Component
const Header = (props) => {
    return (
        <header className="top">
            <h1>
                Catch
                <span className="ofThe">
                    <span className="of">of</span>
                    <span className="the">the</span>
                </span>
                Day
            </h1>
            <h3 className="tagline"><span>{props.tagline}</span></h3>
        </header>
    )
}

// прописываем типы props компонента
Header.propTypes = {
    tagline: PropTypes.string.isRequired
}

export default Header;