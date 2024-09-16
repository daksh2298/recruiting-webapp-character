import { useCallback, useMemo } from "react";
import { CLASS_LIST } from "../../consts";
import { useContextSelector } from "use-context-selector";
import AppContext from "../../AppContext";

const BaseSkillPointsToSpend = 10;

const classes = Object.keys(CLASS_LIST);

export function useCharacterAttributes(character) {
  const characterAttributes = useContextSelector(
    AppContext,
    (v) => v.characterAttributes
  );

  const setCharacterAttributes = useContextSelector(
    AppContext,
    (v) => v.setCharacterAttributes
  );

  const attributes = useMemo(
    () => characterAttributes[character] || {},
    [characterAttributes, character]
  );

  const updateAttribute = useCallback(
    (attribute, value) => {
      setCharacterAttributes((prev) => ({
        ...prev,
        [character]: {
          ...prev[character],
          [attribute]: value,
        },
      }));
    },
    [character]
  );

  const attributeModifiers = useMemo(() => {
    return Object.keys(attributes).reduce((acc, curr) => {
      acc[curr] = Math.floor((attributes[curr] - 10) / 2);
      return acc;
    }, {});
  }, [attributes, character]);

  const qualifiedClassesMap = useMemo(() => {
    return classes.reduce((acc, classType) => {
      acc[classType] = Object.keys(CLASS_LIST[classType]).every(
        (attribute) => attributes[attribute] >= CLASS_LIST[classType][attribute]
      );
      return acc;
    }, {});
  }, [classes, attributes]);

  return {
    attributes,
    updateAttribute,
    attributeModifiers,
    qualifiedClassesMap,
  };
}

// This hook is used to perform character specific operations, such as updating attributes and skills.
export function useCharacterSheet(character) {
  const characterAttributes = useContextSelector(
    AppContext,
    (v) => v.characterAttributes
  );

  const setCharacterAttributes = useContextSelector(
    AppContext,
    (v) => v.setCharacterAttributes
  );

  const characterSkills = useContextSelector(
    AppContext,
    (v) => v.characterSkills
  );

  const setCharacterSkills = useContextSelector(
    AppContext,
    (v) => v.setCharacterSkills
  );

  const attributes = useMemo(
    () => characterAttributes[character] || {},
    [characterAttributes, character]
  );

  const skills = useMemo(
    () => characterSkills[character] || {},
    [characterSkills, character]
  );

  const updateAttribute = useCallback(
    (attribute, value) => {
      setCharacterAttributes((prev) => ({
        ...prev,
        [character]: {
          ...prev[character],
          [attribute]: value,
        },
      }));
    },
    [character]
  );

  const updateSkill = useCallback(
    (skill, value) => {
      setCharacterSkills((prev) => ({
        ...prev,
        [character]: {
          ...prev[character],
          [skill]: value,
        },
      }));
    },
    [character]
  );

  const attributeModifiers = useMemo(() => {
    return Object.keys(attributes).reduce((acc, curr) => {
      acc[curr] = Math.floor((attributes[curr] - 10) / 2);
      return acc;
    }, {});
  }, [attributes, character]);

  const qualifiedClassesMap = useMemo(() => {
    return classes.reduce((acc, classType) => {
      acc[classType] = Object.keys(CLASS_LIST[classType]).every(
        (attribute) => attributes[attribute] >= CLASS_LIST[classType][attribute]
      );
      return acc;
    }, {});
  }, [classes, attributes]);

  const intelligenceModifier = attributeModifiers["Intelligence"] || 0;

  const availableSkillPoints = useMemo(() => {
    return BaseSkillPointsToSpend + 4 * intelligenceModifier;
  }, [intelligenceModifier]);

  return {
    attributes,
    skills,
    attributeModifiers,
    qualifiedClassesMap,
    updateAttribute,
    updateSkill,
    availableSkillPoints,
  };
}
