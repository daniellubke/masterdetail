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

        return Controller.extend("br.com.dfp.databinding.controller.Databinding", {
            
            objFormatter: Formatter,
            
            onInit: function () {
                this.oView = this.getView();
                this.oRouter = this.getOwnerComponent().getRouter();
            },

            funcSelectItem: function (oEvent) {
                debugger;
                
                // Falar sobre acesso a dados no contexto do model
                
                //var selectedObj = oEvent.getSource().getBindingContext().getPath();
                //var selectedObj = oEvent.getSource().getBindingContext().getObject();
                var selectedObj = oEvent.getSource().getBindingContext().getProperty("SalesOrderID");
                this.oRouter.navTo("detail", { layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, salesorder: selectedObj });

            },

            statusProduto: function (value) {
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                try {
                    return oBundle.getText("LifecycleStatus" + value);
                } catch (err) {
                    return "";
                }
            },

            stateProduto: function (value) {
                try {
    
                    if (value === "C") {
                        return "Success";
                    } else if (value === "X") {
                        return "Warning";
                    } else if (value === "D") {
                        return "Error";
                    } else {
                        return "None"; // Status 'O'
                    }
    
                } catch (err) {
                    return "None";
                }
            },
    
        });
    });
