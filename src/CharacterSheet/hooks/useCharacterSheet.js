import useAppContext from "../../hooks/useAppContext";
import { useMemo } from "react";
import { CLASS_LIST } from "../../consts";

const BaseSkillPointsToSpend = 10;

export function useCharacterSheet(character) {
  const {
    characterAttributes,
    characterSkills,
    handleUpdateCharacterAttribute,
    handleUpdateCharacterSkill,
  } = useAppContext();

  const attributes = characterAttributes[character] || {};
  const skills = characterSkills[character] || {};
  const classes = Object.keys(CLASS_LIST);

  const updateAttribute = (attribute, value) => {
    handleUpdateCharacterAttribute(character, attribute, value);
  };

  const updateSkill = (skill, value) => {
    handleUpdateCharacterSkill(character, skill, value);
  };

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
