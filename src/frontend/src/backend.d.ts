import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    status: ProductStatus;
    purchasePrice: number;
    stockQty: bigint;
    name: string;
    color?: string;
    size?: string;
    parentPlant?: bigint;
    sellingPrice: number;
    productType: ProductType;
    potType?: string;
    category?: string;
    image?: string;
    propagationType?: string;
    dateAdded: Time;
}
export interface Expense {
    date: Time;
    description: string;
    paymentMode: string;
    category: string;
    amount: number;
}
export interface Customer {
    name: string;
    totalPurchases: bigint;
    totalSpent: number;
    phone: string;
    totalDiscount: number;
}
export type Time = bigint;
export interface DeadPlant {
    date: Time;
    deadQuantity: bigint;
    purchasePriceEach: number;
    totalLoss: number;
    productId: bigint;
    productName: string;
    notes?: string;
    photo?: string;
    reason: string;
}
export interface Sale {
    customerName?: string;
    isWalkIn: boolean;
    customerPhone?: string;
    date: Time;
    totalPaid: number;
    discountReason?: string;
    discount: number;
    paymentMode: string;
    items: Array<SaleItem>;
    billNo: string;
    subtotal: number;
    savedMessage?: string;
}
export interface Worker {
    salary: number;
    payments: Array<WorkerPayment>;
    joinDate: Time;
    name: string;
    phone: string;
}
export interface SaleItem {
    total: number;
    productId: bigint;
    productName: string;
    quantity: bigint;
    price: number;
}
export interface WorkerPayment {
    date: Time;
    paymentMode: string;
    amount: number;
}
export enum ProductStatus {
    active = "active",
    discontinued = "discontinued",
    outOfStock = "outOfStock"
}
export enum ProductType {
    pot = "pot",
    propagation = "propagation",
    plant = "plant"
}
export interface backendInterface {
    addCustomer(name: string, phone: string): Promise<void>;
    addDeadPlant(date: Time, productId: bigint, productName: string, deadQuantity: bigint, purchasePriceEach: number, totalLoss: number, reason: string, notes: string | null, photo: string | null): Promise<bigint>;
    addExpense(date: Time, category: string, description: string, amount: number, paymentMode: string): Promise<bigint>;
    addPlant(name: string, category: string | null, purchasePrice: number, sellingPrice: number, stockQty: bigint, image: string | null): Promise<bigint>;
    addPot(name: string, size: string, color: string, potType: string, purchasePrice: number, sellingPrice: number, stockQty: bigint, image: string | null): Promise<bigint>;
    addPropagationPlant(name: string, propagationType: string, parentPlant: bigint, actualCost: number, sellingPrice: number, stockQty: bigint, image: string | null): Promise<bigint>;
    addWorker(name: string, phone: string, salary: number, joinDate: Time): Promise<bigint>;
    addWorkerPayment(workerId: bigint, date: Time, amount: number, paymentMode: string): Promise<void>;
    createSale(billNo: string, date: Time, customerName: string | null, customerPhone: string | null, isWalkIn: boolean, items: Array<SaleItem>, subtotal: number, discount: number, discountReason: string | null, totalPaid: number, paymentMode: string, savedMessage: string | null): Promise<void>;
    deletePlant(id: bigint): Promise<void>;
    deletePot(id: bigint): Promise<void>;
    deletePropagationPlant(id: bigint): Promise<void>;
    getAllCustomers(): Promise<Array<Customer>>;
    getAllDeadPlants(): Promise<Array<DeadPlant>>;
    getAllExpenses(): Promise<Array<Expense>>;
    getAllPlants(): Promise<Array<Product>>;
    getAllPots(): Promise<Array<Product>>;
    getAllPropagationPlants(): Promise<Array<Product>>;
    getAllSales(): Promise<Array<Sale>>;
    getAllWorkers(): Promise<Array<Worker>>;
    getLowStockPlants(): Promise<Array<Product>>;
    updateCustomerStats(phone: string, purchases: bigint, spent: number, discount: number): Promise<void>;
    updatePlant(id: bigint, name: string, category: string | null, purchasePrice: number, sellingPrice: number, stockQty: bigint, image: string | null): Promise<void>;
    updatePot(id: bigint, name: string, size: string, color: string, potType: string, purchasePrice: number, sellingPrice: number, stockQty: bigint, image: string | null): Promise<void>;
    updatePropagationPlant(id: bigint, name: string, propagationType: string, parentPlant: bigint, actualCost: number, sellingPrice: number, stockQty: bigint, image: string | null): Promise<void>;
}
