module.exports = [
	{
		"id": "unity-origin",
		"title": "Unity Application",
		"default": true,
		"dashboards": [
			{
				"id": "page1",
				"title": "Employees Search",
				"tooltip": "Showcase of using default search template",
				"lazy": true,
				"components": [
					{
						"id": "usersSearch0",
						"type": "searchTemplate",
						"_links": {
							"config": {
								"href": "/api/config/components/usersSearch0"
							}
						}
					},
				],
				"_links": {
					"self": {
						"href": "/api/config/perspectives/unity-origin/dashboards/page1"
					},
				}
			},
			{
				"id": "page2",
				"title": "Folders View",
				"tooltip": "Showcase of using search template and folders",
				"components": [
					{
						"id": "DocumentSearchTemplate",
						"type": "searchTemplate",
						"folderPath": "/",
						"_links": {
							"config": {
								"href": "/api/config/components/DocumentSearchTemplate"
							},
							"browse": {
								"href": "/api/folders/browse?scope=ce_repository&root=/&offset=0&limit=20"
							}
						}
					},
				],
				"_links": {
					"self": {
						"href": "/api/config/perspectives/unity-origin/dashboards/page2"
					},
					"actions": {
						"href": "/api/config/perspectives/unity-origin/dashboards/page2/actions"
					}
				}
			},
			{
				"id": "page3",
				"title": "Case Search",
				"tooltip": "Showcase of using default search for cases",
				"lazy": true,
				"default": false,
				"components": [
					{
						"id": "CaseSearchTemplate",
						"type": "searchTemplate",
						"_links": {
							"config": {
								"href": "/api/config/components/CaseSearchTemplate"
							}
						}
					},
				],
				"_links": {
					"self": {
						"href": "/api/config/perspectives/unity-origin/dashboards/page3"
					}
				}
			}
		],
		"_links": {
			"self": {
				"href": "/api/config/perspectives/unity-origin"
			},
			"dashboards": {
				"href": "/api/config/perspectives/unity-origin/dashboards"
			}
		}
	}
];
