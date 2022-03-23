import logo from './logo.svg';
import './App.css';
import { useRef, useEffect, useState, createContext } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Star, Text } from 'react-konva';

import Layers from './components/Layers';
import Props from './components/Props';
import MenuIcon from './components/MenuIcon';

import TextFieldsIcon from '@material-ui/icons/TextFields';



function DrawText() {
    const [jsonData, setJsonData] = useState([]);
    const handleText = () => {
        setJsonData([
            ...jsonData,
            {
                layer: jsonData.length,
                type: 'text',
                text: 'Hello World',
                x: 100,
                y: 100,
                fontSize: 20,
                fill: 'red',
                height: 100,
                width: 100,
            }
        ])
    }


    //img
    const dragUrl = useRef();
    const stageRef = useRef();
    const [images, setImages] = useState([]);



    return (

        <div>
            <div>
                <span onClick={handleText}>
                    <TextFieldsIcon />
                </span>
                {/* <img
                    alt="lion"
                    src="https://konvajs.org/assets/lion.png"
                    draggable="true"
                    onDragStart={(e) => {
                        dragUrl.current = e.target.src;
                    }}
                /> */}
            </div>
            <div className='container'>
                <div>
                    <Layers jsonData={jsonData} />
                </div>
                <div className='grid_right' >
                    <Props />
                </div>
            </div>
        </div>

    );
}

export default DrawText;
