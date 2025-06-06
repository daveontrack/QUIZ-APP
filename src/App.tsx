import QuestionCard from "./components/QuestionCard";
import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
import { QuestionsState, Difficulty } from "./API";
import { GlobalStyle, Wrapper } from "./App.styles";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <>
      <GlobalStyle />

      <Wrapper>
        <h1> DAVE QUIZ APP</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {/* {!loading && !gameOver && (
          <div className="question-card">
            <QuestionCard
              questionNr={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          </div>
        )} */}

        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};
export default App;

// export default App;
// import React, { useState } from "react";
// import QuestionCard from "./components/QuestionCard";
// import { fetchQuizQuestions } from "./API";
// import { QuestionsState, Difficulty } from "./API";

// export type AnswerObject = {
//   question: string;
//   answer: string;
//   correct: boolean;
//   correctAnswer: string;
// };

// const TOTAL_QUESTIONS = 10;

// const App: React.FC = () => {
//   const [loading, setLoading] = useState(false);
//   const [questions, setQuestions] = useState<QuestionsState[]>([]);
//   const [number, setNumber] = useState(0);
//   const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
//   const [score, setScore] = useState(0);
//   const [gameOver, setGameOver] = useState(true);

//   const startTrivia = async () => {
//     setLoading(true);
//     setGameOver(false);
//     try {
//       const newQuestions = await fetchQuizQuestions(
//         TOTAL_QUESTIONS,
//         Difficulty.EASY
//       );
//       setQuestions(newQuestions);
//       setScore(0);
//       setUserAnswers([]);
//       setNumber(0);
//     } catch (error) {
//       console.error("Error fetching quiz questions:", error);
//       alert("Failed to load quiz questions.");
//     }
//     setLoading(false);
//   };

//   const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
//     if (!gameOver) {
//       const selectedAnswer = e.currentTarget.value;
//       const correct = questions[number].correct_answer === selectedAnswer;
//       if (correct) setScore((prev) => prev + 1);

//       const answerObject: AnswerObject = {
//         question: questions[number].question,
//         answer: selectedAnswer,
//         correct,
//         correctAnswer: questions[number].correct_answer,
//       };
//       setUserAnswers((prev) => [...prev, answerObject]);
//     }
//   };

//   const nextQuestion = () => {
//     const nextQ = number + 1;
//     if (nextQ === TOTAL_QUESTIONS) {
//       setGameOver(true);
//     } else {
//       setNumber(nextQ);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>REACT QUIZ</h1>
//       {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
//         <button className="start" onClick={startTrivia}>
//           Start
//         </button>
//       ) : null}
//       {!gameOver && <p className="score">Score: {score}</p>}
//       {loading && <p>Loading Questions...</p>}
//       {!loading && !gameOver && (
//         <QuestionCard
//           questionNr={number + 1}
//           totalQuestions={TOTAL_QUESTIONS}
//           question={questions[number].question}
//           answers={questions[number].answers}
//           userAnswer={userAnswers ? userAnswers[number] : undefined}
//           callback={checkAnswer}
//         />
//       )}
//       {!gameOver &&
//         !loading &&
//         userAnswers.length === number + 1 &&
//         number !== TOTAL_QUESTIONS - 1 && (
//           <button className="next" onClick={nextQuestion}>
//             Next Question
//           </button>
//         )}
//     </div>
//   );
// };

// export default App;
