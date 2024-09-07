import React from "react";
import styled from "styled-components";
import Attributes from "./Attributes";
import Classes from "./Classes";
import Skills from "./Skills";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  .content {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
  }
  border: 1px solid whitesmoke;
  border-radius: 10px;
  margin: 20px;

  .character-header {
    font-size: 28px;
    font-weight: 800;
  }
`;

const CharacterSheetWrapper = ({ character }) => {
  return (
    <Wrapper>
      <span className={"character-header"}>{character}</span>
      <div className={"content"}>
        <Attributes character={character} />
        <Classes character={character} />
        <Skills character={character} />
      </div>
    </Wrapper>
  );
};

export default CharacterSheetWrapper;
