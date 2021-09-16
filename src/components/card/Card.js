import './Card.css';
import React from 'react';

const Card = (props) => {
    return (
        <div className={`Card pa4-ns pa2 pb4 mb4 br2 mw6 mr-auto ml-auto ${props.className}`} >
            {props.children}
        </div>
    )
}

export default Card
