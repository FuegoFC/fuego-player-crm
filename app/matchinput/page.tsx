'use client'

import { Box } from '@chakra-ui/react';
import React, { useState, useRef } from 'react'

const MatchInput = () => {
    const fieldRef = useRef(null)
    const [coordinates, setCoordinates] = useState([]);

    const handleClick = (e) => {
        console.log(e);
        const rect = e.target.getBoundingClientRect();
        console.log(rect);
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setCoordinates([...coordinates, { x, y }]);
    };

    return (
        <Box className="pitch" onClick={handleClick} >
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
        </Box>

    );
}

export default MatchInput