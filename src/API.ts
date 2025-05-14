// import { shuffleArray } from './utils';

// export type Question = {
//   category: string;
//   correct_answer: string;
//   difficulty: string;
//   incorrect_answers: string[];
//   question: string;
//   type: string;
// };

// export enum Difficulty {
//   EASY = "easy",
//   MEDIUM = "medium",
//   HARD = "hard",
// }

// export type QuestionsState = Question & { answers: string[] };

// export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) =>{
//   const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
//   // https://opentdb.com/api.php?amount=10
//   const data = await (await fetch(endpoint)).json();

//  return data.results.map((question: Question) => ({
//    ...question,
//     answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
//    }))
  
// };
import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionsState = Question & { answers: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
): Promise<QuestionsState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const res = await fetch(endpoint);
  const data = await res.json();

  console.log("API Response:", data); // 👀 Add this line for debugging

  if (!Array.isArray(data.results)) {
    throw new Error("Invalid API response: results not found");
  }

  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
