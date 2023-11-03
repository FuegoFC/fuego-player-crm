"use client"

import PlayerInputForm from '@/components/Forms/PlayerInputForm';
import { Box, Heading } from '@chakra-ui/react';
import React from 'react'

const PlayerInput = () => {
    return (
        <Box margin={'10px'}>
            <Heading size={'lg'}>Input</Heading>
            <PlayerInputForm />
        </Box>
    )
}

export default PlayerInput;