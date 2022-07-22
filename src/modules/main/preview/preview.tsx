import React, { useCallback, useState } from 'react';
/* import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { dataSlice } from '../../../hooks/reducer/DataSlice';
import { Color } from '../../../hooks/reducer/IData'; */
import * as style from './preview.css';


export function Preview() {
	const animationDuration = 2500;
	const prev = [
		'https://www.caparol.by/fileadmin/data_by/billboard/Capadecor_NEW.jpg',
		'https://www.caparol.by/fileadmin/data_by/billboard/trends_2022_caparol.png',
		'https://www.caparol.by/fileadmin/data_by/billboard/airfix_caparol_main_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F2.jpg',
		'https://www.caparol.by/fileadmin/data_by/billboard/Caparol_Walls_that_do_more_NEW.jpg',

	];
	/* const colorScheme: Array<Record<'bodyFirst'| 'bodySecond' | 'cards' | 'slider', Color>> = [
		{
			bodyFirst: 'rgb(214, 178, 208)',
			bodySecond: 'rgb(206, 187, 203)',
			cards: 'rgb(243, 221, 239)',
			slider: 'rgb(206, 187, 203)'
		},
		{
			bodyFirst: 'rgb(209, 231, 255)',
			bodySecond: 'rgb(219, 233, 255)',
			cards: 'rgb(250, 253, 255)',
			slider: 'rgb(203, 211, 219)'
		},
		{
			bodyFirst: 'rgb(216, 177, 213)',
			bodySecond: 'rgb(235, 217, 232)',
			cards: 'rgb(255, 240, 252)',
			slider: 'rgb(235, 217, 232)'
		},
		{
			bodyFirst: 'rgb(240, 240, 240)',
			bodySecond:'rgb(255, 255, 255)',
			cards: 'rgb(255, 255, 255)',
			slider: 'rgb(200, 200, 200)'
		},	
	];
	const { color } = useAppSelector(state => state.dataReducer);
	const { changeColorScheme } = dataSlice.actions;
	const dispatch = useAppDispatch(); */

	const [position, setPosition] = useState(0);
	const [duration, setDuration] = useState(animationDuration);
	const slide = useCallback(() => {
		if (position === (prev.length - 1)) {
			setDuration(0);
			setPosition(-1);
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setDuration(animationDuration);
					setPosition(0);
					/* dispatch(changeColorScheme(colorScheme[position])); */
				});
			});

		} else {
			setDuration(animationDuration);
			setPosition(last => last + 1);
			/* dispatch(changeColorScheme(colorScheme[position])); */
		}
	}, [prev, position]);





	return (
		<div className={style.wrapper}>
			<div style={{
				transform: `translate(${100 * (-1 - position)}%, 0%)`, transitionDuration: `${duration}ms`
			}}
			className={style.prev_img}
			onLoad={slide}
			onTransitionEnd={() => {
				setTimeout(slide, animationDuration * 3);
			}}>
				<img src={prev[prev.length - 1]} alt="" />
			</div>
			{prev.map((image, i) => {
				return <div style={{
					transform: `translate(${100 * (i - position)}%, 0%)`, transitionDuration: `${duration}ms`
				}}
				key={i}
				className={style.prev_img}
				>
					<img src={image} alt="" />
				</div>;
			})}
		</div >
	);
}