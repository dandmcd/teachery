import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useAtom } from "jotai";
import { modalAtom, successAlertAtom } from "../../../state/store";

import ErrorMessage from "../../Alerts/Error";
import Loading from "../../Alerts/Loading";
import SuccessMessage from "../../Alerts/Success";
import * as Styled from "../../../theme/Popup";
import Button from "../../../theme/Button";
import Modal from "../../Modal";

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
  role: "STUDENT",
};

const RoleChange = () => {
  const [modal, setModal] = useAtom(modalAtom);
  const { toggleOn, target } = modal;

  const [successAlert, setSuccessAlert] = useAtom(successAlertAtom);

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

  const [updateUserRole, { loading, error }] = useMutation(ROLE_CHANGE, {
    onError: (err) => {
      setSuccessAlert((a) => (a = false));
    },
    onCompleted: (data) => {
      setSuccessAlert((a) => (a = true));
    },
  });

  useEffect(() => {
    if (successAlert) {
      setTimeout(() => {
        setSuccessAlert((a) => (a = false));
      }, 5000);
    }
  }, [successAlert, setSuccessAlert]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e, updateUserRole) => {
    e.preventDefault();
    try {
      await updateUserRole({
        variables: {
          login: login,
          role: role,
        },
      }).then(async ({ data }) => {
        setState({ ...INITIAL_STATE });
      });
    } catch {}
  };

  const toggleOnModal = (e) => {
    setModal(
      (m) =>
        (m = {
          ...m,
          toggleOn: true,
          target: e.target.id,
        })
    );
  };

  const toggleOffModal = () => {
    setModal((m) => (m = { ...m, toggleOn: false, editImg: false }));
  };

  return (
    <>
      <Button id="role" type="button" onClick={toggleOnModal}>
        Change Role
      </Button>
      {toggleOn && target === "role" ? (
        <Modal toggleOn={toggleOn} onToggleOffModal={toggleOffModal}>
          <Styled.PopupHeader>
            <Styled.PopupTitle>Change user role ...</Styled.PopupTitle>
            <Styled.PopupFooterButton onClick={toggleOffModal}>
              <Styled.CloseSpan />
            </Styled.PopupFooterButton>
          </Styled.PopupHeader>
          <Styled.PopupBody>
            <form onSubmit={(e) => onSubmit(e, updateUserRole)}>
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
                <Styled.SubmitButton type="submit">Submit</Styled.SubmitButton>
              </Styled.Submission>
              {successAlert && <SuccessMessage message="User role updated!" />}
              {error && <ErrorMessage error={error} />}
            </form>
          </Styled.PopupBody>
        </Modal>
      ) : null}
    </>
  );
};

export default RoleChange;
