import styled from "styled-components";

export const PageWrapper = styled.div`
  overflow-y: auto;
  padding: ${props => (props.spacing || 32) / 2 + "px"};
  ${props => props.minHeight !== false && "min-height: 100vh;"}
`;
