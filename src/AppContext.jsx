import React, { useEffect } from "react";
import { ATTRIBUTE_LIST, GitHubUsername, SKILL_LIST } from "./consts";
import axiosInstance from "./api/axiosInstance";

const AppContext = React.createContext(null);

export default AppContext;

export const attributeListInitial = () => {
  return ATTRIBUTE_LIST.reduce((acc, curr) => {
    acc[curr] = 10;
    return acc;
  }, {});
};

export const skillListInitial = () => {
  return SKILL_LIST.reduce((acc, curr) => {
    acc[curr.name] = 0;
    return acc;
  }, {});
};

export const AppContextProvider = ({ children }) => {
  const [characters, setCharacters] = React.useState(["character1"]);

  const [characterAttributes, setCharacterAttributes] = React.useState({});

  const [characterSkills, setCharacterSkills] = React.useState({});

  useEffect(() => {
    const charAttributes = characters.reduce((acc, curr) => {
      acc[curr] = attributeListInitial();
      return acc;
    }, {});
    setCharacterAttributes(charAttributes);

    const charSkills = characters.reduce((acc, curr) => {
      acc[curr] = skillListInitial();
      return acc;
    }, {});
    setCharacterSkills(charSkills);
  }, []);

  const getSavedData = async () => {
    const response = await axiosInstance.get(`{${GitHubUsername}}/character`);

    if (response.data.body) {
      const {
        characters: charactersResp,
        characterAttributes: characterAttributesResp,
        characterSkills: characterSkillsResp,
      } = response.data.body;
      setCharacters(charactersResp);
      setCharacterAttributes(characterAttributesResp);
      setCharacterSkills(characterSkillsResp);
    }
  };
  useEffect(() => {
    getSavedData();
  }, []);

  console.log({ characters, characterAttributes, characterSkills });

  return (
    <AppContext.Provider
      value={{
        characters,
        setCharacters,
        characterAttributes,
        setCharacterAttributes,
        characterSkills,
        setCharacterSkills,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
