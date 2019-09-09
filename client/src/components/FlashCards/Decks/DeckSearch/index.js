import React, { useState, useRef } from "react";
import { useApolloClient } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import Button from "../../../../theme/Button";

import TagLink from "../DeckItem/DeckTags/TagLink";
import search from "../../../../assets/search.png";
import useOuterClickNotifier from "../../../Alerts";
import Popup from "../../../Popup";

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

const SearchButton = styled(Button)`
  width: 32px;
  height: 20px;
  padding: 0;
  border: 2px solid #232323;
  font-size: 0.7em;
`;

const PopupContainer = styled.div`
  position: fixed;
  z-index: 40;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PopupInner = styled.div`
  position: absolute;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: auto;
  border-radius: 20px;
  background: white;
  text-align: center;
`;

const PopupTitle = styled.h1`
  text-align: center;
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
  console.log(tagName);

  const onClick = async e => {
    e.preventDefault();
    setState({ noResult: false });
    setTags([]);
    const { data } = await client.query({
      query: TAG_SEARCH_QUERY,
      variables: { tagName }
    });
    if (tagName === "") {
      setState({ noResult: true });
    } else if (data.getTagsByName.length === 0) {
      setState({ tagName: tagName, noResult: true });
    } else {
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
          <PopupContainer>
            <PopupInner ref={innerRef}>
              <PopupTitle>Tags that match {tagName} ...</PopupTitle>
              {tags.map(tag => (
                <TagLink key={tag.id} tag={tag} />
              ))}
              <button onClick={togglePopup}>close me</button>
            </PopupInner>
          </PopupContainer>
        ) : null}
      </div>
    </SearchContainer>
  );
};

export default Search;
