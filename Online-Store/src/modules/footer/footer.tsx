import React from 'react';
import * as style from './footer.css';
import InlineSVG from 'react-inlinesvg';

export function Footer() {
	return (
		<div>
			<div className={style.footerWrapper}>
				<a href="https://rs.school/js/" target='blank'>
					<InlineSVG src={require('../../assets/rsLogo.svg')} className={style.logo} />

				</a>
				<a href="https://github.com/StanislavMelnik1991" target='blank'>
					<InlineSVG src={require('../../assets/github.svg')} className={style.logo} />
				</a>
				<a href="https://www.caparol.by" target='blank'>
					<InlineSVG src={require('../../assets/caparol.svg')} className={style.logo} />
				</a>
				<a href="https://www.alpina-farben.by/" target='blank'>
					<InlineSVG src={require('../../assets/alpina.svg')} className={style.logo} />
				</a>
			</div>
			<div className={style.year}>
				2022
			</div>
		</div>

	);
}