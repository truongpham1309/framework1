export type Product = {
    _id: string;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rate: number;
}

export type Category = {
    id: string,
    category: string,
}