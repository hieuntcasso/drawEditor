import React from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Image,Transformer } from 'react-konva';
import useImage from 'use-image';



const URLImage = ({ image, shapeProps, isSelected, onSelect, onChange }) => {
    const [img] = useImage(image.src);
    const trRef = React.useRef();


    const shapeRef = React.useRef();
    React.useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);
    return (
        <>
            <Image
                onClick={onSelect}
                image={img}
                x={image.x}
                y={image.y}
                // I will use offset to set origin to the center of the image
                offsetX={img ? img.width / 2 : 0}
                offsetY={img ? img.height / 2 : 0}
                draggable={true}
                onTransformEnd={(e) => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // we will reset it back
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        // set minimal value
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY),
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </>
    );
};


const DrawImage = (props) => {

    const dragUrl = React.useRef();
    const stageRef = React.useRef();
    const [images, setImages] = React.useState([]);
    return (
        <div>
            Try to trag and image into the stage:
            <br />
            <img
                alt="lion"
                src="https://konvajs.org/assets/lion.png"
                draggable="true"
                onDragStart={(e) => {
                    dragUrl.current = e.target.src;
                }}

            />
            <div
                onDrop={(e) => {
                    e.preventDefault();
                    // register event position
                    stageRef.current.setPointersPositions(e);
                    // add image
                    setImages(
                        images.concat([
                            {
                                ...stageRef.current.getPointerPosition(),
                                src: dragUrl.current,
                            },
                        ])
                    );
                }}
                onDragOver={(e) => e.preventDefault()}
            >
                <Stage
                    width={window.innerWidth}
                    height={window.innerHeight}
                    style={{ border: '1px solid grey' }}
                    ref={stageRef}
                >
                    <Layer>
                        {images.map((image) => {
                            return <URLImage image={image} />;
                        })}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
}

export default DrawImage;