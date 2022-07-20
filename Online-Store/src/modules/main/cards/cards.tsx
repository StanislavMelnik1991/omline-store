import React from 'react';
import * as style from './cards.css';
import { Card } from './card';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { dataSlice } from '../../../hooks/reducer/DataSlice';
import { SortProducts } from '../sort/sort';
import InlineSVG from 'react-inlinesvg';

export function Cards() {
	const { productsForRender, page, isLoading, products, color } = useAppSelector(state => state.dataReducer);
	const { pagination } = dataSlice.actions;
	const dispatch = useAppDispatch();
	return (
		<div className={style.wrapper}>

			<SortProducts />
			<div className={style.incorrect_filters} style={{ display: `${productsForRender.length === 0 ? 'flex' : 'none'}` }}>
				<h3>товары с выбранными характеристиками отсутствуют</h3>
			</div>
			<div className={style.cards_container} style={{ display: `${productsForRender.length > 0 ? 'flex' : 'none'}` }}>
				{
					productsForRender.map((e) => {
						return <Card
							src={products[e].src}
							name={products[e].name}
							fullName={products[e].fullName}
							price={products[e].price}
							quantity={products[e].quantity}
							key={products[e].article}
							stockQuantity={products[e].stockQuantity}
							article={products[e].article}
						/>;
					})
				}
			</div>
			<div className={style.pagination}>
				<button style={{ background: `radial-gradient(100% 120.42% at 0% 0%, ${color.cards} 10%, ${color.bodyFirst} 100%)` }} className={style.pagination_buttons} onClick={() => dispatch(pagination('first'))} disabled={isLoading}><InlineSVG src={require('../../../assets/to_start.svg')} className={style.logo} /></button>
				<button style={{ background: `radial-gradient(100% 120.42% at 0% 0%, ${color.cards} 10%, ${color.bodyFirst} 100%)` }} className={style.pagination_buttons} onClick={() => dispatch(pagination(-1))} disabled={isLoading}><InlineSVG src={require('../../../assets/to_left.svg')} className={style.logo} /></button>
				<p>{page}</p>
				<button style={{ background: `radial-gradient(100% 120.42% at 0% 0%, ${color.cards} 10%, ${color.bodyFirst} 100%)` }} className={style.pagination_buttons} onClick={() => dispatch(pagination(1))} disabled={isLoading}><InlineSVG src={require('../../../assets/to_right.svg')} className={style.logo} /></button>
				<button style={{ background: `radial-gradient(100% 120.42% at 0% 0%, ${color.cards} 10%, ${color.bodyFirst} 100%)` }} className={style.pagination_buttons} onClick={() => dispatch(pagination('last'))} disabled={isLoading}><InlineSVG src={require('../../../assets/to_end.svg')} className={style.logo} /></button>
			</div>
		</div >
	);
}
