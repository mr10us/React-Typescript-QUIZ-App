import React from "react";
import styled from "styled-components";

const CustomInput = styled.input`
  background-color: var(--bg-primary-light);
  padding: 1.2rem 1.5rem;
  font-family: var(--nunito-sans);
  font-weight: 600;
  font-size: var(--text-md);
  color: var(--text-white);
  border-radius: 1rem;
  width: 100%;
  outline: none;
  border: 2px solid transparent;
  cursor: pointer;

  &:focus {
    border: 2px solid var(--text-pink);
  }

  @media (max-width: 480px) {
    padding: 1rem 1.2rem;
  }
`;

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <CustomInput type="text" {...props} />;
};

const RadioLabel = styled.label<{ selected?: boolean }>`
  background-color: var(--bg-primary-light);
  padding: 1.2rem 1.5rem;
  border-color: ${({ selected }) =>
    selected ? "var(--text-pink)" : "transparent"};
  border-width: 2px;
  border-style: solid;
  font-family: var(--nunito-sans);
  font-weight: 600;
  font-size: var(--text-md);
  color: var(--text-white);
  border-radius: 1rem;
  width: 100%;
  display: inline-block;
  cursor: pointer;
`;

Input.Radio = ({
  children,
  onChange,
  value,
  selected = false,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { selected?: boolean }) => {
  return (
    <RadioLabel selected={selected} style={rest.style}>
      {children}
      <input
        value={value}
        onChange={onChange}
        type="radio"
        {...{ ...rest, style: { "display": "none" } }}
      />
    </RadioLabel>
  );
};

const CheckboxContainer = styled.div<{ checked?: boolean }>`
  display: flex;
  justify-content: space-between;
  background-color: var(--bg-primary-light);
  border-width: 2px;
  border-color: ${({ checked }) =>
    checked ? "var(--text-pink)" : "transparent"};
  border-style: solid;
  font-family: var(--nunito-sans);
  font-weight: 600;
  font-size: var(--text-md);
  color: var(--text-white);
  border-radius: 1rem;
  width: 100%;
  cursor: pointer;
`;
const CheckboxLabel = styled.label`
  padding: 1.2rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;
const CheckboxInput = styled.input<{ checked?: boolean }>`
  -webkit-appearance: none;
  appearance: none;
  width: 1.6em;
  height: 1.6em;
  border-radius: 0.5rem;
  border: 0.15em solid var(--bg-pink);
  background-color: ${({ checked }) =>
    checked ? "var(--bg-pink)" : "var(--bg-primary-light)"};
  outline: none;
  cursor: pointer;
  position: relative;

  &::before {
    content: "";
    display: block;
    width: 0.8em;
    height: 0.4em;
    border-bottom: 0.16em solid var(--text-pink-light);
    border-left: 0.16em solid var(--text-pink-light);
    border-color: var(--text-white);
    position: absolute;
    top: 40%;
    left: 50%;
    opacity: 0;
    transform: translate(-50%, -50%) rotate(310deg);
    transition: var(--transition-all);
  }

  &:checked::before {
    opacity: 1;
  }
`;

Input.Checkbox = ({
  children,
  onChange,
  checked,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  const customChangeHandler = (event: React.MouseEvent<HTMLInputElement>) => {
    event.target.value = children;
    onChange(event);
  };
  return (
    <CheckboxContainer checked={checked}>
      <CheckboxLabel>
        {children}
        <CheckboxInput
          type="checkbox"
          checked={checked}
          onChange={customChangeHandler}
          {...rest}
        />
      </CheckboxLabel>
    </CheckboxContainer>
  );
};

const BubbleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const BubbleLabel = styled.label<{ checked?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
  background-color: var(--bg-primary-light);
  padding: 1.2rem 1.5rem;
  border-width: 2px;
  border-color: ${({ checked }) =>
    checked ? "var(--text-pink)" : "transparent"};
  border-style: solid;
  font-family: var(--nunito-sans);
  font-weight: 600;
  font-size: var(--text-md);
  color: var(--text-white);
  border-radius: 50%;
  width: clamp(120px, 15vw, 170px);
  height: clamp(120px, 15vw, 170px);
`;

Input.Bubble = ({
  children,
  onChange,
  checked,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  const customChangeHandler = (event: React.MouseEvent<HTMLInputElement>) => {
    event.target.value = children[1].props.children;
    onChange(event);
  };

  return (
    <BubbleLabel checked={checked}>
      {children}
      <input
        style={{ display: "none" }}
        type="checkbox"
        checked={checked}
        onChange={customChangeHandler}
        {...rest}
      />
    </BubbleLabel>
  );
};
