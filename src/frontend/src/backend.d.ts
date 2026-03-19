import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CartItem {
    quantity: bigint;
    product: Product;
}
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    phone: string;
}
export interface Product {
    id: bigint;
    collection: string;
    name: string;
    description: string;
    isBestseller: boolean;
    category: string;
    colors: Array<string>;
    priceINR: bigint;
}
export interface backendInterface {
    addToCart(productId: bigint, quantity: bigint): Promise<void>;
    cartClear(): Promise<void>;
    clearCart(): Promise<void>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAllProducts(): Promise<Array<Product>>;
    getBestsellers(): Promise<Array<Product>>;
    getCart(): Promise<Array<CartItem>>;
    getProductById(id: bigint): Promise<Product | null>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getProductsByCollection(collection: string): Promise<Array<Product>>;
    removeFromCart(productId: bigint): Promise<void>;
    submitContactForm(name: string, email: string, phone: string, message: string): Promise<bigint>;
}
