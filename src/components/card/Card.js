import './Card.scss';
import React from 'react';

const Card = (props) => {
    return (
        <div className="Card pa4 mb4 br2 mw6 mr-auto ml-auto">
            {props.children}
        </div>
    )
}

export default Card
