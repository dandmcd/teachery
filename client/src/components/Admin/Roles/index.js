import React, { useState, useRef, useEffect, Fragment } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";

import useOuterClickNotifier from "../../Alerts/OuterClickNotifier";
import ErrorMessage from "../../Alerts/Error";
import Loading from "../../Alerts/Loading";
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
  mutation($login: String!, $role: Role!) {
    updateUserRole(login: $login, role: $role)
  }
`;

const INITIAL_STATE = {
  login: "",
  role: "STUDENT"
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

  const [{ login, role }, setState] = useState(INITIAL_STATE);

  // useEffect for future use
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
    try {
      await updateUserRole({
        variables: {
          login: login,
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
    <Fragment>
      <Button type="button" onClick={togglePopupModal}>
        Change Role
      </Button>
      {toggleRoleChange ? (
        <Styled.PopupContainer>
          <Styled.PopupInnerExtended ref={innerRef}>
            <Styled.PopupHeader>
              <Styled.PopupTitle>Change user role ...</Styled.PopupTitle>
              <Styled.PopupFooterButton onClick={togglePopupModal}>
                <Styled.CloseSpan />
              </Styled.PopupFooterButton>
            </Styled.PopupHeader>
            <Styled.PopupBody>
              <form onSubmit={e => onSubmit(e, updateUserRole)}>
                <Styled.Label>
                  <Styled.Span>
                    <Styled.LabelName>
                      Enter an Email or Username
                    </Styled.LabelName>
                  </Styled.Span>
                  <Styled.Input
                    name="login"
                    value={login}
                    onChange={onChange}
                    type="text"
                  />
                </Styled.Label>
                <Styled.Select>
                  <Styled.SelectBox
                    name="role"
                    value={role}
                    onChange={onChange}
                    type="text"
                  >
                    <option value="" disabled>
                      Select Role
                    </option>
                    {menuItems.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </Styled.SelectBox>
                </Styled.Select>
                {loading && <Loading />}
                <Styled.Submission>
                  <Styled.SubmitButton type="submit">
                    Submit
                  </Styled.SubmitButton>
                </Styled.Submission>
                {toggleSuccess && (
                  <SuccessMessage message="User role updated!" />
                )}
                {error && <ErrorMessage error={error} />}
              </form>
            </Styled.PopupBody>
          </Styled.PopupInnerExtended>
        </Styled.PopupContainer>
      ) : null}
    </Fragment>
  );
};

export default RoleChange;
