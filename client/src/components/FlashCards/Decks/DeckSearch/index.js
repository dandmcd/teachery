import React, { useState, useRef } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";

import * as Styled from "../../../../theme/Popup";

import TagLink from "../DeckItem/DeckTags/TagLink";
import search from "../../../../assets/search.png";
import useOuterClickNotifier from "../../../Alerts";
import Loading from "../../../Loading";
import ErrorMessage from "../../../Alerts/Error";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchImg = styled.img`
  height: 15px;
  width: 15px;
`;

const SearchInput = styled.input`
  height: 35px;
  border: 0;
  outline: 0;
  border-bottom: 2px solid ${props => props.theme.primary};
`;

const TAG_SEARCH_QUERY = gql`
  query tag($tagName: String!) {
    getTagsByName(tagName: $tagName) {
      tagName
      id
    }
  }
`;

const Search = () => {
  const client = useApolloClient();
  const [tags, setTags] = useState([]);
  const [state, setState] = useState({
    tagName: "",
    showPopup: false,
    noResult: false
  });

  const { tagName } = state;

  const togglePopup = () => {
    setState({ tagName: tagName, showPopup: !state.showPopup });
  };

  const onChange = e => setState({ tagName: e.target.value, noResult: false });

  const onClick = async e => {
    e.preventDefault();
    setState({ noResult: false });
    setTags([]);
    const { data, loading, error } = await client.query({
      query: TAG_SEARCH_QUERY,
      variables: { tagName }
    });
    if (loading || !data) {
      return <Loading />;
    }
    if (error) {
      return <ErrorMessage error={error} />;
    }
    if (tagName === "") {
      setState({ noResult: true });
    } else if (data.getTagsByName.length === 0) {
      setState({ tagName: tagName, noResult: true });
    } else {
      setState({ showPopup: true });
      setTags(data.getTagsByName);
      setState({ tagName: tagName, showPopup: true });
    }
  };

  const innerRef = useRef(null);
  useOuterClickNotifier(
    e => setState({ showPopup: false, tagName: tagName }),
    innerRef
  );

  return (
    <SearchContainer>
      <SearchInput
        name="tagName"
        type="text"
        defaultValue={tagName}
        onChange={onChange}
        placeholder="Search by language or tag"
      />
      <SearchImg src={search} alt="Search" onClick={onClick} />
      <div>
        {console.log(tags)}
        {state.noResult && (
          <p>Sorry, your search did not find any results...</p>
        )}
        {state.showPopup ? (
          <Styled.PopupContainer>
            <Styled.PopupInner ref={innerRef}>
              <Styled.PopupTitle>
                Tags that match {tagName} ...
              </Styled.PopupTitle>
              <Styled.PopupBody>
                {tags.map(tag => (
                  <TagLink key={tag.id} tag={tag} />
                ))}
              </Styled.PopupBody>
              <Styled.PopupFooterButton onClick={togglePopup}>
                Close
              </Styled.PopupFooterButton>
            </Styled.PopupInner>
          </Styled.PopupContainer>
        ) : null}
      </div>
    </SearchContainer>
  );
};

export default Search;
