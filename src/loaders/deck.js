export const batchDecks = async (keys, models) => {
  const decks = await models.Deck.findAll({
    where: {
      id: keys
    }
  });
  return keys.map(key => decks.find(deck => deck.id === key));
};
