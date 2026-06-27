'use client'
import { useState } from "react"
import { createClient } from "../../supabase/client"
import ProgressBar from "../components/ProgressBar"

export default function QuizPage({ questions }) {
    // console.log(questions)
    const [radioOptions, setRadioOptions] = useState({})

    const handleRadioChange = (e, questionNumber) => {
        setRadioOptions(prev => ({
            ...prev,
            [questionNumber]: e.target.value
        }))

        console.log("Question ID -", questionNumber)
        console.log("Selected Option - ", e.target.value)
    }
    const answeredCount = Object.keys(radioOptions).length
    const percentage = (answeredCount / questions.length) * 100
    console.log("Count - ", answeredCount)
    console.log("Percentage - ", percentage)

    console.log("Radio options - ", radioOptions)

    return (
        <>
            <ProgressBar
                progress={percentage}
                ansCount={answeredCount}
                totalQuestions={questions.length} />
            <div>
                <h2>Answer the following question:</h2>
                {questions.map((question) => {
                    return (
                        <div key={question.id}
                            className="rounded-3xl border border-zinc-200 p-6 mb-4 max-w-2xl cursor-pointer">
                            <span>{question.display_order}</span>
                            <p className="">{question.question_text}</p>
                            <div className="flex justify-center gap-12 mt-6">
                                <span>Not Likely</span>
                                <div className="flex gap-2 justify-center">
                                    <label htmlFor="">
                                        <input type="radio" name={`${question.id}Options`} value="1" className="radio-circle" id={`${question.id}1`} checked={radioOptions[question.display_order] === "1"}
                                            onChange={(e) => handleRadioChange(e, question.display_order)} />
                                    </label>
                                    <label htmlFor="">
                                        <input type="radio" name={`${question.id}Options`} value="2" className="radio-circle" id={`${question.id}2`}
                                            checked={radioOptions[question.display_order] === "2"}
                                            onChange={(e) => handleRadioChange(e, question.display_order)} />
                                    </label>
                                    <label htmlFor="">
                                        <input type="radio" name={`${question.id}Options`} value="3" className="radio-circle" id={`${question.id}3`}
                                            checked={radioOptions[question.display_order] === "3"}
                                            onChange={(e) => handleRadioChange(e, question.display_order)} />
                                    </label>
                                    <label htmlFor="">
                                        <input type="radio" name={`${question.id}Options`} value="4" className="radio-circle" id={`${question.id}4`}
                                            checked={radioOptions[question.display_order] === "4"}
                                            onChange={(e) => handleRadioChange(e, question.display_order)} />
                                    </label>
                                    <label htmlFor="">
                                        <input type="radio" name={`${question.id}Options`} value="5" className="radio-circle" id={`${question.id}5`}
                                            checked={radioOptions[question.display_order] === "5"}
                                            onChange={(e) => handleRadioChange(e, question.display_order)} />
                                    </label>
                                </div>
                                <span>Most Likely</span>
                                {radioOptions[question.display_order] ? <span className="text-lime-300">✓</span> : ""}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}