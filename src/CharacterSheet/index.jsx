import React from "react";
import styled from "styled-components";
import Attributes from "./Attributes";
import Classes from "./Classes";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
  padding: 20px;
`;

const CharacterSheetWrapper = ({ character }) => {
  return (
    <Wrapper>
      <Attributes character={character} />
      <Classes character={character} />
    </Wrapper>
  );
};

export default CharacterSheetWrapper;
