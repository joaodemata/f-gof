import { memo } from 'react';
import './Point.css';

// La interacción la maneja Grid; la celda solo expone sus coordenadas y estado
function Point({ x, y, isAlive }) {
  return <div className={isAlive ? 'grid-item is-alive' : 'grid-item'} data-x={x} data-y={y} data-alive={isAlive} />;
}

const MemoPoint = memo(Point);

export { MemoPoint as Point };
