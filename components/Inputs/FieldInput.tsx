'use client'

import { Box } from '@chakra-ui/react';
import React, { useState, useRef } from 'react'

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

const FieldInput = (props: FieldInputProps) => {
    const { actionType = 'pass' } = props;
    const canvasRef = useRef(null); 
    const [passPath, setPassPath] = useState<PassPath[]>([]);
    const [shotCoordinates, setShotCoordinates] = useState<Coordinate[]>([]);
    const [passCoordinates, setPassCoordinates] = useState<PassCoordinates[]>([]);
    const [isMouseDown, setIsMouseDown] = useState(false);
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
        setIsMouseDown(true);
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
    
        setStartPoint({ x, y });
        setPassCoordinates([...passCoordinates, {x, y, passer: true}])
      };
    
      const handleMouseUp = (e) => {
        if (startPoint) {
          const rect = e.target.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
    
          const pass = { start: startPoint, end: { x, y } };
          setPassPath([...passPath, pass]);
          setPassCoordinates([...passCoordinates, {x, y, passer: false}])
          setStartPoint(null);
        }
        setIsMouseDown(false);
      };

      console.log(shotCoordinates)

    return (
        <Box className="pitch">
            <Box className="overlay" onClick={(e) => actionType === 'shot' ? handleClick(e) : null} onMouseDown={(e) => actionType === 'pass' ? handleMouseDown(e) : null } onMouseUp={(e) => actionType === 'pass' ? handleMouseUp(e) : null }>
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
                <Box key={index} position={'absolute'} width={'10px'} height={'10px'} backgroundColor={'#ff0000'} borderRadius={'50%'} zIndex={1} style={{ left: coord.x, top: coord.y }} />
            ))}
            {actionType === 'pass' && passCoordinates.map((coord, index) => (
                <Box key={index} position={'absolute'} width={'10px'} height={'10px'} backgroundColor={coord.passer ? 'blue' : 'yellow'} zIndex={1} borderRadius={'50%'} style={{ left: coord.x, top: coord.y }} />
            ))}
            {actionType === 'pass' && <svg className="canvas">
                {passPath.map((pass, index) => (
                <path
                    key={index}
                    // Adding 5 helps center the path
                    d={`M ${pass.start.x + 5} ${pass.start.y + 5} L ${pass.end.x + 5} ${pass.end.y + 5}`}
                    stroke="blue"
                    strokeWidth="2"
                    strokeDasharray={'5,5'}
                    fill="transparent"
                />
                ))}
            </svg>}
        </Box>

    );
}

export default FieldInput