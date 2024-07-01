import styled from "styled-components";
import { Input } from "../UI/Input";
import { useLocale } from "../../hooks/useLocale";
import { useNavigate } from "react-router-dom";
import { useCurrentPage } from "../../hooks/useCurrentPage";
import { parseAnswer } from "../../utils/parseAnswer";
import { routes } from "../../consts";
import { saveAnswer } from "../../api/quizApi";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { popupContainer, popupItem } from "../../animations";

const KEY = "2";

const GenderQuizContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 240px));
  gap: 1rem;
  align-items: center;
  justify-content: center;
  height: fit-content;
  width: 100%;
  cursor: pointer;
  text-align: center;
`;

interface IOption {
  id: number;
  icon: string;
  label: string;
  selected?: boolean;
}

export const GenderQuiz = () => {
  const [answers, setAnswers] = useState<IOption[] | null>([]);

  const t = useLocale;
  const navigate = useNavigate();
  const currentPage = useCurrentPage();
  const nextPage = Number(currentPage) + 1;

  const handleRadioClick = async (
    e: React.MouseEvent<HTMLInputElement> | string
  ) => {
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

    const quizOptions = t("quiz.2.options");

    setAnswers(
      quizOptions?.map((item: IOption) => ({
        ...item,
        selected: answer ? item.id === Number(answer) : false,
      }))
    );
  }, []);

  return (
    <GenderQuizContainer variants={popupContainer} initial="hidden" animate="show">
      {answers?.map(({ icon, label, id, selected }, index) => (
        <motion.div key={label} custom={index} variants={popupItem} initial="hidden" animate="show">
          <Input.Radio
            style={{ padding: 0 }}
            selected={selected}
            value={KEY + "/" + id + "/"}
            onChange={handleRadioClick}
          >
            <p style={{ fontSize: "3rem" }}>{icon}</p>
            <p style={{ paddingBottom: "1rem" }}>{label}</p>
          </Input.Radio>
        </motion.div>
      ))}
    </GenderQuizContainer>
  );
};
