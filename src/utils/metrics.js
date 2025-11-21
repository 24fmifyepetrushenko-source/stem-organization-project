export function computeMetrics(rows) {
  if (!rows || rows.length === 0) {
    return null;
  }

  const durations = rows
    .map((r) => Number(r.durationMinutes) || 0)
    .filter((d) => d > 0);

  const count = durations.length;
  if (count === 0) {
    return null;
  }

  let total = 0;
  let min = durations[0];
  let max = durations[0];
  let totalProd = 0;
  let totalFat = 0;
  let prodCount = 0;
  let fatCount = 0;
  let strongEnergyCount = 0;
  let strongFatigueCount = 0;

  for (const row of rows) {
    const d = Number(row.durationMinutes) || 0;
    total += d;
    if (d < min) min = d;
    if (d > max) max = d;

    if (row.stateType === 'продуктивність') {
      totalProd += d;
      prodCount += 1;
    }
    if (row.stateType === 'втома') {
      totalFat += d;
      fatCount += 1;
    }

    const intensity = (row.intensity || '').toLowerCase();
    if (intensity.includes('сильна бадьорість')) {
      strongEnergyCount += 1;
    }
    if (intensity.includes('сильна втома')) {
      strongFatigueCount += 1;
    }
  }

  const avg = total / count;
  const avgProd = prodCount ? totalProd / prodCount : 0;
  const avgFat = fatCount ? totalFat / fatCount : 0;
  const productivityIndex = totalProd + totalFat > 0 ? totalProd / (totalProd + totalFat) : 0;

  return {
    count,
    totalMinutes: total,
    avgDuration: avg,
    minDuration: min,
    maxDuration: max,
    totalProductiveMinutes: totalProd,
    totalFatigueMinutes: totalFat,
    avgProductiveDuration: avgProd,
    avgFatigueDuration: avgFat,
    strongEnergyCount,
    strongFatigueCount,
    productivityIndex,
  };
}
