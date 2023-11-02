'use client'

import { Box } from '@chakra-ui/react';
import React, { useState, useRef } from 'react'

const MatchInput = () => {
    const canvasRef = useRef(null);
    const [passPath, setPassPath] = useState([]);
    const [shotCoordinates, setShotCoordinates] = useState([]);
    const [passCoordinates, setPassCoordinates] = useState([]);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startPoint, setStartPoint] = useState(null);

    const handleClick = (e) => {
        console.log(e);
        const rect = e.target.getBoundingClientRect();
        console.log(rect);
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setShotCoordinates([...shotCoordinates, { x, y }]);
    };

    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
    
        setStartPoint({ x, y });
        setPassCoordinates([...passCoordinates, {x, y}])
      };
    
      const handleMouseUp = (e) => {
        if (startPoint) {
          const rect = e.target.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
    
          const pass = { start: startPoint, end: { x, y } };
          setPassPath([...passPath, pass]);
          setPassCoordinates([...passCoordinates, {x, y}])
          setStartPoint(null);
        }
        setIsMouseDown(false);
      };

    return (
        <Box className="pitch">
            <Box className="overlay" onClick={handleClick} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
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
            {shotCoordinates.map((coord, index) => (
                <Box key={index} position={'absolute'} width={'10px'} height={'10px'} backgroundColor={'#ff0000'} borderRadius={'50%'} zIndex={1} style={{ left: coord.x, top: coord.y }} />
            ))}
            {passCoordinates.map((coord, index) => (
                <Box key={index} position={'absolute'} width={'10px'} height={'10px'} backgroundColor={'yellow'} borderRadius={'50%'} style={{ left: coord.x, top: coord.y }} />
            ))}
            <svg className="canvas">
                {passPath.map((pass, index) => (
                <path
                    key={index}
                    d={`M ${pass.start.x} ${pass.start.y} L ${pass.end.x} ${pass.end.y}`}
                    stroke="blue"
                    strokeWidth="2"
                    fill="transparent"
                />
                ))}
            </svg>
        </Box>

    );
}

export default MatchInput