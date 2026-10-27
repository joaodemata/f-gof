import { useRef } from 'react';
import './Grid.css';

// Celda (Point) que está debajo del puntero, si la hay
function cellFromEvent(_event) {
  const ELEMENT = document.elementFromPoint(_event.clientX, _event.clientY);
  return ELEMENT && ELEMENT.dataset.x !== undefined ? ELEMENT : null;
}

/**
 * Tablero del juego. Permite dibujar haciendo clic o arrastrando (mouse y touch):
 * la primera celda define si el trazo da vida o mata.
 */
function Grid({ size, editable, onPaint, children }) {
  // Valor que se está pintando durante el arrastre; null cuando no se arrastra
  const paintValueRef = useRef(null);

  const paintCell = (_cell) => {
    if (_cell && (_cell.dataset.alive === 'true') !== paintValueRef.current) {
      onPaint(Number(_cell.dataset.x), Number(_cell.dataset.y), paintValueRef.current);
    }
  };

  const onPointerDown = (_event) => {
    const CELL = cellFromEvent(_event);
    if (!editable || !CELL || _event.button !== 0) {
      return;
    }
    _event.currentTarget.setPointerCapture(_event.pointerId);
    paintValueRef.current = CELL.dataset.alive !== 'true';
    paintCell(CELL);
  };

  const onPointerMove = (_event) => {
    if (paintValueRef.current !== null) {
      paintCell(cellFromEvent(_event));
    }
  };

  const onPointerUp = () => {
    paintValueRef.current = null;
  };

  return (
    <div className={`grid-container${editable ? ' is-editable' : ''}`} style={{ '--cells': size }} role="img" aria-label="Tablero del juego de la vida" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
      {children}
    </div>
  );
}

export { Grid };
