"use client"

import { Box, Heading, InputGroup, InputLeftAddon, Input } from '@chakra-ui/react'
import React from 'react'

const PlayerInputForm = () => {
  return (
    <Box margin={'10px'}>
        <Heading size='sm'>Input Form</Heading>
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
            <InputGroup>
                <InputLeftAddon>First Name</InputLeftAddon>
                <Input type='text' placeholder='First Name' />
            </InputGroup>
            <InputGroup>
                <InputLeftAddon>Last Name</InputLeftAddon>
                <Input type='text' placeholder='Last Name' />
            </InputGroup>
          </div>
        </div>
    </Box>
  )
}

export default PlayerInputForm