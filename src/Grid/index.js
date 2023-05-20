import './Grid.css';

function Grid(props) {
  console.log(props);
  return <div className="grid-container">{props.children}</div>;
}

export { Grid };
