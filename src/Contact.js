import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <>
      <h2>Contact Us</h2>
      <p>
        If you have any questions or feedback about the Workout Logger, feel
        free to reach out using the form below.
      </p>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message here"
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Contact;
