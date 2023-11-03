import PlayerInputForm from '@/components/Forms/PlayerInputForm';
import { Heading } from '@chakra-ui/react';
import React from 'react'

const PlayerInput = () => {
    return (
        <div>
            <Heading size={'lg'}>Input</Heading>
            <PlayerInputForm />
        </div>
    )
}

export default PlayerInput;