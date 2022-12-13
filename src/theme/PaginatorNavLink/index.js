import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/pro-thin-svg-icons';
import './pagination.scss';

export default function PaginatorNavLink(props) {
	const { permalink, title, subLabel, isNext } = props;
	const icon = (isNext ? <FontAwesomeIcon icon={faChevronRight}/> :
		<FontAwesomeIcon icon={faChevronLeft}/>);
	const directionClass = isNext ? 'next' : 'prev';

	return (
		<Link className={`pagination-nav__link pagination-nav__link--${directionClass}`} to={permalink}>
			<div className={`pagination-nav__link__icon pagination-nav__link__icon--${directionClass}`}>
				{icon}
			</div>
			<div className="pagination-nav__link__label">
				{subLabel && <div className="pagination-nav__link__label__sublabel">{subLabel}</div>}
				<div className="pagination-nav__link__label__main">{title}</div>
			</div>
		</Link>
	);
}
