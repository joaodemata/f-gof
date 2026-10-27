import { STATUS } from '../App/useGame';
import './Stats.css';

const STATUS_LABEL = {
  [STATUS.IDLE]: 'Editando',
  [STATUS.RUNNING]: 'En ejecución',
  [STATUS.STOPPED]: 'Detenido',
  [STATUS.FINISHED]: 'Finalizado',
  [STATUS.ERROR]: 'Sin conexión',
};

function Stats({ status, generation, population }) {
  return (
    <dl className="stats">
      <div className="stat">
        <dt>Generación</dt>
        <dd>{generation}</dd>
      </div>
      <div className="stat">
        <dt>Población</dt>
        <dd>{population}</dd>
      </div>
      <div className="stat">
        <dt>Estado</dt>
        <dd>
          <span className={`status-pill status-${status}`}>{STATUS_LABEL[status]}</span>
        </dd>
      </div>
    </dl>
  );
}

export { Stats };
