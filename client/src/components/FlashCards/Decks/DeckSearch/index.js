import React from "react";
import { useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";

import * as Styled from "../../../../theme/Popup";
import searchImg from "../../../../assets/search.png";
import Loading from "../../../Alerts/Loading";
import ErrorMessage from "../../../Alerts/Error";
import SearchTagLink from "./SearchTagLink";
import { useAtom } from "jotai";
import { searchAtom } from "../../../../state/store";
import Modal from "../../../Modal";
import * as StyledSearch from "./schema";

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

  const [search, setSearch] = useAtom(searchAtom);
  const { toggleOn, noResult, tagName, tags } = search;

  const onChange = (e) => {
    setSearch((a) => (a = { ...a, tagName: e.target.value, noResult: false }));
  };

  const onClick = async (e) => {
    e.preventDefault();

    if (tagName === "") {
      setSearch(
        (a) =>
          (a = {
            ...a,
            tagName: tagName,
            noResult: true,
          })
      );
    } else {
      const { data, loading, error } = await client.query({
        query: TAG_SEARCH_QUERY,
        variables: { tagName },
      });
      if (loading || !data) {
        return <Loading />;
      }
      if (error) {
        return <ErrorMessage error={error} />;
      }

      if (data.getTagsByName.length === 0) {
        setSearch(
          (a) =>
            (a = {
              ...a,
              tagName: tagName,
              noResult: true,
            })
        );
      }
      if (data.getTagsByName.length > 0) {
        let filteredData = data.getTagsByName.filter(
          (item) => item.decks.length >= 1
        );
        setSearch(
          (a) =>
            (a = {
              ...a,
              toggleOn: true,
              tags: filteredData,
              tagName: tagName,
            })
        );
      }
    }
  };

  const toggleOffModal = () => {
    setSearch((a) => (a = { ...a, tagName: tagName, toggleOn: false }));
  };

  return (
    <>
      <StyledSearch.SearchContainer>
        <StyledSearch.SearchInput
          name="tagName"
          type="text"
          defaultValue={tagName}
          onChange={onChange}
          placeholder="Search by language or tag"
        />
        <StyledSearch.SearchImg
          src={searchImg}
          alt="Search"
          onClick={onClick}
        />
      </StyledSearch.SearchContainer>
      {noResult && (
        <div>
          <StyledSearch.NoResult>
            {" "}
            Sorry, your search did not find any results...
          </StyledSearch.NoResult>
        </div>
      )}
      <Modal toggleOn={toggleOn} onToggleOffModal={toggleOffModal}>
        <Styled.PopupHeader>
          <Styled.PopupTitle>Search Results ...</Styled.PopupTitle>
          <Styled.PopupFooterButton onClick={toggleOffModal}>
            <Styled.CloseSpan />
          </Styled.PopupFooterButton>
        </Styled.PopupHeader>
        <Styled.PopupBody>
          {tags.map((tag) => (
            <SearchTagLink key={tag.id} tag={tag} />
          ))}
        </Styled.PopupBody>
      </Modal>
    </>
  );
};

export default Search;
