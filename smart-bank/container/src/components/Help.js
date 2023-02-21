import React, { useEffect } from "react";
import "../styles/help.css";

const Help = () => {
  const faqs = [
    {
      ques: "What is Internet Banking?",
      ans: "The Internet Banking gives you access to your account/s - anytime, anywhere, 24X7 - at your own comfort. You can manage all your daily transactions online. You can view statements, order cheque books, do fund transfers, order DDs, pay your bills & even shop online.",
    },
    {
      ques: "On which browsers can I use the Internet Banking Website?",
      ans: "Internet Banking works best on the latest versions of all browsers but we would recommend to use Google Chrome.",
    },
    {
      ques: "I am unable to login into Internet Banking? What do I do?",
      ans: "You have to apply and register for Internet Banking in order to login. Reach out to our Support or visit your nearest branch. Keep your customer ID, KYC details, debit card handy. Also ensure that your registered mobile number and your registered email address are active.",
    },
  ];

  const faqsList = () => {
    let list = [];
    list = faqs.map((el) => {
      return (
        <div className="faq">
          <h3 className="faq-title">{el.ques}</h3>
          <p className="faq-text">{el.ans}</p>
          <button className="faq-toggle">
            <i className="fas fa-angle-down"></i>
          </button>
        </div>
      );
    });
    return list;
  };

  useEffect(() => {
    const buttons = document.querySelectorAll(".faq-toggle");

    buttons.forEach((button) => {
      button.addEventListener("click", () =>
        button.parentElement.classList.toggle("active")
      );
    });
  }, []);

  return (
    <div style={{
      // height: "calc(100vh - 140px)"
      backgroundColor:"rgb(227, 227, 227)"
    }}>
      <h1 className="faq-head">Frequently Asked Questions</h1>
      <div className="faq-container">
        {faqsList()}
      </div>
      <div className="further-ques">
        <div>More Questions?</div>
        <div className="support">
          Reach out to us at <a href="/contact-us">Support</a>
        </div>
      </div>
    </div>
  );
};
export default Help;
