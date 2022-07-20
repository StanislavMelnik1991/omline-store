import React from 'react';
import * as style from './CheckboxFilter.css';
import { dataSlice } from '../../../../hooks/reducer/DataSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

type CheckboxFilterType = {
	title: string,
	name: 'brand' | 'subtype' | 'type',
	array: Array<string>,
}


export function CheckboxFilter({ title, name, array }: CheckboxFilterType) {
	const { changeFilterCheckbox, filter } = dataSlice.actions;
	const { filters } = useAppSelector(state => state.dataReducer);
	const dispatch = useAppDispatch();

	return <div className={style.wrapper}>
		<h4 className={style.title}>{title}:</h4>
		{array.map((el) => {
			return (
				<div key={el} className={style.input_wrapper}>
					<input
						type="checkbox"

						id={el}
						checked={filters[name][el]}
						onChange={() => {
							dispatch(changeFilterCheckbox({ key: name, value: el }));
							dispatch(filter());
						}}
						className={style.input}
					/>
					<label htmlFor={el} className={style.input}>{el}</label>
				</div>
			);
		})}
	</div>;
}
