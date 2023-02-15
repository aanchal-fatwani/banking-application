import React, { useState, useRef } from "react";
import "../styles/contactus.scss";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState(
    "Thank you for reaching out to us. We will shortly get back to you!"
  );
  const inputRef = useRef([]);
  const labelRef = useRef([]);

  function handleFocus(index) {
    inputRef.current[index].focus();
    inputRef.current[index].className = "input-focus";
    labelRef.current[index].className = "label-focus";
  }
  function handleBlur(e, index) {
    inputRef.current[index].blur();
    if (e.target.value === "") {
      inputRef.current[index].className = "";
      labelRef.current[index].className = "";
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please enter all details");
      return;
    }
    alert(submitMessage);
    setName("");
    setEmail("");
    setMessage("");
    inputRef.current.forEach((ele) => {
      ele.className = "";
    });
    labelRef.current.forEach((ele) => {
      ele.className = "";
    });
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Send us a Message or Share your Query!</h1>
        <form className="form">
          <div className="text-input">
            <label htmlFor={"name"} ref={(el) => (labelRef.current[0] = el)}>
              Name
            </label>
            <input
              ref={(el) => (inputRef.current[0] = el)}
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => handleFocus(0)}
              onBlur={(e) => handleBlur(e, 0)}
            />
          </div>
          <div className="text-input">
            <label htmlFor={"email"} ref={(el) => (labelRef.current[1] = el)}>
              Email
            </label>
            <input
              ref={(el) => (inputRef.current[1] = el)}
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => handleFocus(1)}
              onBlur={(e) => handleBlur(e, 1)}
            />
          </div>
          <div className="text-area">
            <label htmlFor={"message"} ref={(el) => (labelRef.current[2] = el)}>
              {"Message / Query"}
            </label>
            <textarea
              ref={(el) => (inputRef.current[2] = el)}
              name={"message"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => handleFocus(2)}
              onBlur={(e) => handleBlur(e, 2)}
            />
          </div>
          <button className="send_button" onClick={(e) => submitHandler(e)}>
            {"Send"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default ContactUs;
