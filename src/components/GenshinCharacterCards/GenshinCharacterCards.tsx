import { GenshinCharacter } from "../../lib/types";
import "./GenshinCharacterCards.css";

interface GenshinCharacterCardsProps {
  character: GenshinCharacter;
}

const GenshinCharacterCards = ({ character }: GenshinCharacterCardsProps) => {
  return (
    <div className="genshin-character-cards-container">
      <div className="genshin-character-header">
        <img src={character.icon.url} />
        <p>{character._nameId}</p>
      </div>
    </div>
  );
};

export default GenshinCharacterCards;
