sap.ui.define([
	'jquery.sap.global',
	'sap/m/UploadCollectionParameter',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
], function(jQuery, UploadCollectionParameter, Controller, JSONModel) {
	"use strict";

	var PageController = Controller.extend("upload.demo.controller.Page", {

		onInit: function() {
			var sPath,
				oModel,
				aDataCB,
				oModelCB;

			// set mock data
			sPath = jQuery.sap.getModulePath("upload.demo", "/model/uploadCollection.json");
			oModel = new JSONModel(sPath);
			this.getView().setModel(oModel);

			aDataCB = {
				"items": [{
					"key": "All",
					"text": "sap.m.ListSeparators.All"
				}, {
					"key": "None",
					"text": "sap.m.ListSeparators.None"
				}],
				"selectedKey": "All"
			};

			oModelCB = new JSONModel();
			oModelCB.setData(aDataCB);

			// Flag to track if the upload of the new version was triggered by the Upload a new version button.
			this.bIsUploadVersion = false;
		},

		onChange: function(oEvent) {
			var aFiles = oEvent.getParameter('files'),
				oData = this.getView().byId("UploadCollection").getModel().getData(),
				aItems = jQuery.extend(true, {}, oData).items;

			for (var i = 0; i < aFiles.length; i++) {
				aItems.unshift({
					documentId: Date.now().toString(),
					fileName: aFiles[i].name,
					mimeType: aFiles[i].type,
					filesize: aFiles[i].size,
					creationDate: new Date(),
					"attributes": [{
						"title": "Uploaded By",
						"text": "You"
					}, {
						"title": "Uploaded On",
						"text": new Date(jQuery.now()).toLocaleDateString()
					}, {
						"title": "File Size",
						"text": aFiles[i].size
					}, {
						"title": "Version",
						"text": "1"
					}]
				});

			}

			this.getView().byId("UploadCollection").getModel().setData({
				"items": aItems
			});
		}
	});

	return PageController;

});