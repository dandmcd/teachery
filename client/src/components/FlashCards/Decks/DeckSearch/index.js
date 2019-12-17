import React, { useRef } from "react";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";

import * as Styled from "../../../../theme/Popup";
import search from "../../../../assets/search.png";
import useOuterClickNotifier from "../../../Alerts";
import Loading from "../../../Loading";
import ErrorMessage from "../../../Alerts/Error";
import SearchTagLink from "./SearchTagLink";

const TAG_SEARCH_QUERY = gql`
  query tag($tagName: String!) {
    getTagsByName(tagName: $tagName) {
      tagName
      id
      decks {
        id
      }
    }
  }
`;

const Search = () => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Search {
      search @client {
        tagName
        showPopup
        noResult
        tags {
          id
          tagName
          decks {
            id
          }
        }
      }
    }
  `);
  const {
    search: { tagName, showPopup, noResult, tags }
  } = data;

  const togglePopup = () => {
    client.writeData({
      data: {
        search: {
          tagName: tagName,
          showPopup: !showPopup,
          __typename: "Search"
        }
      }
    });
  };

  const onChange = e =>
    client.writeData({
      data: {
        search: {
          tagName: e.target.value,
          noResult: false,
          __typename: "Search"
        }
      }
    });

  const onClick = async e => {
    e.preventDefault();
    client.writeData({
      data: {
        search: { noResult: false, tags: [], __typename: "Search" }
      }
    });
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
      client.writeData({
        data: { search: { noResult: true, __typename: "Search" } }
      });
    }
    if (data.getTagsByName.length === 0) {
      client.writeData({
        data: {
          search: { tagName: tagName, noResult: true, __typename: "Search" }
        }
      });
    } else {
      let filteredData = data.getTagsByName.filter(
        item => item.decks.length >= 1
      );
      client.writeData({
        data: {
          search: {
            showPopup: true,
            tags: filteredData,
            tagName: tagName,
            __typename: "Search"
          }
        }
      });
    }
  };

  const innerRef = useRef(null);
  useOuterClickNotifier(
    e =>
      client.writeData({
        data: {
          search: { tagName: tagName, showPopup: false, __typename: "Search" }
        }
      }),
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
        {noResult && <p>Sorry, your search did not find any results...</p>}
        {showPopup ? (
          <Styled.PopupContainer>
            <Styled.PopupInner ref={innerRef}>
              <Styled.PopupTitle>
                Tags that match {tagName} ...
              </Styled.PopupTitle>
              <Styled.PopupBody>
                {tags.map(tag => (
                  <SearchTagLink key={tag.id} tag={tag} />
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

export default Search;
