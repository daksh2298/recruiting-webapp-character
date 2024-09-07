import React, { useState } from "react";
import { ATTRIBUTE_LIST, CLASS_LIST } from "../consts.js";
import styled from "styled-components";
import {
  AttributeItem,
  AttributesContainer,
  ClassContainer,
} from "./components";
import { useCharacterSheet } from "./hooks/useCharacterSheet";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
  padding: 20px;
`;

const CharacterSheetWrapper = ({ character }) => {
  const {
    attributes,
    skills,
    attributeModifiers,
    updateAttribute,
    updateSkill,
    qualifiedClassesMap,
  } = useCharacterSheet(character);

  const classes = Object.keys(CLASS_LIST);
  const [activeClassRequirements, setActiveClassRequirements] = useState("");

  const handleAttributeIncreaseCurry = (attributeName) => () => {
    updateAttribute(attributeName, attributes[attributeName] + 1);
  };

  const handleAttributeDecreaseCurry = (attributeName) => () => {
    updateAttribute(attributeName, attributes[attributeName] - 1);
  };

  const handleClassClickCurry = (classType) => () => {
    setActiveClassRequirements(classType);
  };

  const handleCloseClassRequirements = () => {
    setActiveClassRequirements("");
  };

  console.log("qualifiedClassesMap", qualifiedClassesMap);

  return (
    <Wrapper>
      <AttributesContainer>
        <h2>Attributes</h2>
        {ATTRIBUTE_LIST.map((attribute) => {
          return (
            <AttributeItem
              key={attribute}
              name={attribute}
              value={attributes[attribute]}
              modifier={attributeModifiers[attribute]}
              onIncrease={handleAttributeIncreaseCurry(attribute)}
              onDecrease={handleAttributeDecreaseCurry(attribute)}
            />
          );
        })}
      </AttributesContainer>
      <ClassContainer>
        <h2>Classes</h2>
        {classes.map((classType) => {
          return (
            <>
              <div key={classType}>
                <span
                  className={`class-name ${
                    qualifiedClassesMap[classType] ? "qualified" : ""
                  }`}
                  onClick={handleClassClickCurry(classType)}
                >
                  {classType}
                </span>
              </div>
              {activeClassRequirements === classType && (
                <div className={"class-requirements"}>
                  {Object.keys(CLASS_LIST[classType]).map((attribute) => {
                    return (
                      <div key={attribute}>
                        {attribute}: {CLASS_LIST[classType][attribute]}
                      </div>
                    );
                  })}
                  <button onClick={handleCloseClassRequirements}>
                    Close requirements
                  </button>
                </div>
              )}
            </>
          );
        })}
      </ClassContainer>
    </Wrapper>
  );
};

export default CharacterSheetWrapper;
