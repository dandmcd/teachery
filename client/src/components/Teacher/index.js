import React from "react";
import withAuthorization from "../Session/withAuthorization";
import styled from "styled-components";
import Teacher from "./Teachers";
import Footer from "../Footer";

const TeacherPage = () => {
  return (
    <Container>
      <Teacher />
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  z-index: 15;
  max-width: 100%;
  margin: auto;
`;

export default withAuthorization(
  (session) =>
    (session && session.me && session.me.role === "TEACHER") ||
    (session && session.me && session.me.role === "ADMIN")
)(TeacherPage);
