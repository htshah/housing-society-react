import styled from "styled-components";

export const BannerImage = styled.img`
  width: ${props => (props.width !== undefined ? props.width : "100%")};
`;

export const IconImage = styled.img`
  width: 50%;
`;
