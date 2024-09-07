import React, { useEffect } from "react";
import { ATTRIBUTE_LIST, GitHubUsername, SKILL_LIST } from "./consts";
import axiosInstance from "./api/axiosInstance";

const AppContext = React.createContext(null);

export default AppContext;

export const InitialAttributeValue = 10;
export const InitialSkillValue = 0;

// The initial values for the character attributes are set to 10.
export const attributeListInitial = () => {
  return ATTRIBUTE_LIST.reduce((acc, curr) => {
    acc[curr] = InitialAttributeValue;
    return acc;
  }, {});
};

// The initial values for the character skills are set to 0.
export const skillListInitial = () => {
  return SKILL_LIST.reduce((acc, curr) => {
    acc[curr.name] = InitialSkillValue;
    return acc;
  }, {});
};

/*
AppContextProvider holds the states for characters, characterAttributes (character -> attributes), and characterSkills (character -> skills).
It also fetches the saved data from the server and updates the states accordingly.
*/
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
