import React, { useState, createRef } from "react";
import { Link } from "react-router-dom";

import withSession from "../../Session/withSession";
import * as routes from "../../../routing/routes";
import * as Styled from "./style";

import student from "../../../assets/student.jpg";
import teacher from "../../../assets/teacher.jpg";
import landflashdeck from "../../../assets/landflashdeck.jpg";
import teacheradmin from "../../../assets/teacheradmin.png";
import assignedtasks from "../../../assets/assignedtasks.jpg";
import teacherassignedtasks from "../../../assets/teacherassignedtasks.jpg";
import editassignment from "../../../assets/editassignment.png";
import dashboard from "../../../assets/dashboard.jpg";
import theme from "../../../assets/theme.jpg";
import cardedit from "../../../assets/cardedit.jpg";
import cardstudy from "../../../assets/cardstudy.png";

const LandingPage = () => {
  const [toggleExplore, setToggleExplore] = useState(false);
  const [toggleStudentTeacher, setToggleStudentTeacher] = useState(0);

  const ref = createRef();

  const handleClick = () => {
    setToggleExplore(toggleExplore === false ? true : false);
  };

  const localTheme = window.localStorage.getItem("theme");

  const toggleStudent = async () => {
    setToggleStudentTeacher(1);
    ref.current.scrollIntoView({
      behaivor: "smooth",
      block: "start",
    });
  };
  const toggleTeacher = () => {
    setToggleStudentTeacher(2);
    ref.current.scrollIntoView({
      behaivor: "smooth",
      block: "start",
    });
  };

  return (
    <Styled.Header>
      <Styled.Menu localTheme={localTheme}>
        <Styled.Title>
          Where students and teachers connect for continued learning outside the
          classroom.
        </Styled.Title>
        <div>
          <Link to={routes.SIGN_UP}>
            <Styled.CTAButton>Sign-Up Free</Styled.CTAButton>
          </Link>
        </div>
        <Styled.SubTitle>
          Sign-up today, or click below to learn more.
        </Styled.SubTitle>
        <Styled.Explore
          onClick={handleClick}
          cursor="pointer"
          hoverColor="white"
        >
          <Styled.ExploreH3Top>Explore Features</Styled.ExploreH3Top>
        </Styled.Explore>
      </Styled.Menu>
      <Styled.HeaderExplore
        localTheme={localTheme}
        toggleExplore={toggleExplore}
      >
        <Styled.ExploreMenu>
          <Styled.ImgContainer>
            <Styled.ButtonUnderlayImg
              src={student}
              toggleExplore={toggleExplore}
              alt="Student"
              student
            />

            <Styled.StudentButton onClick={toggleStudent}>
              I'm a Student
            </Styled.StudentButton>
          </Styled.ImgContainer>
          <Styled.ImgContainer>
            <Styled.ButtonUnderlayImg
              src={teacher}
              toggleExplore={toggleExplore}
              alt="Student"
            />

            <Styled.TeacherButton onClick={toggleTeacher}>
              I'm a Teacher
            </Styled.TeacherButton>
          </Styled.ImgContainer>
        </Styled.ExploreMenu>
        <div ref={ref}></div>
        {toggleStudentTeacher === 1 && (
          <>
            <Styled.Explore>
              <Styled.ExploreH3>
                Create, Find and Share Flashcards
              </Styled.ExploreH3>
              <Styled.ArrowDown />
            </Styled.Explore>
            <Styled.FeatureContainer>
              <Styled.ImgShadow>
                <Styled.Img src={landflashdeck} />
              </Styled.ImgShadow>
              <Styled.ImgContainer>
                <Styled.Featured inputColor="primary">
                  Create, Find and share flashcards to study and prepare for
                  exams.
                </Styled.Featured>
              </Styled.ImgContainer>
            </Styled.FeatureContainer>
            <Styled.Explore>
              <Styled.ExploreH3>
                Receive and Complete Assignments
              </Styled.ExploreH3>
              <Styled.ArrowDown />
            </Styled.Explore>
            <Styled.FeatureContainer>
              <Styled.ImgContainer>
                <Styled.Featured>
                  Download assignments, upload completed work, and view graded
                  files directly from your teacher, to you
                </Styled.Featured>
              </Styled.ImgContainer>
              <Styled.ImgShadow boxShadow="inset 0px 20px 40px 40px rgba(255,255,255,1)">
                <Styled.Img src={assignedtasks} />
              </Styled.ImgShadow>
            </Styled.FeatureContainer>
            <Styled.Explore>
              <Styled.ExploreH3>Convenient Dashboard</Styled.ExploreH3>
              <Styled.ArrowDown />
            </Styled.Explore>
            <Styled.FeatureContainer>
              <Styled.ImgShadow boxShadow="inset 0px -20px 50px 30px rgba(255, 255, 255, 1)">
                <Styled.Img src={dashboard} />
              </Styled.ImgShadow>
              <Styled.ImgContainer>
                <Styled.Featured inputColor="primary">
                  Conveniently view your assignment status and access favorite
                  flashcards decks in one place
                </Styled.Featured>
              </Styled.ImgContainer>
            </Styled.FeatureContainer>
            <Styled.Explore>
              <Styled.ExploreH3>Customize and Edit</Styled.ExploreH3>
              <Styled.ArrowDown />
            </Styled.Explore>
            <Styled.FeatureContainer>
              <Styled.ImgContainer>
                <Styled.Featured>
                  Customize your flashcards and practice them at home or on your
                  morning commute
                </Styled.Featured>
              </Styled.ImgContainer>
              <Styled.ImgShadow boxShadow="inset -10px -20px 35px 40px rgba(255,255,255,1)">
                <Styled.Img src={cardedit} />
              </Styled.ImgShadow>
            </Styled.FeatureContainer>
            <Styled.Explore onClick={handleClick}>
              <Styled.ExploreH3>Explore Even More</Styled.ExploreH3>
              <Styled.ArrowDown />
            </Styled.Explore>
            <Styled.FeatureContainer>
              <Styled.ImgShadow boxShadow="inset 1px 4px 60px -5px rgba(255,255,255,1)">
                <Styled.Img src={theme} />
              </Styled.ImgShadow>
              <Styled.ImgContainer>
                <Styled.FeatureCatchAll>
                  <Styled.List>
                    <Styled.ListItem inputColor="primary">
                      Search for and bookmark your favorite decks
                    </Styled.ListItem>
                    <Styled.Hr />
                    <Styled.ListItem inputColor="secondary">
                      Themes to customize the appearance, including a dark mode
                      for night reading
                    </Styled.ListItem>
                    <Styled.Hr />
                    <Styled.ListItem>
                      Do fun quizzes to reinforce what you have learned --
                      COMING SOON!
                    </Styled.ListItem>
                    <Styled.Hr />
                    <Styled.ListItem>
                      Send and receive messages with your teacher -- COMING
                      SOON!
                    </Styled.ListItem>
                  </Styled.List>
                </Styled.FeatureCatchAll>
              </Styled.ImgContainer>
            </Styled.FeatureContainer>
          </>
        )}
        {toggleStudentTeacher === 2 && (
          <>
            <Styled.Explore>
              <Styled.ExploreH3>Manage Students</Styled.ExploreH3>
              <Styled.ArrowDown />
            </Styled.Explore>
            <Styled.FeatureContainer>
              <Styled.ImgShadow boxShadow="inset 0px -20px 20px 20px rgba(255,255,255,1)">
                <Styled.Img src={teacheradmin} />
              </Styled.ImgShadow>
              <Styled.ImgContainer>
                <Styled.Featured inputColor="primary">
                  Manage Your Students on One Simple Dashboard
                </Styled.Featured>
              </Styled.ImgContainer>
            </Styled.FeatureContainer>
            <Styled.Explore>
              <Styled.ExploreH3>Create Assignments</Styled.ExploreH3>
              <Styled.ArrowDown />
            </Styled.Explore>
            <Styled.FeatureContainer>
              <Styled.ImgContainer>
                <Styled.Featured>
                  Create and edit assignments for your students. Upload
                  documents or share links for tasks you create.
                </Styled.Featured>
              </Styled.ImgContainer>
              <Styled.ImgShadow boxShadow="inset 0px 20px 40px 40px rgba(255,255,255,1)">
                <Styled.Img src={editassignment} />
              </Styled.ImgShadow>
            </Styled.FeatureContainer>
            <Styled.Explore>
              <Styled.ExploreH3>Assigned Tasks At A Glance</Styled.ExploreH3>
              <Styled.ArrowDown />
            </Styled.Explore>
            <Styled.FeatureContainer>
              <Styled.ImgShadow boxShadow="inset 0px -20px 50px 30px rgba(255, 255, 255, 1)">
                <Styled.Img src={teacherassignedtasks} />
              </Styled.ImgShadow>
              <Styled.ImgContainer>
                <Styled.Featured inputColor="primary">
                  Monitor and update assigned tasks for students
                </Styled.Featured>
              </Styled.ImgContainer>
            </Styled.FeatureContainer>
            <Styled.Explore>
              <Styled.ExploreH3>Flashcards</Styled.ExploreH3>
              <Styled.ArrowDown />
            </Styled.Explore>
            <Styled.FeatureContainer>
              <Styled.ImgContainer>
                <Styled.Featured>
                  Create and customize flashcard decks for students to practice
                </Styled.Featured>
              </Styled.ImgContainer>
              <Styled.ImgShadow boxShadow="inset -10px 20px 35px 40px rgba(255,255,255,1)">
                <Styled.Img src={cardstudy} />
              </Styled.ImgShadow>
            </Styled.FeatureContainer>
            <Styled.Explore onClick={handleClick}>
              <Styled.ExploreH3>Explore Even More</Styled.ExploreH3>
              <Styled.ArrowDown />
            </Styled.Explore>
            <Styled.FeatureContainer>
              <Styled.ImgShadow boxShadow="inset 1px 4px 60px -5px rgba(255,255,255,1)">
                <Styled.Img src={theme} />
              </Styled.ImgShadow>
              <Styled.ImgContainer>
                <Styled.FeatureCatchAll>
                  <Styled.List>
                    <Styled.ListItem inputColor="primary">
                      Themes to customize the appearance, including a dark mode
                      for night reading
                    </Styled.ListItem>
                    <Styled.Hr />
                    <Styled.ListItem inputColor="secondary">
                      Use the same tools you use with your students for
                      self-study
                    </Styled.ListItem>
                    <Styled.Hr />
                    <Styled.ListItem>
                      Create quizzes to assign your students -- COMING SOON!
                    </Styled.ListItem>
                    <Styled.Hr />
                    <Styled.ListItem>
                      Send and receive messages with your students -- COMING
                      SOON!
                    </Styled.ListItem>
                  </Styled.List>
                  <div>
                    <Link to={routes.SIGN_UP}>
                      <Styled.CTAButton>Sign-Up Free</Styled.CTAButton>
                    </Link>
                  </div>
                </Styled.FeatureCatchAll>
              </Styled.ImgContainer>
            </Styled.FeatureContainer>
          </>
        )}
      </Styled.HeaderExplore>
    </Styled.Header>
  );
};

export default withSession(LandingPage);
