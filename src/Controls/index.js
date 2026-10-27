import { PATTERNS, patternToCells } from '../services/patterns.service';
import './Controls.css';

function Controls({ isRunning, population, canRestore, onStart, onStop, onRestore, onRandomize, onClear, onLoadPattern }) {
  return (
    <aside className="controls">
      <section className="panel">
        {isRunning ? (
          <button className="btn btn-block btn-danger" onClick={onStop}>
            Detener
          </button>
        ) : (
          <button className="btn btn-block btn-primary" onClick={onStart} disabled={population === 0}>
            Iniciar juego
          </button>
        )}

        <div className="btn-row">
          <button className="btn" onClick={onRandomize} disabled={isRunning}>
            Aleatorio
          </button>
          <button className="btn" onClick={onClear} disabled={isRunning || population === 0}>
            Limpiar
          </button>
        </div>
        <button className="btn btn-block" onClick={onRestore} disabled={isRunning || !canRestore}>
          Restaurar configuración inicial
        </button>
      </section>

      <section className="panel">
        <h2 className="panel-title">Patrones</h2>
        <div className="pattern-list">
          {PATTERNS.map((_pattern) => (
            <button key={_pattern.name} className="btn btn-ghost" onClick={() => onLoadPattern(patternToCells(_pattern))} disabled={isRunning}>
              {_pattern.name}
            </button>
          ))}
        </div>
      </section>

      <section className="panel panel-help">
        <h2 className="panel-title">Cómo jugar</h2>
        <p>Haz clic o arrastra sobre el tablero para dar vida a las células, luego inicia el juego.</p>
        <ul>
          <li>Una célula viva con 2 o 3 vecinas sobrevive.</li>
          <li>Una célula muerta con exactamente 3 vecinas nace.</li>
          <li>El resto muere o sigue muerta.</li>
        </ul>
        <p>
          <kbd>Espacio</kbd> inicia o detiene el juego.
        </p>
      </section>
    </aside>
  );
}

export { Controls };
