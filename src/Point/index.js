import './Point.css';

function Point({ x, y, isAlive, points, setPoints, started }) {
  const STYLE = isAlive ? 'grid-item is-alive' : 'grid-item';

  const onLiveCell = () => {
    const NEW_POINTS = points.map((_point) => {
      if (_point.x == x && _point.y == y && !started) {
        _point.isAlive = !isAlive;
      }
      return _point;
    });

    setPoints(NEW_POINTS);
  };

  return <div className={STYLE} onClick={onLiveCell}></div>;
}

export { Point };
