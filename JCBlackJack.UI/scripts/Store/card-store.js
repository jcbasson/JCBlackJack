define(["underscore", "jquery", "Models/cardModel"],
function (iUnderscore, iJquery, iCard) {

    var cardStore = function () {
      
        var cards = [], shuffledCards;

        var cardNames = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];

        var cardTypes = ["Hearts", "Diamonds", "Clubs", "Spades"];
        
        for (var cardNameCounter = 0; cardNameCounter < cardNames.length; cardNameCounter++) {

            var currentCardName = cardNames[cardNameCounter];

            for (var cardTypeCounter = 0; cardTypeCounter < cardTypes.length; cardTypeCounter++) {

                var currentCardType = cardTypes[cardTypeCounter];

                var card = new iCard();
                card.Name = currentCardName;
                card.Type = currentCardType;
                card.SetClass();

                cards.push(card);
            }
        }

        return {
            getNextCard: function () {

                var nextCard;
                if (shuffledCards && shuffledCards.length > 0) {
                    nextCard = shuffledCards.shift();
                }
                return nextCard;
            },
            shuffleCards: function () {
               
                var length = cards.length;
                var shuffled = new Array(length);
                for (var index = 0, rand; index < length; index++) {
                    rand = Math.floor(Math.random() * (index + 1));
                    if (rand !== index) shuffled[index] = shuffled[rand];
                    shuffled[rand] = cards[index];
                }
                shuffledCards = shuffled;

                console.log(shuffledCards);
            }
        }
    }
    return cardStore;
});