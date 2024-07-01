import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useLocale } from "../../hooks/useLocale";

const LoaderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr 1fr;
  justify-items: center;
  gap: 2rem;
  width: 30%;
  height: 50%;

  @media (max-width: 480px) {
    width: 70%;
    height: 70%;
  }
`;

const SVGContainer = styled.div<{ percents: number }>`
  position: relative;
  width: 100%;
  height: 100%;

  &::after {
    content: "${(props) => props.percents}%";
    position: absolute;
    font-size: var(--text-2xl);
    font-weight: 800;
    font-family: var(--albert-sans);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: fit-content;
    height: fit-content;
    color: var(--text-white);
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 100%;

    &::after {
      font-size: 3.25rem;
      transform: translate(-50%, -50%);
    }
  }
`;

const Phrases = styled.div`
  text-align: center;
  font-family: var(--albert-sans);
  font-weight: 600;
  font-size: var(--text-sm);
  line-height: var(--leading-sm);

  @media (max-width: 480px) {
    font-size: var(--text-md);
    line-height: var(--leading-md);
  }
`;

export const Loader = ({
  loadingPercents = 0,
}: {
  loadingPercents?: number;
}) => {
  const [percents, setPercents] = useState<number>(loadingPercents);

  const phrasesIndex: number = useMemo(() => {
    return Math.floor(percents / 20);
  }, [percents]);

  const t = useLocale;

  useEffect(() => {
    const interval = setInterval(() => {
      setPercents((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);
  return (
    <LoaderContainer>
      <SVGContainer percents={percents}>
        <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#e6e6e6"
            strokeWidth="2.5"
          />
          <path
            strokeDasharray={`${percents}, 100`}
            d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#ff4d9b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </SVGContainer>

      <Phrases>{t("loader")[phrasesIndex]}</Phrases>
    </LoaderContainer>
  );
};
