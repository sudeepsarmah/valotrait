"use client"

import { useState } from "react"
import { createClient } from "@/supabase/client"

export default function EmailResults({sessionId}){
const [email, setEmail] = useState("")
const [sending, setSending] = useState(false)

const handleChange = (e) =>{
  setEmail(e.target.value)
}

const handleSubmit = async () =>{
  console.log("sessionId:", sessionId)
  console.log("email:", email)
if(!email){
  return
}

setSending(true)

try{
const supabase = createClient()
const {data, error} = await supabase.functions.invoke(
  "resend-email-results",
  {body:{
    email,
    session_id:sessionId
  }}
  )
  if(error){
    throw new Error (error.message || "Failed to send email")
  }
  console.log("Email Sent.", data)
}catch(err){
  console.error("Email error: ", err)
}finally{
  setSending(false)
}
setEmail("")
}

  return(
    <> 
    <label htmlFor="userEmail">Send my results.</label>
      <input id="userEmail" type="email" required placeholder="Enter your email here" value={email} onChange={handleChange}/>
<button onClick={handleSubmit} disabled={sending}>{sending ? "Sending .. " : "Send Email"}</button>
    </>
  )
}