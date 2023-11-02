'use client'

import { Box } from '@chakra-ui/react';
import React, { useState, useRef } from 'react'

const MatchInput = () => {
    const canvasRef = useRef(null);
    const [coordinates, setCoordinates] = useState([]);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startPoint, setStartPoint] = useState(null);

    const handleClick = (e) => {
        console.log(e);
        const rect = e.target.getBoundingClientRect();
        console.log(rect);
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setCoordinates([...coordinates, { x, y }]);
    };

    const handleMouseDown = (e) => {
        setIsMouseDown(true);
    
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
    
        setStartPoint({ x, y });
      };
    
      const handleMouseUp = () => {
        setIsMouseDown(false);
        setStartPoint(null);
      };
    
      const handleMouseMove = (e) => {
        if (isMouseDown) {
          const rect = canvasRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
    
          setCoordinates([...coordinates, { x, y }]);
        }
      };

    return (
        <Box className="pitch">
            <Box className="overlay" onClick={handleClick} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
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
            {coordinates.map((coord, index) => (
                <Box key={index} position={'absolute'} width={'10px'} height={'10px'} backgroundColor={'#ff0000'} borderRadius={'50%'} style={{ left: coord.x, top: coord.y }} />
            ))}
            {startPoint && (
                <div className="pass-dot" style={{ left: startPoint.x, top: startPoint.y }}></div>
            )}
        </Box>

    );
}

export default MatchInput