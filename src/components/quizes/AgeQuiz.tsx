import styled from "styled-components";
import { Input } from "../UI/Input";
import { useLocale } from "../../hooks/useLocale";
import { useNavigate } from "react-router-dom";
import { useCurrentPage } from "../../hooks/useCurrentPage";
import { parseAnswer } from "../../utils/parseAnswer";
import { saveAnswer } from "../../api/quizApi";
import { routes } from "../../consts";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { popupContainer, popupItem } from "../../animations";

const KEY = "3";

const AgeQuizContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 100%;
`;

interface IOption {
  text: string;
  selected: boolean;
}

export const AgeQuiz = () => {
  const [answers, setAnswers] = useState<IOption[] | null>([]);

  const t = useLocale;
  const navigate = useNavigate();
  const currentPage = useCurrentPage();
  const nextPage = Number(currentPage) + 1;

  const handleRadioClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    const outputValue = e.target.value;

    const parsed = parseAnswer.toKeyValue(outputValue);
    if (parsed)
      try {
        await saveAnswer(parsed);
      } catch (e) {
        // TODO: error notification + log;
      }

    navigate(routes.QUIZ + nextPage);
  };

  useEffect(() => {
    const answer = parseAnswer.fromKeyValue(KEY);

    const quizOptions = t("quiz.3.options");

    setAnswers(
      quizOptions?.map((text: string) => ({ text, selected: text === answer }))
    );
  }, []);

  return (
    <AgeQuizContainer variants={popupContainer} initial="hidden" animate="show">
      {answers?.map(({ text, selected }, index) => (
        <motion.div
          style={{ width: "100%" }}
          variants={popupItem}
          custom={index}
          initial="hidden"
          animate="show"
        >
          <Input.Radio
            selected={selected}
            key={text}
            value={KEY + "/" + text + "/"}
            onChange={handleRadioClick}
          >
            {text}
          </Input.Radio>
        </motion.div>
      ))}
    </AgeQuizContainer>
  );
};
