import React from 'react';
import {
	PageMetadata,
	useCurrentSidebarCategory,
} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DocCardList from '@theme/DocCardList';
import DocPaginator from '@theme/DocPaginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import Heading from '@theme/Heading';
import './doc-index.scss';

function DocCategoryGeneratedIndexPageMetadata({ categoryGeneratedIndex }) {
	return (
		<PageMetadata
			title={categoryGeneratedIndex.title}
			description={categoryGeneratedIndex.description}
			keywords={categoryGeneratedIndex.keywords}
			// TODO `require` this?
			image={useBaseUrl(categoryGeneratedIndex.image)}
		/>
	);
}

function DocCategoryGeneratedIndexPageContent({ categoryGeneratedIndex }) {
	const category = useCurrentSidebarCategory();
	return (
		<div className="docindex-wrapper">
			<DocVersionBanner/>
			<DocBreadcrumbs/>
			<DocVersionBadge/>
			<header className="theme-doc-markdown markdown">
				<Heading as="h1">
					{categoryGeneratedIndex.title}
				</Heading>
				{categoryGeneratedIndex.description && (
					<p>{categoryGeneratedIndex.description}</p>
				)}
			</header>
			<div className="docindex-wrapper__inner">
				<article>
					<DocCardList items={category.items}/>
				</article>
				<footer>
					<DocPaginator
						previous={categoryGeneratedIndex.navigation.previous}
						next={categoryGeneratedIndex.navigation.next}
					/>
				</footer>
			</div>
		</div>
	);
}

export default function DocCategoryGeneratedIndexPage(props) {
	return (
		<>
			<DocCategoryGeneratedIndexPageMetadata {...props} />
			<DocCategoryGeneratedIndexPageContent {...props} />
		</>
	);
}
