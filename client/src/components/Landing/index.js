import React, { useState } from "react";
import { Link } from "react-router-dom";

import withSession from "../Session/withSession";
import "./style.css";
import student from "../../assets/student.jpg";
import teacher from "../../assets/teacher.jpg";
import * as routes from "../../constants/routes";

import { MessageCreate, Messages } from "../Message";

const Landing = () => {
  const [toggleST, setToggleST] = useState(0);

  const handleStudentClick = () => {
    setToggleST(1);
  };

  const handleTeacherClick = () => {
    setToggleST(2);
  };

  return (
    <div>
      <MessageCreate />
      <Messages limit={3} />
      <h2>Welcome</h2>
      <hr />
      <table>
        <caption>
          Where students and teachers can connect for continued learning outside
          the classroom. Click Students or Teachers below to learn more what
          Teachery offers.
        </caption>
        <thead>
          <tr>
            <th>
              <h3 onClick={handleStudentClick}>STUDENTS</h3>
            </th>
            <th>
              <h3 onClick={handleTeacherClick}>TEACHERS</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                src={student}
                alt="Student"
                className="src"
                width="300"
                height="225"
                onClick={handleStudentClick}
              />
            </td>
            <td>
              <img
                src={teacher}
                alt="Teacher"
                className="src"
                width="300"
                height="225"
                onClick={handleTeacherClick}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {toggleST === 1 && (
        <ul>
          <h3>FOR STUDENTS</h3>
          <li>
            Receive assignments directly from your teacher in one convenient
            place
          </li>
          <li>
            Conveniently view assignments due teacher's notes, and upload and
            download files.
          </li>
          <li>Create and share flashcards to study and prepare for exams</li>
          <li>
            Get multiple choice quizzes to reinforce what you have learned --
            COMING SOON!
          </li>
          <li>
            Send and receive messages with your teacher and other students --
            COMING SOON!
          </li>
          <li>
            {" "}
            Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
          </li>
        </ul>
      )}
      {toggleST === 2 && (
        <ul>
          <h3>TEACHERS -- COMING SOON! </h3>
          <li>Assign homework for students, with due dates</li>
          <li>
            Create quizzes and flashcards for students to learn -- Quizzes
            COMING SOON
          </li>
          <li>
            Messaging system to contact your teacher or other students -- Coming
            soon!
          </li>
          <li>
            {" "}
            Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
export default withSession(Landing);
