import React from 'react';
import DocCardList from '@theme-original/DocCardList';
import './doc-card-list.scss';

export default function DocCardListWrapper(props) {
	return (
		<div className="doc-card-list-wrapper">
			<DocCardList {...props} />
		</div>
	);
}
