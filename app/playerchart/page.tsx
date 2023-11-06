"use client"

import DateDonut from '@/components/Charts/DateDonut'
import React, { useState } from 'react'
import PRACTICEDATA from '../assets/player_match_data.json';
import Select from 'react-select';

const PlayerCharts = () => {
    const [selectedPractice, setSelectedPractice] = useState(PRACTICEDATA[0]);

    console.log(selectedPractice);
  return (
    <div>
        <Select
            className="my-react-select-container w-full"
            classNamePrefix="my-react-select"
            options={PRACTICEDATA.map((practice) => ({
                value: practice.id,
                label: practice.date
            }))}
            onChange={(e) => setSelectedPractice(PRACTICEDATA.find((practice) => practice.id === e?.value))}
        />
        <DateDonut practiceDate={selectedPractice.date} practiceStats={selectedPractice.stats} />
    </div>
  )
}

export default PlayerCharts