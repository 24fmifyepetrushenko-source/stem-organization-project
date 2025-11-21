import React from 'react';

export function MetricsPanel({ datasets, activeDataset, onActiveDatasetChange }) {
  const handleSelectChange = (e) => {
    const id = e.target.value || null;
    onActiveDatasetChange(id);
  };

  return (
    <div className="card">
      <h2>2. Огляд масиву даних</h2>
      {datasets.length === 0 ? (
        <p className="muted">Набори даних ще не завантажені.</p>
      ) : (
        <>
          <label className="field-label" htmlFor="dataset-select">
            Оберіть набір даних
          </label>
          <select
            id="dataset-select"
            value={activeDataset?.id ?? ''}
            onChange={handleSelectChange}
          >
            <option value="">— не обрано —</option>
            {datasets.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>

          {activeDataset ? (
            <MetricsDetails dataset={activeDataset} />
          ) : (
            <p className="muted">Оберіть набір даних, щоб побачити показники.</p>
          )}
        </>
      )}
    </div>
  );
}

function MetricsDetails({ dataset }) {
  const m = dataset.metrics;
  if (!m) {
    return <p className="muted">Немає розрахованих показників.</p>;
  }

  return (
    <div className="metrics-grid">
      <div className="metric">
        <div className="metric-label">Кількість записів</div>
        <div className="metric-value">{m.count}</div>
      </div>
      <div className="metric">
        <div className="metric-label">Загальна тривалість (хв)</div>
        <div className="metric-value">{m.totalMinutes}</div>
      </div>
      <div className="metric">
        <div className="metric-label">Середня тривалість (хв)</div>
        <div className="metric-value">{m.avgDuration.toFixed(1)}</div>
      </div>
      <div className="metric">
        <div className="metric-label">Мінімальна тривалість (хв)</div>
        <div className="metric-value">{m.minDuration}</div>
      </div>
      <div className="metric">
        <div className="metric-label">Максимальна тривалість (хв)</div>
        <div className="metric-value">{m.maxDuration}</div>
      </div>
      <div className="metric">
        <div className="metric-label">Хвилини продуктивності</div>
        <div className="metric-value">{m.totalProductiveMinutes}</div>
      </div>
      <div className="metric">
        <div className="metric-label">Хвилини втоми</div>
        <div className="metric-value">{m.totalFatigueMinutes}</div>
      </div>
      <div className="metric">
        <div className="metric-label">Сер. тривалість продуктивних періодів</div>
        <div className="metric-value">{m.avgProductiveDuration.toFixed(1)}</div>
      </div>
      <div className="metric">
        <div className="metric-label">Сер. тривалість періодів втоми</div>
        <div className="metric-value">{m.avgFatigueDuration.toFixed(1)}</div>
      </div>
      <div className="metric">
        <div className="metric-label">Кількість «сильної бадьорості»</div>
        <div className="metric-value">{m.strongEnergyCount}</div>
      </div>
      <div className="metric">
        <div className="metric-label">Кількість «сильної втоми»</div>
        <div className="metric-value">{m.strongFatigueCount}</div>
      </div>
      <div className="metric">
        <div className="metric-label">Індекс продуктивності</div>
        <div className="metric-value">
          {(m.productivityIndex * 100).toFixed(0)}%
        </div>
      </div>
    </div>
  );
}
src/main.jsx
Новий
+10
-0

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
