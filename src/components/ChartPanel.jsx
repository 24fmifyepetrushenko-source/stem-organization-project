import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Bar, Line, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
  Title
);

export function ChartPanel({ datasets, activeDataset, chartType, onChartTypeChange }) {
  const hasData = datasets && datasets.length > 0;

  const handleTypeChange = (e) => {
    onChartTypeChange(e.target.value);
  };

  return (
    <div className="card">
      <div className="chart-header">
        <h2>3. Візуалізація масивів даних</h2>
        <div className="chart-type-control">
          <label htmlFor="chart-type">Тип графіка:</label>
          <select id="chart-type" value={chartType} onChange={handleTypeChange}>
            <option value="bar">Стовпчиковий (порівняння учнів)</option>
            <option value="line">Лінійний (порівняння індексу)</option>
            <option value="radar">Радар (один учень, різні показники)</option>
          </select>
        </div>
      </div>

      {!hasData && <p className="muted">Немає даних для побудови графіків.</p>}

      {hasData && chartType === 'bar' && <BarChart datasets={datasets} />}
      {hasData && chartType === 'line' && <LineChart datasets={datasets} />}
      {hasData && chartType === 'radar' && activeDataset && (
        <RadarChart dataset={activeDataset} />
      )}

      {chartType === 'radar' && !activeDataset && (
        <p className="muted">Оберіть активний набір даних для радара.</p>
      )}
    </div>
  );
}

function BarChart({ datasets }) {
  const labels = datasets.map((d) => d.label);
  const prod = datasets.map((d) => d.metrics?.totalProductiveMinutes ?? 0);
  const fatigue = datasets.map((d) => d.metrics?.totalFatigueMinutes ?? 0);

  const data = {
    labels,
    datasets: [
      {
        label: 'Хвилини продуктивності',
        data: prod,
        backgroundColor: 'rgba(34, 197, 94, 0.7)',
      },
      {
        label: 'Хвилини втоми',
        data: fatigue,
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Порівняння продуктивності та втоми між учнями',
      },
    },
  };

  return <Bar data={data} options={options} />;
}

function LineChart({ datasets }) {
  const labels = datasets.map((d) => d.label);
  const indexValues = datasets.map(
    (d) => (d.metrics?.productivityIndex ?? 0) * 100
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Індекс продуктивності (%)',
        data: indexValues,
        borderColor: 'rgba(37, 99, 235, 1)',
        backgroundColor: 'rgba(37, 99, 235, 0.4)',
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Порівняння індексу продуктивності між учнями',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}

function RadarChart({ dataset }) {
  const m = dataset.metrics;
  const labels = [
    'Середня тривалість (все)',
    'Середня тривалість продуктивності',
    'Середня тривалість втоми',
    'К-сть сильної бадьорості',
    'К-сть сильної втоми',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: dataset.label,
        data: [
          m.avgDuration,
          m.avgProductiveDuration,
          m.avgFatigueDuration,
          m.strongEnergyCount,
          m.strongFatigueCount,
        ],
        backgroundColor: 'rgba(56, 189, 248, 0.3)',
        borderColor: 'rgba(56, 189, 248, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(56, 189, 248, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Профіль продуктивності: ${dataset.label}`,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };

  return <Radar data={data} options={options} />;
}
