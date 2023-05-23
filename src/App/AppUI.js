import { useState } from 'react';
import { Grid } from '../Grid';
import { Point } from '../Point';
import { Start } from '../Start';
import socket from '../socket';

function AppUI() {
  const QUANTITY_GRID = 20;
  const POINTS = [];
  // Determina si ya empezo el juego
  const [started, setStarted] = useState(false);
  for (let y = QUANTITY_GRID; y >= -QUANTITY_GRID; y--) {
    for (let x = -QUANTITY_GRID; x <= QUANTITY_GRID; x++) {
      POINTS.push({ x: x, y: y, isAlive: false });
    }
  }

  const [points, setPoints] = useState(POINTS);

  socket.on('change', (_points) => {
    setPoints(_points.data);
  });

  return (
    <>
      <Grid>
        {points.map((_point) => (
          <Point key={`${_point.x},${_point.y}`} x={_point.x} y={_point.y} isAlive={_point.isAlive} points={points} setPoints={setPoints} started={started} />
        ))}
      </Grid>
      {!started && <Start started={started} setStarted={setStarted} points={points} />}
    </>
  );
}

export { AppUI };
