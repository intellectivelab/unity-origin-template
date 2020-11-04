import * as R from "ramda";

import {DefaultComponentFactory} from "@intellective/core";

const DomainComponentFactory = R.cond([
	//put your custom code here
]);

export default (props) => DomainComponentFactory(props) || DefaultComponentFactory(props);