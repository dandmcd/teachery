import React from "react";

import useWindowDimensions from "../../../../utilities/useWindowDimensions";
import liked from "../../../../assets/liked.png";
import like from "../../../../assets/like.png";
import { useAtom } from "jotai";
import { bookmarkAtom } from "../../../../state/store";
import * as Styled from "./style";

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
    <Styled.ViewButtonWrapper>
      {width < 800 ? (
        <Styled.MobileBookmarkButton
          type="button"
          onClick={(e) => toggleBookmarkedDecks(e)}
        >
          {toggleBookmarks ? (
            <>
              <Styled.LikeIcon src={like} />
            </>
          ) : (
            <>
              <Styled.LikeIcon src={liked} />
            </>
          )}
        </Styled.MobileBookmarkButton>
      ) : (
        <Styled.ViewBookmarkDecksButton
          type="button"
          onClick={(e) => toggleBookmarkedDecks(e)}
        >
          {toggleBookmarks ? (
            "View All"
          ) : (
            <Styled.Flex>
              <Styled.LikeIcon src={liked} /> My Saved Decks
            </Styled.Flex>
          )}
        </Styled.ViewBookmarkDecksButton>
      )}
    </Styled.ViewButtonWrapper>
  );
};

export default DeckBookmarks;
