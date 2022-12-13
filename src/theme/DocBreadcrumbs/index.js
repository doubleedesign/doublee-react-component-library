import React from 'react';
import clsx from 'clsx';
import {
	useSidebarBreadcrumbs,
	useHomePageRoute,
} from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { translate } from '@docusaurus/Translate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney } from '@fortawesome/pro-solid-svg-icons';
import './breadcrumbs.scss';
import { faChevronRight } from '@fortawesome/pro-thin-svg-icons';

function BreadcrumbsItemLink({ children, href, isLast }) {
	if (isLast) {
		return (
			<span className="breadcrumbs__item__plaintext" itemProp="name">
        {children}
      </span>
		);
	}
	return href ? (
		<>
			<Link className="breadcrumbs__item__link" href={href} itemProp="item">
				<span itemProp="name">{children}</span>
			</Link>
			<span className="breadcrumbs__item__separator" aria-hidden="true">
				<FontAwesomeIcon icon={faChevronRight}/>
			</span>
		</>

	) : (
		<>
			<span className="breadcrumbs__item__plaintext">{children}</span>
			<span className="breadcrumbs__item__separator" aria-hidden="true">
				<FontAwesomeIcon icon={faChevronRight}/>
			</span>
		</>
	);
}

function BreadcrumbsItem({ children, active, index, addMicrodata }) {
	return (
		<li
			{...(addMicrodata && {
				itemScope: true,
				itemProp: 'itemListElement',
				itemType: 'https://schema.org/ListItem',
			})}
			className={clsx('breadcrumbs__item', {
				'breadcrumbs__item--active': active,
			})}>
			{children}
			<meta itemProp="position" content={String(index + 1)}/>
		</li>
	);
}

function HomeBreadcrumbItem() {
	const homeHref = useBaseUrl('/');
	return (
		<li className="breadcrumbs__item">
			<Link
				aria-label={translate({
					id: 'theme.docs.breadcrumbs.home',
					message: 'Home page',
					description: 'The ARIA label for the home page in the breadcrumbs',
				})}
				className="breadcrumbs__item__link breadcrumbs__item__link--home"
				title="Home"
				href={homeHref}>
				<FontAwesomeIcon icon={faHouseChimney}/>
				<span className="breadcrumbs__item__separator" aria-hidden="true">
					<FontAwesomeIcon icon={faChevronRight}/>
				</span>
			</Link>
		</li>
	);
}

export default function DocBreadcrumbs() {
	const breadcrumbs = useSidebarBreadcrumbs();
	const homePageRoute = useHomePageRoute();
	if (!breadcrumbs) {
		return null;
	}
	return (
		<nav
			className=""
			aria-label={translate({
				id: 'theme.docs.breadcrumbs.navAriaLabel',
				message: 'Breadcrumbs',
				description: 'The ARIA label for the breadcrumbs',
			})}>
			<ul
				className="breadcrumbs"
				itemScope
				itemType="https://schema.org/BreadcrumbList">
				{homePageRoute && <HomeBreadcrumbItem/>}
				{breadcrumbs.map((item, idx) => {
					const isLast = idx === breadcrumbs.length - 1;
					return (
						<BreadcrumbsItem
							key={idx}
							active={isLast}
							index={idx}
							addMicrodata={!!item.href}>
							<BreadcrumbsItemLink href={item.href} isLast={isLast}>
								{item.label}
							</BreadcrumbsItemLink>
						</BreadcrumbsItem>
					);
				})}
			</ul>
		</nav>
	);
}
