import React, { isValidElement, useRef, useState, useEffect } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import ElementContent from '@theme/CodeBlock/Content/Element';
import StringContent from '@theme/CodeBlock/Content/String';
import '../../prism/style-overrides.scss';

/**
 * Best attempt to make the children a plain string so it is copyable. If there
 * are react elements, we will not be able to copy the content, and it will
 * return `children` as-is; otherwise, it concatenates the string children
 * together.
 */
function maybeStringifyChildren(children) {
	if (React.Children.toArray(children).some((el) => isValidElement(el))) {
		return children;
	}
	// The children is now guaranteed to be one/more plain strings
	return Array.isArray(children) ? children.join('') : children;
}

export default function CodeBlock({ children: rawChildren, ...props }) {
	const isBrowser = useIsBrowser();
	const children = maybeStringifyChildren(rawChildren);
	const CodeBlockComp =
		typeof children === 'string' ? StringContent : ElementContent;

	// Syntax highlighting hacks until I work out how to do them properly by customising the language definition
	const thisBlock = useRef();
	const [blockType, setBlockType] = useState('');
	const [constants, setConstants] = useState([]);
	const [parameters, setParameters] = useState([]);
	const [methods, setMethods] = useState([]);
	const [exported, setExported] = useState([]);

	useEffect(() => {
		if(thisBlock.current && ['language-ts', 'language-tsx'].includes(props.className)) {
			setBlockType('typescript');
		}
	}, [thisBlock.current]);

	function fixSpaces(element) {
		const ignoreTheseClasses = ['punctuation'];
		element.innerText = element.innerText.trim();
		const ignore = (element) => ignoreTheseClasses.includes(element);

		if(element.previousElementSibling && !(Array.from(element.previousElementSibling.classList).some(ignore))) {
			element.previousElementSibling.innerText = element.previousElementSibling.innerText + ' ';
		}
		if(element.nextElementSibling && !(Array.from(element.nextElementSibling.classList).some(ignore))) {
			element.nextElementSibling.innerText = ' ' + element.nextElementSibling.innerText;
		}
	}

	function identifyAndCollect() {
		// Identify and collect various types of token, some of which already have the correct class names and some not
		const constants = [];
		const parameters = [];
		const methodNames = [];
		const exported = [];

		// Handle some key phrases we know are likely to be passed as parameters
		parameters.push('error');
		parameters.push('props');

		// Collect variables already coloured by prism to find and colour their usages later
		const knownVars = thisBlock.current.querySelectorAll('.token.literal-property');
		knownVars.forEach((element) => {
			constants.push(element.innerText.trim());
		});

		// Identify any word after the word "const" as a variable and assign the same class names as Prism
		// Note: Destructured variables are handled separately because they're a bit trickier
		const keywordTokens = thisBlock.current.querySelectorAll('.token.keyword');
		keywordTokens.forEach((element) => {
			if(element.innerText === 'const' && element.nextElementSibling.className === 'token plain') {
				if(element.nextElementSibling.innerText.trim().length > 1) {
					element.nextElementSibling.classList.remove('plain');
					element.nextElementSibling.classList.add('property', 'literal-property');
					constants.push(element.nextElementSibling.innerText.trim());
				}
			}
		});

		// Collect known parameters to find and colour their usages later
		const parameterTokens = thisBlock.current.querySelectorAll('.token.parameter');
		parameterTokens.forEach((element) => {
			if(element.innerText.trim().length > 1) {
				parameters.push(element.innerText.trim());
			}
		});

		// Collect methods to find and colour their usages later
		const methodTokens = thisBlock.current.querySelectorAll('.token.function-variable');
		methodTokens.forEach((element) => {
			if(element.innerText.trim().length > 1) {
				methodNames.push(element.innerText.trim());
			}
		});

		// Identify and colour exported things + collect them to find and colour their usages later
		const moduleTokens = thisBlock.current.querySelectorAll('.token.keyword.module');
		moduleTokens.forEach((item) => {
			const thisLine = item.parentNode;
			thisLine.childNodes.forEach((item) => {
				if(item.classList.contains('literal-property')) {
					item.classList.remove('literal-property');
					item.classList.add('exported-var');
					fixSpaces(item);
					exported.push(item.innerText.trim());
				}
			});
		});

		setConstants(constants);
		setParameters(parameters);
		setMethods(methodNames);
		setExported(exported);
	}

	function handleDestructuredConsts() {
		const keywordTokens = thisBlock.current.querySelectorAll('.token.keyword');
		const constTokens = Array.from(keywordTokens).filter(element => element.innerText.trim() === 'const');

		constTokens.forEach((element) => {
			// Get all tokens in this line except ones that are just whitespace
			const tokens = Array.from(element.parentNode.childNodes).filter((element) => element.innerText.trim().length > 1);

			// Find where in the array the opening and closing braces are
			const opening = tokens.findIndex(element => element.innerText.trim() === '{');
			const closing = tokens.findIndex(element => element.innerText.trim() === '}');

			// Get just the elements between the braces
			const inside = tokens.slice(opening + 1, closing);
			inside.forEach((element) => {
				if(element.classList.contains('plain')) {
					element.classList.remove('plain');
					element.classList.add('property', 'literal-property');
					setConstants(current => [...current, element.innerText.trim()]);
				}
			});
		});

	}

	function colourIdentifiedTokens() {
		const plainTokens = thisBlock.current.querySelectorAll('.token.plain');
		console.log(plainTokens);
		plainTokens.forEach((item) => {
			if (parameters.includes(item.innerText.trim())) {
				item.classList.remove('plain');
				item.classList.add('parameter');
				fixSpaces(item);
			}

			if (constants.includes(item.innerText.trim())) {
				item.classList.remove('plain');
				item.classList.add('property', 'literal-property');
				fixSpaces(item);
			}

			if (exported.includes(item.innerText.trim())) {
				item.classList.remove('plain');
				item.classList.add('property', 'exported-var');
				fixSpaces(item);
			}

			if (typeof item.innerText == 'number') {
				item.classList.remove('plain');
				item.classList.add('number');
			}
		});
	}

	function removeUnwantedWhitespace() {
		// Fix "await" ending up with two spaces after it
		const cfKeywords = thisBlock.current.querySelectorAll('.token.control-flow');
		cfKeywords.forEach((item) => {
			item.innerText = item.innerText.trim() + ' ';
		});

		// Trim whitespace in specific circumstances
		const beforeThese = ['('];
		const afterThese = ['if', 'else', 'try', 'catch', 'return'];
		const tokensToCheck = thisBlock.current.querySelectorAll('.token.punctuation, .token.keyword');


		function isWhitespace(token) {
			return (!/\S/.test(token.innerText));
		}

		tokensToCheck.forEach((element) => {
			if(beforeThese.includes(element.innerText.trim())) {
				if (element.previousElementSibling && isWhitespace(element.previousElementSibling)) {
					element.innerText = element.innerText.trim();
					element.previousElementSibling.remove();
				}
			}

			if(afterThese.includes(element.innerText.trim())) {
				if (element.previousElementSibling && isWhitespace(element.previousElementSibling)) {
					element.innerText = element.innerText.trim();
				}
			}
		});


		// Fix some operators that are too tricky to fix in the fixSpaces function
		const toTrim = ['?.'];
		const operators = thisBlock.current.querySelectorAll('.token.operator');
		operators.forEach((element) => {
			if(toTrim.includes(element.innerText.trim())) {
				element.innerText = element.innerText.trim();
			}
		});
	}


	useEffect(() => {
		if(blockType === 'typescript') {
			identifyAndCollect();
		}
	}, [blockType]);

	useEffect(() => {
		if (thisBlock.current) {
			handleDestructuredConsts();
			colourIdentifiedTokens();
			removeUnwantedWhitespace();
		}
	}, [constants, parameters, methods, exported]);

	return (
		<div ref={props.className === 'language-ts' || props.className === 'language-tsx' ? thisBlock : null}>
			<CodeBlockComp key={String(isBrowser)} {...props}>
				{children}
			</CodeBlockComp>
		</div>
	);
}
