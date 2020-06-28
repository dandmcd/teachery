import React, { useState, useContext, createRef } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import styled, { ThemeContext } from "styled-components";

import withSession from "../Session/withSession";
import student from "../../assets/student.jpg";
import teacher from "../../assets/teacher.jpg";
import landflashdeck from "../../assets/landflashdeck.jpg";
import teacheradmin from "../../assets/teacheradmin.png";
import assignedtasks from "../../assets/assignedtasks.jpg";
import teacherassignedtasks from "../../assets/teacherassignedtasks.jpg";
import editassignment from "../../assets/editassignment.png";
import dashboard from "../../assets/dashboard.jpg";
import dkthemebookmark from "../../assets/dkthemebookmark.jpg";
import * as routes from "../../routing/routes";
import Button from "../../theme/Button";
import noise from "../../assets/noisy-texture.png";
import darkNoise from "../../assets/dark-noisy-texture.png";
import theme from "../../assets/theme.jpg";
import cardedit from "../../assets/cardedit.jpg";
import cardstudy from "../../assets/cardstudy.png";
import { ReactComponent as Texture } from "../../assets/texture.svg";

const Landing = () => {
  const [toggleExplore, setToggleExplore] = useState(false);
  const [toggleStudentTeacher, setToggleStudentTeacher] = useState(0);

  const themeContext = useContext(ThemeContext);
  console.log(themeContext);

  const ref = createRef();

  const handleClick = () => {
    setToggleExplore(toggleExplore === false ? true : false);
  };

  const onClick = () => {
    ref.current.scrollIntoView({
      behaivor: "smooth",
      block: "start",
    });
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
    <Header>
      <Menu localTheme={localTheme}>
        <Title>
          Where students and teachers connect for continued learning outside the
          classroom.
        </Title>
        <div>
          <CTAButton>Sign-Up Free</CTAButton>
        </div>
        <SubTitle>Sign-up today, or click below to learn more.</SubTitle>
        <Explore onClick={handleClick} cursor="pointer" hoverColor="white">
          <ExploreH3>Explore Features</ExploreH3>
        </Explore>
      </Menu>
      <HeaderExplore localTheme={localTheme} toggleExplore={toggleExplore}>
        <ExploreMenu>
          <ImgContainer>
            <ButtonUnderlayImg
              src={student}
              toggleExplore={toggleExplore}
              alt="Student"
              student
            />

            <StudentButton onClick={toggleStudent}>I'm a Student</StudentButton>
          </ImgContainer>
          <ImgContainer>
            <ButtonUnderlayImg
              src={teacher}
              toggleExplore={toggleExplore}
              alt="Student"
            />

            <TeacherButton onClick={toggleTeacher}>I'm a Teacher</TeacherButton>
          </ImgContainer>
        </ExploreMenu>
        <div ref={ref}></div>
        {toggleStudentTeacher === 1 && (
          <>
            <Explore>
              <ExploreH3>Create, Find and Share Flashcards</ExploreH3>
              <ArrowDown />
            </Explore>
            <FeatureContainer>
              <ImgShadow>
                <Img src={landflashdeck} />
              </ImgShadow>
              <ImgContainer>
                <Featured inputColor="primary">
                  Create, Find and share flashcards to study and prepare for
                  exams.
                </Featured>
              </ImgContainer>
            </FeatureContainer>
            <Explore>
              <ExploreH3>Receive and Complete Assignments</ExploreH3>
              <ArrowDown />
            </Explore>
            <FeatureContainer>
              <ImgContainer>
                <Featured>
                  Download assignments, upload completed work, and view graded
                  files directly from your teacher, to you
                </Featured>
              </ImgContainer>
              <ImgShadow boxShadow="inset 0px 20px 40px 40px rgba(255,255,255,1)">
                <Img src={assignedtasks} />
              </ImgShadow>
            </FeatureContainer>
            <Explore>
              <ExploreH3>Convenient Dashboard</ExploreH3>
              <ArrowDown />
            </Explore>
            <FeatureContainer>
              <ImgShadow boxShadow="inset 0px -20px 50px 30px rgba(255, 255, 255, 1)">
                <Img src={dashboard} />
              </ImgShadow>
              <ImgContainer>
                <Featured inputColor="primary">
                  Conveniently view your assignment status and access favorite
                  flashcards decks in one place
                </Featured>
              </ImgContainer>
            </FeatureContainer>
            <Explore>
              <ExploreH3>Customize and Edit</ExploreH3>
              <ArrowDown />
            </Explore>
            <FeatureContainer>
              <ImgContainer>
                <Featured>
                  Customize your flashcards and practice them at home or on your
                  morning commute
                </Featured>
              </ImgContainer>
              <ImgShadow boxShadow="inset -10px -20px 35px 40px rgba(255,255,255,1)">
                <Img src={cardedit} />
              </ImgShadow>
            </FeatureContainer>
            <Explore onClick={handleClick}>
              <ExploreH3>Explore Even More</ExploreH3>
              <ArrowDown />
            </Explore>
            <FeatureContainer>
              <ImgShadow boxShadow="inset 1px 4px 60px -5px rgba(255,255,255,1)">
                <Img src={theme} />
              </ImgShadow>
              <ImgContainer>
                <FeatureCatchAll>
                  <List>
                    <ListItem inputColor="primary">
                      Search for and bookmark your favorite decks
                    </ListItem>
                    <Hr />
                    <ListItem inputColor="secondary">
                      Themes to customize the appearance, including a dark mode
                      for night reading
                    </ListItem>
                    <Hr />
                    <ListItem>
                      Do fun quizzes to reinforce what you have learned --
                      COMING SOON!
                    </ListItem>
                    <Hr />
                    <ListItem>
                      Send and receive messages with your teacher -- COMING
                      SOON!
                    </ListItem>
                  </List>
                </FeatureCatchAll>
              </ImgContainer>
            </FeatureContainer>
          </>
        )}
        {toggleStudentTeacher === 2 && (
          <>
            <Explore>
              <ExploreH3>Manage Students</ExploreH3>
              <ArrowDown />
            </Explore>
            <FeatureContainer>
              <ImgShadow boxShadow="inset 0px -20px 20px 20px rgba(255,255,255,1)">
                <Img src={teacheradmin} />
              </ImgShadow>
              <ImgContainer>
                <Featured inputColor="primary">
                  Manage Your Students on One Simple Dashboard
                </Featured>
              </ImgContainer>
            </FeatureContainer>
            <Explore>
              <ExploreH3>Create Assignments</ExploreH3>
              <ArrowDown />
            </Explore>
            <FeatureContainer>
              <ImgContainer>
                <Featured>
                  Create and edit assignments for your students. Upload
                  documents or share links for tasks you create.
                </Featured>
              </ImgContainer>
              <ImgShadow boxShadow="inset 0px 20px 40px 40px rgba(255,255,255,1)">
                <Img src={editassignment} />
              </ImgShadow>
            </FeatureContainer>
            <Explore>
              <ExploreH3>Assigned Tasks At A Glance</ExploreH3>
              <ArrowDown />
            </Explore>
            <FeatureContainer>
              <ImgShadow boxShadow="inset 0px -20px 50px 30px rgba(255, 255, 255, 1)">
                <Img src={teacherassignedtasks} />
              </ImgShadow>
              <ImgContainer>
                <Featured inputColor="primary">
                  Monitor and update assigned tasks for students
                </Featured>
              </ImgContainer>
            </FeatureContainer>
            <Explore>
              <ExploreH3>Flashcards</ExploreH3>
              <ArrowDown />
            </Explore>
            <FeatureContainer>
              <ImgContainer>
                <Featured>
                  Create and customize flashcard decks for students to practice
                </Featured>
              </ImgContainer>
              <ImgShadow boxShadow="inset -10px 20px 35px 40px rgba(255,255,255,1)">
                <Img src={cardstudy} />
              </ImgShadow>
            </FeatureContainer>
            <Explore onClick={handleClick}>
              <ExploreH3>Explore Even More</ExploreH3>
              <ArrowDown />
            </Explore>
            <FeatureContainer>
              <ImgShadow boxShadow="inset 1px 4px 60px -5px rgba(255,255,255,1)">
                <Img src={theme} />
              </ImgShadow>
              <ImgContainer>
                <FeatureCatchAll>
                  <List>
                    <ListItem inputColor="primary">
                      Themes to customize the appearance, including a dark mode
                      for night reading
                    </ListItem>
                    <Hr />
                    <ListItem inputColor="secondary">
                      Use the same tools you use with your students for
                      self-study
                    </ListItem>
                    <Hr />
                    <ListItem>
                      Create quizzes to assign your students -- COMING SOON!
                    </ListItem>
                    <Hr />
                    <ListItem>
                      Send and receive messages with your students -- COMING
                      SOON!
                    </ListItem>
                  </List>
                </FeatureCatchAll>
              </ImgContainer>
            </FeatureContainer>
          </>
        )}
      </HeaderExplore>
    </Header>
  );
};

