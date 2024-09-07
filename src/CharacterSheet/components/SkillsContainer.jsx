import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  gap: 12px;
  align-items: flex-start;
  padding: 20px;
  border: 1px solid whitesmoke;
  border-radius: 10px;
  min-width: 175px;

  tr {
    text-align: left;
  }
  td {
    padding: 2px 5px;
    .controls {
      display: flex;
      flex-direction: row;
      gap: 5px;
    }
  }
`;
