import React from 'react';
import * as style from './basket.css';
import { dataSlice } from '../../../hooks/reducer/DataSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

type ProductType = {
	src?: string;
	fulName: string;
	quantity: number | string;
	price: number | string;
	article: number;
}

export function Product({ src, fulName, quantity, price, article }: ProductType) {
	const { changeBasketQuantity } = dataSlice.actions;
	const { basket } = useAppSelector(state => state.dataReducer);
	const dispatch = useAppDispatch();
	return (
		<div className={style.product}>
			<div className={style.image_wrapper}>
				<p style={{ display: `${!src ? 'block' : 'none'}` }}>фото</p>
				<img src={src} alt={fulName} className={style.image} style={{ display: `${src ? 'block' : 'none'}` }} />
			</div>
			<div className={style.full_name}>
				<p style={{ display: `${!src ? 'block' : 'none'}` }}>{fulName}</p>
				<h4 style={{ display: `${src ? 'block' : 'none'}` }}>{fulName}</h4>
			</div>
			<div className={style.quantity}>
				<p>{quantity}, шт</p>
			</div>
			<div className={style.price}>
				<p>{price}, $</p>
			</div>
			<button
				className={style.delete_button}
				style={{ visibility: `${src ? 'visible' : 'hidden'}` }}
				onClick={() => {
					dispatch(changeBasketQuantity([article, -basket[article].quantity]));
				}}>X</button>




		</div>
	);
}