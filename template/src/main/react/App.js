import React from 'react';

import _url from "url";

import {DefaultDashboardBuilder, DefaultThemeProvider, FactoryContextProvider, PerspectiveContainer, registerBuilder} from '@intellective/core';

import DomainActionFactory from "./factories/DomainActionFactory";
import DomainComponentFactory from "./factories/DomainComponentFactory";
import DomainFormFieldFactory from "./factories/FormField/DomainFormFieldFactory";

import DomainPalettes from "./themes/DomainPalettes";
import DomainThemeBuilder from "./themes/DomainThemeBuilder";

const App = () => {
	registerBuilder('dashboard', DefaultDashboardBuilder);

	const urlObj = _url.parse(window.location.search, true);
	const searchParams = urlObj.query;

	return (
		<DefaultThemeProvider
			Builder={DomainThemeBuilder}
			Palettes={DomainPalettes}
		>
			<FactoryContextProvider
				ActionFactory={new DomainActionFactory()}
				ComponentFactory={DomainComponentFactory}
				FormFieldFactory={DomainFormFieldFactory}
			>
				<PerspectiveContainer searchParams={searchParams} href='./api/1.0.0/config/perspectives'/>
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
