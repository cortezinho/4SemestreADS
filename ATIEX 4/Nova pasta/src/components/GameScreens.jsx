import React from "react";
import DialogueBox from "./DialogueBox";

function GameScreen({ currentDialogue, handleChoice }) {
    return (
        <div className="app-container">
            <DialogueBox
                text={currentDialogue.text}
                choices={currentDialogue.choices}
                onChoice={handleChoice}
            />
        </div>
    );
}

export default GameScreen;
