import { Link, useParams } from "react-router-dom";
import "./CharacterDetailPage.css";
import { useEffect, useState } from "react";
import { getGenshinCharacterByID } from "../../../actions/get/getGenshinData";
import Back from "../../../assets/previous.png";
import Loader from "../../../components/Loader/Loader";
import { GenshinCharacter } from "../../../lib/types";

const CharacterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string | any }>();
  const [character, setCharacter] = useState<GenshinCharacter | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleGetGenshinCharacters = async (id: string) => {
      setIsLoading(true);
      try {
        if (id) {
          const characters = await getGenshinCharacterByID(id);
          setCharacter(characters);
        }
      } catch (error: Error | any) {
        if (error instanceof Error) {
          console.log(`Error in retreiving characters: ${error.message}`);
        } else {
          console.log("Error is unknown");
        }
      } finally {
        setIsLoading(false);
      }
    };
    handleGetGenshinCharacters(id);
  }, []);

  if (!character) {
    return (
      <div>
        <Link to="/GenshinPage">Back</Link>Character not found
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="character-detail-container">
      <div className="back-button">
        <Link to="/GenshinPage">
          <img src={Back} alt="back-icon" />
        </Link>
      </div>
      <div className="character-detail-header">
        <div className="character-name">
          <h3>{character._nameId}</h3>
        </div>
      </div>
      <div
        className="character-detail-overview"
        style={{
          backgroundImage: `url(${character.details.constellationIcon.url})`,
        }}
      >
        <img src={character.splashImage.url} />
      </div>
      <div className="character-skill"></div>
    </div>
  );
};

export default CharacterDetailPage;
