import { useEffect } from 'react';
import { Grid } from '../Grid';
import { Point } from '../Point';
import { Stats } from '../Stats';
import { Controls } from '../Controls';
import { useGame, STATUS } from './useGame';
import './App.css';

// Celdas hacia cada lado del origen: la grilla es de (2 * QUANTITY_GRID + 1) por lado
const QUANTITY_GRID = 20;

function AppUI() {
  const game = useGame(QUANTITY_GRID);
  const { points, status, isRunning, population, start, stop } = game;

  // Atajo de teclado: espacio inicia o detiene la partida
  useEffect(() => {
    const onKeyDown = (_event) => {
      if (_event.code !== 'Space' || ['BUTTON', 'INPUT', 'TEXTAREA'].includes(_event.target.tagName)) {
        return;
      }
      _event.preventDefault();
      if (isRunning) {
        stop();
      } else if (population > 0) {
        start();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isRunning, population, start, stop]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Juego de la vida</h1>
        <Stats status={status} generation={game.generation} population={population} />
      </header>

      {status === STATUS.ERROR && (
        <div className="app-alert" role="alert">
          No se pudo conectar con el servidor del juego. Verifica que c-gof esté corriendo en el puerto 4000.
        </div>
      )}

      <main className="app-main">
        <Grid size={QUANTITY_GRID * 2 + 1} editable={!isRunning} onPaint={game.paint}>
          {points.map((_point) => (
            <Point key={`${_point.x},${_point.y}`} x={_point.x} y={_point.y} isAlive={_point.isAlive} />
          ))}
        </Grid>

        <Controls
          isRunning={isRunning}
          population={population}
          canRestore={game.canRestore}
          onStart={start}
          onStop={stop}
          onRestore={game.restore}
          onRandomize={game.randomize}
          onClear={game.clear}
          onLoadPattern={game.loadPattern}
        />
      </main>
    </div>
  );
}

export { AppUI };
