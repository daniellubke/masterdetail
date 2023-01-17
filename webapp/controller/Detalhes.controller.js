sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/f/library',
    "br/com/dfp/databinding/util/Formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, fioriLibrary, Formatter) {
        "use strict";

        return Controller.extend("br.com.dfp.databinding.controller.Detalhes", {

            objFormatter: Formatter,
            
            onInit: function () {
                //sap.ui.getCore().getConfiguration().setFormatLocale("pt_BR");

                var oOwnerComponent = this.getOwnerComponent();

                this.oRouter = oOwnerComponent.getRouter();
                this.oModel = oOwnerComponent.getModel();

                this.oRouter.getRoute("master").attachPatternMatched(this._onSalesOrderMatched, this);
                this.oRouter.getRoute("detail").attachPatternMatched(this._onSalesOrderMatched, this);
                this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onSalesOrderMatched, this);
            },

            _onSalesOrderMatched: function (oEvent) {
                this._salesorder = oEvent.getParameter("arguments").salesorder || this._salesorder || "0";
                if (oEvent.getParameter("arguments").salesorder) {
                    this.getView().bindElement({
                        path: "/SalesOrderSet('" + this._salesorder + "')"
                    });
                }

            },

            funcSelectItem: function (oEvent) {
                debugger;
                var selectedObj = oEvent.getSource().getBindingContext().getProperty("SalesOrderID");
                var selectedObjItem = oEvent.getSource().getBindingContext().getProperty("ItemPosition");
                this.oRouter.navTo("detailDetail", { layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded, salesorder: selectedObj, itemposition: selectedObjItem });
            },

            handleProcessPress: function () {
                debugger;
                this.oRouter.navTo("processFlow", { layout: fioriLibrary.LayoutType.EndColumnFullScreen, salesorder: this._salesorder });
            },

            onExit: function () {
                this.oRouter.getRoute("master").detachPatternMatched(this._onSalesOrderMatched, this);
                this.oRouter.getRoute("detail").detachPatternMatched(this._onSalesOrderMatched, this);
            }
        });
    });
