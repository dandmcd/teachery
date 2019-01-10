import "dotenv/config";
import models, { sequelize } from "./models";

const createUsersWithMessagesAndDecks = async date => {
  await models.User.create(
    {
      username: "dandmcd",
      email: "dandmcd@gmail.com",
      password: "hotpot123",
      role: "ADMIN",
      messages: [
        {
          text: "I am super!",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          text: "Welcome to my site!",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          text: "Hi Katelyn!",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        }
      ]
    },
    {
      include: [models.Message]
    }
  );

  await models.User.create(
    {
      username: "hotpot",
      email: "hotpot@123.com",
      password: "hotpot123",
      messages: [
        {
          text: "I like cats!",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          text: "Give me food!",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        }
      ]
    },
    {
      include: [models.Message]
    }
  );

  await models.Deck.create(
    {
      deckName: "Immigration Interview",
      createdAt: date.setSeconds(date.getSeconds() + 1),
      userId: "1",
      cards: [
        {
          front: "Hello",
          back: "Nihao",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          front: "What you doing?",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        }
      ]
    },
    {
      include: [models.Card]
    }
  );

  await models.Deck.create(
    {
      deckName: "English",
      createdAt: date.setSeconds(date.getSeconds() + 1),
      userId: "2",
      cards: [
        {
          front: "Pizza",
          back: "Burger",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          front: "What you doing?",
          back: "Nothing",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          front: "One more",
          back: "for good measure",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        }
      ]
    },
    {
      include: [models.Card]
    }
  );

  await models.Assignment.create({
    assignment_name: "Do 50 words",
    description: "Studying English exam 1",
    url: "http://www.google.com",
    createdAt: date.setSeconds(date.getSeconds() + 1),
    userId: "2"
  });

  await models.Assignment.create({
    assignment_name: "Read article",
    description: "Read article and prepare to discuss",
    url:
      "https://www.nbcnews.com/news/us-news/brother-american-arrested-russia-spying-charges-says-he-was-there-n953526",
    createdAt: date.setSeconds(date.getSeconds() + 1),
    userId: "2"
  });
};

export default createUsersWithMessagesAndDecks;
