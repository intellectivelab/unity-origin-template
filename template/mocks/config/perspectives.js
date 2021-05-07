module.exports = [
	{
		"id": "domain",
		"title": "Domain Perspective",
		"default": true,
		"dashboards": [
			{
				"id": "page1",
				"title": "Domain Application",
				"tooltip": "Domain Unity Application",
				"components": [
					{
						"id": "documentsSearch",
						"type": "searchTemplate",
						"_links": {
							"config": {
								"href": "/api/config/components/documentsSearch"
							}
						}
					},
				],
				"_links": {
					"self": {
						"href": "/api/config/perspectives/domain/dashboards/page1"
					},
					"actions": {
						"href": "/api/config/perspectives/domain/dashboards/page1/actions"
					},
				}
			}
		],
		"_links": {
			"self": {
				"href": "/api/config/perspectives/domain"
			},
			"dashboards": {
				"href": "/api/config/perspectives/domain/dashboards"
			}
		}
	},
	{
		"id": "analytics",
		"title": "Unity Analytics",
		"dashboards": [
			{
				"id": "page1",
				"title": "Employee Analytics",
				"tooltip": "Showcase of using visualizing employees",
				"lazy": true,
				"builder": 'dashboard',
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
						"href": "/api/config/perspectives/analytics/dashboards/page1"
					},
					"actions": {
						"href": "/api/config/perspectives/analytics/dashboards/dashboard/actions"
					},
				}
			},
			{
				"id": "page2",
				"title": "Case Analytics",
				"tooltip": "Case Analytics Visualization",
				"lazy": true,
				"default": false,
				"builder": 'dashboard',
				"components": [
					{
						"id": "HierarchyComposite",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/HierarchyComposite"
							}
						}
					},
					{
						"id": "CaseTypeByLocationBreakdown",
						"type": "chart",
						"layout": "X6",
						"_links": {
							"config": {
								"href": "/api/config/components/CaseTypeByLocationBreakdown"
							}
						}
					},
					{
						"id": "CaseStatusBreakdown",
						"type": "chart",
						"layout": "X6",
						"_links": {
							"config": {
								"href": "/api/config/components/CaseStatusBreakdown"
							}
						}
					},
					{
						"id": "casetasks",
						"type": "grid",
						"_links": {
							"config": {
								"href": "/api/config/components/casetasks"
							},
							"query": {
								"href": "/api/casetasks/query",
								"type": "application/json"
							},
							"list": {
								"href": "/api/casetasks/list",
								"type": "application/json"
							}
						}
					},
				],
				"_links": {
					"self": {
						"href": "/api/config/perspectives/analytics/dashboards/page2"
					},
					"actions": {
						"href": "/api/config/perspectives/analytics/dashboards/dashboard/actions"
					},
				}
			},
			{
				"id": "page3",
				"title": "Process Analytics",
				"tooltip": "SLA",
				"lazy": true,
				"builder": 'dashboard',
				"components": [
					{
						"id": "caseTasksCriteria",
						"type": "criteria",
						"_links": {
							"config": {
								"href": "/api/config/components/caseTasksCriteria"
							}
						}
					},
					{
						"id": "CaseAvgDuration",
						"type": "indicator",
						"_links": {
							"config": {
								"href": "/api/config/components/CaseAvgDuration"
							}
						}
					},
					{
						"id": "ActiveCases",
						"type": "indicator",
						"_links": {
							"config": {
								"href": "/api/config/components/ActiveCases"
							}
						}
					},
					{
						"id": "SLA_Warnings",
						"type": "indicator",
						"_links": {
							"config": {
								"href": "/api/config/components/SLA_Warnings"
							}
						}
					},
					{
						"id": "SLAByWeek",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/SLAByWeek"
							}
						}
					},
					{
						"id": "TasksByRegion",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/TasksByRegion"
							}
						}
					},
					{
						"id": "CaseTypes",
						"type": "chart",
						"cluster": "casetypes",
						"layout": "X4",
						"_links": {
							"config": {
								"href": "/api/config/components/CaseTypes"
							}
						}
					},
					{
						"id": "AvgCaseTypeDuration",
						"type": "chart",
						"cluster": "casetypes",
						"layout": "X8",
						"_links": {
							"config": {
								"href": "/api/config/components/AvgCaseTypeDuration"
							}
						}
					},
					{
						"id": "TasksByStartDate",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/TasksByStartDate"
							}
						}
					},
					{
						"id": "TaskNamesByStartDate",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/TaskNamesByStartDate"
							}
						}
					},
					{
						"id": "casetasks",
						"type": "grid",
						"_links": {
							"config": {
								"href": "/api/config/components/casetasks"
							},
							"query": {
								"href": "/api/casetasks/query",
								"type": "application/json"
							},
							"list": {
								"href": "/api/casetasks/list",
								"type": "application/json"
							}
						}
					},
				],
				"_links": {
					"self": {
						"href": "/api/config/perspectives/analytics/dashboards/page3"
					},
					"actions": {
						"href": "/api/config/perspectives/analytics/dashboards/dashboard/actions"
					},
				}
			},
			{
				"id": "page4",
				"title": "Cases By Regions",
				"tooltip": "Showcase of using visualizing case by regions",
				"lazy": true,
				"builder": 'dashboard',
				"components": [
					{
						"id": "caseTasksCriteria",
						"type": "criteria",
						"_links": {
							"config": {
								"href": "/api/config/components/caseTasksCriteria"
							}
						}
					},
					{
						"id": "CaseAvgDuration",
						"type": "indicator",
						"_links": {
							"config": {
								"href": "/api/config/components/CaseAvgDuration"
							}
						}
					},
					{
						"id": "ActiveCases",
						"type": "indicator",
						"_links": {
							"config": {
								"href": "/api/config/components/ActiveCases"
							}
						}
					},
					{
						"id": "TasksByRegion",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/TasksByRegion"
							}
						}
					},
					{
						"id": "RegionCaseType",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/RegionCaseType"
							}
						}
					},
					{
						"id": "AssignedToName",
						"type": "chart",
						"_links": {
							"config": {
								"href": "/api/config/components/AssignedToName"
							}
						}
					},
					{
						"id": "casetasks",
						"type": "grid",
						"_links": {
							"config": {
								"href": "/api/config/components/casetasks"
							},
							"query": {
								"href": "/api/casetasks/query",
								"type": "application/json"
							},
							"list": {
								"href": "/api/casetasks/list",
								"type": "application/json"
							}
						}
					},
				],
				"_links": {
					"self": {
						"href": "/api/config/perspectives/analytics/dashboards/page4"
					},
					"actions": {
						"href": "/api/config/perspectives/analytics/dashboards/dashboard/actions"
					},
				}
			},
		],
		"_links": {
			"self": {
				"href": "/api/config/perspectives/analytics"
			},
			"dashboards": {
				"href": "/api/config/perspectives/analytics/dashboards"
			}
		}
	},
];
