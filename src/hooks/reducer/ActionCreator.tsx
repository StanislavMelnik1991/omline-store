import { AppDispatch } from './store';
import { dataSlice } from './DataSlice';
import data from '../../../data.json';

export const fetchProducts = () => (dispatch: AppDispatch) => {
	try {
		const name = window.localStorage.getItem('name');
		const price0 = window.localStorage.getItem('price0');
		const price1 = window.localStorage.getItem('price1');
		const packaging0 = window.localStorage.getItem('packaging0');
		const packaging1 = window.localStorage.getItem('packaging1');
		const brand = window.localStorage.getItem('brand');
		const subtype = window.localStorage.getItem('subtype');
		const type = window.localStorage.getItem('type');
		const sort = window.localStorage.getItem('sort');

		dispatch(dataSlice.actions.productsFetching());
		dispatch(dataSlice.actions.productsFetchingSuccess(data));
		if (name !== null) {
			dispatch(dataSlice.actions.changeFilterName(name));
		}
		if (price0 !== null && price1 !== null) {
			dispatch(dataSlice.actions.changeFilterSlider({ key: 'price', value: [JSON.parse(price0), JSON.parse(price1)] }));
		}
		if (packaging0 !== null && packaging1 !== null) {
			dispatch(dataSlice.actions.changeFilterSlider({ key: 'packaging', value: [JSON.parse(packaging0), JSON.parse(packaging1)] }));
		}
		if (brand !== null) {
			dispatch(dataSlice.actions.changeFilterLocalStorage({ key: 'brand', value: JSON.parse(brand) }));
		}
		if (subtype !== null) {
			dispatch(dataSlice.actions.changeFilterLocalStorage({ key: 'subtype', value: JSON.parse(subtype) }));
		}
		if (type !== null) {
			dispatch(dataSlice.actions.changeFilterLocalStorage({ key: 'type', value: JSON.parse(type) }));
		}
		if (sort !== null) {
			if (sort === 'название А-Я' ||
				sort === 'название Я-А' ||
				sort === 'дешевые' ||
				sort === 'дорогие' ||
				sort === 'большой объём' ||
				sort === 'маленький объём' ||
				sort === 'много на складе' ||
				sort === 'мало на складе') {

				dispatch(dataSlice.actions.changeSort(sort));
			}
		}

	} catch (e) {
		dispatch(dataSlice.actions.productsFetchingError('err'));
	}
};
