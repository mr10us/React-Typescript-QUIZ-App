import styled from "styled-components";

const NotFoundDiv = styled.div`
  font-family: var(--nunito-sans);
  font-size: var(--text-2xl);
  color: var(--text-white);
  font-size: var(--text-2xl);
  line-height: var(--leading-2xl);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: var(--bg-primary);
`;

export const NotFound = () => {
  return <NotFoundDiv>Page Not Found</NotFoundDiv>;
};
