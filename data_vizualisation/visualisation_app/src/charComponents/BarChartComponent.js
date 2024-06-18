import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Eclairage nuit',
    },
  },
};

const labels = ['Lundi 4', 'Mardi 5', 'Mercredi 6', 'Jeudi 7', 'Vendredi 8', 'Samedi 9', 'Dimanche 10'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Durée en minutes pour le mois de mars',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }
  ],
};

export default () => (
  <Bar options={options} data={data} />
)
