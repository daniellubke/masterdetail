/*global QUnit*/

sap.ui.define([
	"brcomdfp/databinding/controller/Databinding.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Databinding Controller");

	QUnit.test("I should test the Databinding controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
