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
];
