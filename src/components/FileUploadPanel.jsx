import React, { useRef, useState } from 'react';
import { parseCsvToRows } from '../utils/csv.js';
import { computeMetrics } from '../utils/metrics.js';

export function FileUploadPanel({ onDatasetsAdded }) {
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState('');

  const handleFiles = async (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setStatus('Читаю CSV-файли...');

    const readers = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            const text = reader.result?.toString() ?? '';
            const rows = parseCsvToRows(text);
            const metrics = computeMetrics(rows);
            const dataset = {
              id: `${file.name}-${Date.now()}`,
              label: file.name,
              rows,
              metrics,
            };
            resolve(dataset);
          };
          reader.onerror = () => {
            console.error('Помилка читання файлу', file.name);
            resolve(null);
          };
          reader.readAsText(file, 'utf-8');
        })
    );

    const loaded = (await Promise.all(readers)).filter(Boolean);
    if (loaded.length > 0) {
      onDatasetsAdded(loaded);
      setStatus(`Завантажено наборів: ${loaded.length}`);
    } else {
      setStatus('Не вдалося завантажити дані.');
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="card">
      <h2>1. Завантаження наборів даних (CSV)</h2>
      <p className="muted">
        Можна використовувати заготовлені CSV-набори для різних людей (учнів) та
        порівнювати результати.
      </p>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,text/csv"
        multiple
        onChange={handleFiles}
      />
      {status && <p className="status-text">{status}</p>}
      <p className="hint">
        Формат стовпців: Дата, Час_початку, Час_завершення, Тривалість_хв,
        Тип_стану, Інтенсивність, Діяльність, Місце, Фактори.
      </p>
    </div>
  );
}
