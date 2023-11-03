"use client"

import FieldInput from '@/components/Inputs/FieldInput'
import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

const page = () => {
  return (
    <div>
        <Heading>Input Page</Heading>
        <Box>
            <Heading size={'sm'}>Shot Tracker</Heading>
            <Box width={'700px'}>
              <FieldInput actionType='shot' />
            </Box>
        </Box>
        <Box>
            <Heading size={'sm'}>Pass Tracker</Heading>
            <FieldInput actionType='pass' />
        </Box>
    </div>
  )
}

export default page