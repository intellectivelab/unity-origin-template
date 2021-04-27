import React from "react";

import * as R from "ramda";

import {DefaultFormFieldFactory} from "@intellective/core";

const DomainFormFieldFactory = R.cond([
	//put your custom code here
]);

export default (field) => DomainFormFieldFactory(field) || DefaultFormFieldFactory(field);