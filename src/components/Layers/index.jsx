import React, { Component,useState } from "react";
import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";
import { StickyNote } from "../EditText/StickyNote";



const Layers = () => {
    const [text, setText] = useState("nguyentrunghieu edit text here.");
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
    const [selected, setSelected] = useState(false);


    return (
        <Stage
            width={window.innerWidth*0.7}
            height={window.innerHeight}
            onClick={(e) => {
                if (e.currentTarget._id === e.target._id) {
                    setSelected(false);
                }
            }}
        >
            <Layer>
                <StickyNote
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
                />
            </Layer>
        </Stage>
    );

}

export default Layers;