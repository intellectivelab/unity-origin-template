module.exports = {
    "documents": [
        {
            "name": "createDocument",
            "label": "Create",
            "tooltip": "Create a document",
            "type": "create",
            "resourceName": 'documents',
            "resourceType": 'Document',
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/view",
                    "type": "application/json"
                },
                "model": {
                    "href": "/api/documents",
                    "type": "application/json"
                },
                "view": {
                    "href": "/api/config/components/documentCreateView",
                    "type": "application/json"
                }
            }
        },
        {
            "name": "openInBrowser",
            "label": "Open in browser",
            "tooltip": "Open in browser",
            "type": "open.browser",
            "resourceName": "documents",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/openInBrowser",
                    "type": "application/json"
                }
            }
        },
        {
            "name": "openInDesktopApp",
            "label": "Open in app",
            "tooltip": "Open in app",
            "type": "open.desktop",
            "resourceName": "documents",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/openInDesktopApp",
                    "type": "application/json"
                }
            }
        },
        {
            "name": "view_content",
            "label": "Open in browser",
            "tooltip": "Open in browser",
            "type": "view_content",
            "resourceName": "documents",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/view_content",
                    "type": "application/json"
                }
            }
        },
        {
            "name": "copy_link",
            "label": "Copy link",
            "tooltip": "Copy link",
            "resourceName": "documents",
            "type": "copy_link",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/copy_link",
                    "type": "application/json"
                }
            }
        },
        {
            "name": "download",
            "label": "Download",
            "tooltip": "Download",
            "type": "download",
            "resourceName": "documents",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/download",
                    "type": "application/json"
                }
            }
        },
        {
            "name": "bulk_download",
            "label": "Download",
            "tooltip": "Download",
            "type": "download",
            "resourceName": "documents",
            "href": "/api/documents/download",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/bulk_download",
                    "type": "application/json"
                }
            }
        },
        {
            "name": "delete",
            "label": "Delete",
            "tooltip": "Delete",
            "type": "delete",
            "resourceName": "documents",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/delete",
                    "type": "application/json"
                }
            }
        },
        {
            "name": "rename",
            "label": "Rename",
            "tooltip": "Change document title",
            "type": "rename",
            "resourceName": "documents",
            "nameProperty": "title",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/rename",
                    "type": "application/json"
                }
            }
        },
        {
            "name": "checkin",
            "label": "Check In",
            "tooltip": "Check In",
            "type": "checkin",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/checkin",
                    "type": "application/json"
                },
                "model": {
                    "href": "/api/documents",
                    "type": "application/json"
                }
            }
        },
        {
            "name": "checkout",
            "label": "Check Out",
            "tooltip": "Check Out",
            "type": "checkout",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/checkout",
                    "type": "application/json"
                }
            }
        },
        {
            "name": "cancelCheckOut",
            "label": "Cancel Check Out",
            "tooltip": "Cancel Check Out",
            "type": "cancelCheckOut",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/cancelCheckOut",
                    "type": "application/json"
                }
            }
        },
        {
            "name": "view",
            "label": "Details",
            "tooltip": "View Details",
            "type": "view",
            "resourceName": "documents",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/view",
                    "type": "application/json"
                }
            }
        },
    ],
    "versions": [
        {
            "name": "download",
            "label": "Download",
            "tooltip": "Download",
            "type": "download",
            "resourceName": "documents",
            "_links": {
                "root": {
                    "href": "/api/config/actions",
                    "type": "application/json"
                },
                "self": {
                    "href": "/api/config/actions/download",
                    "type": "application/json"
                }
            }
        },
	    {
		    "name": "view_content",
		    "label": "Open in browser",
		    "tooltip": "Open in browser",
		    "type": "view_content",
		    "resourceName": "documents",
		    "_links": {
			    "root": {
				    "href": "/api/config/actions",
				    "type": "application/json"
			    },
			    "self": {
				    "href": "/api/config/actions/view_content",
				    "type": "application/json"
			    }
		    }
	    },
	    {
		    "name": "openInBrowser",
		    "label": "Open in browser",
		    "tooltip": "Open in browser",
		    "type": "open.browser",
		    "resourceName": "documents",
		    "_links": {
			    "root": {
				    "href": "/api/config/actions",
				    "type": "application/json"
			    },
			    "self": {
				    "href": "/api/config/actions/openInBrowser",
				    "type": "application/json"
			    }
		    }
	    },
	    {
		    "name": "openInDesktopApp",
		    "label": "Open in app",
		    "tooltip": "Open in app",
		    "type": "open.desktop",
		    "resourceName": "documents",
		    "_links": {
			    "root": {
				    "href": "/api/config/actions",
				    "type": "application/json"
			    },
			    "self": {
				    "href": "/api/config/actions/openInDesktopApp",
				    "type": "application/json"
			    }
		    }
	    },
    ],
};
