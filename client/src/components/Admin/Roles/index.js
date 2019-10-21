import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";

import useOuterClickNotifier from "../../Alerts";
import ErrorMessage from "../../Alerts/Error";
import Loading from "../../Loading";
import SuccessMessage from "../../Alerts/Success";
import * as Styled from "../../../theme/Popup";
import Button from "../../../theme/Button";

const ROLE_ENUM = gql`
  query {
    __type(name: "Role") {
      name
      enumValues {
        name
      }
    }
  }
`;

const ROLE_CHANGE = gql`
  mutation($email: String!, $role: Role) {
    updateUserRole(email: $email, role: $role)
  }
`;

const INITIAL_STATE = {
  email: "",
  role: ""
};

const RoleChange = () => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleSuccess @client
      toggleRoleChange @client
    }
  `);
  const { toggleSuccess, toggleRoleChange } = data;

  const { data: enumData, loading: enumLoading, error: enumError } = useQuery(
    ROLE_ENUM
  );
  let menuItems = [];
  if (enumLoading || enumError) {
    menuItems = [];
  } else {
    menuItems = enumData.__type.enumValues;
  }

  const [{ email, role }, setState] = useState(INITIAL_STATE);
  /*
    useEffect(() => {
        if (email) {
          setState({
            email: email,
role: ""
          });
        }
      }, [id]);
*/

  const [updateUserRole, { loading, error }] = useMutation(ROLE_CHANGE, {
    onError: err => {
      client.writeData({ data: { toggleSuccess: false } });
    },
    onCompleted: data => {
      client.writeData({ data: { toggleSuccess: true } });
    }
  });

  useEffect(() => {
    if (toggleSuccess) {
      setTimeout(() => {
        client.writeData({ data: { toggleSuccess: !toggleSuccess } });
      }, 5000);
    }
  }, [client, toggleSuccess]);

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e, updateUserRole) => {
    e.preventDefault();
    console.log(data);
    try {
      await updateUserRole({
        variables: {
          email: email,
          role: role
        }
      }).then(async ({ data }) => {
        setState({ ...INITIAL_STATE });
      });
    } catch {}
  };

  const togglePopupModal = () => {
    client.writeData({ data: { toggleRoleChange: !toggleRoleChange } });
  };
  const innerRef = useRef(null);
  useOuterClickNotifier(togglePopupModal, innerRef);

  return (
    <Container>
      <RoleButton type="button" onClick={togglePopupModal}>
        Change Role
      </RoleButton>
      {toggleRoleChange ? (
        <Styled.PopupContainer>
          <Styled.PopupInnerExtended ref={innerRef}>
            <Styled.PopupTitle>Change user role ...</Styled.PopupTitle>
            <Styled.PopupBody>
              <form onSubmit={e => onSubmit(e, updateUserRole)}>
                <Styled.Input
                  name="email"
                  value={email}
                  onChange={onChange}
                  type="email"
                  placeholder="Enter email of user"
                />
                <select
                  name="role"
                  value={role}
                  onChange={onChange}
                  type="text"
                  placeholder="Set role for user"
                >
                  <option value="" disabled>
                    Select status
                  </option>
                  {menuItems.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <Button type="submit">Submit</Button>
                {loading && <Loading />}
                {toggleSuccess && (
                  <SuccessMessage message="User role updated!" />
                )}
                {error && <ErrorMessage error={error} />}
              </form>
            </Styled.PopupBody>
            <Styled.PopupFooterButton onClick={togglePopupModal}>
              Close
            </Styled.PopupFooterButton>
          </Styled.PopupInnerExtended>
        </Styled.PopupContainer>
      ) : null}
    </Container>
  );
};

const Container = styled.div``;

const RoleButton = styled(Button)`
  font-size: 10px;
`;

export default RoleChange;
