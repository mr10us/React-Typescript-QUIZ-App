import { quiz as quizes } from "../i18n/en/app.json";

interface IAnswer {
  order: string;
  title: string;
  type: string;
  answer: string;
}

export const generateCSVData = (): IAnswer[] => {
  // Function to determine the type based on the value
  const determineType = (value: unknown): string => {
    if (typeof value === "string") {
      if (value.includes("@")) return "email"; // rudimentary email check
      return "single-input";
    } else if (Array.isArray(value)) {
      return "multiple-select";
    } else if (typeof value === "number") {
      return "single-image-input";
    }
    return "";
  };

  // Retrieve all items from localStorage
  const storageData = Object.keys(localStorage).reduce((acc, key) => {
    try {
      acc[key] = JSON.parse(localStorage.getItem(key) || "");
    } catch (e) {
      acc[key] = localStorage.getItem(key) || "";
    }
    return acc;
  }, {});

  // Map over storageData to create rows for CSV
  const rows = Object.entries(storageData).map(([orderNum, answer]) => {
    const quizData = quizes[orderNum as keyof typeof quizes];
    let allAnswers;

    if (quizData && quizData.options) {
      if (orderNum == "5") {
        const age = localStorage.getItem("3").split(" ")[0];

        allAnswers = quizData.options[age]?.filter((q) =>
          answer.includes(q.id)
        );
      } else if (typeof answer === "string" || typeof answer === "number") {
        allAnswers = quizData.options.find(
          (option: any) => option.id === answer
        );
      } else if (Array.isArray(answer)) {
        allAnswers = quizData.options?.filter((option: any) =>
          answer.includes(option.id)
        );
      }
    }

    return [
      orderNum,
      quizData?.title || "",
      determineType(answer),
      Array.isArray(allAnswers)
        ? allAnswers.map((opt) => opt.label || opt.text || opt.topic).join(", ")
        : allAnswers?.label || allAnswers?.text || answer,
  ];
  });

  const cols = ["order", "title", "type", "answer"];

  return [cols, ...rows];
};
