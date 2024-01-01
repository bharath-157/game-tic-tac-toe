export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((item) => (
        <li key={`${item.square.row}${item.square.col}`}>
          {item.player} selected {item.square.row},{item.square.col}
        </li>
      ))}
    </ol>
  );
}
