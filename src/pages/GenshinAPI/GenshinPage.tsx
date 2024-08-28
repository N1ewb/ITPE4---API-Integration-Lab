import { useEffect, useState } from "react";
import "./GenshinPage.css";
import { GenshinCharacter } from "../../lib/types";
import { getGenshinCharacter } from "../../actions/get/getGenshinData";
import GenshinCharacterCards from "../../components/GenshinCharacterCards/GenshinCharacterCards";

const ITEMS_PER_PAGE = 27;

const GenshinPage = () => {
  const [genshinCharacters, setGenshinCharacters] = useState<
    GenshinCharacter[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const handleGetGenshinCharacters = async () => {
      const characters = await getGenshinCharacter();

      const uniqueCharacters = Array.from(
        new Map(
          characters.map((character) => [
            character.details.characterId,
            character,
          ])
        ).values()
      );

      setGenshinCharacters(uniqueCharacters);
    };
    handleGetGenshinCharacters();
  }, []);

  const indexOfLastCharacter = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstCharacter = indexOfLastCharacter - ITEMS_PER_PAGE;
  const currentCharacters = genshinCharacters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(genshinCharacters.length / ITEMS_PER_PAGE);
  const paginationControls = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  ).map((page) => (
    <button
      key={page}
      onClick={() => handlePageChange(page)}
      className={`pagination-button ${page === currentPage ? "active" : ""}`}
    >
      {page}
    </button>
  ));

  return (
    <div className="genshin-page-container">
      <div className="genshin-page-header">
        <p>Genshin Impact</p>
        <input name="search" type="text" placeholder="Search characters..." />
      </div>
      <div className="genshin-page-content">
        <div className="genshin-page-chacraters">
          {currentCharacters.length !== 0 ? (
            currentCharacters.map((character: GenshinCharacter) => (
              <GenshinCharacterCards
                key={character.details.characterId}
                character={character}
              />
            ))
          ) : (
            <p>No characters Found</p>
          )}
        </div>
        <div className="pagination-controls">{paginationControls}</div>
      </div>
    </div>
  );
};

export default GenshinPage;
