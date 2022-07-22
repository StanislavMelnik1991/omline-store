import * as style from './main.css';
import { Cards } from './cards/cards';
import { Preview } from './preview/preview';
import { Filters } from './filters/filters';
import { Basket } from './basket/basket';

export function Main() {
	return (
		<div className={style.wrapper}>
			<Preview />
			<div className={style.main_wrapper}>
				<Filters />
				<Cards />
			</div>
			<div>
				<Basket />
			</div>
		</div>
	);
}