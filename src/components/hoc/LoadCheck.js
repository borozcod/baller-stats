import React from 'react';
import './LoadCheck.scss';

const LoadCheck = (props) => {
    if(!props.load) {
        return (
            <div className="mt5">
                <div className="lds-dual-ring"></div>
            </div>
        )
    }
    return props.children;
}

export default LoadCheck
