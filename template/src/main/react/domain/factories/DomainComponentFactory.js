import * as R from "ramda";

import {DefaultComponentFactory} from "@intellective/core";
import {AnalyticsComponentFactory} from "@intellective/analytics";

const isChart = R.propEq('type', 'chart');
const isIndicator = R.propEq('type', 'indicator');

const DomainComponentFactory = R.cond([
	//put your custom code here
	[isChart, AnalyticsComponentFactory],
	[isIndicator, AnalyticsComponentFactory],
	[R.T, DefaultComponentFactory]
]);

export default DomainComponentFactory;