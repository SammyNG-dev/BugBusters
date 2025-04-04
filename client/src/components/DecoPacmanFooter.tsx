import { useEffect, useRef } from "react";
import "../components/DecoPacman.css";

function DecoPacmanFooter() {
  // Ref pour l'élément pacman et les dots, en utilisant le type correct HTMLDivElement
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

    // Lancer la vérification de collision avec une animation fluide
    const animate = () => {
      checkCollision();
      requestAnimationFrame(animate); // Continuer l'animation de manière fluide
    };

    // Commencer l'animation immédiatement
    animate();

    const resetDots = () => {
      for (const dot of dotElements as HTMLCollectionOf<HTMLElement>) {
        dot.classList.remove("disappeared");
      }
    };

    pacman.addEventListener("animationiteration", resetDots);

    // Nettoyer après que le composant est démonté
    return () => {
      pacman.removeEventListener("animationiteration", resetDots);
    };
  }, []); // Effet déclenché une seule fois lors du montage du composant

  return (
    <div className="footer-content-pacman">
      <div className="footer">
        <div
          ref={pacmanRef} // Pacman ref avec le bon type HTMLDivElement
          className="footer-pacman"
        >
          <img src="/public/assets/images/Pacman.png" alt="Pac-Man" />
        </div>

        <div ref={dotElementsRef}>
          {[...Array(50)].map((_, index) => (
            <div
              key={crypto.randomUUID()}
              className="footer-dot"
              style={{ "--dot-index": index + 1 } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DecoPacmanFooter;
