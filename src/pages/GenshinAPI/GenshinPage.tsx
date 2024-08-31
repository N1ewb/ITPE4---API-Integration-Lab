import { useEffect, useState } from "react";
import "./GenshinPage.css";
import { GenshinCharacter } from "../../lib/types";
import { getGenshinCharacter } from "../../actions/api/get/getGenshinData";
import GenshinCharacterCards from "../../components/GenshinCharacterCards/GenshinCharacterCards";
import Loader from "../../components/Loader/Loader";
import GenshinLogo from "../../assets/Genshin-Impact-Logo-.webp";

const ITEMS_PER_PAGE = 27;

const GenshinPage = () => {
  const [genshinCharacters, setGenshinCharacters] = useState<
    GenshinCharacter[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [temp, setTemp] = useState<GenshinCharacter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleSearchCharacter = (searchQuery: string) => {
      setIsLoading(true);
      setGenshinCharacters(temp);
      setCurrentPage(1);
      try {
        const searchedCharacter = temp.filter((character: GenshinCharacter) =>
          character._nameId.toLowerCase().includes(searchQuery)
        );
        setGenshinCharacters(searchedCharacter);
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
    handleSearchCharacter(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handleGetGenshinCharacters = async () => {
      setIsLoading(true);
      try {
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
        setTemp(uniqueCharacters);
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="genshin-page-container">
      <div className="genshin-page-header">
        <img src={GenshinLogo} alt="genshin-logo" />
        <input
          name="search"
          type="text"
          placeholder="Search characters..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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
