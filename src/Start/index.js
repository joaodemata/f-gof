import './Start.css';
import socket from '../socket';
import { emitGameService } from '../services/util.service';

function Start({ setStarted, points }) {
  return (
    <button
      onClick={() => {
        setStarted(true);
        socket.connect();
        emitGameService(points);
      }}
    >
      Iniciar juego
    </button>
  );
}

export { Start };
