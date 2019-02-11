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
      deckname: "Immigration Interview",
      description: "Prepare for your immigration interview",
      createdAt: date.setSeconds(date.getSeconds() + 1),
      userId: "1",
      cards: [
        {
          front: "Hello",
          back: "Nihao",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          front: "Ni hao ma",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        }
      ],
      tags: [
        {
          tagname: "Chinese",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          tagname: "Mandarin",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        }
      ]
    },
    {
      include: [models.Card, models.Tag]
    }
  );

  await models.Deck.create(
    {
      deckname: "English",

      description: "Learn A to Z English",
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
      ],
      tags: [
        {
          tagname: "English",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        }
      ]
    },
    {
      include: [models.Card, models.Tag]
    }
  );

  await models.Deck.create(
    {
      deckname: "Food",

      description: "Learn all the foodz",
      createdAt: date.setSeconds(date.getSeconds() + 1),
      userId: "1",
      cards: [
        {
          front: "Pork or other meat wrapped in noodles",
          back: "Dumplings",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          front: "They swim, and are healthy to eat",
          back: "Fish",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          front: "Soooo delicious",
          back: "Cheese",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        }
      ],
      tags: [
        {
          tagname: "Food",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        }
      ]
    },
    {
      include: [models.Card, models.Tag]
    }
  );

  await models.Assignment.create({
    assignmentname: "Do 50 words",
    note: "Studying English exam 1",
    link: "http://www.google.com",
    createdAt: date.setSeconds(date.getSeconds() + 1),
    userId: "1"
  });

  await models.Assignment.create({
    assignmentname: "Read article",
    note: "Read article and prepare to discuss",
    link:
      "https://www.nbcnews.com/news/us-news/brother-american-arrested-russia-spying-charges-says-he-was-there-n953526",
    createdAt: date.setSeconds(date.getSeconds() + 1),
    userId: "2"
  });
};

export default createUsersWithMessagesAndDecks;
