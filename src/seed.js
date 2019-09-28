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
      role: "ADMIN",
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
          tagName: "Chinese",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          tagName: "Mandarin",
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
      deckName: "English",

      description: "Learn A to Z English",
      createdAt: date.setSeconds(date.getSeconds() + 1),
      userId: "1",
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
          tagName: "English",
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
      deckName: "Food",

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
          tagName: "Food",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        }
      ]
    },
    {
      include: [models.Card, models.Tag]
    }
  );

  await models.Assignment.create(
    {
      assignmentName: "Do 50 words",
      note: "Studying English exam 1",
      link: "https://www.google.com",
      createdAt: date.setSeconds(date.getSeconds() + 1),
      userId: "1",
      assignedTasks: [
        {
          assignmentId: 1,
          assignedTo: 1,
          dueDate: "2020-1-2",
          status: "INCOMPLETE",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        }
      ]
    },
    {
      include: [models.AssignedTask]
    }
  );

  await models.Assignment.create(
    {
      assignmentName: "Read article",
      note: "Read article and prepare to discuss",
      link:
        "https://www.nbcnews.com/news/us-news/brother-american-arrested-russia-spying-charges-says-he-was-there-n953526",
      createdAt: date.setSeconds(date.getSeconds() + 1),
      userId: "1",
      assignedTasks: [
        {
          assignmentId: 2,
          assignedTo: 1,
          dueDate: "2019-5-20",
          status: "COMPLETE",
          createdAt: date.setSeconds(date.getSeconds() + 1)
        }
      ]
    },
    {
      include: [models.AssignedTask]
    }
  );
};

export default createUsersWithMessagesAndDecks;
