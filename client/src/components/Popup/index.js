import React from "react";

const Popup = () => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleSuccess @client
      togglePopup @client
      isCard @client
    }
  `);
  const { togglePopup, isCard, isDeck } = data;

  const togglePopupModal = () => {
    client.writeData({
      data: { togglePopup: !togglePopup, isCard: false, isDeck: false }
    });
  };
  const innerRef = useRef(null);
  useOuterClickNotifier(togglePopupModal, innerRef);

  return (
    <Styled.PopupContainer>
      <Styled.PopupInnerExtended ref={innerRef}>
        <Styled.PopupFooterButton onClick={togglePopupModal}>
          Close
        </Styled.PopupFooterButton>
      </Styled.PopupInnerExtended>
    </Styled.PopupContainer>
  );
};

export default Popup;
