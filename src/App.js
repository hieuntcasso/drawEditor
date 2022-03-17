import logo from './logo.svg';
import './App.css';
import React from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Star, Text } from 'react-konva';

import Layers from './components/Layers';
import Props from './components/Props';
import MenuIcon from './components/MenuIcon';

import TextFieldsIcon from '@material-ui/icons/TextFields';

function App() {


    return (
        <div>
            <div>
                {/* <MenuIcon /> */}
                <TextFieldsIcon/>
            </div>
            <div className='container'>
                <div>
                    <Layers />
                </div>
                <div className='grid_right' >
                    <Props className='grid_right' />
                </div>
            </div>
        </div>
    );
}

export default App;
