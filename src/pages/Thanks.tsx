import { CSVLink } from "react-csv";
import styled from "styled-components";
import { PinkButton } from "../components/UI/PinkButton";
import { Wrapper } from "../components/Wrapper";
import { useLocale } from "../hooks/useLocale";
import { useNavigate } from "react-router-dom";
import { routes } from "../consts";
import { generateCSVData } from "../utils/generateCSV";

const ThanksContainer = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  text-align: center;
`;

const Title = styled.h1`
  color: var(--text-gray-300);
  font-family: var(--niconnes);
  fontweight: 400;
  font-size: var(--text-xl);
  margin-top: 4rem;
`;

const Subtitle = styled.p`
  color: var(--text-gray-300);
  font-family: var(--albert-sans);
  fontweight: 500;
  font-size: var(--text-md);
  margin-bottom: 1rem;
`;

const DownloadLink = styled.span`
  color: #ececfb;
  font-family: var(--albert-sans);
  fontweight: 600;
  font-size: var(--text-md);
  display: flex;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
  transition: var(--transition-all);

  &:hover,
  &:hover svg > g > path {
    color: var(--text-pink);
    stroke: var(--text-pink);
  }

  &:active,
  &:active svg > g > path {
    stroke: var(--text-pink);
    color: var(--text-pink);
  }
`;

const DoneSVG = styled.svg`
  @keyframes drawCheckmark {
    0% {
      stroke-dashoffset: 48;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  & path {
    animation: drawCheckmark 1s 0.2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  }
`;

export const Thanks = () => {
  const t = useLocale;
  const navigate = useNavigate();

  const handleRetakeQuiz = () => {
    // TODO: add confirm dialog

    localStorage.clear();
    navigate(routes.QUIZ + "1/");
  };

  const data = generateCSVData();
  
  return (
    <>
      <Wrapper>
        <ThanksContainer>
          <div>
            <Title>{t("thanks.title")}</Title>
            <Subtitle>{t("thanks.subtitle")}</Subtitle>
          </div>
          <DoneSVG
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
            width="100"
            height="100"
          >
            <circle
              cx="26"
              cy="26"
              r="25"
              fill="#d0e9cf"
              stroke="#d0e9cf"
              strokeWidth="2"
            />
            <path
              fill="none"
              stroke="#4caf50"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="48"
              strokeDashoffset="48"
              d="M14 27l7 7 17-17"
            ></path>
          </DoneSVG>
          <CSVLink data={data} style={{ textDecoration: "none" }} target="_blank" filename="quizResult.csv">
          <DownloadLink>
            <svg
              width="42px"
              height="42px"
              viewBox="-2.4 -2.4 28.80 28.80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
            >
              <g strokeWidth="0"></g>
              <g
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#CCCCCC"
                strokeWidth="1.5"
              ></g>
              <g>
                <path
                  d="M12 16L12 8"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M9 13L11.913 15.913V15.913C11.961 15.961 12.039 15.961 12.087 15.913V15.913L15 13"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M3 15L3 16L3 19C3 20.1046 3.89543 21 5 21L19 21C20.1046 21 21 20.1046 21 19L21 16L21 15"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>

            <p style={{ marginTop: 5 }}>{t("buttons.download")}</p>
          </DownloadLink>
          </CSVLink>
        </ThanksContainer>
      </Wrapper>
      <PinkButton onClick={handleRetakeQuiz}>Retake quiz</PinkButton>
    </>
  );
};

