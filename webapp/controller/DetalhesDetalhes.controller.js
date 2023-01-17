sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/f/library',
    'sap/ui/model/json/JSONModel'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, fioriLibrary, JSONModel) {
        "use strict";

        return Controller.extend("br.com.dfp.databinding.controller.DetalhesDetalhes", {
            onInit: function () {
                var oOwnerComponent = this.getOwnerComponent();

                this.oRouter = oOwnerComponent.getRouter();
                this.oModel = oOwnerComponent.getModel();

                this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onPatternMatch, this);
            },

            _onPatternMatch: function (oEvent) {
                this._salesorder = oEvent.getParameter("arguments").salesorder || this._salesorder || "0";
                this._itemposition = oEvent.getParameter("arguments").itemposition || this._itemposition || "0";

                debugger;
                this.getView().bindElement({
                    path: "/SalesOrderLineItemSet(SalesOrderID='" + this._salesorder + "',ItemPosition='" + this._itemposition + "')/ToProduct"
                });

                // Criar model manual explicar. Não temos como capturar no produto em qual ordem ela esta
                var objModelHeader = new JSONModel();
                var objHeader = {
                    "SalesOrderID": this._salesorder,
                    "ItemPosition": this._itemposition
                };
                objModelHeader.setData(objHeader);
                this.getView().setModel(objModelHeader, "Model_Header");

            },

            onExit: function () {
                this.oRouter.getRoute("detailDetail").detachPatternMatched(this._onPatternMatch, this);
            }


        });
    });
