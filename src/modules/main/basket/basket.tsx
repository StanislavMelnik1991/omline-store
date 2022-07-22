import React from 'react';
import * as style from './basket.css';
import { dataSlice } from '../../../hooks/reducer/DataSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Product } from './produts';
import mask from '../../../assets/noise_transparent.png';
export function Basket() {
	const { toggleShowBasket } = dataSlice.actions;
	const { basket, basketIsChange, color } = useAppSelector(state => state.dataReducer);
	const dispatch = useAppDispatch();

	const basketArr = Object.keys(basket);
	let summ = 0;
	for (const key in basket) {
		summ += basket[key].price * basket[key].quantity;
	}
	return (
		<div
			className={style.wrapper}
			style={{ display: `${basketIsChange ? 'flex' : 'none'}` }}
			onClick={() => {
				dispatch(toggleShowBasket());
			}}>
			<div
				onClick={(ev) => {
					if (basketArr.length > 0) {
						ev.stopPropagation();
					}
				}}
				className={style.cards_container}
				style={{ background: `url(${mask}), radial-gradient(100% 215.42% at 0% 0%, ${color.bodyFirst} 0%, ${color.bodySecond} 180%` }}
			>
				{/* <button
					className={style.close}
					onClick={() => dispatch(toggleShowBasket())}>Закрыть</button> */}
				<div style={{ width: '100%', justifyContent: 'center', paddingTop: '30vh', display: `${basketArr.length === 0 ? 'flex' : 'none'}` }}>
					<h1>Упс, Ваша корзина пуста</h1>
				</div>
				<div style={{ display: `${basketArr.length > 0 ? 'flex' : 'none'}` }} className={style.cards}>
					<Product
						key={0}
						article={0}
						fulName={'название'}
						price={'цена'}
						quantity={'количество'}
					/>
					{basketArr.map((el) => {
						return (
							<Product
								key={el}
								article={basket[el].article}
								fulName={basket[el].fullName}
								price={basket[el].price}
								quantity={basket[el].quantity}
								src={basket[el].src}
							/>
						);
					})}
					<div style={{ alignSelf: 'end', paddingRight: '4%' }}>
						Итого к оплате: {Math.round(summ * 100) / 100} $
					</div>
				</div>

				<button
					style={{ display: `${basketArr.length > 0 ? 'flex' : 'none'}` }}
					onClick={() => {
						alert(
							'функция временно недоступна\n Но если вы действительно хотите купить эти товары по ТАКОЙ цене - свяжитесь со мной, договоримся)\n тел: +375-44-733-66-60'
						);
					}}>Заказать</button>
			</div>

		</div>
	);
}