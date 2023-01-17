sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/f/library',
    'sap/ui/model/json/JSONModel',
    "br/com/dfp/databinding/util/Service"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, fioriLibrary, JSONModel, Service) {
        "use strict";

        return Controller.extend("br.com.dfp.databinding.controller.Process", {
            onInit: function () {
                var oOwnerComponent = this.getOwnerComponent();

                this.oRouter = oOwnerComponent.getRouter();
                this.oModel = oOwnerComponent.getModel();

                this.oRouter.getRoute("processFlow").attachPatternMatched(this._onPatternMatch, this);
            },

            _onPatternMatch: function (oEvent) {

                debugger;
                
                this._salesorder = oEvent.getParameter("arguments").salesorder || this._salesorder || "0";
                if (oEvent.getParameter("arguments").salesorder) {
                    this.getView().bindElement({
                        path: "/SalesOrderSet('" + this._salesorder + "')"
                    });
                }

                this.getInfo_AJAX("ProcessFlow", "Home", null, null);

            },

            onExit: function () {
                this.oRouter.getRoute("processFlow").detachPatternMatched(this._onPatternMatch, this);
            },

            getInfo_AJAX: function (oURL, oLocal, oObj, oCompURL) {
                var t = this;
                try {
                    var bundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                    t._dialogCtx = new sap.m.BusyDialog({
                        text: bundle.getText("loading")
                    });
                    t._dialogCtx.open();
                    Service.getValuefromAJAX(this.getCallBack, oURL, oLocal, null, t, oObj, oCompURL);
                } catch (error) {
                    t._dialogCtx.close();
                }
            },

            getCallBack: function (data, sURL, sFromWhere, oDialog, t) {
                var oObj = "";
                var bCompact = !!t.getView().$().closest(".sapUiSizeCompact").length;
                var bundle = t.getView().getModel("i18n").getResourceBundle();
                var oModel = new sap.ui.model.json.JSONModel();
                if (sURL === "ProcessFlow") {
                    oModel.setData(t.getNodesSalesOrder(data));
                    t.getView().setModel(oModel, "MDL_ProcessFlow");
                    t.getView().getModel("MDL_ProcessFlow").refresh(true);
                    t._dialogCtx.close();
                }
            },

            getNodesSalesOrder: function (obj) {
                var oItems = this.getValuesbyProp(obj, "salesorder", "0500000000");
                var NodesLanes = {};
                NodesLanes.nodes = oItems[0].nodes;
                NodesLanes.lanes = oItems[0].lanes;
                return NodesLanes;
            },

            getValuesbyProp: function (oObj, oProp, oValue) {
                var objret = [];

                for (var i = 0; i < oObj.length; i++) {
                    var table = oObj[i];
                    for (var prop in table) {
                        if (table.hasOwnProperty(prop)) {
                            if ((prop === oProp) && (table[prop] === oValue)) {
                                objret.push(oObj[i]);
                                break;
                            }
                        }
                    }
                }
                return objret;
            }


        });
    });
