import { Navigate, createBrowserRouter } from "react-router-dom";
import { routes } from "../consts";
import { Quiz } from "../pages/Quiz";
import { Email } from "../pages/Email";
import { Thanks } from "../pages/Thanks";
import { LoadingPage } from "../pages/LoadingPage";
import { NotFound } from "../pages/NotFound";
import { LanguageQuiz } from "./quizes/LanguageQuiz";
import { GenderQuiz } from "./quizes/GenderQuiz";
import { AgeQuiz } from "./quizes/AgeQuiz";
import { HateQuiz } from "./quizes/HateQuiz";
import { TopicsQuiz } from "./quizes/TopicsQuiz";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to={routes.QUIZ + "1/"} /> },
  {
    path: routes.QUIZ,
    element: <Quiz />,
    children: [
      { path: "1/", element: <LanguageQuiz /> },
      { path: "2/", element: <GenderQuiz /> },
      { path: "3/", element: <AgeQuiz /> },
      { path: "4/", element: <HateQuiz /> },
      { path: "5/", element: <TopicsQuiz /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: routes.EMAIL, element: <Email /> },
  { path: routes.THANKS, element: <Thanks /> },
  { path: routes.LOADER, element: <LoadingPage /> },
  { path: "*", element: <NotFound /> },
]);
