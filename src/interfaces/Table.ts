export interface IProduct {
    title: string;
    price: string;
    description: string;
    rating: number;
    thumbnail: string[];
}

export interface IData {
    limit: number;
    products: IProduct[]; 
    skip: number;
    total: number;
}
