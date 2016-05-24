define(["Config/gamerules-config"],
function (gameRules) {
    var dealerModule = function (sandbox,cardStore) {
        var thisModule, dealerCardDeck, dealersCardDeckTemplate,lblDealersScore, dealersCards = [], dealersTotal = 0, playersTotal = 0;

        return {
            init: function () {
                thisModule = this;

                lblDealersScore = sandbox.find("#lblDealersScore")[0];

                dealerCardDeck = sandbox.find("#dealerCardDeck")[0];
              
                dealersCardDeckTemplate = sandbox.find("#dealers-carddeck-template")[0];

                sandbox.listen({
                    "init-dealerscards": thisModule.initializeDealersCards,
                    "execute-dealersturn": thisModule.executeDealersTurn
                });
            },
            destroy: function () {
                sandbox.ignore(["init-dealerscards", "execute-dealersturn"]);
            },
            initializeDealersCards: function (data) {

                sandbox.replaceContent(dealerCardDeck, "");

                dealersCards = [];

                dealersTotal = 0;

                thisModule.refreshDealersScore();
            },
            executeDealersTurn: function (data) {
                
                if (data && data.PlayersTotal) {
                    playersTotal = data.PlayersTotal;
                }

                var mustHit = true;

                while (mustHit) {

                    thisModule.hitDealer();
                    mustHit = !gameRules.checkIfBust(dealersTotal) && !(dealersTotal > playersTotal);
                }

                thisModule.stickDealer();
            },
            hitDealer: function() {

                var nextCard = cardStore.getNextCard();

                dealersCards.push(nextCard);

                var cardValue = nextCard.Value();

                var nextCardName = nextCard.Name;

                if (nextCardName === "Ace") {

                    var cardValueToUse = cardValue[0];

                    if (gameRules.checkIfBust(dealersTotal + 10)) {

                        cardValueToUse = cardValue[2];
                    }
                    dealersTotal = dealersTotal + parseInt(cardValueToUse);
                }
                else {
                    dealersTotal = dealersTotal + parseInt(cardValue);
                }

                thisModule.refreshDealersCardDeck();

                thisModule.refreshDealersScore();
            },
            stickDealer: function(){

                var playerWins = false;

                var theyDrawed = false;

                var bustLimit = gameRules.getBustLimit();
               
                if (!gameRules.checkIfBust(playersTotal) && gameRules.checkIfBust(dealersTotal)) {

                    playerWins = true;
                }
                else if (!gameRules.checkIfBust(playersTotal) && !gameRules.checkIfBust(dealersTotal)) {

                    var playersDeficit = bustLimit - playersTotal;

                    var dealersDeficit = bustLimit - dealersTotal;

                    if (playersDeficit < dealersDeficit) {

                        playerWins = true;
                    }
                    else if(playersDeficit === dealersDeficit) {

                        theyDrawed = true;
                    }
                }
                else if (gameRules.checkIfBust(playersTotal) && gameRules.checkIfBust(dealersTotal)) {

                    var playersSurplus = playersTotal - bustLimit;

                    var dealersSurplus = dealersTotal - bustLimit;

                    if (playersSurplus < dealersSurplus) {

                        playerWins = true;
                    }
                    else if(playersSurplus === dealersSurplus) {

                        theyDrawed = true;
                    }
                }

                if (theyDrawed) {
                    sandbox.notify({
                        type: "alert-info",
                        data: "OH MY! IT'S A DRAW!"
                    });
                    return;
                }

                if (playerWins) {
                    sandbox.notify({
                        type: "alert-success",
                        data: "CONGRATULATIONS! YOU WIN!"
                    });
                    return;
                } else {
                    sandbox.notify({
                        type: "alert-danger",
                        data: "SORRY! YOU LOSE!"
                    });
                }
            },
            refreshDealersCardDeck: function () {

                if (dealersCards && dealersCards.length > 0) {

                    var jsonStringDealersCards = JSON.stringify(dealersCards);

                    var jsonDealersCards = JSON.parse(jsonStringDealersCards);

                    var template = sandbox.getTemplate(dealersCardDeckTemplate);

                    var generatedHtml = template(jsonDealersCards);

                    sandbox.replaceContent(dealerCardDeck, generatedHtml);
                }
            },
            refreshDealersScore: function () {

                sandbox.replaceContent(lblDealersScore, dealersTotal);
            }
        }
    }
    return dealerModule;
});