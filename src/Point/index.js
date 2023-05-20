import './Point.css';

function Point({ isAlive }) {
  console.log({ isAlive });
  const STYLE = isAlive ? 'grid-item is-alive' : 'grid-item';
  return <div className={STYLE}>.</div>;
}

export { Point };
