export interface Product {
    article: number;
    fullName: string;
    name: string;
    packaging: number;
    packagingType: string;
    density: number;
    weight: number;
    barcode: number;
    price: number;
    description: string;
    shelfLife: number;
    subtype: string;
    brand: string;
    type: string;
    src: string;
    quantity: number;
    stockQuantity: number;
    basketQuantity: number
}
export interface Filters {
    price: [number, number],
    packaging: [number, number],
    brand: {
        [name: string]: boolean;
    },
    subtype: {
        [name: string]: boolean;
    },
    type: {
        [name: string]: boolean;
    },
    sort: Record<Sort, boolean>;
    name: string;
}
export type Sort = 'название А-Я' | 'название Я-А' | 'дешевые' | 'дорогие' | 'большой объём' | 'маленький объём' | 'много на складе' | 'мало на складе'

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;