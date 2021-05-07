module.exports = [
    {
        "name": "fileType",
        "refreshTimeout": "-1",
        "_links": {
            "self": {
                "href": "/api/selectors/fileType",
                "type": "application/json"
            },
            "query": {
                "href": "/api/selectors/fileType/items?limit=100&offset=0",
                "type": "application/json"
            }
        }
    },
	{
		"name": "user",
		"refreshTimeout": "-1",
		"_links": {
			"self": {
				"href": "/api/selectors/user",
				"type": "application/json"
			},
			"query": {
				"href": "/api/selectors/user/items?limit=100&offset=0",
				"type": "application/json"
			}
		}
	}
];
