import React from "react";

function QuestionItem({ question, onDeleteQuestion, onChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  //Making DELETE request when Delete Question Button is clicked
  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteQuestion(question));
  }

  //Function to update user's change of answer
  function handleAnswerChange(event) {
    onChange(id, parseInt(event.target.value));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleAnswerChange} defaultValue={correctIndex}>
          {options}
        </select>
      </label>
      {/** Adding event listener to handle deleting qestions*/}
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
