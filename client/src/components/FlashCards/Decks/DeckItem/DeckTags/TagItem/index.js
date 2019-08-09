import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Loading from "../../../../../Loading";
import DeckItemBase from "../../../DeckItem";
import withSession from "../../../../../Session/withSession";

const TAGS_QUERY = gql`
  query TagsQuery($id: ID!) {
    tag(id: $id) {
      id
      decks {
        id
        deckName
        user {
          id
          username
        }
        description
        cards {
          id
          front
          back
        }
        tags {
          id
          tagName
        }
      }
    }
  }
`;

export class Tags extends Component {
  render() {
    let { id } = this.props.match.params;
    id = parseInt(id);
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
            const taggedDecksToRender = data.tag.decks;
            return (
              <Fragment>
                {taggedDecksToRender.map(deck => (
                  <DeckItem key={deck.id} deck={deck} />
                ))}
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

const DeckItem = withSession(DeckItemBase);

export default Tags;
