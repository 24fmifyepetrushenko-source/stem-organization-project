import React, { useState } from 'react';
import { SAMPLE_DATASETS } from './sampleData.js';
import { FileUploadPanel } from './components/FileUploadPanel.jsx';
import { MetricsPanel } from './components/MetricsPanel.jsx';
import { ChartPanel } from './components/ChartPanel.jsx';

export default function App() {
  const [datasets, setDatasets] = useState(SAMPLE_DATASETS);
  const [activeDatasetId, setActiveDatasetId] = useState(
    SAMPLE_DATASETS[0]?.id ?? null
  );
  const [chartType, setChartType] = useState('bar');

  const handleDatasetsAdded = (newOnes) => {
    setDatasets((prev) => {
      const existingIds = new Set(prev.map((d) => d.id));
      const filtered = newOnes.filter((d) => !existingIds.has(d.id));
      const merged = [...prev, ...filtered];
      if (!activeDatasetId && merged.length > 0) {
        setActiveDatasetId(merged[0].id);
      }
      return merged;
    });
  };

  const activeDataset = datasets.find((d) => d.id === activeDatasetId) ?? null;

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
        <section className="left-column">
          <FileUploadPanel onDatasetsAdded={handleDatasetsAdded} />
          <MetricsPanel
            datasets={datasets}
            activeDataset={activeDataset}
            onActiveDatasetChange={setActiveDatasetId}
          />
        </section>

        <section className="right-column">
          <ChartPanel
            datasets={datasets}
            activeDataset={activeDataset}
            chartType={chartType}
            onChartTypeChange={setChartType}
          />
        </section>
      </main>
    </div>
  );
}
