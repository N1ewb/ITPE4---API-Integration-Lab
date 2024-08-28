import { Link } from "react-router-dom";
import { GenshinCharacter } from "../../lib/types";
import "./GenshinCharacterCards.css";

interface GenshinCharacterCardsProps {
  character: GenshinCharacter;
}

const GenshinCharacterCards = ({ character }: GenshinCharacterCardsProps) => {
  return (
    <div className="genshin-character-cards-container">
      <Link to={`/GenshinPage/${character.id}`}>
        <div className="genshin-character-header">
          <img src={character.icon.url} />
          <p>{character._nameId}</p>
        </div>
      </Link>
    </div>
  );
};

export default GenshinCharacterCards;
