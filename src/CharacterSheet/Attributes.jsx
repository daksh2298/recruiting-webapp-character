import React from "react";
import { useCharacterSheet } from "./hooks/useCharacterSheet";
import { ATTRIBUTE_LIST } from "../consts";
import { AttributeItem, AttributesContainer } from "./components";

const MAX_TOTAL_ATTRIBUTE_POINTS = 70;

const Attributes = ({ character }) => {
  const { attributes, attributeModifiers, updateAttribute } =
    useCharacterSheet(character);

  const totalAttributePoints = Object.values(attributes || {}).reduce(
    (acc, curr) => acc + curr,
    0
  );

  const handleAttributeIncreaseCurry = (attributeName) => () => {
    if (totalAttributePoints >= MAX_TOTAL_ATTRIBUTE_POINTS) {
      alert("A Character can have up to 70 Delegated Attribute Points.");
      return;
    }
    updateAttribute(attributeName, attributes[attributeName] + 1);
  };

  const handleAttributeDecreaseCurry = (attributeName) => () => {
    updateAttribute(attributeName, attributes[attributeName] - 1);
  };
  return (
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
  );
};

export default Attributes;
