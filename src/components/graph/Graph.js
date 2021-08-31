import React, { useState } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Graph = (props) => {
    return (
        <div className={`Graph pa4-ns pa2 pb4 mb4 br2 mw6 mr-auto ml-auto`} ></div>
    )
}

export default Graph
