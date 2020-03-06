import gql from "graphql-tag";

const GET_DASHBOARD = gql`
  query getDashboard {
    dueAssignedTasks: assignedTasks {
      edges {
        id
        status
        dueDate
      }
    }
    assignedTasks(limit: 1) {
      edges {
        id
        assignmentId
        status
        dueDate
        createdAt
        assignedTo
        assignedToName
        updatedDocumentName
        updatedDocumentUrl
        user {
          id
          username
        }
        assignment {
          id
          assignmentName
          note
          link
          createdAt
          user {
            id
            username
          }
        }
      }
    }
    bookmarkedDecks: decks(limit: 2, showBookmarks: true) {
      edges {
        id
        deckName
        description
        deckImageUrl
        deckImageName
        createdAt
        user {
          id
          username
        }
        tags {
          id
          tagName
        }
        cards {
          id
          front
          back
          pictureName
          pictureUrl
        }
      }
    }
    decks(limit: 2, showBookmarks: false) {
      edges {
        id
        deckName
        description
        deckImageUrl
        deckImageName
        createdAt
        user {
          id
          username
        }
        tags {
          id
          tagName
        }
        cards {
          id
          front
          back
          pictureName
          pictureUrl
        }
      }
    }
  }
`;

export default GET_DASHBOARD;
