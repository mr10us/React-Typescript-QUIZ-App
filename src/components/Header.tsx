import { ReactNode } from "react";
import { ProgressBar } from "./UI/ProgressBar";
import styled from "styled-components";
import { Wrapper } from "./Wrapper";

interface HeaderContentProps {
  children: ReactNode;
}

interface SpanProps {
  color: string;
}

const HeaderContent = styled.div<HeaderContentProps>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 1rem;
  padding: 1rem 0;
`;

const HeaderTitle = styled.div<HeaderContentProps>`
  text-align: center;
  font-size: var(--text-lg);
  font-weight: 500;
  font-family: var(--albert-sans);
`;

const ColoredSpan = styled.span<SpanProps>`
  color: ${({ color }) =>
    color === "pink" ? "var(--text-pink)" : "var(--text-white)"};
  font-weight: 800;
`;

const BackBtnContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-left: 2rem;

`;

export const Header = ({
  title,
  backBtn,
}: {
  title: string;
  backBtn: ReactNode;
}) => {
  const hasBackBtn = !!backBtn;

  const [currentStage, stages] = title.split("/").filter(Boolean).map(Number);

  return (
    <header style={{ margin: "1rem 0" }}>
      <HeaderContent>
        <BackBtnContainer>{hasBackBtn ? backBtn : null}</BackBtnContainer>
        <HeaderTitle>
          <ColoredSpan color="pink">{currentStage}</ColoredSpan>/
          <ColoredSpan color="white">{stages}</ColoredSpan>
        </HeaderTitle>
      </HeaderContent>
      <ProgressBar current={currentStage} count={stages} />
    </header>
  );
};
