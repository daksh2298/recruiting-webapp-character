import { useContext } from "react";
import AppContext from "../AppContext";

export default function useAppContext() {
  const {
    characters,
    characterAttributes,
    setCharacterAttributes,
    characterSkills,
    setCharacterSkills,
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

  return {
    characters,
    characterAttributes,
    characterSkills,
    handleUpdateCharacterAttribute,
    handleUpdateCharacterSkill,
  };
}
