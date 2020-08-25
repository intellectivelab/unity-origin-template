import React from "react";

import * as R from "ramda";

import {CreateCaseWithAttachments as CreateCaseAction, DefaultActionFactory, DefaultActionMapper, DefaultFormSubmitHandlerMapper} from "@intellective/core";

const DomainActionMapper = R.curry((settings = {}, action) => {
	// Add custom actions creation logic here. For example,

	const isCreateAction = R.propEq('type', 'create');
	const isCaseResource = R.propEq('resourceName', "cases");
	const isCreateCaseAction = R.allPass([isCreateAction, isCaseResource]);

	return R.cond([
		[isCreateCaseAction, R.always(CreateCaseAction(settings))],
	])(action);
});

const DomainFormSubmitHandlerMapper = R.cond([]);

export default function DomainActionFactory(defaultSettings = {}) {
	DefaultActionFactory.call(this);

	this.createAction = R.curry((action, props) => {
		const {settings = {}, ...otherProps} = props;

		const {view: viewSettings = {}} = settings;

		const _settings = {...defaultSettings, ...viewSettings};

		const ActionComponent = DomainActionMapper(_settings, action) || DefaultActionMapper(_settings, action);

		return ActionComponent && <ActionComponent {...otherProps} {...action} action={action}/>;
	});

	this.getFormSubmitHandler = (props) => DomainFormSubmitHandlerMapper(props) || DefaultFormSubmitHandlerMapper(props);
}