import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Filters, Product, Sort, Color } from './IData';

interface DataState {
	products: { [article: string]: Product };
	basketIsChange: boolean;
	productsArray: Array<string>;
	productsForRender: Array<string>;
	filteredProducts: Array<string>;
	basket: { [article: string]: Product };
	subtypes: Array<string>,
	types: Array<string>,
	limit: number;
	page: number;
	brands: Array<string>;
	packaging: [number, number];
	isLoading: boolean;
	error: string;
	priceLimit: [number, number];
	pageLimit: number
	filters: Filters;
	sort: Sort;
	color: {
		bodyFirst: Color,
		bodySecond: Color,
		cards: Color,
		slider: Color
	}
}

const initialState: DataState = {
	products: {},
	basketIsChange: true,
	productsArray: [],
	productsForRender: [],
	filteredProducts: [],
	basket: {},
	limit: 10,
	page: 1,
	subtypes: [],
	types: [],
	brands: [],
	packaging: [1000000, 0],
	isLoading: false,
	error: '',
	priceLimit: [100000000, 0],
	pageLimit: 0,
	sort: 'много на складе',
	filters: {
		price: [0, 0],
		brand: {},
		packaging: [0, 0],
		subtype: {},
		type: {},
		name: '',
		sort: {
			'название А-Я': true,
			'название Я-А': false,
			'дешевые': false,
			'дорогие': false,
			'большой объём': false,
			'маленький объём': false,
			'мало на складе': false,
			'много на складе': false
		}
	},
	color: {
		bodyFirst: 'rgb(240, 240, 240)',
		bodySecond: 'rgb(255, 255, 255)',
		cards: 'rgb(255, 255, 255)',
		slider: 'rgb(200, 200, 200)'
	},
};

