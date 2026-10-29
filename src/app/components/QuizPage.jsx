"use client";
import { useState, useRef } from "react";
import { createClient } from "../../supabase/client";
import ProgressBar from "../components/ProgressBar";
import {
  calculateTraitScores,
  generatePersonalityCode,
  getPersonality,
  buildResult,
  saveResult,
} from "../lib/personality";
import { useRouter } from "next/navigation";

export default function QuizPage({ questions }) {
  // console.log(questions)
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const questionsRef = useRef(null);
  const router = useRouter();

  const getMap = () => {
    if (!questionsRef.current) {
      questionsRef.current = new Map();
    }
    return questionsRef.current;
  };

  const getNextUnansweredQuestion = (updatedAnswers, index) => {
    for (let i = index + 1; i < questions.length; i++) {
      if (!updatedAnswers[questions[i].display_order]) return i;
    }
    return null;
  };

  const handleScroll = (scrollToIndex) => {
    const scrollQuestionId = questions[scrollToIndex].id;
    const nodeId = questionsRef.current.get(scrollQuestionId);
    if (!nodeId) {
      console.log("Element not found");
      return;
    }
    nodeId.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const handleRadioChange = (e, index) => {
    const updatedState = {
      ...selectedAnswers,
      [questions[index].display_order]: e.target.value,
    };
    setSelectedAnswers(updatedState);

    const scrollToNextIndex = getNextUnansweredQuestion(updatedState, index);

    if (scrollToNextIndex == null) {
      console.log("All questions answered");
      return;
    }

    handleScroll(scrollToNextIndex);

    // TODO:
    // Investigate whether scrolling should happen in useLayoutEffect instead of immediately after setState.

    console.log("Question ID -", index);
    console.log("Selected Option - ", e.target.value);
  };

  const handleSubmit = async () => {
    const answers = {
      1: 1,
      2: 1,
      3: 1,
      4: 1,
      14: 1,
      15: 1,
      17: 4,
      19: 4,
      25: 5,
      26: 5,
      28: 5,
      29: 5,
      34: 1,
      35: 1,
      38: 1,
      39: 2,
    };
    const sessionId = crypto.randomUUID();

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id ?? null;
    const claimToken = userId ? null : crypto.randomUUID();
    const traitScores = calculateTraitScores(answers, questions);
    const personalityCode = generatePersonalityCode(traitScores);
    const personalityRow = await getPersonality(personalityCode);
    console.log("Personality Row - ", personalityRow);
    if (!personalityRow) {
      console.log("Unable to find personality");
      return;
    }
    const resultObject = buildResult(personalityRow, traitScores);

    console.log("Result object:", resultObject);

    const savedResult = await saveResult(
      resultObject,
      sessionId,
      userId,
      claimToken,
    );

    console.log("Saved result:", savedResult);
    if (!savedResult) {
      console.log("Couldn't find result, please check database");
      return;
    }

    if (!userId) {
      localStorage.setItem("valotraits_session_id", sessionId);
      localStorage.setItem("valotraits_claim_token", claimToken);
    }

    // console.log("Personality Row :", personalityRow)

    // navigate("/result")
    console.log("Session Id - ", sessionId);
    router.push(`/result/${savedResult.session_id}`);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const percentage = (answeredCount / questions.length) * 100;

  // debugging
  console.log("Count - ", answeredCount);
  console.log("Percentage - ", percentage);
  console.log("Radio options - ", selectedAnswers);

  return (
    <main className="quiz-page">
      <section className="quiz-header">
        <div className="quiz-heading">
          <span className="quiz-eyebrow">
            <span className="quiz-status-dot" />
            VALOTRAITS / PERSONALITY ASSESSMENT
          </span>

          <h1 className="quiz-title">
            Discover your <span>playstyle.</span>
          </h1>

          <p className="quiz-description">
            Answer each statement based on how you naturally play. Choose the
            response that best reflects your usual behaviour.
          </p>
        </div>

        <button
          type="button"
          className="quiz-submit-button"
          onClick={() => handleSubmit()}
        >
          Submit Answers <span aria-hidden="true">↗</span>
        </button>
      </section>

      <section className="quiz-progress-panel">
        <div className="quiz-progress-heading">
          <div>
            <span className="quiz-section-label">YOUR PROGRESS</span>

            <p className="quiz-progress-count">
              <span>{answeredCount}</span>
              <span className="quiz-progress-divider">/</span>
              {questions.length} answered
            </p>
          </div>

          <span className="quiz-progress-percentage">
            {Math.round(percentage)}%
          </span>
        </div>

        {/* Actual progress bar */}
        <div
          className="quiz-progress-track"
          role="progressbar"
          aria-valuenow={Math.round(percentage)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Quiz completion"
        >
          <div
            className="quiz-progress-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </section>

      <section className="quiz-questions-section">
        <div className="quiz-section-heading">
          <div>
            <span className="quiz-section-label">THE ASSESSMENT</span>
            <h2>Know your game.</h2>
            <p>
              Select one response for every statement, from least likely to most
              likely.
            </p>
          </div>

          <span className="quiz-question-total">
            {String(questions.length).padStart(2, "0")} QUESTIONS
          </span>
        </div>

        <div className="quiz-question-list">
          {questions.map((question, index) => {
            const answer = selectedAnswers[question.display_order];
            const isAnswered = Boolean(answer);

            return (
              <div
                key={question.id}
                ref={(node) => {
                  const map = getMap();

                  if (node) {
                    map.set(question.id, node);
                  } else {
                    map.delete(question.id);
                  }
                }}
                className={`quiz-question-card ${
                  isAnswered ? "is-answered" : ""
                }`}
              >
                <div className="quiz-question-heading">
                  <span className="quiz-question-number">
                    {String(question.display_order).padStart(2, "0")}
                  </span>

                  <p className="quiz-question-text">{question.question_text}</p>

                  {isAnswered && (
                    <span
                      className="quiz-answered-indicator"
                      aria-label="Question answered"
                      title="Answered"
                    >
                      ✓
                    </span>
                  )}
                </div>

                <div className="quiz-response-area">
                  <div className="quiz-scale-labels">
                    <span>NOT LIKELY</span>
                    <span>MOST LIKELY</span>
                  </div>

                  <div
                    className="quiz-options"
                    role="group"
                    aria-label={`Response for question ${question.display_order}`}
                  >
                    {[1, 2, 3, 4, 5].map((value) => {
                      const optionValue = String(value);
                      const inputId = `${question.id}-${value}`;
                      const isSelected = answer === optionValue;

                      return (
                        <label
                          key={value}
                          htmlFor={inputId}
                          className={`quiz-option ${
                            isSelected ? "is-selected" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name={`${question.id}Options`}
                            value={optionValue}
                            className="radio-circle"
                            id={inputId}
                            checked={
                              selectedAnswers[question.display_order] ===
                              optionValue
                            }
                            onChange={(e) => handleRadioChange(e, index)}
                          />

                          <span>{value}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="quiz-bottom-panel">
        <div>
          <span className="quiz-section-label">READY TO FIND YOUR TYPE?</span>

          <h2>
            {answeredCount === questions.length
              ? "Assessment complete."
              : "Almost there."}
          </h2>

          <p>
            {answeredCount === questions.length
              ? "Submit your answers to discover your Valorant personality."
              : `${questions.length - answeredCount} questions remaining. Continue answering to complete your assessment.`}
          </p>
        </div>

        <button
          type="button"
          className="quiz-submit-button"
          onClick={() => handleSubmit()}
        >
          Submit Answers <span aria-hidden="true">↗</span>
        </button>
      </section>
    </main>
  );
}
