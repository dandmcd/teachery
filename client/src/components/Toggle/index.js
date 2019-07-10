import React, { useState } from "react";
import AddDeckTag from "../FlashCards/Decks/DeckItem/AddDeckTag";

const Toggle = ({ deck }) => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      {!isOn && (
        <button type="button" onClick={() => setIsOn(true)}>
          Add Tags
        </button>
      )}

      {isOn && <AddDeckTag deck={deck} />}
    </div>
  );
};

export default Toggle;
