module.exports = {
	"name": "User",
	"label": "User",
	"description": "",
	"fields": [
		{
			"name": "id",
			"label": "Id",
			"dataType": "string",
			"multiValue": false,
			"readOnly": false,
			"hidden": true,
			"filterable": false,
			"sortable": false,
			"required": false
		},
		{
			"name": "fullName",
			"label": "Name",
			"dataType": "string",
			"multiValue": false,
			"readOnly": false,
			"hidden": false,
			"filterable": false,
			"sortable": true,
			"required": false
		},
		{
			"name": "gender",
			"label": "Gender",
			"dataType": "choices",
			"options": [{"name": "Male", "value": "Male"}, {"name": "Female", "value": "Female"}],
			"multiValue": false,
			"readOnly": false,
			"defaultValue": "Female",
			"hidden": false,
			"filterable": false,
			"sortable": true,
			"required": true
		},
		{
			"name": "dob",
			"label": "Date of Birth",
			"dataType": "date",
			"multiValue": false,
			"readOnly": false,
			"hidden": false,
			"filterable": false,
			"sortable": true,
			"required": false
		},
		{
			"name": "age",
			"label": "Age",
			"dataType": "int",
			"multiValue": false,
			"readOnly": false,
			"minValue": 14,
			"maxValue": 150,
			"required": true,
			"tooltip": ""
		},
		{
			"name": "email",
			"label": "Email",
			"dataType": "string",
			"multiValue": false,
			"readOnly": false,
			"hidden": false,
			"filterable": false,
			"sortable": true,
			"required": false
		},
		{
			"name": "phone",
			"label": "Phone",
			"dataType": "string",
			"multiValue": false,
			"readOnly": false,
			"hidden": false,
			"filterable": false,
			"sortable": true,
			"required": false
		},
		{
			"name": "companyName",
			"label": "Company",
			"dataType": "string",
			"multiValue": false,
			"readOnly": false,
			"hidden": false,
			"filterable": false,
			"sortable": true,
			"required": true
		},
		{
			"name": "jobArea",
			"label": "Industry",
			"dataType": "string",
			"multiValue": false,
			"readOnly": false,
			"hidden": false,
			"filterable": false,
			"sortable": true,
			"required": false
		},
		{
			"name": "jobType",
			"label": "Job",
			"dataType": "string",
			"multiValue": false,
			"readOnly": false,
			"hidden": false,
			"filterable": false,
			"sortable": true,
			"required": false
		},
		{
			"name": "countryName",
			"label": "Country",
			"dataType": "string",
			"multiValue": false,
			"readOnly": false,
			"hidden": false,
			"filterable": false,
			"sortable": true,
			"required": false
		},
		{
			"name": "state",
			"label": "State",
			"dataType": "string",
			"multiValue": false,
			"readOnly": false,
			"hidden": false,
			"filterable": false,
			"sortable": true,
			"required": false
		},
		{
			"name": "city",
			"label": "City",
			"dataType": "string",
			"multiValue": false,
			"readOnly": false,
			"hidden": false,
			"filterable": false,
			"sortable": true,
			"required": false
		},
		{
			"name": "zipCode",
			"label": "Zip",
			"dataType": "string",
			"multiValue": false,
			"readOnly": false,
			"hidden": false,
			"filterable": false,
			"sortable": true,
			"required": false
		}
	]
};