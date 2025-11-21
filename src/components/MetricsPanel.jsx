import React from 'react';

export function MetricsPanel({ dataset }) {
  if (!dataset) {
    return (
      <div className="card">
        <h2>2. Огляд масиву даних</h2>
        <p className="muted">Набір даних не знайдено.</p>
      </div>
    );
  }

  const m = dataset.metrics;

  return (
    <div className="card">
      <h2>2. Огляд масиву даних</h2>
      <p className="section-label">Учень</p>
      <p className="dataset-title">{dataset.label}</p>

      {!m && <p className="muted">Немає розрахованих показників.</p>}
      {m && (
        <div className="metrics-grid single-column">
          <MetricItem label="Кількість записів" value={m.count} />
          <MetricItem label="Загальна тривалість (хв)" value={m.totalMinutes} />
          <MetricItem label="Середня тривалість (хв)" value={m.avgDuration.toFixed(1)} />
          <MetricItem label="Мінімальна тривалість (хв)" value={m.minDuration} />
          <MetricItem label="Максимальна тривалість (хв)" value={m.maxDuration} />
          <MetricItem
            label="Хвилини продуктивності"
            value={m.totalProductiveMinutes}
          />
          <MetricItem label="Хвилини втоми" value={m.totalFatigueMinutes} />
          <MetricItem
            label="Сер. тривалість продуктивних періодів"
            value={m.avgProductiveDuration.toFixed(1)}
          />
          <MetricItem
            label="Сер. тривалість періодів втоми"
            value={m.avgFatigueDuration.toFixed(1)}
          />
          <MetricItem
            label="Кількість «сильної бадьорості»"
            value={m.strongEnergyCount}
          />
          <MetricItem
            label="Кількість «сильної втоми»"
            value={m.strongFatigueCount}
          />
          <MetricItem
            label="Індекс продуктивності"
            value={`${(m.productivityIndex * 100).toFixed(0)}%`}
          />
        </div>
      )}
    </div>
  );
}

function MetricItem({ label, value }) {
  return (
    <div className="metric">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
    </div>
  );
}
