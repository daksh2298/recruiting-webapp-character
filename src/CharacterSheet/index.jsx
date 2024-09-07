import React from "react";
import styled from "styled-components";
import Attributes from "./Attributes";
import Classes from "./Classes";
import Skills from "./Skills";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const CharacterSheetWrapper = ({ character }) => {
  return (
    <Wrapper>
      <Attributes character={character} />
      <Classes character={character} />
      <Skills character={character} />
    </Wrapper>
  );
};

export default CharacterSheetWrapper;
