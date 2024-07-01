import styled from "styled-components";

interface ButtonProps {
  view?: "primary"; // "ghost" | "secondary" | "link"
}

const Button = styled.button<ButtonProps>`
  position: fixed;
  bottom: 1.5rem;
  left: 0;
  right: 0;
  width: 100%;
  margin: 0 auto;
  max-width: 1100px;
  z-index: 999;
  padding: 1rem 1.5rem;
  border-radius: 2rem;
  border: 1px solid transparent;
  background-color: var(--bg-pink);
  color: var(--text-white);
  font-size: var(--text-md);
  filter: ${({ disabled }) => (disabled ? "opacity(0.5)" : "")};
  font-weight: 800;
  font-family: var(--albert-sans);
  cursor: pointer;
  transition: var(--transition-all);
  &:hover {
    background-color: var(--bg-white);
    color: var(--text-pink);
  }

  @media (max-width: 1200px) {
    max-width: 900px;
  }

  @media (max-width: 1024px) {
    max-width: 800px;
  }

  @media (max-width: 768px) {
    max-width: 480px;
  }

  @media (max-width: 480px) {
    width: unset;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
  }

  @media (hover: hover) {
    &:hover {
      background-color: var(--bg-white);
      color: var(--text-pink);
    }
  }
  @media (hover: none) {
    &:active {
      background-color: var(--bg-white);
      color: var(--text-pink);
    }
  }
  &:active {
    background-color: var(--bg-white);
    color: var(--text-pink);
  }
`;

export interface PinkButtonProps
  extends ButtonProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const PinkButton = ({
  children,
  onClick,
  disabled,
  view = "primary",
  ...rest
}: PinkButtonProps) => {
  return (
    <Button onClick={onClick} disabled={disabled} view={view} {...rest}>
      {children}
    </Button>
  );
};
