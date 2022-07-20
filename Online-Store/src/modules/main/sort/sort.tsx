import React, { useEffect } from 'react';
import * as style from './sort.css';
import { dataSlice } from '../../../hooks/reducer/DataSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

export function SortProducts() {
	const { sortData, filter, changeSort } = dataSlice.actions;
	const { filters, sort } = useAppSelector(state => state.dataReducer);
	const dispatch = useAppDispatch();
	const sortValue = Object.keys(filters.sort);
	useEffect(() => {
		dispatch(sortData());
		dispatch(filter());
	}, [sort]);
	return <div className={style.wrapper}>
		<h4 className={style.title}>{'сортировать по: '}</h4>
		<select
			name="sort"
			onChange={(ev) => {
				//<---------------------to refactor----------------------->
				if (ev.target.value === 'название А-Я' ||
					ev.target.value === 'название Я-А' ||
					ev.target.value === 'дешевые' ||
					ev.target.value === 'дорогие' ||
					ev.target.value === 'большой объём' ||
					ev.target.value === 'маленький объём' ||
					ev.target.value === 'много на складе' ||
					ev.target.value === 'мало на складе') {
					//<------------------------------------------------------->
					dispatch(changeSort(ev.target.value));

				}
			}}>
			{
				sortValue.map((el) => {
					return (
						<option value={el} key={el}>{el}</option>
					);
				})
			}
		</select>
	</div>;
}