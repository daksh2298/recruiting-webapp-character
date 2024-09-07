import React, { useState } from "react";
import { ATTRIBUTE_LIST } from "../consts.js";
import styled from "styled-components";
import { AttributeItem, AttributesContainer } from "./components";

const attributeListInitial = () => {
  return ATTRIBUTE_LIST.reduce((acc, curr) => {
    acc[curr] = 10;
    return acc;
  }, {});
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px;
`;

const CharacterSheetWrapper = () => {
  const [attributes, setAttributes] = useState(attributeListInitial);

  const handleAttributeIncreaseCurry = (attributeName) => () => {
    setAttributes((prevAttributes) => {
      return {
        ...prevAttributes,
        [attributeName]: prevAttributes[attributeName] + 1,
      };
    });
  };

  const handleAttributeDecreaseCurry = (attributeName) => () => {
    setAttributes((prevAttributes) => {
      return {
        ...prevAttributes,
        [attributeName]: prevAttributes[attributeName] - 1,
      };
    });
  };

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
              onIncrease={handleAttributeIncreaseCurry(attribute)}
              onDecrease={handleAttributeDecreaseCurry(attribute)}
            />
          );
        })}
      </AttributesContainer>
    </Wrapper>
  );
};

export default CharacterSheetWrapper;
