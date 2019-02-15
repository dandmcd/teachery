import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import withAuthorization from "../../../../Session/withAuthorization";

import Loading from "../../../../Loading";

const TAGS_QUERY = gql`
  query TagsQuery($id: ID!) {
    tag(id: $id) {
      id
      decks {
        id
        deckName
      }
    }
  }
`;

export class Tags extends Component {
  render() {
    let { id } = this.props.match.params;
    id = parseInt(id);
    console.log(id);
    return (
      <Fragment>
        <Query query={TAGS_QUERY} variables={{ id }}>
          {({ data, error, loading }) => {
            if (loading) {
              return <Loading />;
            }
            if (error) {
              return <p>Error</p>;
            }
            console.log(data);
            const taggedDecksToRender = data.tag.decks;
            console.log(taggedDecksToRender);
            return (
              <Fragment>
                {console.log(taggedDecksToRender)}
                {taggedDecksToRender.map(deck => (
                  <li key={deck.id}>
                    <Link to={`/deck/${deck.id}`}>{deck.deckName}</Link>
                  </li>
                ))}
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default withAuthorization(session => session && session.me)(Tags);
