import React, { useState } from "react";
import AddDeckTag from "../FlashCards/Decks/DeckItem/AddDeckTag";

export default function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      {!isOn && (
        <button type="button" onClick={() => setIsOn(true)}>
          Add Tags
        </button>
      )}

      {isOn && <AddDeckTag />}
    </div>
  );
}
