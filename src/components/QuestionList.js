import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  //Using useEffect hook use to get and display the questions
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions));
  }, []); //Empty dependencies array to fetch the questions only once

  const questionList = questions.map((question) => (
    <QuestionItem
      key={question.id}
      question={question}
      onDeleteQuestion={handleDeleteQuestion}
      onChange={handleUpdate}
    />
  ));

  //Function to handle deleting of questions without having to refresh page using setState hook to update state
  function handleDeleteQuestion(deletedItem) {
    const updatedQuestions = questions.filter(
      (question) => question.id !== deletedItem.id
    );
    setQuestions(updatedQuestions);
  }

  //Fnction to update the user's correct answers
  function handleUpdate(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((question) => {
          if (question.id === updatedQuestion.id) return updatedQuestion;
          return question;
        });
        setQuestions(updatedQuestions);
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}</ul>

      <ul>{questionList}</ul>
    </section>
  );
}

export default QuestionList;
