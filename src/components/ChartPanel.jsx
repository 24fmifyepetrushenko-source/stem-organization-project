import React, { useMemo } from 'react';
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

export function ChartPanel({ dataset, chartType, onChartTypeChange }) {
  const handleTypeChange = (e) => {
    onChartTypeChange(e.target.value);
  };

  const durationSeries = useMemo(
    () => dataset.rows?.map((row) => Number(row.durationMinutes) || 0) ?? [],
    [dataset.rows]
  );

  const chartContent = useMemo(() => {
    if (!dataset.metrics) {
      return <p className="muted">Немає даних для побудови графіка.</p>;
    }

    if (chartType === 'line') {
      return <LineChart dataset={dataset} values={durationSeries} />;
    }

    if (chartType === 'radar') {
      return <RadarChart dataset={dataset} />;
    }

    return <BarChart dataset={dataset} />;
  }, [dataset, chartType, durationSeries]);

  return (
    <div className="card">
      <div className="chart-header">
        <div>
          <p className="section-label">Учень</p>
          <h2>{dataset.label}</h2>
        </div>
        <div className="chart-type-control">
          <label htmlFor={`chart-type-${dataset.id}`}>Тип графіка:</label>
          <select
            id={`chart-type-${dataset.id}`}
            value={chartType}
            onChange={handleTypeChange}
          >
            <option value="bar">Баланс продуктивності/втоми</option>
            <option value="line">Тривалість сесій</option>
            <option value="radar">Профіль показників</option>
          </select>
        </div>
      </div>

      <div className="chart-area">{chartContent}</div>
    </div>
  );
}

function BarChart({ dataset }) {
  const m = dataset.metrics;

  const data = {
    labels: ['Продуктивність', 'Втома'],
    datasets: [
      {
        label: 'Хвилини',
        data: [m.totalProductiveMinutes, m.totalFatigueMinutes],
        backgroundColor: ['rgba(34, 197, 94, 0.7)', 'rgba(239, 68, 68, 0.7)'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Баланс часу за типами стану',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
}

function LineChart({ dataset, values }) {
  const labels =
    dataset.rows?.map((row, idx) => row.date || `Запис ${idx + 1}`) ?? [];

  const data = {
    labels,
    datasets: [
      {
        label: 'Тривалість сесії (хв)',
        data: values,
        borderColor: 'rgba(37, 99, 235, 1)',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        tension: 0.25,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Динаміка тривалості сесій',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
}

function RadarChart({ dataset }) {
  const m = dataset.metrics;
  const labels = [
    'Середня тривалість (все)',
    'Средня тривалість продуктивності',
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
    maintainAspectRatio: false,
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
