import styled from "styled-components";
import { Loader } from "../components/UI/Loader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../consts";


const CenteredContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

export const LoadingPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(routes.EMAIL);
    }, 5000);

    return () => clearTimeout(timer);
  }, [])
  return (
    <CenteredContainer>
      <Loader />
    </CenteredContainer>
  );
};
