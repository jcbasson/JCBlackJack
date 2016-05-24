requirejs.config({
    baseUrl: "scripts/Base",
    paths: {
        Core: "../Core",
        Service: "../Service",
        Sandbox: "../Sandbox",
        Modules: "../Modules",
        Models: "../Models",
        Store: "../Store",
        SharedModules: "../Modules/Shared",
        Config: "../Config",
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
        datetimepicker: {
            deps: ["jquery"]
        },
        signalR: {
            deps: ['jquery']
        }
    }
});

// Start the main app logic.
requirejs(["Core/core-jquery", "Modules/menu-module", "Modules/player-module", "Modules/dealer-module", "SharedModules/alert-modals"],
function (icore, iMenuOptions, iPlayer, iDealer, iAlertModals) {

    icore.register("alert-modals", iAlertModals);
    icore.register("menu-module", iMenuOptions);
    icore.register("player-module", iPlayer);    
    icore.register("dealer-module", iDealer);

    icore.start_all();
    //setTimeout(ICORE.stop_all(), 10000);
});

