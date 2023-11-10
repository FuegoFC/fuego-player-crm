import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PlayerComparisonChart = ({ player1, player2, selectedStat }) => {
  // Extract the data for the selected stat for each player
  const player1Data = player1.practices.map(practice => practice.stats[selectedStat]);
  const player2Data = player2.practices.map(practice => practice.stats[selectedStat]);

  // Prepare data for the chart
  const chartData = {
    options: {
      xaxis: {
        categories: player1.practices.map(practice => practice.date),
      },
    },
    series: [
      {
        name: player1.first_name + ' ' + player1.last_name,
        data: player1Data,
      },
      {
        name: player2.first_name + ' ' + player2.last_name,
        data: player2Data,
      },
    ],
  };

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="line"
      height={400}
    />
  );
};

export default PlayerComparisonChart;
