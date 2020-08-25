import * as R from "ramda";

import {DefaultComponentFactory, DefaultGridViewFactory} from "@intellective/core";

const DomainComponentFactory = R.cond([
	[R.propEq('type', 'grid'), DefaultGridViewFactory],
]);

export default (props) => DomainComponentFactory(props) || DefaultComponentFactory(props);