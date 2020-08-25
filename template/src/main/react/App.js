import React from 'react';

import _url from "url";

import {
	ColumnsLayout,
	DefaultDashboardBuilder,
	DefaultThemeProvider,
	FactoryContextProvider,
	PerspectivesLoader,
	registerBuilder,
	ResourceViewBuilder
} from '@intellective/core';

import DomainActionFactory from "./factories/DomainActionFactory";
import DomainComponentFactory from "./factories/DomainComponentFactory";

const defaultViewSettings = {
	variant: 'dialog',
	fullScreen: true,
	maxWidth: 'xl',
	innerMaxWidth: 'lg',
	margin: 'dense',
	toolbarVariant: 'dense',
	Layout: ColumnsLayout(2)
};

const App = () => {
	registerBuilder('default', DefaultDashboardBuilder);
	registerBuilder('dashboard', DefaultDashboardBuilder);

	const urlObj = _url.parse(window.location.search, true);
	const searchParams = urlObj.query;

	if (searchParams.p && searchParams.p === 'resourceView') {
		return (
			<DefaultThemeProvider>
				<FactoryContextProvider viewSettings={defaultViewSettings}
				                        ActionFactory={DomainActionFactory}
				                        ComponentFactory={DomainComponentFactory}>
					<ResourceViewBuilder searchParams={searchParams}/>
				</FactoryContextProvider>
			</DefaultThemeProvider>
		);
	}

	return (
		<DefaultThemeProvider>
			<FactoryContextProvider viewSettings={defaultViewSettings}
			                        ActionFactory={DomainActionFactory}
			                        ComponentFactory={DomainComponentFactory}>
				<PerspectivesLoader title="Unity Application"
									href='./api/1.0.0/config/perspectives'
									searchParams={searchParams}/>
			</FactoryContextProvider>
		</DefaultThemeProvider>
	);
};

const constantMock = window.fetch;

window.fetch = function () {
	let secondArg = arguments[1] || {};
	secondArg.redirect = 'manual';
	arguments[1] = secondArg;

	return constantMock.apply(this, arguments).then(response => {
		if (response.type === 'opaqueredirect' && !response.ok) {
			alert("HTTP session expired. You will be redirected to the authentication page.");

			window.location.reload();
		}
		return response;
	});
};

export default App;
