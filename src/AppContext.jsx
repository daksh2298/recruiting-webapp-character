import React, { useEffect } from "react";
import { ATTRIBUTE_LIST, SKILL_LIST } from "./consts";

const AppContext = React.createContext(null);

export default AppContext;

const attributeListInitial = () => {
  return ATTRIBUTE_LIST.reduce((acc, curr) => {
    acc[curr] = 10;
    return acc;
  }, {});
};

const skillListInitial = () => {
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

  console.log({ characters, characterAttributes, characterSkills });

  return (
    <AppContext.Provider
      value={{
        characters,
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
