import React from 'react';
import * as style from './search.css';
import { dataSlice } from '../../../hooks/reducer/DataSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

export function Search() {
	const { changeFilterName, filter } = dataSlice.actions;
	const { filters } = useAppSelector(state => state.dataReducer);
	const dispatch = useAppDispatch();
	return (
		<div className={style.wrapper}>
			<input
				type="text"
				value={filters.name}
				onChange={(ev) => { dispatch(changeFilterName(ev.target.value)); dispatch(filter()); }}
				autoFocus
				className={style.input}
				placeholder='поиск'
			/>
			<button className={style.delete_button} onClick={() => { dispatch(changeFilterName('')); dispatch(filter()); }}>X</button>
		</div>
	);
}
