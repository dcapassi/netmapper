export function getDistance(x1, x2, y1, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)).toFixed(1);
}

export function pixelToMeter(currentMapWidthPx, mapWidthMeter, distancePx) {
  return (mapWidthMeter * distancePx) / currentMapWidthPx;
}

export function zoomFitCalc(x, y, c1, c2, level) {
  //c1: proportional apSize/2 * zoomIn
  //Example: half apSize * zoomDelta, (30/2)*10% = 1.5
  //c2: is the zoomOut ex: 1/(1.10) = 0.909090..
  let resultX = x;
  let resultY = y;
  for (let i = 1; i <= level; i++) {
    resultX = (resultX - c1) * c2;
    resultY = (resultY - c1) * c2;
  }
  return { x: resultX, y: resultY };
}
