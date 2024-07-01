import { Header } from "../components/Header";
import { PageTitle } from "../components/PageTitle";
import { Wrapper } from "../components/Wrapper";
import { useCurrentPage } from "../hooks/useCurrentPage";
import { Outlet } from "react-router-dom";
import { useLocale } from "../hooks/useLocale";
import { NotFound } from "./NotFound";
import { BackButton } from "../components/UI/BackButton";

const { Sub } = PageTitle;

export const Quiz = () => {
  const t = useLocale;

  const currentPage = useCurrentPage();
  const isFirstQuiz = Number(currentPage) === 1;

  if (Number(currentPage))
    return (
      <>
        <Wrapper>
          <Header
            title={`${currentPage}/5`}
            backBtn={isFirstQuiz ? null : <BackButton />}
          />
          <PageTitle>{t(`quiz.${currentPage}.title`)}</PageTitle>

          {!!t(`quiz.${currentPage}.subtitle`) ? (
            <Sub>{t(`quiz.${currentPage}.subtitle`)}</Sub>
          ) : null}
            <Outlet />
        </Wrapper>
      </>
    );
  else return <NotFound />; // or Welcome page
};
