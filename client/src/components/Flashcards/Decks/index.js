import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import Moment from "react-moment";

import GET_PAGINATED_DECKS_WITH_USERS from "./DeckSchema";
import Loading from "../../Loading";
import TagLink from "../Decks/DeckItem/TagLink";
import withSession from "../../Session/withSession";
import { Link } from "react-router-dom";
import DeckDelete from "./DeckDelete";
import AddDeckTag from "./DeckItem/AddDeckTag";
import Toggle from "../../Toggle";

const Decks = ({ limit, me }) => (
  <Query query={GET_PAGINATED_DECKS_WITH_USERS} variables={{ limit }}>
    {({ data, loading, error, fetchMore }) => {
      if (!data) {
        return <div>There are no decks yet ...</div>;
      }

      const { decks } = data;
      console.log(decks);

      if (loading || !decks) {
        return <Loading />;
      }

      const { edges, pageInfo } = decks;
      console.log(edges);

      return (
        <Fragment>
          <DeckList decks={edges} me={me} />

          {pageInfo.hasNextPage && (
            <MoreDecksButton
              limit={limit}
              pageInfo={pageInfo}
              fetchMore={fetchMore}
            >
              More
            </MoreDecksButton>
          )}
        </Fragment>
      );
    }}
  </Query>
);

const MoreDecksButton = ({ limit, pageInfo, fetchMore, children }) => (
  <button
    type="button"
    onClick={() =>
      fetchMore({
        variables: {
          cursor: pageInfo.endCursor,
          limit
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }

          return {
            decks: {
              ...fetchMoreResult.decks,
              edges: [
                ...previousResult.decks.edges,
                ...fetchMoreResult.decks.edges
              ]
            }
          };
        }
      })
    }
  >
    {children}
  </button>
);

class DeckList extends Component {
  render() {
    const { decks, me } = this.props;
    console.log(decks);
    return decks.map(deck => <DeckItem key={deck.id} deck={deck} me={me} />);
  }
}

const DeckItemBase = ({ deck, session }) => (
  <div>
    <div>
      <h2>
        <Link to={`/deck/${deck.id}`}>{deck.deckName}</Link>
      </h2>
      <p>{deck.description}</p>
      <small>
        Created on <Moment format="YYYY-MM-DD HH:mm">{deck.createdAt}</Moment>
      </small>
      <h5>created by: {deck.user.username}</h5>
      {session && session.me && deck.user.id === session.me.id && (
        <DeckDelete deck={deck} />
      )}
      <Toggle />
      <h5>
        {deck.tags.map(tag => (
          <TagLink key={tag.id} tag={tag} />
        ))}
      </h5>
    </div>
  </div>
);

const DeckItem = withSession(DeckItemBase);

export default Decks;
