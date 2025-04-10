import { useEffect, useRef } from "react";
import "../components/DecoPacman.css";

// Fonction pour générer un UUID v4 compatible
function generateUUID() {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = ((dt + crypto.getRandomValues(new Uint8Array(1))[0]) % 16) | 0;
    dt = Math.floor(dt / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

function DecoPacmanHeader() {
  const pacmanRef = useRef<HTMLDivElement | null>(null);
  const dotElementsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const pacman = pacmanRef.current;
    const dotElements = dotElementsRef.current?.children;

    if (!pacman || !dotElements) return;

    // Fonction de collision entre Pacman et les dots
    const checkCollision = () => {
      for (const dot of dotElements as HTMLCollectionOf<HTMLElement>) {
        const pacmanRect = pacman.getBoundingClientRect();
        const dotRect = dot.getBoundingClientRect();

        if (
          pacmanRect.right > dotRect.left &&
          pacmanRect.left < dotRect.right &&
          pacmanRect.bottom > dotRect.top &&
          pacmanRect.top < dotRect.bottom
        ) {
          dot.classList.add("disappeared");
        }
      }
    };

    // Animation fluide : vérifie la collision à chaque frame
    const animate = () => {
      checkCollision();
      requestAnimationFrame(animate);
    };

    animate();

    const resetDots = () => {
      for (const dot of dotElements as HTMLCollectionOf<HTMLElement>) {
        dot.classList.remove("disappeared");
      }
    };

    pacman.addEventListener("animationiteration", resetDots);

    return () => {
      pacman.removeEventListener("animationiteration", resetDots);
    };
  }, []);

  return (
    <div className="header-content-pacman">
      <div className="header">
        <div ref={pacmanRef} className="header-pacman">
          <img src="/public/assets/images/Pacman.png" alt="Pac-Man" />
        </div>

        <div ref={dotElementsRef}>
          {[...Array(50)].map((_, index) => (
            <div
              key={generateUUID()}
              className="header-dot"
              style={{ "--dot-index": index + 1 } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DecoPacmanHeader;
