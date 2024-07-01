import styled from "styled-components"

interface ContainerProps {
  children: React.ReactNode;
}


const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  max-width: 1100px;

  @media (max-width: 1200px) {
    max-width: 900px;
  }

  @media (max-width: 1024px) {
    max-width: 800px;
  }

  @media (max-width: 768px) {
    max-width: 480px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 0 1rem;
  }
`;

export const Wrapper = ({children} : ContainerProps) => {
  return (
    <Container>{children}</Container>
  )
}