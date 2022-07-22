import React, { useEffect } from 'react';

import { Footer } from './modules/footer/footer';
import { Header } from './modules/header/header';
import { Main } from './modules/main/main';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchProducts } from './hooks/reducer/ActionCreator';
import mask from './assets/noise_transparent.png';


export function App() {
	const dispatch = useAppDispatch();
	const { color } = useAppSelector(state => state.dataReducer);
	useEffect(() => {
		dispatch(fetchProducts());
	}, []);
	const background = { 
		background: `url(${mask}), radial-gradient(100% 215.42% at 0% 0%, 
			${color.bodyFirst} 0%, 
			${color.bodySecond} 180%`, 
		minHeight: '100vh' 
	};
	return (
		<div style={background}>
			<Header />
			<Main />
			<Footer />
		</div>);
}
