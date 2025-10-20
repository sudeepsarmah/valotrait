import { useState } from "react"
import Button from "./Button"
import '@/css/IntroForm.css'

type IntroFormProps = {
    onSubmit: (formData: { userIgn: string; peakRank: string; currentRank: string }) => void;
}


export default function IntroForm() {

    const [formData, setFormData] = useState({
        userIgn: "",
        peakRank: "iron",
        currentRank: "iron"
    })

    const handleChange =
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target
            setFormData((prev) => ({ ...prev, [name]: value }))
        }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit} className="intro-form">
            <label htmlFor="userIgn">What's your IGN?</label>
            <input type="text" placeholder="Enter your IGN here..." name="userIgn" value={formData.userIgn} onChange={handleChange} className="ignInput" id="userIgn" required />
            <label htmlFor="peak-rank" id="peak-rank">What was your peak rank?</label>
            <select name="peakRank" value={formData.peakRank} onChange={handleChange} className="peakSelect">
                <option value="iron">Iron</option>
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
                <option value="diamond">Diamond</option>
                <option value="ascendant">Ascendant</option>
                <option value="radiant">Radiant</option>
            </select>
            <label htmlFor="" id="current-rank">What is your current rank?</label>
            <select name="currentRank" value={formData.currentRank} onChange={handleChange} className="currentSelect">
                <option value="iron">Iron</option>
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
                <option value="diamond">Diamond</option>
                <option value="ascendant">Ascendant</option>
                <option value="radiant">Radiant</option>
            </select>
            <Button text="Go" className="btn get-started-btn" type="submit" />
        </form>
    )
}