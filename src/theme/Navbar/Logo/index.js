import React from 'react';
import Logo from '@theme/Logo';

export default function NavbarLogo({theme}) {
	return (
		<Logo
			data-theme={theme}
			theme={theme}
			className="navbar__brand"
			imageClassName="navbar__logo"
			titleClassName="navbar__title text--truncate"
		/>
	);
}
