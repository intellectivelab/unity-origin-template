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
			},
			{
				"id": "page4",
				"title": "Employee Analytics",
				"tooltip": "Showcase of using visualizing employees",
				"lazy": true,
				"builder": 'dashboard',
				filter: "gender==Male",
				"components": [
					{
						"id": "usersSearchCriteria",
						"type": "criteria",
						"_links": {
							"config": {
								"href": "/api/config/components/usersSearchCriteria"
							}
						}
					},
					{
						"id": "minAgeIndicator",
						"type": "indicator",
						"_links": {
							"config": {
								"href": "/api/config/components/minAgeIndicator"
							}
						}
					},
					{
						"id": "maxAgeIndicator",
						"type": "indicator",
						"_links": {
							"config": {
								"href": "/api/config/components/maxAgeIndicator"
							}
						}
					},
					{
						"id": "salaryAvgIndicator",
						"type": "indicator",
						"_links": {
							"config": {
								"href": "/api/config/components/salaryAvgIndicator"
							}
						}
					},
					{
						"id": "usersByCountry",
						"type": "chart",
						"cluster": "users",
						"layout": "X4",
						"_links": {
							"config": {
								"href": "/api/config/components/usersByCountry"
							}
						}
					},
					{
						"id": "usersByIndustry",
						"type": "chart",
						"cluster": "users",
						"layout": "X4",
						"_links": {
							"config": {
								"href": "/api/config/components/usersByIndustry"
							}
						}
					},
					{
						"id": "usersByGender",
						"type": "chart",
						"cluster": "users",
						"layout": "X4",
						"_links": {
							"config": {
								"href": "/api/config/components/usersByGender"
							}
						}
					},
					{
						"id": "jobsAreaByCountry",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/jobsAreaByCountry"
							}
						}
					},
					{
						"id": "industryStatistics",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/industryStatistics"
							}
						}
					},
					{
						"id": "jobStatistics",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/jobStatistics"
							}
						}
					},
					{
						"id": "jobsTypeByArea",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/jobsTypeByArea"
							}
						}
					},
					{
						"id": "users",
						"type": "grid",
						"_links": {
							"config": {
								"href": "/api/config/components/users"
							},
							"query": {
								"href": "/api/users/query",
								"type": "application/json"
							},
							"list": {
								"href": "/api/users/list",
								"type": "application/json"
							}
						}
					},
				],
				"_links": {
					"self": {
						"href": "/api/config/perspectives/unity-origin/dashboards/page4"
					},
					"actions": {
						"href": "/api/config/perspectives/unity-origin/dashboards/dashboard/actions"
					},
				}
			},
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
