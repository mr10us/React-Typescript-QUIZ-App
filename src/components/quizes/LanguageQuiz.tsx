import styled from "styled-components";
import { langOptions, routes } from "../../consts";
import { Input } from "../UI/Input";
import { useNavigate } from "react-router-dom";
import { useCurrentPage } from "../../hooks/useCurrentPage";
import { parseAnswer } from "../../utils/parseAnswer";
import { saveAnswer } from "../../api/quizApi";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { popupContainer, popupItem } from "../../animations";

const KEY = "1";

const LanguageQuizContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  height: 100%;
  width: 100%;
`;

interface IOption {
  value: string;
  label: string;
  selected?: boolean;
}

export const LanguageQuiz = () => {
  const [answers, setAnswers] = useState<IOption[] | null>([]);

  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const currentPage = useCurrentPage();
  const nextPage = Number(currentPage) + 1 + "/";

  const handleRadioClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    const outputValue = e.target.value;

    const parsed = parseAnswer.toKeyValue(outputValue);
    if (parsed)
      try {
        await saveAnswer(parsed);
        await i18n.changeLanguage(parsed.value);
      } catch (e) {
        // TODO: error notification + log;
      }

    navigate(routes.QUIZ + nextPage);
  };

  useEffect(() => {
    const answer = parseAnswer.fromKeyValue(KEY);

    const optionsArray = Object.entries(langOptions).map(([key, label]) => ({
      value: key,
      label,
    }));

    setAnswers(
      optionsArray?.map((item: IOption) => ({
        ...item,
        selected: item.value === answer,
      }))
    );
  }, []);

  return (
    <LanguageQuizContainer variants={popupContainer} initial="hidden" animate="show">
      {answers?.map(({ label, value, selected }, index) => (
        <motion.div
          style={{ width: "100%" }}
          key={value}
          custom={index}
          variants={popupItem}
          initial="hidden"
          animate="show"
        >
          <Input.Radio
            selected={selected}
            value={KEY + "/" + value}
            onChange={handleRadioClick}
          >
            {label}
          </Input.Radio>
        </motion.div>
      ))}
    </LanguageQuizContainer>
  );
};
