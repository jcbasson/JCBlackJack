define(["Config/gamerules-config"],
function (gameRules) {
    var playerModule = function (sandbox,cardStore) {
        var thisModule,lblPlayersScore, btnHit, btnStick, playersCardDeck,playersCardDeckTemplate, playersCards = [], playerTotal = 0;

        return {
            init: function () {
                thisModule = this;

                lblPlayersScore = sandbox.find("#lblPlayersScore")[0];
                btnHit = sandbox.find("#btnHit")[0];
                btnStick = sandbox.find("#btnStick")[0];
                playersCardDeck = sandbox.find("#playersCardDeck")
                playersCardDeckTemplate = sandbox.find("#players-carddeck-template")[0];

                sandbox.listen({
                    'init-enabledisable-hit': thisModule.initializeHitButton,
                    'init-enabledisable-stick': thisModule.initializeStickButton,
                    'init-playerscards': thisModule.initializePlayersCards
                });

                sandbox.addEvent(btnHit, "click", thisModule.hitPlayer);
                sandbox.addEvent(btnStick, "click", thisModule.stickPlayer);
            },
            destroy: function () {
                sandbox.ignore(["init-enabledisable-hit", "init-enabledisable-stick"]);
                sandbox.removeEvent(btnHit, "click", thisModule.hitPlayer);
                sandbox.removeEvent(btnStick, "click", thisModule.stickPlayer);
            },
            initializeHitButton: function (enable) {

                if (enable) {
                    sandbox.removeClass(btnHit, "disabled");
                    return;
                }
                sandbox.addClass(btnHit, "disabled");
            },
            initializeStickButton: function (enable) {

                if (enable) {
                    sandbox.removeClass(btnStick, "disabled");
                    return;
                }
                sandbox.addClass(btnStick, "disabled");
            },
            initializePlayersCards: function () {
                               
                sandbox.replaceContent(playersCardDeck, "");
            
                playersCards = [];

                thisModule.initializeHitButton(true);

                playerTotal = 0;

                thisModule.refreshPlayersScore();
            },
            hitPlayer: function () {
               
                var nextCard = cardStore.getNextCard();

                playersCards.push(nextCard);             

                var cardValue = nextCard.Value();

                var nextCardName = nextCard.Name;

                if (nextCardName === "Ace") {

                    var cardValueToUse = cardValue[0];

                    if (gameRules.checkIfBust(playerTotal + 10)) {

                        cardValueToUse = cardValue[2];
                    }               
                    playerTotal = playerTotal + parseInt(cardValueToUse);
                }
                else {
                    playerTotal = playerTotal + parseInt(cardValue);
                }

                thisModule.refreshPlayersCardDeck();

                thisModule.refreshPlayersScore();

                if (gameRules.checkIfMayStick(playerTotal)) {
                    thisModule.initializeStickButton(true);
                }

                if (gameRules.checkIfBust(playerTotal))
                {
                    thisModule.initializeHitButton(false);

                    thisModule.initializeStickButton(false);

                    sandbox.notify({
                        type: "execute-dealersturn",
                        data: {
                            PlayersTotal: playerTotal
                        }
                    });
                }              
            },
            stickPlayer: function (inputControl) {
               
                thisModule.initializeHitButton(false);

                thisModule.initializeStickButton(false);

                sandbox.notify({
                    type: "execute-dealersturn",
                    data:{
                        PlayersTotal: playerTotal
                    }
                });
            },
            refreshPlayersCardDeck: function () {
                             
                if (playersCards && playersCards.length> 0) {

                    var jsonStringPlayersCards = JSON.stringify(playersCards);
                    var jsonPlayersCards = JSON.parse(jsonStringPlayersCards);

                    var template = sandbox.getTemplate(playersCardDeckTemplate);

                    var generatedHtml = template(jsonPlayersCards);
                    sandbox.replaceContent(playersCardDeck, generatedHtml);
                }
            },
            refreshPlayersScore: function () {
                sandbox.replaceContent(lblPlayersScore, playerTotal);
            }
        }
    }
    return playerModule;
});