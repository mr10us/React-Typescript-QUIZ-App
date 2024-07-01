import i18next from "i18next";

export const useSetLanguage = (input: React.MouseEvent<HTMLInputElement> | string) => {
  let value: string;

  if (typeof input === "string") {
    value = input;
  } else {
    const target = input.target as HTMLInputElement;
    value = target.value;
  }

  localStorage.setItem("lang", value);
  i18next.changeLanguage(value);
};
