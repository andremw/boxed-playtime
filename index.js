"use strict";
/**
 * INVENTORY MANAGEMENT SYSTEM
 * Rules:
 * - no exceptions
 * - no use of optional operator
 *
 *
 * Entities:
 * - Product: id, name, price, description, expirationDate?
 * - Order: id, productId, customerName, discount?
 *
 *
 * Use cases:
 * - Add new product
 * Rules:
 * . product description can't be empty
 * . price can't be zero or negative
 * . the product can't be expired
 *
 *
 * - Place Order
 * Rules:
 * . product must exist
 * . customer name can't be empty
 * . qty can't be zero or negative
 *
 *
 * - Apply discount
 * Rules:
 * . product must exist
 * . discount can't be zero or negative
 * . discount can't be more than 20%
 *
 *
 * - Deleted product
 * Rules:
 * . product must exist
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = exports.hey = void 0;
const boxed_1 = require("@swan-io/boxed");
const hey = (name) => `Hey, ${name}`;
exports.hey = hey;
const addProduct = (product) => {
    if (product.description === "") {
        return boxed_1.Result.Error(new Error("description can't be empty"));
    }
    if (product.price <= 0) {
        return boxed_1.Result.Error(new Error("price must be > 0"));
    }
    if (product.expirationDate.isSome() &&
        product.expirationDate.get() < new Date()) {
        return boxed_1.Result.Error(new Error("product can't be expired"));
    }
    // pretend to save the product
    return boxed_1.Result.Ok(Object.assign(Object.assign({}, product), { id: Date.now().toString() }));
};
exports.addProduct = addProduct;
const placeOrder = (product, customerName, qty) => {
    if (customerName !== "") {
        return boxed_1.Result.Error(new Error("customer name can't be empty"));
    }
    if (qty <= 0) {
        return boxed_1.Result.Error(new Error("quantity must be > 0"));
    }
    if (product.isNone()) {
        return boxed_1.Result.Error(new Error("product can't be empty"));
    }
    return boxed_1.Result.Ok({
        id: Date.now().toString(),
        productId: product.get().id,
        customerName,
        qty,
        discount: boxed_1.Option.None(),
    });
};
const addProductService = () => {
    const yves = (0, exports.addProduct)({
        name: "Yves",
        price: 1,
        description: "Eau de parfum",
        expirationDate: boxed_1.Option.None(),
    });
    yves.match({
        Ok: (product) => {
            const expirationDate = product.expirationDate.match({
                Some: (date) => date.toString(),
                None: () => "Never expires",
            });
            console.log("product: ", { id: product.id, expirationDate });
        },
        Error: (error) => console.log("error: ", error),
    });
    //console.log("yves: ", yves);
};
addProductService();
