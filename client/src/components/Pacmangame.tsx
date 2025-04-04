import { useEffect, useState } from "react";
import { render } from "react-dom";
import Pacman from "./Pacman";

function PacmanGame() {
  const [gameKey, setGameKey] = useState(0); // Clé unique pour relancer le jeu

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "KeyR") {
        setGameKey((prevKey) => prevKey + 1); // Change la clé pour forcer un nouveau rendu
      }
    };

    let animationId: number;
    const handleGamepadInput = () => {
      const gamepads = navigator.getGamepads();
      const gamepad = gamepads[0];

      if (gamepad) {
        const { buttons } = gamepad;

        if (buttons[12].pressed) {
          window.dispatchEvent(
            new KeyboardEvent("keydown", { key: "ArrowUp" }),
          );
        }
        if (buttons[13].pressed) {
          window.dispatchEvent(
            new KeyboardEvent("keydown", { key: "ArrowDown" }),
          );
        }
        if (buttons[14].pressed) {
          window.dispatchEvent(
            new KeyboardEvent("keydown", { key: "ArrowLeft" }),
          );
        }
        if (buttons[15].pressed) {
          window.dispatchEvent(
            new KeyboardEvent("keydown", { key: "ArrowRight" }),
          );
        }
        if (buttons[9].pressed) {
          // Bouton Start
          setGameKey((prevKey) => prevKey + 1); // Change la clé pour forcer un nouveau rendu
        }
      }

      animationId = requestAnimationFrame(handleGamepadInput);
    };

    window.addEventListener("keydown", handleKeyDown);
    animationId = requestAnimationFrame(handleGamepadInput);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="pacman-game">
      <Pacman
        key={gameKey}
        moveUp="z"
        moveDown="s"
        moveLeft="q"
        moveRight="d"
      />
    </div>
  );
}

render(<PacmanGame />, document.getElementById("root"));

export default PacmanGame;
