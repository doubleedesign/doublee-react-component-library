// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('./src/prism/light');
const darkCodeTheme = require('./src/prism/dark');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Double-E Design Component Library',
	tagline: 'Designing things and writing code',
	url: 'https://your-docusaurus-test-site.com',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/icon.svg',

	customFields: {
		titleAppend: 'for React',
		footer: {
			author: 'Leesa with a Double-E',
			authorLink: 'https://www.github.com/doubleedesign',
			credits: 'This site built with Docusaurus. "Logo" icon from Font Awesome.'
		}
	},

	// Even if you don't use internalization, you can use this field to set useful
	// metadata like html lang. For example, if your site is Chinese, you may want
	// to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					routeBasePath: '/',
					sidebarPath: require.resolve('./sidebars.js'),
				},
				theme: {
					customCss: require.resolve('./src/custom.scss'),
				},
			}),
		],
	],

	plugins: ['docusaurus-plugin-sass'],

	themeConfig:
	/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				style: 'dark',
				title: 'Double-E Design Component Library',
				logo: {
					src: 'img/icon.svg',
					srcDark: 'img/icon-darkmode.svg'
				},
				items: [
					{
						href: 'https://github.com/doubleedesign/doublee-design-system-react',
						label: 'GitHub',
						position: 'right',
					},
				],
			},
			footer: {
				style: 'light'
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};

module.exports = config;
