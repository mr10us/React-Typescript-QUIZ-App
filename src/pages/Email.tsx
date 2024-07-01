import styled from "styled-components";
import { useMemo, useState } from "react";
import { Input } from "../components/UI/Input";
import { PinkButton } from "../components/UI/PinkButton";
import { Wrapper } from "../components/Wrapper";
import { useLocale } from "../hooks/useLocale";
import { routes } from "../consts";
import { saveAnswer } from "../api/quizApi";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/validateEmail";
import { AnimatePresence, motion } from "framer-motion";
import { errorVariant } from "../animations";

const KEY = "email";

const EmailContainer = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
`;

const Title = styled.h1`
  color: var(--text-white);
  font-family: var(--albert-sans);
  font-weight: 800;
  font-size: var(--text-xl);
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: var(--text-gray-200);
  font-family: var(--albert-sans);
  font-weight: 500;
  font-size: var(--text-sm);
  margin-bottom: 1rem;
`;

const Policy = styled.p`
  color: var(--text-gray-200);
  font-family: var(--albert-sans);
  font-weight: 500;
  font-size: var(--text-sm);
`;

const PinkLink = styled.a`
  color: var(--text-pink);
  text-decoration: none;
`;

const ErrorMessage = styled.p`
  color: var(--text-red);
  font-family: var(--albert-sans);
  font-weight: 500;
  text-align: left;
  margin-top: 0.5rem;
  margin-left: 1.5rem;
  font-size: var(--text-sm);
`;

export const Email = () => {
  const t = useLocale;
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const isButtonDisabled = useMemo(() => error !== "", [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    setError("");
  };

  const handleClick = async () => {
    if (!validateEmail(email)) {
      setError(t("validators.email"));
      return;
    }
    try {
      await saveAnswer({ key: KEY, value: email });
    } catch (e) {
      // TODO: error notification + log;
    }
    navigate(routes.THANKS);
  };

  return (
    <>
      <Wrapper>
        <EmailContainer>
          <div>
            <Title>{t("email.title")}</Title>
            <Subtitle>{t("email.subtitle")}</Subtitle>
          </div>
          <div style={{ marginBottom: 15, width: "100%" }}>
            <Input
              type="email"
              placeholder={t("placeholders.email")}
              value={email}
              onChange={handleChange}
            />
            <AnimatePresence>
              {error ? (
                <motion.div
                  variants={errorVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <ErrorMessage>{error}</ErrorMessage>
                </motion.div>
              ) : (
                <div style={{ height: 35 }}></div>
              )}
            </AnimatePresence>
          </div>
          <Policy>
            {t("email.policy")[0]}
            <PinkLink href="https://google.com/search?q=privacy+policy">
              {" "}
              {t("email.policy")[1]}
            </PinkLink>{" "}
            {t("email.policy")[2]}
            <PinkLink href="https://google.com/search?q=terms+of+use">
              {" "}
              {t("email.policy")[3]}
            </PinkLink>
          </Policy>
        </EmailContainer>
      </Wrapper>
      <PinkButton onClick={handleClick} disabled={isButtonDisabled}>
        {t("buttons.next")}
      </PinkButton>
    </>
  );
};
