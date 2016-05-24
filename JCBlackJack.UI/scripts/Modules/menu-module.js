define([],
function () {
    var menuModule = function (sandbox, cardStore) {
        var thisModule, btnNewGame;

        return {
            init: function () {

                thisModule = this;
                btnNewGame = sandbox.find("#btnNewGame")[0];

                sandbox.addEvent(btnNewGame, "click", thisModule.createNewGame);
    
            },
            destroy: function () {
                sandbox.removeEvent(btnNewGame, "click", thisModule.createNewGame);
            },
            createNewGame: function () {

                    sandbox.notify({
                        type: "init-dealerscards"
                    });
                    sandbox.notify({
                        type: "init-playerscards"
                    });

                    if (cardStore) {
                        cardStore.shuffleCards();
                    }
            }
        }
    }
    return menuModule;
});