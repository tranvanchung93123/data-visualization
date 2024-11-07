import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend);

const ChartComponent = ({ data, normalized, chartType, yearlyAverage }) => {
  const maxFootfall = Math.max(...data.map(d => d.footfall));
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Footfall',
        data: data.map(d => normalized ? (d.footfall / maxFootfall) * 100 : d.footfall),
        backgroundColor: data.map(d => d.footfall >= yearlyAverage ? 'green' : 'red'),
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  return chartType === 'bar' ? <Bar data={chartData} options={options} /> : <Line data={chartData} options={options} />;
};

export default ChartComponent;