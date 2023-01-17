sap.ui.define(function () {
	"use strict";

	var Service = {

		_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

		_baseDestination: {
			"base": "gudtows9t4.execute-api.us-east-2.amazonaws.com"
		},

		_mockData: true,

		_baseService: {
			"ProcessFlow": "/qas/dfp/processflow"
        },

		getValuehelpData: function (oModel, entity, filters) {
			var d = $.Deferred();
			var sEntity = ""; //var sEntity = "/" + entity;
			if (entity.indexOf("/") === -1) {
				sEntity = "/" + entity;
			} else {
				sEntity = entity;
			}
			oModel.read(sEntity, {
				filters: filters,
				success: function (data) {
					d.resolve(data);
				},
				error: function (data) {
					d.reject(data.message);
				}
			});
			return d.promise();
		},

		getValuefromAJAX: function (callback, sURL, sFromWhere, oDialog, t, oObject, sURLComp) {
			var map = this._baseService;
			var strBase = (sURL && map[sURL]) ? map[sURL] : "";
			var strUrl = "https://" + this._baseDestination.base + strBase;

			if (sURLComp) {
				strUrl = strUrl + sURLComp;
			}

			$.ajax({
				type: "GET",
				url: strUrl,
				headers: oObject,
				dataType: "json",
				success: function (data) {
					callback(data, sURL, sFromWhere, oDialog, t);
				},
				error: function (jqXHR, textStatus, errorThrown) {
					callback(jqXHR, sURL, sFromWhere, oDialog, t);
				}
			});
		},

		postValuetoAJAX: function (callback, sURL, sFromWhere, oDialog, t, oObject, oHeader, sURLComp) {

			var map = this._baseService;
			var strBase = (sURL && map[sURL]) ? map[sURL] : "";
			var strUrl = "https://" + this._baseDestination.base + strBase;
			var sContentType = "";
			var oData = null;
			
			if (sURLComp) {
				strUrl = strUrl + sURLComp;
			}

			sContentType = "application/json";
			oData = JSON.stringify(oObject);

			$.ajax({
				type: 'POST',
				url: strUrl,
				data: oData,
				headers: oHeader,
				contentType: sContentType,
				//dataType: "xml",
				success: function (data) {
					callback(data, sURL, sFromWhere, oDialog, t);
				},
				error: function (e) {
					callback(e, sURL, sFromWhere, oDialog, t);
				}
			});
		},

		putValuetoAJAX: function (callback, sURL, sFromWhere, oDialog, t, oObject, oHeader, sURLComp) {

			var map = this._baseService;
			var strBase = (sURL && map[sURL]) ? map[sURL] : "";
			var strUrl = "https://" + this._baseDestination.base + strBase;
			var sContentType = "";
			var oData = null;

			if (sURLComp) {
				strUrl = strUrl + sURLComp;
			}
			
			sContentType = "application/json";
			oData = JSON.stringify(oObject);

			$.ajax({
				type: 'PUT',
				url: strUrl,
				data: oData,
				headers: oHeader,
				contentType: sContentType,
				//dataType: "xml",
				success: function (data, textStatus, xhr) {
					callback(xhr, sURL, sFromWhere, oDialog, t);
				},
				error: function (e) {
					callback(e, sURL, sFromWhere, oDialog, t);
				}
			});
		},
		
		deleteValuetoAJAX: function (callback, sURL, sFromWhere, oDialog, t, oObject, oHeader, sURLComp) {

			var map = this._baseService;
			var strBase = (sURL && map[sURL]) ? map[sURL] : "";
			var strUrl = "https://" + this._baseDestination.base + strBase;
			var sContentType = "";
			var oData = null;

			sContentType = "application/json";
			
			if (sURLComp) {
				strUrl = strUrl + sURLComp;
			}

			$.ajax({
				type: 'DELETE',
				url: strUrl,
				//data: oData,
				headers: oHeader,
				contentType: sContentType,
				//dataType: "xml",
				success: function (data, textStatus, xhr) {
					callback(xhr, sURL, sFromWhere, oDialog, t);
				},
				error: function (e) {
					callback(e, sURL, sFromWhere, oDialog, t);
				}
			});
		},

		getLocalDatabyID: function (objvalue, oObj, keyLS) {
			var objLS = oObj;
			var objret = [];
			if (objLS) {
				for (var i = 0; i < objLS.length; i++) {
					var table = objLS[i];
					for (var prop in table) {
						if (table.hasOwnProperty(prop)) {
							if ((prop === keyLS) && (table[prop] === objvalue)) {
								objret.push(objLS[i]);
							}
						}
					}
				}
			}
			return objret;
		}

	};

	return Service;

}, true);