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
    <>
      <ProgressBar
        progress={percentage}
        ansCount={answeredCount}
        totalQuestions={questions.length}
      />
      <div>
        <button
          className="border border-green-500 bg-amber-400 text-zinc-950"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
        <h2>Answer the following question:</h2>
        {questions.map((question, index) => {
          return (
            <div
              key={question.id}
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(question.id, node);
                }
                return () => {
                  map.delete(question.id);
                };
              }}
              className="rounded-3xl border border-zinc-200 p-6 mb-4 max-w-2xl cursor-pointer"
            >
              <span>{question.display_order}</span>
              <p className="">{question.question_text}</p>
              <div className="flex justify-center gap-12 mt-6">
                <span>Not Likely</span>
                <div className="flex gap-2 justify-center">
                  <label htmlFor="">
                    <input
                      type="radio"
                      name={`${question.id}Options`}
                      value="1"
                      className="radio-circle"
                      id={`${question.id}1`}
                      checked={selectedAnswers[question.display_order] === "1"}
                      onChange={(e) => handleRadioChange(e, index)}
                    />
                  </label>
                  <label htmlFor="">
                    <input
                      type="radio"
                      name={`${question.id}Options`}
                      value="2"
                      className="radio-circle"
                      id={`${question.id}2`}
                      checked={selectedAnswers[question.display_order] === "2"}
                      onChange={(e) => handleRadioChange(e, index)}
                    />
                  </label>
                  <label htmlFor="">
                    <input
                      type="radio"
                      name={`${question.id}Options`}
                      value="3"
                      className="radio-circle"
                      id={`${question.id}3`}
                      checked={selectedAnswers[question.display_order] === "3"}
                      onChange={(e) => handleRadioChange(e, index)}
                    />
                  </label>
                  <label htmlFor="">
                    <input
                      type="radio"
                      name={`${question.id}Options`}
                      value="4"
                      className="radio-circle"
                      id={`${question.id}4`}
                      checked={selectedAnswers[question.display_order] === "4"}
                      onChange={(e) => handleRadioChange(e, index)}
                    />
                  </label>
                  <label htmlFor="">
                    <input
                      type="radio"
                      name={`${question.id}Options`}
                      value="5"
                      className="radio-circle"
                      id={`${question.id}5`}
                      checked={selectedAnswers[question.display_order] === "5"}
                      onChange={(e) => handleRadioChange(e, index)}
                    />
                  </label>
                </div>
                <span>Most Likely</span>
                {selectedAnswers[question.display_order] ? (
                  <span className="text-lime-300">✓</span>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
