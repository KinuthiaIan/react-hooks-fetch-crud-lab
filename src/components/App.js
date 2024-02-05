import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [questions, setQuestions] = useState([]);

  //Function to handle addition of a new question to the list without having to refresh the page
  // by updating the state of questions with a new array that has new question at the end
  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  const [page, setPage] = useState("List");

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {/*Adding the onAddItem prop */}

      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList />
      )}
    </main>
  );
}

export default App;
