export interface Product {
    uuid: string;
    title: string;
    description?: string;
    price: number;
    image_url?: string;
    people_quantity: number;
    available: number;
}