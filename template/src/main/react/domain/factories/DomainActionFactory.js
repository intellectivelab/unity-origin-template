import React from "react";

import * as R from "ramda";

import {DefaultActionFactory, DefaultActionMapper, DefaultFormSubmitHandlerMapper, TwoColumnsLayout} from '@intellective/core';

const defaultSettings = {
	fullScreen: true,
	margin: 'dense',
	innerMaxWidth: 'lg',
	maxWidth: 'xl',
	variant: 'dialog',
	Layout: TwoColumnsLayout
};

const DomainActionMapper = R.curry((settings = {}, action) => (
	R.cond([
		//put your custom code here
	])(action)
));

export default function DomainActionFactory(config = defaultSettings) {
	DefaultActionFactory.call(this);

	this.createAction = R.curry((action, props) => {
		const {settings = {}, ...otherProps} = props;

		const {view: viewSettings = {}} = settings;

		const ActionComponent = DomainActionMapper({...config, ...viewSettings}, action) || DefaultActionMapper({...config, ...viewSettings}, action);

		return <ActionComponent {...otherProps} {...action} action={action}/>;
	});

	this.getFormSubmitHandler = DefaultFormSubmitHandlerMapper
}