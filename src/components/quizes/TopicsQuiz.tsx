import styled from "styled-components";
import { Input } from "../UI/Input";
import { useLocale } from "../../hooks/useLocale";
import { convertArrayTo2xMatrix } from "../../utils/convertArrayTo2xMatrix";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../consts";
import { saveAnswer } from "../../api/quizApi";
import { PinkButton } from "../UI/PinkButton";
import { parseAnswer } from "../../utils/parseAnswer";
import { motion } from "framer-motion";
import { popupContainer, popupItem } from "../../animations";

const KEY = "5";

const TopicsQuizContainer = styled(motion.div)`
  display: flex;
  height: 100%;
  width: auto;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const BubbleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  width: 100%;
  &:nth-child(even) {
    margin-top: clamp(60px, 15vw, 85px);
  }
`;

const EmojiDiv = styled.div`
  font-size: var(--text-xl);
`;
const TopicDiv = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: var(--text-sm);
  line-height: var(--leading-sm);
  font-family: var(--nunito-sans);
`;

interface IOption {
  id: number;
  topic: string;
  emoji: string;
  checked: boolean;
}

export const TopicsQuiz = () => {
  const t = useLocale;
  const [answers, setAnswers] = useState<IOption[] | null>();

  const navigate = useNavigate();

  const isNextDisabled = answers?.every((answer) => answer.checked === false);

  const convertedOptions = useMemo(
    () => convertArrayTo2xMatrix(answers),
    [answers]
  );

  const handleChangeAnswers = (e: React.MouseEvent<HTMLInputElement>) => {
    const { value: label } = e.target;

    const updatedAnswers = answers?.map((answer: IOption) => {
      if (answer.label === label)
        return { ...answer, checked: !answer.checked };
      return answer;
    });

    setAnswers(updatedAnswers);
  };

  const handleClick = async () => {
    const filteredAnswers = answers?.filter((answer) => answer.checked);
    const parsedAnswers = filteredAnswers?.map((answer) => answer.id);

    try {
      await saveAnswer({ key: KEY, value: parsedAnswers });
    } catch (e) {
      // TODO: error notification + log;
    }

    navigate(routes.LOADER);
  };

  useEffect(() => {
    // Get user's age in numbers
    const userAge = localStorage.getItem("age")?.split(" ")[0] || "18-29";

    const quizOptions = t(`quiz.5.options.${userAge}`);

    const answers = parseAnswer.fromKeyValue(KEY);

    const formatedOptions = quizOptions?.map(
      ({ topic, emoji, id }: { topic: string; emoji: string; id: number }) => {
        if (answers?.includes(id)) {
          return {
            label: topic,
            emoji,
            checked: true,
            id,
          };
        }
        return {
          label: topic,
          emoji,
          checked: false,
          id,
        };
      }
    );

    setAnswers(formatedOptions);
  }, []);

  return (
    <>
      <TopicsQuizContainer
        variants={popupContainer}
        initial="hidden"
        animate="show"
      >
        {convertedOptions?.map((element, index) => (
          <BubbleContainer key={index}>
            {element.map(({ label, emoji, checked, id }, secondIndex) => (
              <motion.div
                style={{ width: "100%" }}
                variants={popupItem}
                custom={index + secondIndex / 10}
                initial="hidden"
                animate="show"
              >
                <Input.Bubble
                  key={id}
                  checked={checked}
                  onChange={handleChangeAnswers}
                >
                  <EmojiDiv>{emoji}</EmojiDiv>
                  <TopicDiv>{label}</TopicDiv>
                </Input.Bubble>
              </motion.div>
            ))}
          </BubbleContainer>
        ))}
      </TopicsQuizContainer>
      <PinkButton onClick={handleClick} disabled={isNextDisabled}>
        {t("buttons.next")}
      </PinkButton>
    </>
  );
};
