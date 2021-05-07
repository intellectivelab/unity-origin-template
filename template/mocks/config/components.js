module.exports = {

	documentsSearchCriteria: {
		"id": "documentsSearchCriteria",
		"title": "Filters",
		"sections": [
			{
				"title": "Content",
				"expanded": true,
				"fields": [
					{
						"name": "title",
						"dataType": "string",
						"label": "Doc Title",
						"placeholder": "Doc Title Contains",
						"quickSearch": true,
						"operator": {
							"id": "contains",
							"name": "contains"
						},
						"minLength": 3
					},
					{
						"name": "content",
						"dataType": "string",
						"label": "Doc Content",
						"placeholder": "Doc Content Contains",
						"quickSearch": true,
						"operator": {
							"id": "contains",
							"name": "contains"
						},
						"minLength": 3
					}
				],
			},
			{
				"title": "Selectors",
				"expanded": true,
				"fields": [
					{
						"name": 'fileType',
						"dataType": 'selector',
						"label": "File Type(s)",
						"selectorId": 'fileType',
						"ui": 'fileTypes',
						"multiValue": true,
						"quickSearch": true,
						"_links": {
							"selector": {
								"href": '/api/selectors/fileType'
							},
						}
					},
					{
						"name": 'createdBy',
						"dataType": 'selector',
						"label": "Created By",
						"selectorId": 'user',
						"multiValue": true,
						"_links": {
							"selector": {
								"href": '/api/selectors/user'
							},
						}
					},
					{
						"name": 'modifiedBy',
						"dataType": 'selector',
						"label": "Modified By",
						"selectorId": 'user',
						"multiValue": true,
						"quickSearch": true,
						"_links": {
							"selector": {
								"href": '/api/selectors/user'
							},
						}
					},
					{
						"name": "modifiedDate",
						"dataType": "date",
						"label": "Date Modified",
						"placeholder": "Date Modified On or After",
						"operator": {
							"id": "ge",
							"name": "greater than or equal"
						},
					},
					{
						"name": "modifiedDate",
						"dataType": "date",
						"label": "Date Modified",
						"placeholder": "Date Modified On or Before",
						"operator": {
							"id": "le",
							"name": "less than or equal"
						},
					}
				]
			},
			{
				"title": "Custom Fields",
				"expanded": false,
				"fields": [
					{
						"name": "customerName",
						"dataType": "string",
						"label": "Customer Name",
						"quickSearch": true,
						"operator": {
							"id": "contains",
							"name": "contains"
						},
					},
					{
						"name": "effectiveDate",
						"dataType": "date",
						"label": "Effective Date",
						"placeholder": "Effective Date On or After",
						"operator": {
							"id": "ge",
							"name": "greater than or equal"
						},
					},
				]
			},
		],
	},

	documentsSearchGrid: {
		"id": "documents",
		"title": "Documents",
		"ui": "infinite",
		"columns": [
			{
				"name": "id",
				"label": "Id",
				"dataType": "string",
				"sortable": false,
				"resizable": false
			},
			{
				"name": "fileType",
				"label": "File Type",
				"dataType": "mimeType",
				"sortable": false,
			},
			{
				"name": "title",
				"label": "Doc Title",
				"dataType": "string",
				"ui": "actionColumn",
				"sortable": true,
				"resizable": true
			},
			{
				"name": "customerName",
				"label": "Customer Name",
				"dataType": "string",
				"tooltip": "",
				"sortable": true,
				"resizable": true
			},
			{
				"name": "createdBy",
				"label": "Creator",
				"dataType": "string",
				"sortable": true,
				"resizable": true
			},
			{
				"name": "createdDate",
				"label": "Date Created",
				"dataType": "date",
				"sortable": true,
				"format": "MM/dd/yyyy",
				"resizable": true
			},
			{
				"name": "modifiedBy",
				"label": "Modified By",
				"dataType": "string",
				"sortable": true,
				"resizable": true
			},
			{
				"name": "modifiedDate",
				"label": "Date Modified",
				"dataType": "date",
				"sortable": true,
				"format": "MM/dd/yyyy",
				"resizable": true
			},
			{
				"name": "effectiveDate",
				"label": "Effective Date",
				"dataType": "date",
				"sortable": true,
				"resizable": true
			},
		],
		"default": ["title", "fileType", "customerName", "modifiedDate"],
		"favorite": ["title", "fileType"],
		"sorting": [
			{
				"column": "modifiedDate",
				"direction": "DESC"
			}
		],
		"_links": {
			"self": {
				"href": "/api/config/components/documentsSearchGrid",
				"type": "application/json"
			},
			"actions": {
				"href": "/api/config/grids/documents/actions",
				"type": "application/json"
			}
		}
	},

	documentsSearch: {
		"id": "documentsSearch",
		"title": "Domain Documents Search",
		"resourceName": "documents",
		"resourceType": "Document",
		"reactive": false,
		"_links": {
			"self": {
				"href": "/api/config/components/documentsSearch",
				"type": "application/json"
			},
			"criteria": {
				"href": "/api/config/components/documentsSearchCriteria",
				"type": "application/json"
			},
			"grid": {
				"href": "/api/config/components/documentsSearchGrid",
				"type": "application/json"
			},
			"query": {
				"href": "/api/documents/query",
				"type": "application/json"
			},
			"list": {
				"href": "/api/documents/list",
				"type": "application/json"
			},
		}
	},

	documentOpenView: {
		"id": "documentsView",
		"resourceName": "documents",
		"resourceType": "Document",
		"viewType": "Open",
		"tabs": [
			{
				"id": "1",
				"title": "Details",
				"tooltip": "Document Details",
				"type": "Details",
				"fieldSetId": "documentsViewFieldset",
				"_links": {
					"root": {
						"href": "/api/config/components/documentOpenView",
						"type": "application/json"
					},
					"self": {
						"href": "/api/config/components/documentOpenView/tabs/1",
						"type": "application/json"
					},
					"actions": {
						"href": "/api/config/components/documentOpenView/tabs/1/actions",
						"type": "application/json"
					},
					"fieldset": {
						"href": "/api/config/components/documentOpenViewFieldset",
						"type": "application/json"
					}
				}
			},
			{
				"id": "2",
				"title": "Versions",
				"tooltip": "Versions",
				"type": "Versions",
				"_links": {
					"root": {
						"href": "/api/config/components/documentOpenView",
						"type": "application/json"
					},
					"self": {
						"href": "/api/config/components/documentOpenView/tabs/2",
						"type": "application/json"
					},
					"templates": {
						"href": "/api/config/components/documentVersionsSearch/templates",
						"type": "application/json"
					}
				}
			},

		],
		"_links": {
			"self": {
				"href": "/api/config/components/documentOpenView",
				"type": "application/json"
			},
			"header": {
				"href": "/api/config/components/documentOpenView/header",
				"type": "application/json"
			}
		}
	},

	documentCreateView: {
		"id": "documentCreateView",
		"resourceName": "documents",
		"resourceType": "Document",
		"viewType": "Create",
		"tabs": [
			{
				"id": "1",
				"title": "Details",
				"tooltip": "Document Details",
				"type": "Details",
				"fieldSetId": "createViewFieldset",
				"_links": {
					"root": {
						"href": "/api/config/components/documentCreateView",
						"type": "application/json"
					},
					"self": {
						"href": "/api/config/components/documentCreateView/tabs/1",
						"type": "application/json"
					},
					"actions": {
						"href": "/api/config/components/documentCreateView/tabs/1/actions",
						"type": "application/json"
					},
					"fieldset": {
						"href": "/api/config/components/documentCreateViewFieldset",
						"type": "application/json"
					}
				}
			},
		],
		"_links": {
			"self": {
				"href": "/api/config/components/documentCreateView",
				"type": "application/json"
			},
			"header": {
				"href": "/api/config/components/documentCreateView/header",
				"type": "application/json"
			}
		}
	},

	documentOpenViewFieldset: {
		"columns": 2,
		"header": [
			{
				"name": "title",
				"label": "Document Title",
				"dataType": "string",
			},
			{
				"name": "createdBy",
				"label": "Creator",
				"dataType": "string",
			},
			{
				"name": "createdDate",
				"label": "Date Created",
				"dataType": "date",
			},
		],
		"fields": [
			{
				"name": "title",
				"label": "Document title",
				"dataType": "string",
				"required": true,
				"ui": "title",
				"colSpan": 2,
			},
			{
				"name": "customerName",
				"label": "Customer Name",
				"dataType": "string",
			},
			{
				"name": "effectiveDate",
				"label": "Effective Date",
				"dataType": "date",
			},
		],
		"sections": [
			{
				"title": "File Information",
				"expanded": false,
				"fields": [
					{
						"name": "createdBy",
						"label": "Creator",
						"dataType": "string",
						"readOnly": true,
					},
					{
						"name": "createdDate",
						"label": "Date Created",
						"dataType": "date",
						"readOnly": true,
					},
					{
						"name": "modifiedBy",
						"label": "Modified By",
						"dataType": "string",
						"readOnly": true,
					},
					{
						"name": "modifiedDate",
						"label": "Date Modified",
						"dataType": "date",
						"readOnly": true,
					},
				]
			}
		],
		"_links": {
			"self": {
				"href": "/api/config/components/documentsViewFieldset",
				"type": "application/json"
			}
		}
	},

	documentCreateViewFieldset: {
		"columns": 2,
		"fields": [
			{
				"name": "title",
				"label": "Document title",
				"dataType": "string",
				"required": true,
				"colSpan": 2,
			},
			{
				"name": "FolderPath",
				"label": "Folder",
				"dataType": "folderselect",
				"tooltip": "Select a folder to upload the document(s)",
				"multiValue": false,
				"colSpan": 2,
				"folderPath": "/",
				"_links": {
					"browse": {
						"href": "/api/folders/browse?scope=sharepoint&root=/&offset=0&limit=20"
					}
				}
			},
			{
				"name": "customerName",
				"label": "Customer Name",
				"dataType": "string",
			},
			{
				"name": "effectiveDate",
				"label": "Effective Date",
				"dataType": "date",
			},
		],
		"_links": {
			"self": {
				"href": "/api/config/components/createViewFieldset",
				"type": "application/json"
			}
		}
	},

	documentVersionsCriteria: {
		"id": "versionsSearch",
		"title": "Versions Search",
	},

	documentVersionsGrid: {
		"id": "versions",
		"title": "Versions",
		"columns": [
			{
				"name": "version",
				"label": "Version",
				"dataType": "string",
				"tooltip": "Version",
			},
			{
				"name": "title",
				"label": "Doc Title",
				"dataType": "string",
				"width": 200,
				"tooltip": "",
				"sortable": true,
				"resizable": true
			},
			{
				"name": "createdBy",
				"label": "Creator",
				"dataType": "string",
				"width": 100,
				"tooltip": "",
				"sortable": true,
				"resizable": true
			},
			{
				"name": "createdDate",
				"label": "Date Created",
				"dataType": "datetime",
				"width": 100,
				"tooltip": "",
				"sortable": true,
				"format": "MM/dd/yyyy hh:mm a",
				"resizable": true
			},
			{
				"name": "modifiedBy",
				"label": "Modified By",
				"dataType": "string",
				"width": 100,
				"tooltip": "",
				"sortable": true,
				"resizable": true
			},
			{
				"name": "modifiedDate",
				"label": "Date Modified",
				"dataType": "datetime",
				"width": 100,
				"tooltip": "",
				"sortable": true,
				"format": "MM/dd/yyyy hh:mm a",
				"resizable": true
			},
			{
				"name": "effectiveDate",
				"label": "Effective Date",
				"dataType": "date",
				"width": 100,
				"tooltip": "",
				"sortable": true,
//            	"format": "MM/dd/yyyy", // Default format;
				"resizable": true
			},
		],
		"default": ["version", "title", "modifiedDate"],
		"sorting": [
			{
				"column": "modifiedDate",
				"direction": "DESC"
			}
		],
		"_links": {
			"self": {
				"href": "/api/config/components/versions",
				"type": "application/json"
			},
			"actions": {
				"href": "/api/config/grids/versions/actions",
				"type": "application/json"
			}

		}
	},

	documentVersionsSearch: [{
		"id": "documentVersionsSearch",
		"title": "Document versions",
		"resourceName": "documents",
		"resourceType": "Document",
		"_links": {
			"self": {
				"href": "/api/config/components/documentVersionsSearch",
				"type": "application/json"
			},
			"criteria": {
				"href": "/api/config/components/documentVersionsCriteria",
				"type": "application/json"
			},
			"grid": {
				"href": "/api/config/components/documentVersionsGrid",
				"type": "application/json"
			},
			"query": {
				"href": "/api/documents/query",
				"type": "application/json"
			},
			"list": {
				"href": "/api/documents/list",
				"type": "application/json"
			},
		}
	}],
};
