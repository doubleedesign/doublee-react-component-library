import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function FooterLayout({style, links, logo, copyright}) {
	const {siteConfig} = useDocusaurusContext();
	const author = siteConfig.customFields.footer.author;
	const authorLink = siteConfig.customFields.footer.authorLink;
	const credits = siteConfig.customFields.footer.credits;
	return (
		<footer
			className={clsx('footer', {
				'footer--dark': style === 'dark',
			})}>
			<div className="container container-fluid">
				{links}
				{(logo || credits || author && authorLink) && (
					<div className="footer__bottom text--center">
						{logo && <div className="margin-bottom--sm">{logo}</div>}
						<small className="footer__bottom__author">By <a href={authorLink}>{author}</a>.</small>
						<small className="footer__bottom__credits">{credits}</small>
						{copyright && <small>{copyright}</small>}
					</div>
				)}
			</div>
		</footer>
	);
}
