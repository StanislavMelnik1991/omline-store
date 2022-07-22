import React from 'react';
import * as style from './header.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Search } from './search/search';
import InlineSVG from 'react-inlinesvg';
import mask from '../../assets/noise_transparent.png';
import { dataSlice } from '../../hooks/reducer/DataSlice';



export function Header() {
	const { color } = useAppSelector(state => state.dataReducer);
	const { toggleShowBasket } = dataSlice.actions;
	const dispatch = useAppDispatch();
	const background = { 
		background: `url(${mask}), radial-gradient(100% 215.42% at 0% 0%, ${color.bodyFirst} 0%, ${color.bodySecond} 180%` 
	};
	return (
		<div className={style.wrapper} style={background}>
			<InlineSVG src={require('../../assets/caparol.svg')} className={style.logo} />
			<div className={style.search}>
				<Search />
				<button onClick={() => dispatch(toggleShowBasket())} className={style.basket}>
					<InlineSVG src={require('../../assets/basket.svg')} className={style.logo} />
				</button>
			</div>
		</div>
	);
}
//them provider