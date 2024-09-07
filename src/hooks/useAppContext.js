import { useContext } from "react";
import AppContext, {
  attributeListInitial,
  skillListInitial,
} from "../AppContext";
import axiosInstance from "../api/axiosInstance";
import { GitHubUsername } from "../consts";

export default function useAppContext() {
  const {
    characters,
    characterAttributes,
    setCharacterAttributes,
    characterSkills,
    setCharacterSkills,
    setCharacters,
  } = useContext(AppContext);

  const handleUpdateCharacterAttribute = (character, attribute, value) => {
    setCharacterAttributes({
      ...characterAttributes,
      [character]: {
        ...characterAttributes[character],
        [attribute]: value,
      },
    });
  };

  const handleUpdateCharacterSkill = (character, skill, value) => {
    setCharacterSkills({
      ...characterSkills,
      [character]: {
        ...characterSkills[character],
        [skill]: value,
      },
    });
  };

  const handleSaveAllData = async () => {
    const data = {
      characters,
      characterAttributes,
      characterSkills,
    };
    const requestEndpoint = `{${GitHubUsername}}/character`;
    try {
      const resp = await axiosInstance.post(requestEndpoint, data);
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
    handleUpdateCharacterAttribute,
    handleUpdateCharacterSkill,
    handleSaveAllData,
  };
}
