"use client"

import React from 'react'
import { Box, Heading, InputGroup, InputLeftAddon, Input, InputRightAddon, FormControl, FormLabel } from '@chakra-ui/react'
import Select from 'react-select';
import AutocompleteInput from '../Inputs/AutocompleteInput';
import data from '../../app/assets/data.json'

const POSITION_OPTIONS = [
	{
		value: 1,
		label: '1',
	},
	{
		value: 2,
		label: '2',
	},
	{
		value: 3,
		label: '3',
	},
	{
		value: 4,
		label: '4',
	},
	{
		value: 5,
		label: '5',
	},
	{
		value: 6,
		label: '6',
	},
	{
		value: 7,
		label: '7',
	},
	{
		value: 8,
		label: '8',
	},
	{
		value: 9,
		label: '9',
	},
	{
		value: 10,
		label: '10',
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
					<Select
						className="my-react-select-container w-full"
						classNamePrefix="my-react-select"
						placeholder='Select Position'
						options={POSITION_OPTIONS}
					/>

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
					<Select
						className="my-react-select-container"
						classNamePrefix="my-react-select"
						options={data.map((player) => ({
							value: player.id,
							label: [player.first_name, player.last_name].join(' ')
						}))}
					/>
					{/* <AutocompleteInput
						options={data.map((player) => ({
							id: player.id,
							label: [player.first_name, player.last_name].join(' ')
						}))}
					/> */}
				</FormControl>
			</Box>
		</Box>
	)
}

export default PlayerInputForm