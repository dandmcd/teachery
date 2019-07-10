import React, { Component } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";

import TagLink from "../DeckItem/TagLink";

const TAG_SEARCH_QUERY = gql`
  query TagSearchQuery($tagName: String!) {
    getTagsByName(tagName: $tagName) {
      tagName
      id
    }
  }
`;

class Search extends Component {
  state = {
    tags: [],
    tagName: ""
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <div>
          Search:
          <input
            type="text"
            onChange={e => this.setState({ tagName: e.target.value })}
            placeholder="Search by language"
          />
          <button onClick={() => this._executeSearch()}>OK</button>
        </div>
        {this.state.tags.map(tag => (
          <TagLink key={tag.id} tag={tag} />
        ))}
      </div>
    );
  }

  _executeSearch = async () => {
    const { tagName } = this.state;
    const result = await this.props.client.query({
      query: TAG_SEARCH_QUERY,
      variables: { tagName }
    });
    console.log(result);
    if (result.data.getTagsByName.length === 0) {
      console.log("Ooopsie");
    } else {
      const tags = result.data.getTagsByName;
      this.setState({ tags });
      console.log(tags);
    }
  };
}

export default withApollo(Search);
