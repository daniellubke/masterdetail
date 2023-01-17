sap.ui.define([], function () {
	"use strict";

	var Formatter = {


		// Apresentar o texto do status mediante a propriedade Status do model
		statusProduto: function (value) {
			var oBundle = this.getView().getModel("i18n").getResourceBundle();
			try {
				return oBundle.getText("LifecycleStatus" + value);
			} catch (err) {
				return "";
			}
		},

		// Apresentar o estado (cor) do ObjectStatus mediante a propriedade Status do model
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

		availableStock: function (iQuantity) {

			switch (iQuantity) {
				case "1":
					return "Sol. Compra (" + iQuantity + ")";
				case "2":
					return "Min. Estoque (" + iQuantity + ")";
				case "3":
					return "Em Estoque (" + iQuantity + ")";
				default:
					return iQuantity;
			}
		},

		iconStock: function (iQuantity) {

			switch (iQuantity) {
				case "1":
					return "sap-icon://error";
				case "2":
					return "sap-icon://warning";
				case "3":
					return "sap-icon://sys-enter-2";
				default:
					return "sap-icon://information";
			}
		},

		stateStock: function (iQuantity) {

			switch (iQuantity) {
				case "1":
					return "Error";
				case "2":
					return "Warning";
				case "3":
					return "Success";
				default:
					return "None";
			}
		},

		calcNetAmount: function (dGrossAmount, dTaxAmount, sCurrencyCode) {

			// Parte 1
			var oValor = (dGrossAmount - dTaxAmount).toFixed(2);

			// Parte 1 
			return oValor;

			// Parte 2
			// var oCurrency = new sap.ui.model.type.Currency({
			// 	showMeasure: false
			// });

			// return oCurrency.formatValue([oValor,sCurrencyCode], "string");

		}

	};

	return Formatter;

}, true);