const ImgContainer = styled.div`
  margin: 0 auto;
  position: relative;
  display: flex;
`;

const Featured = styled.h1`
  width: 80%;
  text-align: center;
  font-weight: 200;
  line-height: 1.8em;
  margin: 0 auto;
  color: ${(props) => props.theme[props.inputColor] || props.theme.secondary};
`;

const FeatureCatchAll = styled.h2`
  width: 80%;
  text-align: center;
  font-weight: 200;
  line-height: 1.8em;
  margin: 0 auto;
`;

const List = styled.ul`
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  color: ${(props) => props.theme[props.inputColor] || props.theme.textLight};
  line-height: 1.6em;
  margin: 0.8em auto;
`;

const FeatureContainer = styled.div`
  margin: 0 auto;
  padding: 3em 0 3em 0;
  position: relative;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${(props) => props.theme.appBody};
`;

const ImgShadow = styled.div`
  overflow: hidden;
  display: flex;
  position: relative;
  border-radius: 5px;
  ::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    box-shadow: ${(props) =>
      props.boxShadow || "inset 0px 20px 50px 50px rgba(255, 255, 255, 1)"};
  }
`;

const Hr = styled.hr`
  padding: 0;
  margin: 0;
  border: none;
  height: 2px;
  width: 100%;
  background-image: -webkit-linear-gradient(
    left,
    ${(props) => props.theme.neutralLight},
    ${(props) => props.theme.container}
  );
`;

