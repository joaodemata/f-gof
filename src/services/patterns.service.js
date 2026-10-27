// Patrones clásicos dibujados con `O` (viva) y `.` (muerta), fila superior primero
const PATTERNS = [
  {
    name: 'Planeador',
    rows: ['.O.', '..O', 'OOO'],
  },
  {
    name: 'Nave ligera',
    rows: ['.O..O', 'O....', 'O...O', 'OOOO.'],
  },
  {
    name: 'R-pentominó',
    rows: ['.OO', 'OO.', '.O.'],
  },
  {
    name: 'Púlsar',
    rows: ['..OOO...OOO..', '.............', 'O....O.O....O', 'O....O.O....O', 'O....O.O....O', '..OOO...OOO..', '.............', '..OOO...OOO..', 'O....O.O....O', 'O....O.O....O', 'O....O.O....O', '.............', '..OOO...OOO..'],
  },
  {
    name: 'Cañón de Gosper',
    rows: [
      '........................O...........',
      '......................O.O...........',
      '............OO......OO............OO',
      '...........O...O....OO............OO',
      'OO........O.....O...OO..............',
      'OO........O...O.OO....O.O...........',
      '..........O.....O.......O...........',
      '...........O...O....................',
      '............OO......................',
    ],
  },
];

/**
 * Convierte un patrón a coordenadas de la grilla, centrado en el origen.
 * @param {{rows: Array<string>}} _pattern
 * @return {Array<{x: number, y: number}>}
 */
function patternToCells(_pattern) {
  const HEIGHT = _pattern.rows.length;
  const WIDTH = Math.max(..._pattern.rows.map((_row) => _row.length));
  const CELLS = [];

  _pattern.rows.forEach((_row, _rowIndex) => {
    [..._row].forEach((_char, _colIndex) => {
      if (_char === 'O') {
        // En la grilla el eje y crece hacia arriba
        CELLS.push({ x: _colIndex - Math.floor(WIDTH / 2), y: Math.floor(HEIGHT / 2) - _rowIndex });
      }
    });
  });

  return CELLS;
}

export { PATTERNS, patternToCells };
