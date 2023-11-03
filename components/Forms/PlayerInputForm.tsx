"use client"

import { Box, Heading, InputGroup, InputLeftAddon, Input, Select, InputRightAddon, FormControl, FormLabel } from '@chakra-ui/react'
import React from 'react'
import AutocompleteInput from '../Inputs/AutocompleteInput';
import data from '../../app/assets/data.json'

const POSITION_OPTIONS = [
	{
		id: 1,
		value: 1
	},
	{
		id: 2,
		value: 2
	},
	{
		id: 3,
		value: 3
	},
	{
		id: 4,
		value: 4
	},
	{
		id: 5,
		value: 5
	},
	{
		id: 6,
		value: 6
	},
	{
		id: 7,
		value: 7
	},
	{
		id: 8,
		value: 8
	},
	{
		id: 9,
		value: 9
	},
	{
		id: 10,
		value: 10
	}
]

const PlayerInputForm = () => {
	return (
		<Box margin={'10px'}>
			<Heading size='sm'>Input Form</Heading>
			<Box className="flex flex-col gap-5 p-5 rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
				{/* <!-- Contact Form --> */}
				<Box className="flex" flexDirection={{ base: 'column', md: 'row' }} gap={'5'}>
					<InputGroup size={'sm'}>
						<Input type='text' placeholder='First Name' />
					</InputGroup>
					<InputGroup size={'sm'}>
						<Input type='text' placeholder='Last Name' />
					</InputGroup>
				</Box>
				<Box className="flex" flexDirection={{ base: 'column', md: 'row' }} gap={'5'}>
					<InputGroup size={'sm'}>
						<Input type='email' placeholder='Email' />
					</InputGroup>
					<InputGroup size={'sm'}>
						<Input type='tel' placeholder='Phone' />
					</InputGroup>
				</Box>
				<Box className="flex" flexDirection={{ base: 'column', md: 'row' }} gap={'5'}>
					<Select placeholder='Select Position'>
						{POSITION_OPTIONS.map((position) => (
							<option key={position.id}>{position.value}</option>
						))}
					</Select>

						<InputGroup size={'sm'}>
							<InputLeftAddon>Height</InputLeftAddon>
							<Input type='number' placeholder='Feet' />
							<Input type='number' placeholder='Inches' />
						</InputGroup>
					<InputGroup size={'sm'}>
						<Input type='number' placeholder='weight' />
						<InputRightAddon>lbs.</InputRightAddon>
					</InputGroup>
				</Box>
				<FormControl>
					<FormLabel>Autocomplete</FormLabel>
					<AutocompleteInput
						options={data.map((player) => ({
							id: player.id,
							label: [player.first_name, player.last_name].join(' ')
						}))}
					/>
				</FormControl>
			</Box>
		</Box>
	)
}

export default PlayerInputForm