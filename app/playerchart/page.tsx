"use client"

import DateDonut from '@/components/Charts/DateDonut'
import React, { useState } from 'react'
import PRACTICEDATA from '../assets/player_match_data.json';
import Select from 'react-select';
import { ApexOptions } from 'apexcharts';

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
]

const options: ApexOptions = {
  chart: {
      type: "donut",
  },
  colors: [],
  labels: [],
  legend: {
      show: true,
      position: "bottom",
  },

  plotOptions: {
      pie: {
          donut: {
              size: "65%",
              background: "transparent",
          },
      },
  },
  dataLabels: {
      enabled: false,
  },
  responsive: [
      {
          breakpoint: 2600,
          options: {
              chart: {
                  width: 380,
              },
          },
      },
      {
          breakpoint: 640,
          options: {
              chart: {
                  width: 200,
              },
          },
      },
  ],
};


const PlayerCharts = () => {
  const [selectedStat, setSelectedStat] = useState('');
  const [practiceDates, setPracticeDates] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [colors, setColors] = useState([])

  const handleStatFilter = (key: string) => {
    const practices = [];
    const newStats = [];
    PRACTICEDATA.map((practice) => {
      practices.push(practice.date);
      newStats.push(practice.stats[key])
    })

    setPracticeDates(practices);
    setStats(newStats)
    setColors(newStats.map((s) => `#${Math.floor(Math.random()*16777215).toString(16)}`));

  }

  console.log(selectedStat, practiceDates, stats);
  return (
    <div>
      <Select
        className="my-react-select-container w-full"
        classNamePrefix="my-react-select"
        options={STAT_OPTIONS}
        placeholder='Select A Match Stat...'
        onChange={(e) => {
          setSelectedStat(e?.value)
          handleStatFilter(e?.value)
        }}
      />
      <DateDonut stats={stats} dates={practiceDates} colors={colors} />
    </div>
  )
}

export default PlayerCharts