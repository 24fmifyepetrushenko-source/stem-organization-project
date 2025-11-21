import React, { useState } from 'react';
import { SAMPLE_DATASETS } from './sampleData.js';
import { FileUploadPanel } from './components/FileUploadPanel.jsx';
import { MetricsPanel } from './components/MetricsPanel.jsx';
import { ChartPanel } from './components/ChartPanel.jsx';

export default function App() {
  const [datasets, setDatasets] = useState(SAMPLE_DATASETS);
  const [chartType, setChartType] = useState('bar');

  const handleDatasetsAdded = (newOnes) => {
    setDatasets((prev) => {
      const existingIds = new Set(prev.map((d) => d.id));
      const filtered = newOnes.filter((d) => !existingIds.has(d.id));
      return [...prev, ...filtered];
    });
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>STREAM Productivity Analyzer</h1>
        <p className="subtitle">
          Аналіз особистих даних про втому / продуктивність на основі CSV-наборів
          (масивів / списків).
        </p>
      </header>

      <main className="layout">
        <FileUploadPanel onDatasetsAdded={handleDatasetsAdded} />

        <section className="dataset-grid">
          {datasets.length === 0 && (
            <div className="card">
              <p className="muted">Набори даних ще не завантажені.</p>
            </div>
          )}

          {datasets.map((dataset) => (
            <div className="dataset-column" key={dataset.id}>
              <ChartPanel
                dataset={dataset}
                chartType={chartType}
                onChartTypeChange={setChartType}
              />
              <MetricsPanel dataset={dataset} />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
