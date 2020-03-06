import React, { useRef, Fragment } from "react";
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
    <Fragment>
      <SearchContainer>
        <SearchInput
          name="tagName"
          type="text"
          defaultValue={tagName}
          onChange={onChange}
          placeholder="Search by language or tag"
        />
        <SearchImg src={search} alt="Search" onClick={onClick} />
      </SearchContainer>
      {noResult && (
        <div>
          <NoResult> Sorry, your search did not find any results...</NoResult>
        </div>
      )}
      {showPopup ? (
        <Styled.PopupContainer>
          <Styled.PopupInnerExtended ref={innerRef}>
            <Styled.PopupHeader>
              <Styled.PopupTitle>Search Results ...</Styled.PopupTitle>
              <Styled.PopupFooterButton onClick={togglePopup}>
                <Styled.CloseSpan />
              </Styled.PopupFooterButton>
            </Styled.PopupHeader>
            <Styled.PopupBody>
              {tags.map(tag => (
                <SearchTagLink key={tag.id} tag={tag} />
              ))}
            </Styled.PopupBody>
          </Styled.PopupInnerExtended>
        </Styled.PopupContainer>
      ) : null}
    </Fragment>
  );
};

const SearchContainer = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 0px 0px 5px 12px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: ${props => props.theme.neutralLight};
`;
const SearchImg = styled.img`
  height: 15px;
  width: 15px;
`;

const SearchInput = styled.input`
  height: 35px;
  width: 180px;
  border: 0;
  outline: 0;
  border-bottom: 2px solid ${props => props.theme.primary};
  background-color: ${props => props.theme.neutralLight};
`;

const NoResult = styled.p`
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  text-indent: 0.5em;
  margin: 0 auto;
`;

export default Search;
