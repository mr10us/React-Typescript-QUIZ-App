import styled from "styled-components";
import { Input } from "../UI/Input";
import { useLocale } from "../../hooks/useLocale";
import React, { useEffect, useState } from "react";
import { PinkButton } from "../UI/PinkButton";
import { saveAnswer } from "../../api/quizApi";
import { routes } from "../../consts";
import { useCurrentPage } from "../../hooks/useCurrentPage";
import { useNavigate } from "react-router-dom";
import { parseAnswer } from "../../utils/parseAnswer";
import { motion } from "framer-motion";
import { popupContainer, popupItem } from "../../animations";

const KEY = "4";

const HateQuizContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 100%;
`;

interface IOption {
  id: number;
  label: string;
  value: boolean;
}

export const HateQuiz = () => {
  const t = useLocale;
  const [answers, setAnswers] = useState<IOption[] | null>();

  const navigate = useNavigate();
  const currentPage = useCurrentPage();
  const nextPage = Number(currentPage) + 1;

  const isNextDisabled = answers?.every((answer) => answer.value === false);

  const handleChangeAnswers = (e: React.MouseEvent<HTMLInputElement>) => {
    const { value: label } = e.target;

    const updatedAnswers = answers?.map((answer: IOption) => {
      if (answer.label === label) return { ...answer, value: !answer.value };
      return answer;
    });

    setAnswers(updatedAnswers);
  };

  const handleClick = async () => {
    const filteredAnswers = answers?.filter((answer) => answer.value);
    const parsedAnswers = filteredAnswers?.map((answer) => answer.id);

    try {
      await saveAnswer({ key: KEY, value: parsedAnswers });
    } catch (e) {
      // TODO: error notification + log;
    }

    navigate(routes.QUIZ + nextPage);
  };

  useEffect(() => {
    const quizOptions = t("quiz.4.options");

    const answers = parseAnswer.fromKeyValue(KEY);

    const formatedOptions = quizOptions?.map(
      ({ text, id }: { text: string; id: number }) => {
        if (answers?.includes(String(id))) {
          return {
            label: text,
            value: true,
            id,
          };
        }
        return {
          label: text,
          value: false,
          id,
        };
      }
    );

    setAnswers(formatedOptions);
  }, []);

  return (
    <>
      <HateQuizContainer
        variants={popupContainer}
        initial="hidden"
        animate="show"
      >
        {answers?.map(({ label, value, id }, index) => (
          <motion.div
            style={{ width: "100%" }}
            variants={popupItem}
            custom={index}
            initial="hidden"
            animate="show"
          >
            <Input.Checkbox
              key={id}
              checked={value}
              onChange={handleChangeAnswers}
            >
              {label}
            </Input.Checkbox>
          </motion.div>
        ))}
      </HateQuizContainer>
      <PinkButton onClick={handleClick} disabled={isNextDisabled}>
        {t("buttons.next")}
      </PinkButton>
    </>
  );
};
