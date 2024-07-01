import styled from "styled-components";

interface PageTitleProps {
  children: React.ReactNode
}

const Title = styled.h1`
  font-size: var(--text-lg);
  line-height: var(--leading-lg);
  font-family: var(--nunito-sans);
  font-weight: 700;
  color: var(--text-white);
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  font-size: var(--text-md);
  line-height: var(--leading-md);
  font-family: var(--nunito-sans);
  font-weight: 400;
  color: var(--text-gray-200);
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const PageTitle = ({ children } : PageTitleProps) => {
  return <Title>{children}</Title>;
};

PageTitle.Sub = ({children} : PageTitleProps) => {
  return <Subtitle>{children}</Subtitle>;
}
