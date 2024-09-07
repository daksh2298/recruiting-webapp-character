import React from "react";
import styled from "styled-components";

const AttributeItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;

  .controls {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
`;

const AttributeItem = ({ name, value, modifier, onIncrease, onDecrease }) => {
  return (
    <AttributeItemContainer>
      {name} (Modifier: {modifier})
      <div className={"controls"}>
        <button onClick={onDecrease}>-</button>
        {value}
        <button onClick={onIncrease}>+</button>
      </div>
    </AttributeItemContainer>
  );
};

export default AttributeItem;
