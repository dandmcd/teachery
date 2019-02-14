import React, { Component } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";

import TagLink from "../DeckItem/TagLink";

const TAG_SEARCH_QUERY = gql`
  query TagSearchQuery($tagname: String!) {
    getTagsByName(tagname: $tagname) {
      tagname
      id
      decks {
        id
        deckname
      }
    }
  }
`;

class Search extends Component {
  state = {
    tags: [],
    tagname: ""
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <div>
          Search (Tags Only):
          <input
            type="text"
            onChange={e => this.setState({ tagname: e.target.value })}
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
    const { tagname } = this.state;
    const result = await this.props.client.query({
      query: TAG_SEARCH_QUERY,
      variables: { tagname }
    });
    console.log(result);
    const tags = result.data.getTagsByName;
    this.setState({ tags });
    console.log(tags);
  };
}

export default withApollo(Search);
