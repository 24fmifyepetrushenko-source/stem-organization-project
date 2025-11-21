export function parseCsvToRows(csvText) {
  if (!csvText) return [];

  const lines = csvText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length <= 1) return [];

  // перший рядок — заголовок, пропускаємо
  const dataLines = lines.slice(1);

  const rows = dataLines.map((line) => {
    const parts = line.split(',');
    const [
      date,
      startTime,
      endTime,
      duration,
      stateType,
      intensity,
      activity,
      place,
      factors,
    ] = parts;

    return {
      date: (date || '').trim(),
      startTime: (startTime || '').trim(),
      endTime: (endTime || '').trim(),
      durationMinutes: Number((duration || '').trim()) || 0,
      stateType: (stateType || '').trim(),
      intensity: (intensity || '').trim(),
      activity: (activity || '').trim(),
      place: (place || '').trim(),
      factors: (factors || '').trim(),
    };
  });

  return rows;
}