export const dataSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		productsFetching(state) {
			state.isLoading = true;
		},
		productsFetchingSuccess(state, action: PayloadAction<{ [article: string]: Product }>) {
			state.basketIsChange = false;
			state.isLoading = false;
			state.error = '';
			state.sort = 'название А-Я';
			state.products = action.payload;
			state.productsArray = Object.keys(state.products);
			state.productsArray.map((e) => {
				const product = state.products[e];
				product.price = Number(product.price);
				product.packaging = Number(product.packaging);
				product.density = Number(product.density);
				product.weight = Number(product.weight);
				product.barcode = Number(product.barcode);
				product.shelfLife = Number(product.shelfLife);
				product.stockQuantity = Number(product.stockQuantity);
				product.basketQuantity = 0;

				state.priceLimit[0] = product.price < state.priceLimit[0] ? product.price : state.priceLimit[0];
				state.priceLimit[1] = product.price > state.priceLimit[1] ? product.price : state.priceLimit[1];

				state.packaging[0] = product.packaging < state.packaging[0] ? product.packaging : state.packaging[0];
				state.packaging[1] = product.packaging > state.packaging[1] ? product.packaging : state.packaging[1];

				product.quantity = 1;
				state.brands.push(product.brand);

				state.subtypes.push(product.subtype);
				state.types.push(product.type);
			});
			state.filters.price = state.priceLimit;
			state.filters.packaging = state.packaging;

			state.brands = state.brands.filter((v, i, a) => a.indexOf(v) === i);
			state.brands.map((el) => { state.filters.brand[el] = true; });



			state.types = state.types.filter((v, i, a) => a.indexOf(v) === i);
			state.types.map((el) => { state.filters.type[el] = true; });

			state.subtypes = state.subtypes.filter((v, i, a) => a.indexOf(v) === i);
			state.subtypes.map((el) => { state.filters.subtype[el] = true; });


			state.filteredProducts = state.productsArray;
			state.productsForRender = state.filteredProducts.slice((state.page - 1) * state.limit, state.page * state.limit);
			state.pageLimit = Math.ceil(state.productsArray.length / state.limit);
		},
		productsFetchingError(state, action: PayloadAction<string>) {
			state.isLoading = false;
			state.error = action.payload;
		},
		pagination(state, action: PayloadAction<number | 'first' | 'last'>) {
			if (action.payload === 'first') {
				state.page = 1;
			} else {
				if (action.payload === 'last') {
					state.page = state.pageLimit;
				} else {
					state.page += action.payload;
				}
			}


			state.page = state.page < 1 ? 1 : state.page;
			state.page = state.page > state.pageLimit ? state.pageLimit : state.page;
			state.productsForRender = state.filteredProducts.slice((state.page - 1) * state.limit, state.page * state.limit);
		},
		changeSort(state, action: PayloadAction<Sort>) {
			state.sort = action.payload;
			window.localStorage.setItem('sort', state.sort);
		},
		removeFilters(state) {
			state.filters.price = [state.priceLimit[0], state.priceLimit[1]];
			state.brands.map((el) => { state.filters.brand[el] = true; });
			state.filters.packaging = [state.packaging[0], state.packaging[1]];
			state.subtypes.map((el) => { state.filters.subtype[el] = true; });
			state.types.map((el) => { state.filters.type[el] = true; });
			state.filters.name = '';
			state.filters.sort = {
				'название А-Я': true,
				'название Я-А': false,
				'дешевые': false,
				'дорогие': false,
				'большой объём': false,
				'маленький объём': false,
				'мало на складе': false,
				'много на складе': false
			};
			window.localStorage.clear();
		},
		changeFilterSlider(state, action: PayloadAction<{ key: 'price' | 'packaging', value: [number, number] }>) {
			state.filters[action.payload.key] = action.payload.value;
			window.localStorage.setItem(action.payload.key+'0', JSON.stringify(action.payload.value[0]));
			window.localStorage.setItem(action.payload.key+'1', JSON.stringify(action.payload.value[1]));
		},
		changeFilterCheckbox(state, action: PayloadAction<{ key: 'brand' | 'subtype' | 'type', value: string }>) {
			state.filters[action.payload.key][action.payload.value] = !state.filters[action.payload.key][action.payload.value];
			window.localStorage.setItem(action.payload.key, JSON.stringify(state.filters[action.payload.key]) );
		},
		changeFilterLocalStorage(state, action: PayloadAction<{ key: 'brand' | 'subtype' | 'type', value: {[name: string]: boolean} }>) {
			state.filters[action.payload.key] = action.payload.value;
		},
		changeFilterName(state, action: PayloadAction<string>) {
			state.filters.name = action.payload;
			window.localStorage.setItem('name', action.payload);
		},

		changeBasketQuantity(state, action: PayloadAction<[number, number]>) {
			const [article, quantity] = action.payload;
			const product = state.basket[article];
			product.quantity += quantity;
			if (product.quantity === 0) { delete (state.basket[article]); }
		},
		changeQuantity(state, action: PayloadAction<[number, number]>) {
			const [article, quantity] = action.payload;
			const product = state.products[article];
			product.quantity += quantity;
			product.quantity = product.quantity < 1 ? 1 : product.quantity;
		},
		changeColorScheme(state, action: PayloadAction<{ bodyFirst: Color, bodySecond: Color, cards: Color, slider: Color }>) {
			state.color = action.payload;
		},
		addToBasket(state, action: PayloadAction<number>) {
			const index = action.payload;
			const product = state.products[index];
			if (state.basket[index]) {
				state.basket[index].quantity += product.quantity;
			} else {
				state.basket[index] = { ...product };
			}
			product.quantity = 1;
		},
		toggleShowBasket(state) {
			state.basketIsChange = !state.basketIsChange;
		},
		filter(state) {
			//price filter
			state.filteredProducts = state.productsArray.filter((el) => (state.products[el].price >= state.filters.price[0] && state.products[el].price <= state.filters.price[1]));
			//brand filter
			state.filteredProducts = state.filteredProducts.filter((el) => state.filters.brand[state.products[el].brand]);
			//packaging
			state.filteredProducts = state.filteredProducts.filter((el) => (state.products[el].packaging >= state.filters.packaging[0] && state.products[el].packaging <= state.filters.packaging[1]));
			//subtype
			state.filteredProducts = state.filteredProducts.filter((el) => state.filters.subtype[state.products[el].subtype]);
			//type
			state.filteredProducts = state.filteredProducts.filter((el) => state.filters.type[state.products[el].type]);
			//name
			state.filteredProducts = state.filteredProducts.filter((el) => { if (state.products[el].fullName.toLowerCase().indexOf(state.filters.name.trim().toLowerCase()) > -1) return true; });

			state.page = 1;
			state.pageLimit = Math.ceil(state.filteredProducts.length / state.limit);
			state.productsForRender = state.filteredProducts.slice((state.page - 1) * state.limit, state.page * state.limit);
		},
		sortData(state) {
			const sortFunc: Record<Sort, () => void> = {
				'название А-Я': () => {
					state.productsArray = state.productsArray.sort((a, b) => {
						const nameA = state.products[a].fullName.toLowerCase();
						const nameB = state.products[b].fullName.toLowerCase();
						if (nameA > nameB) { return 1; }
						if (nameB > nameA) { return -1; }
						else { return 1; }
					});
				},
				'название Я-А': () => {
					state.productsArray = state.productsArray.sort((a, b) => {
						const nameA = state.products[a].fullName.toLowerCase();
						const nameB = state.products[b].fullName.toLowerCase();
						if (nameA > nameB) { return -1; }
						if (nameB > nameA) { return 1; }
						else { return 1; }
					});
				},
				'дешевые': () => { state.productsArray = state.productsArray.sort((a, b) => { return state.products[a].price - state.products[b].price; }); },
				'дорогие': () => { state.productsArray = state.productsArray.sort((a, b) => { return state.products[b].price - state.products[a].price; }); },
				'большой объём': () => { state.productsArray = state.productsArray.sort((a, b) => { return state.products[b].packaging - state.products[a].packaging; }); },
				'маленький объём': () => { state.productsArray = state.productsArray.sort((a, b) => { return state.products[a].packaging - state.products[b].packaging; }); },
				'много на складе': () => { state.productsArray = state.productsArray.sort((a, b) => { return state.products[b].stockQuantity - state.products[a].stockQuantity; }); },
				'мало на складе': () => { state.productsArray = state.productsArray.sort((a, b) => { return state.products[a].stockQuantity - state.products[b].stockQuantity; }); },
			};
			sortFunc[state.sort]();
		}
	}
});

export default dataSlice.reducer;