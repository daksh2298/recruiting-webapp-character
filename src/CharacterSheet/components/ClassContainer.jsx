import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px 20px 20px;
  border: 1px solid whitesmoke;
  border-radius: 10px;
  gap: 12px;
  min-width: 175px;

  .class-name {
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
  }

  .class-name.qualified {
    color: #09c709;
  }

  .class-requirements {
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;
