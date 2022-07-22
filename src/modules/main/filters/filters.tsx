import React from 'react';
import * as style from './filters.css';
import { FilterSlider } from './FilterSlider/FilterSlider';
import { CheckboxFilter } from './brandFilter/CheckboxFilter';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { dataSlice } from '../../../hooks/reducer/DataSlice';


export function Filters() {

	const { packaging, filters, priceLimit, brands, subtypes, types } = useAppSelector(state => state.dataReducer);
	const { removeFilters, filter } = dataSlice.actions;
	const dispatch = useAppDispatch();
	return <div className={style.wrapper}>
		<div className={style.filter_block}>
			<FilterSlider
				name='price'
				title='цена'
				minValue={priceLimit[0]}
				maxValue={priceLimit[1]}
				defaultValue={filters.price}
			/>
		</div>
		<div className={style.filter_block}>
			<FilterSlider
				name='packaging'
				title='объём'
				minValue={packaging[0]}
				maxValue={packaging[1]}
				defaultValue={filters.packaging}
			/>
		</div>
		<div className={style.filter_block}>
			<CheckboxFilter
				array={brands}
				name='brand'
				title='брэнд'
			/>
		</div>
		<div className={style.filter_block}>
			<CheckboxFilter
				array={subtypes}
				name='subtype'
				title='тип'
			/>
		</div>
		<div className={style.filter_block}>
			<CheckboxFilter
				array={types}
				name='type'
				title='товарная группа'
			/>
		</div>

		<button
			onClick={() => { dispatch(removeFilters()); dispatch(filter()); }}
			className={style.button}>Удалить фильтры
		</button>
	</div>;
}