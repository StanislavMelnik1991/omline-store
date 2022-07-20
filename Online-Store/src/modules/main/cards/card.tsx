import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { dataSlice } from '../../../hooks/reducer/DataSlice';
import * as style from './cards.css';
type CardType = {
	src: string;
	name: string;
	fullName: string;
	price: number;
	quantity: number;
	stockQuantity: number;
	article: number;
}

export function Card({ src, name, fullName, price, quantity, stockQuantity, article }: CardType) {
	const { color, basket } = useAppSelector(state => state.dataReducer);
	const { changeQuantity, addToBasket, changeBasketQuantity } = dataSlice.actions;
	const dispatch = useAppDispatch();
	return (
		<div className={style.card_wrapper} style={{ background: `radial-gradient(100% 120.42% at 0% 0%, ${color.cards} 10%, ${color.bodyFirst} 100%)` }} >
			<div className={style.img_wrapper}>
				<img src={src} alt={name} className={style.img_preview} />
			</div>
			<h3 className={style.title}>{fullName}</h3>
			<p>цена: {Math.round(price * quantity * 100) / 100}  $</p>
			<p>на складе: {stockQuantity} шт.</p>


			<div className={style.controls}>
				<div className={style.quantity} style={{ display: `${basket[article] ? 'flex' : 'none'}` }}>
					<p>в корзине:</p>
					<div className={style.add_wrapper}>
						<div className={style.small_buttons_wrapper}>
							<button className={style.small_buttons} onClick={() => dispatch(changeBasketQuantity([article, -1]))}>-</button>
							<button className={style.small_buttons} onClick={() => dispatch(changeBasketQuantity([article, 1]))}>+</button>
						</div>
						<p>{basket[article] ? basket[article].quantity : 0} шт</p>
					</div>

				</div>
				<div className={style.add_wrapper}>
					<div className={style.quantity}>
						<p>{quantity} шт</p>
						<div className={style.small_buttons_wrapper}>
							<button className={style.small_buttons} onClick={() => dispatch(changeQuantity([article, -1]))}>-</button>
							<button className={style.small_buttons} onClick={() => dispatch(changeQuantity([article, 1]))}>+</button>
						</div>

					</div>
					<button className={style.button_add} onClick={() => dispatch(addToBasket(article))}>добавить в корзину</button>
				</div>
			</div>


		</ div>
	);
}
