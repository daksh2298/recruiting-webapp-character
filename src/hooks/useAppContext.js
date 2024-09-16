import AppContext, {
  attributeListInitial,
  skillListInitial,
} from "../AppContext";
import axiosInstance from "../api/axiosInstance";
import { GitHubUsername } from "../consts";
import { useContextSelector } from "use-context-selector";

// This hooks contains functions to save all data, add a new character, and
// generic functions to update the character attributes and skills.
export default function useAppContext() {
  const characters = useContextSelector(AppContext, (v) => v.characters);
  const characterAttributes = useContextSelector(
    AppContext,
    (v) => v.characterAttributes
  );
  const characterSkills = useContextSelector(
    AppContext,
    (v) => v.characterSkills
  );

  const setCharacterAttributes = useContextSelector(
    AppContext,
    (v) => v.setCharacterAttributes
  );

  const setCharacterSkills = useContextSelector(
    AppContext,
    (v) => v.setCharacterSkills
  );

  const setCharacters = useContextSelector(AppContext, (v) => v.setCharacters);

  const handleSaveAllData = async () => {
    const data = {
      characters,
      characterAttributes,
      characterSkills,
    };
    const requestEndpoint = `{${GitHubUsername}}/character`;
    try {
      await axiosInstance.post(requestEndpoint, data);
      alert("Data saved successfully");
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  const addCharacter = () => {
    const newCharacter = `character${characters.length + 1}`;
    setCharacters([...characters, newCharacter]);

    setCharacterAttributes({
      ...characterAttributes,
      [newCharacter]: attributeListInitial(),
    });

    setCharacterSkills({
      ...characterSkills,
      [newCharacter]: skillListInitial(),
    });
  };

  return {
    addCharacter,
    characters,
    characterAttributes,
    characterSkills,
    handleSaveAllData,
  };
}
