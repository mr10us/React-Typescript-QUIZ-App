import styled from "styled-components";

const BarContainer = styled.div`
  width: 100%;
  height: 3px;
  background-color: var(--bg-white);
  border-radius: 3px;
  position: relative;
`;

const Bar = styled.div<{percentage: number}>`
  width: ${({ percentage }) => percentage - 3}%;
  height: 100%;
  background-color: var(--bg-pink);
  border-radius: 3px 0 0 3px;
  position: absolute;
  top: 0;
  left: 0;
  transition: var(--transition-all);
`;

export const ProgressBar = ({
  current,
  count,
}: {
  current: number;
  count: number;
}) => {
  const percentage = (current / count) * 100;

  return (
    <BarContainer>
      <Bar percentage={percentage} />
    </BarContainer>
  );
};
