"use client"

import DateDonut from '@/components/Charts/DateDonut'
import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { ApexOptions } from 'apexcharts';
import { Heading } from '@chakra-ui/react';

import PLAYERS from '../assets/data.json'
import { PracticesEntity, Stats } from '@/types/player';
import PlayerComparisonChart from '@/components/Charts/BarChart';

const STAT_OPTIONS = [
	{ value: "pass_completion_percent", label: 'Pass Completion' },
	{ value: "goals_scored", label: 'Goals Scored' },
	{ value: "assists", label: 'Assists' },
	{ value: "minutes_played", label: 'Minutes Played' },
	{ value: "shots_on_goal", label: 'Shots On Goal' },
	{ value: "shots_off_target", label: 'Shots Off Target' },
	{ value: "tackles", label: 'Tackles' },
	{ value: "interceptions", label: "Interceptions" },
	{ value: "fouls_committed", label: "Fouls Committed" },
	{ value: "fouls_received", label: "Fouls Received" },
	{ value: "yellow_cards", label: "Yellow Cards" },
	{ value: "red_cards", label: "Red Cards" },
	{ value: "saves", label: "Saves" }
];

const player1 = PLAYERS[0];
const player2 = PLAYERS[1];

// Choose a practice date for comparison
const practiceDate = '2023-08-15';

const PlayerCharts = () => {
	const [selectedPlayer, setSelectedPlayer] = useState<any | undefined>(undefined);
	const [selectedStat, setSelectedStat] = useState('');
	const [statHeading, setStatHeading] = useState('')
	const [practiceDates, setPracticeDates] = useState<any[]>([]);
	const [stats, setStats] = useState<any[]>([]);

	const handlePlayerSelection = (e: any) => {
		const player = PLAYERS.filter((p) => p.id === e.value)[0];
		console.log(player);
		setSelectedPlayer(player);
	};

	const handleStatFilter = (key: keyof Stats) => {
		const practices: string[] = [];
		const newStats: string | number[] = [];
		selectedPlayer.practices.map((practice: PracticesEntity) => {
			practices.push(practice.date);
			newStats.push(practice.stats[key])
		})

		setPracticeDates(practices);
		setStats(newStats)

	};

	useEffect(() => {
		if (selectedStat !== '') {
			const practices: string[] = [];
			const newStats: string | number[] = [];
			selectedPlayer.practices.map((practice: PracticesEntity) => {
				practices.push(practice.date);
				newStats.push(practice.stats[selectedStat as keyof Stats])
			})

			setPracticeDates(practices);
			setStats(newStats)
		}
	}, [selectedPlayer])

	console.log(selectedStat, practiceDates, stats);
	return (
		<div className="m-4 col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
			<Select
				className="my-react-select-container w-[500px]"
				classNamePrefix="my-react-select"
				options={PLAYERS.map((player) => ({
					value: player.id,
					label: `${player.first_name} ${player.last_name}`
				}))}
				placeholder='Select A Player...'
				onChange={handlePlayerSelection}
			/>
			{selectedPlayer && <div className="m-4 col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
				<Select
					className="my-react-select-container w-[500px]"
					classNamePrefix="my-react-select"
					options={STAT_OPTIONS}
					placeholder='Select A Match Stat...'
					onChange={(e: any) => {
						setStatHeading(e?.label);
						setSelectedStat(e?.value)
						handleStatFilter(e?.value)
					}}
				/>
				<Heading size='md'>{statHeading}</Heading>
				<DateDonut stats={stats} dates={practiceDates} />
			</div>}

			{selectedStat !== '' && <PlayerComparisonChart player1={player1} player2={player2} selectedStat={selectedStat} />}
		</div>
	)
}

export default PlayerCharts