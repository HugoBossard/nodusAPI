import React from 'react';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Filler,Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Filler,Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Temperature moyenne',
    },
  },
};

const labels = ['Lundi 4', 'Mardi 5', 'Mercredi 6', 'Jeudi 7', 'Vendredi 8', 'Samedi 9', 'Dimanche 10'];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Temperature pour le mois de mars/jours',
      data: labels.map(() => faker.datatype.number({ min: -30, max: 30 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default () => (
  <Line options={options} data={data} />
)
