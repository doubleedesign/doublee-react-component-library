/**
 * Note: There are some hacked-in class names in the overridden CodeBlock component (theme/CodeBlock/index.js)
 * to which these styles won't apply; there are styles for that in style-overrides.css for that and other things
 * that I couldn't do here, in the case of future conflicts check those places
 */
module.exports = {
	plain: {
		color: '#F8F8F2',
		backgroundColor: '#2a2a2d'
	},
	styles: [
		{
			types: ['prolog', 'builtin'],
			style: {
				color: 'rgb(255,255,255)',
				fontStyle: 'italic'
			}
		},
		{
			types: ['constant', 'literal-property'],
			style: {
				color: 'rgb(255,83,192)'
			}
		},
		{
			types: ['parameter'],
			style: {
				color: 'rgb(252, 173, 221)',
				textDecorationLine: 'underline'
			}
		},
		{
			types: ['variable'],
			style: {
				color: 'rgb(189, 147, 249)',
				textDecorationLine: 'underline'
			}
		},
		{
			types: ['class-name', 'known-class-name'],
			style: {
				color: 'rgb(189, 147, 249)'
			}
		},
		{
			types: ['maybe-class-name'],
			style: {
				color: 'rgb(38,234,255)',
			}
		},
		{
			types: ['function-variable'],
			style: {
				color: 'rgb(252,192,78)'
			}
		},
		{
			types: ['function'],
			style: {
				color: 'rgb(222,255,100)',
				fontStyle: 'italic'
			}
		},
		{
			types: ['punctuation', 'symbol'],
			style: {
				color: 'rgb(227,227,227)'
			}
		},
		{
			types: ['operator'],
			style: {
				color: 'rgb(255,224,30)'
			}
		},
		{
			types: ['string', 'char'],
			style: {
				color: 'rgb(110,253,197)'
			}
		},
		{
			types: ['tag', 'selector'],
			style: {
				color: 'rgb(189, 147, 249)',
			}
		},
		{
			types: ['keyword'],
			style: {
				color: 'rgb(109,179,250)'
			}
		},
		{
			types: ['comment'],
			style: {
				color: 'rgb(119,119,119)'
			}
		},
		{
			types: ['attr-name'],
			style: {
				color: 'rgb(250, 207, 100)'
			}
		},
		{
			types: ['attr-value'],
			style: {
				color: 'rgb(47,253,142)'
			}
		},
		{
			types: ['inserted'],
			style: {
				color: 'rgb(80, 250, 123)'
			}
		},
		{
			types: ['deleted'],
			style: {
				color: 'rgb(255, 85, 85)'
			}
		},
		{
			types: ['changed'],
			style: {
				color: 'rgb(255, 184, 108)'
			}
		},
	]
};