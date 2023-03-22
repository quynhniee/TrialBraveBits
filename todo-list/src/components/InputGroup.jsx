import styled from "styled-components";

const InputGroup = styled.div`
  display: flex;
  overflow: hidden;
  align-items: stretch;
  width: 100%;
  & > :not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  & > :not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export default InputGroup;
