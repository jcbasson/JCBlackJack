define(function () {
    var gameRulesConfig = function () {
        var thisModule, bustLimit = 21, stickMin = 17
        return {

            checkIfBust: function (value) {

                if (value > 21) {
                    return true;
                }
                return false;
            },
            checkIfMayStick: function (value) {

                if (value < 17) {
                    return false;
                }
                return true;
            },
            getBustLimit: function () {
                return bustLimit;
            }
        }
    }
    return new gameRulesConfig();
});