import React from "react";
import styled from "styled-components";

import useWindowDimensions from "../../../../utilities/useWindowDimensions";
import Button from "../../../../theme/Button";
import liked from "../../../../assets/liked.png";
import like from "../../../../assets/like.png";
import { useAtom } from "jotai";
import { bookmarkAtom } from "../../../../state/store";

const DeckBookmarks = () => {
  const [bookmark, setBookmark] = useAtom(bookmarkAtom);
  const { toggleBookmarks, linkedToPage } = bookmark;

  const toggleBookmarkedDecks = async () => {
    setBookmark(
      (a) =>
        (a = {
          ...a,
          toggleBookmarks: !toggleBookmarks,
          linkedToPage: !linkedToPage,
        })
    );
  };

  const { width } = useWindowDimensions();

  return (
    <ViewButtonWrapper>
      {width < 800 ? (
        <MobileBookmarkButton
          type="button"
          onClick={(e) => toggleBookmarkedDecks(e)}
        >
          {toggleBookmarks ? (
            <>
              <LikeIcon src={like} />
            </>
          ) : (
            <>
              <LikeIcon src={liked} />
            </>
          )}
        </MobileBookmarkButton>
      ) : (
        <ViewBookmarkDecksButton
          type="button"
          onClick={(e) => toggleBookmarkedDecks(e)}
        >
          {toggleBookmarks ? (
            "View All"
          ) : (
            <Flex>
              <LikeIcon src={liked} /> My Saved Decks
            </Flex>
          )}
        </ViewBookmarkDecksButton>
      )}
    </ViewButtonWrapper>
  );
};

const ViewButtonWrapper = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
`;

const ViewBookmarkDecksButton = styled(Button)`
  border: 2px solid ${(props) => props.theme.secondaryDark};
  width: 175px;
  -ms-flex-item-align: end;
  align-self: flex-end;
`;

const MobileBookmarkButton = styled(Button)`
  border: 2px solid ${(props) => props.theme.neutralLight};
  height: 36;
  :hover {
    color: white;
    background: ${(props) => props.theme.neutralLight};
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  @media only screen and (max-width: 480px) {
    width: 75px;
  }
`;

const Flex = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
`;

const LikeIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 0.5em;
  @media only screen and (max-width: 800px) {
    width: 24px;
    height: 24px;
  }
`;

export default DeckBookmarks;
