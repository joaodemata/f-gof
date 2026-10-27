import { useCallback, useEffect, useRef, useState } from 'react';
import socket from '../socket';
import { emitGameService } from '../services/util.service';

// Estados posibles de la partida
const STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  STOPPED: 'stopped',
  FINISHED: 'finished',
  ERROR: 'error',
};

const pointKey = (_point) => `${_point.x},${_point.y}`;

/**
 * Crea la grilla vacía. El orden (y descendente, x ascendente) es el que se dibuja en pantalla.
 * @param {number} _quantity Cantidad de celdas hacia cada lado del origen.
 * @param {Set<string>} [_alive] Claves `x,y` de las células vivas.
 */
function createPoints(_quantity, _alive = new Set()) {
  const POINTS = [];
  for (let y = _quantity; y >= -_quantity; y--) {
    for (let x = -_quantity; x <= _quantity; x++) {
      POINTS.push({ x, y, isAlive: _alive.has(`${x},${y}`) });
    }
  }
  return POINTS;
}

/**
 * Estado del tablero y comunicación con c-gof mediante el socket.
 * @param {number} _quantity Cantidad de celdas hacia cada lado del origen.
 */
function useGame(_quantity) {
  const [points, setPoints] = useState(() => createPoints(_quantity));
  const [status, setStatus] = useState(STATUS.IDLE);
  const [generation, setGeneration] = useState(0);
  // Configuración con la que se inició la última partida, para poder restaurarla
  const initialPointsRef = useRef(null);

  useEffect(() => {
    const onChange = (_points) => {
      // Se mapea por coordenada para no depender del orden en que responde el servidor
      const ALIVE = new Set(_points.data.filter((_point) => _point.isAlive).map(pointKey));
      setPoints((_prev) => _prev.map((_point) => (_point.isAlive === ALIVE.has(pointKey(_point)) ? _point : { ..._point, isAlive: !_point.isAlive })));
      setGeneration((_generation) => _generation + 1);
    };

    const onFinish = () => {
      // Se desconecta para que la próxima partida use un socket nuevo
      socket.disconnect();
      setStatus(STATUS.FINISHED);
    };

    const onConnectError = () => {
      socket.disconnect();
      setStatus(STATUS.ERROR);
    };

    const onDisconnect = (_reason) => {
      // Desconexiones iniciadas por el servidor o por la red durante la partida
      if (_reason !== 'io client disconnect') {
        setStatus((_status) => (_status === STATUS.RUNNING ? STATUS.ERROR : _status));
      }
    };

    socket.on('change', onChange);
    socket.on('finish', onFinish);
    socket.on('connect_error', onConnectError);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('change', onChange);
      socket.off('finish', onFinish);
      socket.off('connect_error', onConnectError);
      socket.off('disconnect', onDisconnect);
      socket.disconnect();
    };
  }, []);

  const isRunning = status === STATUS.RUNNING;
  const population = points.reduce((_total, _point) => _total + (_point.isAlive ? 1 : 0), 0);

  // Cualquier edición del tablero vuelve al modo edición
  const edit = useCallback((_newPoints) => {
    setPoints(_newPoints);
    setGeneration(0);
    setStatus(STATUS.IDLE);
  }, []);

  const start = useCallback(() => {
    initialPointsRef.current = points;
    setGeneration(0);
    setStatus(STATUS.RUNNING);
    socket.connect();
    emitGameService(points);
  }, [points]);

  const stop = useCallback(() => {
    // El servidor corta el ciclo de generaciones cuando el cliente se desconecta
    socket.disconnect();
    setStatus(STATUS.STOPPED);
  }, []);

  const paint = useCallback(
    (_x, _y, _isAlive) => {
      setPoints((_prev) => _prev.map((_point) => (_point.x === _x && _point.y === _y ? { ..._point, isAlive: _isAlive } : _point)));
      setGeneration(0);
      setStatus(STATUS.IDLE);
    },
    []
  );

  const clear = useCallback(() => edit(createPoints(_quantity)), [edit, _quantity]);

  const randomize = useCallback(() => edit(createPoints(_quantity).map((_point) => ({ ..._point, isAlive: Math.random() < 0.25 }))), [edit, _quantity]);

  const loadPattern = useCallback((_cells) => edit(createPoints(_quantity, new Set(_cells.map(pointKey)))), [edit, _quantity]);

  const restore = useCallback(() => {
    if (initialPointsRef.current) {
      edit(initialPointsRef.current);
    }
  }, [edit]);

  return {
    points,
    status,
    generation,
    population,
    isRunning,
    canRestore: initialPointsRef.current !== null && status !== STATUS.IDLE,
    start,
    stop,
    paint,
    clear,
    randomize,
    loadPattern,
    restore,
  };
}

export { useGame, STATUS };