const Header = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  background-clip: border-box;
  width: 100%;
  margin: auto auto 5px auto;
  display: inline-block;
`;

const HeaderExplore = styled.div`
  opacity: ${(props) => (props.toggleExplore ? 1 : 0.1)};
  background-clip: border-box;
  background-image: ${(props) =>
    props.localTheme === "dark" ? `url(${darkNoise})` : `url(${noise})`};
  width: 100%;
  margin: auto auto ${(props) => (props.toggleExplore ? "5em" : 0)} auto;
  display: inline-block;
  background-color: ${(props) => props.theme.neutralLight};
  transition: all 1s linear;
`;

const Menu = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  align-items: center;
  max-width: 1100px;
  padding-top: 2em;
  margin: 0 auto;
  background-repeat: repeat;
  background-size: 100px 100px;
  background-image: ${(props) =>
    props.localTheme === "dark" ? `url(${darkNoise})` : `url(${noise})`};
  @media only screen and (max-width: 675px) {
    margin: 2em auto;
  }
`;

const ExploreMenu = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: relative;
  -webkit-box-pack: space-evenly;
  -ms-flex-pack: space-evenly;
  justify-content: space-evenly;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  max-width: 1100px;
  padding: 2em 0;
  margin: 0 auto 5em auto;
  border-radius: 4px;
  background-color: ${(props) => props.theme.appBody};
`;

const Title = styled.h1`
  margin: 0;
  padding: 0.5em;
  font-weight: 600;
  text-align: center;
  @media only screen and (max-width: 675px) {
    -ms-flex-item-align: end;
    align-self: flex-end;
  }
`;

const SubTitle = styled.h2`
  margin: 0;
  padding: 0.5em;
  font-weight: 600;
  text-align: center;
  @media only screen and (max-width: 675px) {
    -ms-flex-item-align: end;
    align-self: flex-end;
  }
`;

const CTAButton = styled(Button)`
  width: auto;
  font-size: 24px;
  background-color: ${(props) => props.theme.appBody};
  margin: 2.5em 0.2em 0.8em 0.2em;
`;

const Explore = styled.div`
  margin: 2.2em auto 0 auto;
  cursor: ${(props) => props.cursor || "default"};
`;

const ExploreH3 = styled.h3`
  margin: 0 auto;
  font-size: 22px;
  padding: 0.3em;
  font-weight: 400;
  text-align: center;
  color: ${(props) => props.theme.primaryDark};
  :hover {
    color: ${(props) => props.hoverColor || props.theme.primaryDark};
  }
  @media only screen and (max-width: 675px) {
    -ms-flex-item-align: end;
    align-self: flex-end;
  }
`;

const ArrowDown = styled.i`
  z-index: 15;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 22px;
  height: 22px;
  ${Explore}:hover & {
    -webkit-transform: scale(1.1);
    transform: all scale(1.1);
  }
  ::after,
  ::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    bottom: 4px;
  }
  ::after {
    width: 8px;
    height: 8px;
    border-bottom: 2px solid;
    border-left: 2px solid;
    transform: rotate(-45deg);
    left: 7px;
  }
  ::before {
    width: 2px;
    height: 20px;
    left: 10px;
    background: ${(props) => props.theme.primaryDark};
  }
`;
const StudentButton = styled(Button)`
  font-size: 22px;
  font-weight: 600;
  z-index: 16;
  position: absolute;
  top: 65%;
  left: 50%;
  padding: inherit;
  transform: translate(-50%, -50%);
  width: 80%;
  border: 2px solid ${(props) => props.theme.primaryLight};
  background-color: rgba(255, 255, 255, 0.7);
  :hover {
    color: white;
    background: ${(props) => props.theme.secondary};
    transform: translate(-50%, -50%) scale(1.05);
  }
`;

const TeacherButton = styled(Button)`
  font-size: 22px;
  font-weight: 600;
  z-index: 16;
  position: absolute;
  top: 65%;
  left: 50%;
  padding: inherit;
  transform: translate(-50%, -50%);
  width: 80%;

  border: 2px solid ${(props) => props.theme.primaryLight};
  background-color: rgba(255, 255, 255, 0.7);
  :hover {
    color: white;
    background: ${(props) => props.theme.secondary};
    transform: translate(-50%, -50%) scale(1.05);
  }
`;

const ButtonUnderlayImg = styled.img`
  position: relative;
  vertical-align: middle;
  margin: 0 auto;
  width: 95%;
  border-radius: ${(props) => (props.student ? "4px 0 0 4px" : "0 4px 4px 0")};
  filter: ${(props) => (props.toggleExplore ? "blur(0)" : "blur(3px)")};
`;

const Img = styled.img`
  position: relative;
  vertical-align: middle;
  margin: 0 auto;
  width: 95%;
  border-radius: 5px;
`;

export default withSession(Landing);
