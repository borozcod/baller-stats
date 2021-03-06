export const CHART_COLORS = {
  red: 'rgba(255, 99, 132, 0.5)',
  orange: 'rgba(255, 159, 64, 0.5)',
  yellow: 'rgba(255, 205, 86, 0.5)',
  green: 'rgba(75, 192, 192, 0.5)',
  blue: 'rgba(54, 162, 235, 0.5)',
  purple: 'rgba(153, 102, 255, 0.5)',
  grey: 'rgba(201, 203, 207, 0.5)'
};

export const COLORS = [
  'rgba(77, 201, 246, 0.5)',
  'rgba(246, 112, 25, 0.5)',
  'rgba(245, 55, 148, 0.5)',
  'rgba(83, 123, 196, 0.5)',
  'rgba(172, 194, 54, 0.5)',
  'rgba(22, 106, 143, 0.5)',
  'rgba(0, 169, 80, 0.5)',
  'rgba(88, 89, 91, 0.5)',
  'rgba(133, 73, 186, 0.5)',
  'rgba(63, 100, 213, 0.5)',
  'rgba(213, 63, 154, 0.5)',
];

export const getColor = (i) => {
  const abs = Math.abs;
  const sin = Math.sin;

  const o = Math.round;
  const r = abs(sin(i) * 16777215) % 255;
  const g = abs(sin(i + 1) * 16777215) % 255
  const b = abs(sin(i + 2) * 16777215) % 255

  return 'rgba(' + o(r) + ',' + o(g) + ',' + o(b) + ', 0.5)';
}