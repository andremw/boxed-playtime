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



export const hey = (name: string) => `Hey, ${name}`