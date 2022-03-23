import React, { Component, useState, useContext } from "react";
import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";
import { StickyNote } from "../EditText/StickyNote";


const Layers = ({ jsonData }) => {
    const [text, setText] = useState("nguyentrunghieu edit text here.");
    const [layer, setLayer] = useState(0);
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
    const [selected, setSelected] = useState(false);

   

    return (
        <Stage
            width={window.innerWidth * 0.7}
            height={window.innerHeight}
            onClick={(e) => {
                if (e.currentTarget._id === e.target._id) {
                    setSelected(false);
                }
            }}
        >
            <Layer>
                {jsonData.map((item, index) => {
                    return (
                        <StickyNote
                            key={index}
                            x={item.x}
                            y={item.y}
                            width={item.width}
                            height={item.height}
                            text={index == layer ? text : item.text}
                            selected={selected}
                            onTextChange={(value) => {
                                setLayer(index);
                                setText(value)
                                handleJsonData(jsonData,index,"text",value);
                            }}
                            onTextResize={(newWidth, newHeight) => {
                                console.log(newWidth, newHeight);
                                setWidth(newWidth);
                                setHeight(newHeight);
                                handleJsonData(jsonData,index,"height",newHeight);
                                handleJsonData(jsonData,index,"width",newWidth);
                            }}
                            onClick={() => {
                                setSelected(!selected);
                            }}
                            onTextClick={(newSelected) => {
                                setSelected(newSelected);
                            }}
                        />
                    );
                })}
                {/* <StickyNote
                    x={50}
                    y={50}
                    text={text}
                    colour="#FFDAE1"
                    onTextChange={(value) => setText(value)}
                    width={width}
                    height={height}
                    selected={selected}
                    onTextResize={(newWidth, newHeight) => {
                        setWidth(newWidth);
                        setHeight(newHeight);
                    }}
                    onClick={() => {
                        setSelected(!selected);
                    }}
                    onTextClick={(newSelected) => {
                        setSelected(newSelected);
                    }}
                    
                /> */}
            </Layer>
        </Stage>
    );

}

export default Layers;

const handleJsonData = (jsonData,layer,type,newData) => {
    let a =  jsonData.forEach((item, index) => {
        if (item.type === type && index === layer) {
            console.log(item);
            item[type] = newData;
        }
    })
    console.log(jsonData);
}