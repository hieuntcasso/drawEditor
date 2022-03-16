import logo from './logo.svg';
import './App.css';
import React from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Star, Text } from 'react-konva';

import Layers from './components/Layers';
import Props from './components/Props';

function generateShapes() {
    return [...Array(1)].map((_, i) => ({
        id: i.toString(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotation: Math.random() * 180,
        isDragging: false,
    }));
}

const INITIAL_STATE = generateShapes();



function App() {
    const [stars, setStars] = React.useState(INITIAL_STATE);

    const handleDragStart = (e) => {
        const id = e.target.id();
        setStars(
            stars.map((star) => {
                return {
                    ...star,
                    isDragging: star.id === id,
                };
            })
        );
    };
    const handleDragEnd = (e) => {
        setStars(
            stars.map((star) => {
                if (star.isDragging != false) {
                    console.log(e.target);

                }
                return {
                    ...star,
                    isDragging: false,
                };
            })
        );
    };

    return (
        <div className='container'>
            <Layers />
            <div className='grid_right' >
            <Props className='grid_right' />
            </div>
        </div>
    );
}

export default App;
