import React, { useEffect, useState } from 'react';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend, BarElement} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

function ChartComponent(){
  const [Total, setTotal] = useState({"problems":[]});

  
    useEffect(() => {
        fetch(`http://app-409e923a-1bf4-466c-a744-2c7f732388bc.cleverapps.io/api/problemeCurrentMonth`).then((response) => 
        response.json()).then((json) => { 
          setTotal(json);
        }); 
      
    }, []);


  function Date() {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true
        },
      },
    }

    const labels = Total['problems'].map((day) => (day.date));
    const data = {
        labels,
        datasets: [
          {
            label: "Nombre d'erreurs pour le mois en cours",
            data: Total['problems'].map((nbr) => (nbr.nb)),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          }
        ],
    }
    return (
        <Bar options={options} data={data} />
    )
  }
    // Return JSX code
    return (
    <>
    {
      Date()
    }
    </>
    );
}

export default ChartComponent;
