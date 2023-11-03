'use client'

import { Box } from '@chakra-ui/react';
import React, { useState, useRef, useEffect } from 'react'
import { PiSoccerBallFill } from 'react-icons/pi'
import styled from 'styled-components';

type Coordinate = {
    x: number,
    y: number,
}

type PassCoordinates = Coordinate & {
    passer: boolean;
}

type PassPath = {
    start: Coordinate,
    end: Coordinate
}

type FieldInputProps = {
    actionType: string;
}

const FieldContainer = styled(Box)<{ $containerWidth: number }>`
    width: 100%;

    .pitch {
        background-color: #238729;
        width: 100%;
        height: ${(props) => props.$containerWidth * .644}px;
        position: relative;

        &:after {
            content: '';
            border-left: 1px solid white;
            position: absolute;
            top: 5%;
            left: 50%;
            display: block;
            height: 89.4%;
        }

        &:before {
            content: '';
            border: 1px solid white;
            position: absolute;
            top: 5%;
            left: 5%;
            display: block;
            width: 90%;
            height: 90%;
        }
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        cursor: pointer;
        z-index: 3;
    }

    .center-circle {
        position: absolute;
        top: 38.1%;
        left: 42.3%;
        width: 15%;
        height: 23.6%;
        border: 1px solid white;
        border-radius: 50%;

        &:after {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 5%;
            height: 5%;
            background-color: white;
            content: '';
            border: 1px solid white;
        }
    
    }

    .penalty-area {
        position: absolute;
        height: 36%;
        width: 13.5%;
        top: 31.5%;
        border: 1px solid white;
        
        &:before {
            position: absolute;
            height: 50%;
            width: 43.9%;
            top: 25%;
            border: 1px solid white;
            content: '';
        }

        &:after {
            position: absolute;
            height: 1.4%;
            width: 2.5%;
            top: 50%;
            background-color: white;
            content: '';
        }
    }

    .left .penalty-area {
        left: 5%;
        border-left: 0;

        &:before {
            left: 0px;
            border-left: 0;
        }
        
        &:after {
            right: 18.8%;
        }
    }

    .right .penalty-area {
        right: 5%;
        border-right: 0;

        &:before {
            right: 0px;
            border-right: 0;
        }
        
        :after {
            left: 18.8%;
        }
    }

    .canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none; /* Prevent canvas from capturing clicks */
    }

    .pass-dot {
        position: absolute;
        width: 8%;
        height: 8%;
        background-color: blue;
        border-radius: 50%;
    }

    .pass-line {
        position: absolute;
        height: 4px;
        background-color: blue;
        transform-origin: top left;
        transform: rotate(0rad);
    }

`;

const FieldInput = (props: FieldInputProps) => {
    const { actionType } = props;
    const canvasRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [passPath, setPassPath] = useState<PassPath[]>([]);
    const [shotCoordinates, setShotCoordinates] = useState<Coordinate[]>([]);
    const [passCoordinates, setPassCoordinates] = useState<PassCoordinates[]>([]);
    const [startPoint, setStartPoint] = useState<Coordinate | null>(null);

    const handleClick = (e) => {
        console.log(e);
        const rect = e.target.getBoundingClientRect();
        console.log(rect);
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setShotCoordinates([...shotCoordinates, { x, y }]);
    };

    const handleMouseDown = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setStartPoint({ x, y });
        setPassCoordinates([...passCoordinates, { x, y, passer: true }])
    };

    const handleMouseUp = (e) => {
        if (startPoint) {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const pass = { start: startPoint, end: { x, y } };
            setPassPath([...passPath, pass]);
            setPassCoordinates([...passCoordinates, { x, y, passer: false }])
            setStartPoint(null);
        }
    };

    useEffect(() => {
        if(canvasRef.current) {
            console.log(canvasRef.current.offsetWidth)
            setContainerWidth(canvasRef.current.offsetWidth);
        }
    }, [])

    console.log(shotCoordinates)

    return (
        <FieldContainer $containerWidth={containerWidth}>
            <Box className='pitch'>
                <Box className="overlay" onClick={(e) => actionType === 'shot' ? handleClick(e) : null} onMouseDown={(e) => actionType === 'pass' ? handleMouseDown(e) : null} onMouseUp={(e) => actionType === 'pass' ? handleMouseUp(e) : null}>
                    <canvas ref={canvasRef} className="canvas"></canvas>
                </Box>
                <Box className="field left">
                    <Box className="penalty-area">
                    </Box>
                </Box>
                <Box className="field right">
                    <Box className="penalty-area">
                    </Box>
                </Box>
                <Box className="center-circle"></Box>
                {actionType === 'shot' && shotCoordinates.map((coord, index) => (
                    <Box key={index} position={'absolute'} width={'10px'} height={'10px'} borderRadius={'50%'} zIndex={1} style={{ left: coord.x, top: coord.y }}><PiSoccerBallFill style={{ color: 'white' }} /></Box>
                ))}
                {actionType === 'pass' && passCoordinates.map((coord, index) => (
                    <Box key={index} position={'absolute'} width={'10px'} height={'10px'} zIndex={1} borderRadius={'50%'} style={{ left: coord.x, top: coord.y }}><PiSoccerBallFill color={coord.passer ? 'blue' : 'yellow'} /></Box>
                ))}
                {actionType === 'pass' && <svg className="canvas">
                    {passPath.map((pass, index) => (
                        <path
                            key={index}
                            // Adding 5 helps center the path
                            d={`M ${pass.start.x + 7} ${pass.start.y + 7} L ${pass.end.x + 7} ${pass.end.y + 7}`}
                            stroke="red"
                            strokeWidth="2"
                            strokeDasharray={'5,5'}
                            fill="transparent"
                        />
                    ))}
                </svg>}
            </Box>
        </FieldContainer>

    );
}

export default FieldInput