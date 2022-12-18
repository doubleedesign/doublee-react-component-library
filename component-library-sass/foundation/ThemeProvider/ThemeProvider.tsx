import React from 'react';
import '../_colour-themes.scss';

export interface ThemeProviderProps {
	colours: string
}

export const ThemeProvider: React.FC<ThemeProviderProps> = function (props: {
	colours: string
}) {

	return (
		<div data-theme={props.colours}>
			Test theme provider
		</div>
	);
};

export default ThemeProvider;