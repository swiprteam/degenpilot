import styled from "styled-components";
import { useState } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import { TokenInterface } from "~/types/interfaces";
import Header from "./Header";
import Score from "./Score";
import Swap from "./Swap";

type Props = {
  token: TokenInterface;
};

const TokenCard = ({ token }: Props) => {
  const [gone, setGone] = useState(false); // Pour empêcher le retour du token après un swipe

  const [{ x }, api] = useSpring(() => ({
    x: 0, // Position initiale à 0
  }));

  const bind = useDrag(
    ({ down, movement: [mx], velocity }) => {
      // Si on a "swipé" avec une grande vélocité et qu'on n'est plus en train de "drag"
      if (!down && velocity > 0.5) {
        // Si le mouvement est vers la droite, on déclenche un événement spécifique
        if (mx > 0) {
          handleSwipeRight();
        } else {
          handleSwipeLeft();
        }

        // Après un swipe, on fait en sorte que la carte disparaisse
        setGone(true);
        api.start({ x: mx > 0 ? 1000 : -1000 }); // Vers la droite ou gauche
      } else {
        // Si on n'a pas encore swipé, on suit le mouvement
        api.start({ x: down ? mx : 0 });
      }
    },
    { axis: "x" } // On limite le swipe uniquement sur l'axe horizontal
  );

  const handleSwipeLeft = () => {
    console.log("Swiped left");
    // Ajouter l'événement spécifique pour un swipe à gauche
  };

  const handleSwipeRight = () => {
    console.log("Swiped right");
    // Ajouter l'événement spécifique pour un swipe à droite
  };

  return (
    <animated.div
      {...bind()}
      style={{
        x, // On utilise la position animée
        display: gone ? "none" : "block", // On cache la carte après le swipe
      }}
    >
      <StyledTokenCard className="mt-4 flex flex-col overflow-hidden">
        <Header token={token} />
        <Score token={token} />
        <Swap token={token} />
      </StyledTokenCard>
    </animated.div>
  );
};

const StyledTokenCard = styled.div`
  background: #0c284a;
  touch-action: none; /* Désactive le comportement par défaut du navigateur pour drag & drop */
`;

export default TokenCard;
