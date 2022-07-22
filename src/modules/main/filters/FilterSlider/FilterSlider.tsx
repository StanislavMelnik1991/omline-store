import React from 'react';
import * as style from './FilterSlider.css';
import {
	RangeSlider,
	RangeSliderTrack,
	RangeSliderFilledTrack,
	RangeSliderThumb,
} from '@chakra-ui/react';
import { dataSlice } from '@reducer/DataSlice';
import { useAppDispatch, useAppSelector, } from '../../../../hooks/redux';


type FilterSliderProps = {
	name: 'packaging' | 'price',
	title: string,
	minValue: number,
	maxValue: number,
	defaultValue: [number, number],
}
export function FilterSlider({defaultValue,maxValue,minValue,name,title}: FilterSliderProps) {
	const { filter, changeFilterSlider } = dataSlice.actions;
	const { filters } = useAppSelector(state => state.dataReducer);
	const dispatch = useAppDispatch();
	const { color } = useAppSelector(state => state.dataReducer);
	return <div className={style.wrapper}>
		<h4 className={style.title}>{title}:</h4>
		{/* {props.defaultValue[0] + '  ' + props.defaultValue[1]} */}
		<div className={style.value_wrapper}>
			<div><p className={style.value_p}>{defaultValue[0]}</p></div>
			<div><p className={style.value_p}>{defaultValue[1]}</p></div>
		</div>
		<RangeSlider
			aria-label={['min', 'max']}
			min={minValue}
			max={maxValue}
			defaultValue={defaultValue}
			onChange={((val: [number, number]) => {
				dispatch(changeFilterSlider({ key: name, value: val }));
			})}
			onChangeEnd={((val: [number, number]) => {
				dispatch(changeFilterSlider({ key: name, value: val }));
				dispatch(filter());
			})}

			value={defaultValue}

			colorScheme="cyan"
			width="100%"
			height="12px"

		>
			<RangeSliderTrack
				height="10px"
				borderRadius="5px"
				border={`1px solid ${color.slider}`}
				bg={color.bodyFirst}
				cursor='pointer'

			>
				<RangeSliderFilledTrack
					bg={color.slider}
					height="10px"
				/>
			</RangeSliderTrack>
			<RangeSliderThumb index={0}
				w="10px"
				h="10px"
				borderColor="gray"
				border="1px solid"
				borderRadius="50%"
				bg={color.slider}
				marginLeft='5px'
				cursor='pointer'
			/>
			<RangeSliderThumb index={1}
				w="10px"
				h="10px"
				borderColor="gray"
				border="1px solid"
				borderRadius="50%"
				bg={color.slider}
				marginLeft='-5px'
				cursor='pointer'
				onKeyDown={(ev) => {
					if (ev.code === 'ArrowLeft') {
						dispatch(changeFilterSlider({ key: name, value: [filters[name][0], filters[name][1] - 1] }));
					}
					if (ev.code === 'ArrowRight') {
						dispatch(changeFilterSlider({ key: name, value: [filters[name][0], filters[name][1] + 1] }));
					}
				}}
			/>
		</RangeSlider>

	</div>;
}