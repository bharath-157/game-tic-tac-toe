import { useState } from "react";

export default function Player({ defaultName, symbol, isActive,onChangeName }) {
  const [updatedName, setName] = useState(defaultName);
  const [isEditing, setEditing] = useState(false);

  function clickEditName() {
    setEditing((editing) => !editing);
if(isEditing) {
  onChangeName(symbol,updatedName)
}

  }
  function changePlayerName(event) {
    setName(event.target.value);
  }

  let playerName = <span className="player-name">{updatedName}</span>;
  if (isEditing) {
    playerName = (
      <input value={updatedName} onChange={changePlayerName} required />
    );
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={clickEditName}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
