import React, { Component, useState } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import Button from "../../../../theme/Button";

import TagLink from "../DeckItem/DeckTags/TagLink";
import search from "../../../../assets/search.png";
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
const SearchResponse = styled.div`
  display: flex;
`;

const TAG_SEARCH_QUERY = gql`
  query TagSearchQuery($tagName: String!) {
    getTagsByName(tagName: $tagName) {
      tagName
      id
    }
  }
`;

const Search = () => {
  const [state, setState] = useState({
    tags: [],
    tagName: "",
    showPopup: false,
    noResult: false
  });

  const executeSearch = async ({ props }) => {
    const { tagName } = state;
    console.log(tagName);
    const result = await props.client.query({
      query: TAG_SEARCH_QUERY,
      variables: { tagName }
    });
    if (tagName === "") {
      setState({ noResult: true });
    } else if (result.data.getTagsByName.length === 0) {
      setState({ noResult: true });
    } else {
      const tags = result.data.getTagsByName;
      setState({ tags });
    }
  };

  const togglePopup = () => {
    setState({
      showPopup: !state.showPopup
    });
  };

  return (
    <SearchContainer>
      <SearchInput
        name="tagName"
        type="text"
        value={tagName}
        onChange={e => setState({ ...state, [e.target.name]: e.target.value })}
        placeholder="Search by language or tag"
      />
      <SearchImg src={search} alt="Search" onClick={() => executeSearch()} />
      <div>
        <button onClick={togglePopup}>Click To Launch Popup</button>

        {state.showPopup ? (
          <Popup
            text='Click "Close Button" to hide popup'
            closePopup={togglePopup}
          />
        ) : null}
      </div>
      <SearchResponse>
        {console.log(state.tags)}
        {state.noResult && (
          <p>Sorry, your search did not find any results...</p>
        )}
        {state.tags.map(tag => (
          <TagLink key={tag.id} tag={tag} />
        ))}
      </SearchResponse>
    </SearchContainer>
  );
};

export default withApollo(Search);
