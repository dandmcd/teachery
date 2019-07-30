import React from "react";

import withSession from "../Session/withSession";

import { MessageCreate, Messages } from "../Message";
import "./style.css";

const Landing = ({ session }) => (
  <div>
    <h2>Welcome</h2>
    <hr />
    <h3>
      Where students work closely with their teachers for one on one assistance.
    </h3>
    <h3>FOR STUDENTS</h3>
    <ul>
      <li>
        Receive assignments directly from your teacher in one convenient place
      </li>
      <li>
        Conveniently view assignments due teacher's notes, and upload and
        download files.
      </li>
      <li>Create and share flashcards to study and prepare for exams</li>
      <li>
        Get multiple choice quizzes to reinforce what you have learned -- COMING
        SOON!
      </li>
      <li>
        Send and receive messages with your teacher and other students -- COMING
        SOON!
      </li>
      <li>TEACHERS -- COMING SOON! </li>
      <li>Assign homework for students, with due dates</li>
      <li>
        Create quizzes and flashcards for students to learn -- Quizzes COMING
        SOON
      </li>
      <li>
        Messaging system to contact your teacher or other students -- Coming
        soon!
      </li>
    </ul>
    {session && session.me && <MessageCreate />}
    {session && session.me && <Messages limit={3} />}
  </div>
);

export default withSession(Landing);
