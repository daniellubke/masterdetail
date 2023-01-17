/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "br/com/dfp/databinding/model/models",
    'sap/ui/model/json/JSONModel',
    'sap/f/library'
],
    function (UIComponent, Device, models, JSONModel, fioriLibrary) {
        "use strict";

        return UIComponent.extend("br.com.dfp.databinding.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {

                var oModel, oRouter;

                oModel = new JSONModel();
                this.setModel(oModel, "Layout");

                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                oRouter = this.getRouter();
                oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
                oRouter.initialize();
                //this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            },

            _onBeforeRouteMatched: function(oEvent) {
                var oModel = this.getModel("Layout"),
                    sLayout = oEvent.getParameters().arguments.layout;

                // If there is no layout parameter, set a default layout (normally OneColumn)
                if (!sLayout) {
                    sLayout = fioriLibrary.LayoutType.OneColumn;
                }
    
                oModel.setProperty("/layout", sLayout);
            }
        });
    }
);