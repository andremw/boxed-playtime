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

import { Option, Result } from "@swan-io/boxed";

export const hey = (name: string) => `Hey, ${name}`;

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  expirationDate: Option<Date>;
}
export interface Order {
  id: string;
  productId: string;
  customerName: string;
  discount: Option<number>;
}

class DescriptionIsEmpty {
  readonly tag = "DescriptionIsEmpty"
}

class PriceIsInvalid {
  readonly tag = "PriceIsInvalid"
}

class ProductIsExpired {
  readonly tag = "ProductIsExpired"
}


type addProduct = (product: {
  name: string;
  price: number;
  description: string;
  expirationDate: Option<Date>;
}) => Result<Product, DescriptionIsEmpty | PriceIsInvalid | ProductIsExpired>;

export const addProduct: addProduct = (product) => {
  if (product.description === "") {
    return Result.Error(new DescriptionIsEmpty());
  }
  if (product.price <= 0) {
    return Result.Error(new PriceIsInvalid());
  }
  if (
    product.expirationDate.isSome() &&
    product.expirationDate.get() < new Date()
  ) {
    return Result.Error(new ProductIsExpired());
  }

  // pretend to save the product

  return Result.Ok({
    ...product,
    id: Date.now().toString(),
  });
};

type placeOrder = (
  product: Option<Product>,
  customerName: string,
  qty: number
) => Result<Order, Error>;

const placeOrder: placeOrder = (product, customerName, qty) => {
  if (customerName !== "") {
    return Result.Error(new Error("customer name can't be empty"));
  }
  if (qty <= 0) {
    return Result.Error(new Error("quantity must be > 0"));
  }
  if (product.isNone()) {
    return Result.Error(new Error("product can't be empty"));
  }
  return Result.Ok({
    id: Date.now().toString(),
    productId: product.get().id,
    customerName,
    qty,
    discount: Option.None(),
  });
};

const addProductService = () => {
  const yves = addProduct({
    name: "Yves",
    price: 1,
    description: "Eau de parfum",
    expirationDate: Option.None(),
  });
  const invalidProd = addProduct({
    name: "",
    price: 15,
    description: "Some Description",
    expirationDate: Option.Some(new Date("2027-01-01")),
  })

  yves.match({
    Ok: (product) => {
      const expirationDate = product.expirationDate.match({
        Some: (date) => date.toString(),
        None: () => "Never expires",
      });

      const order = placeOrder(Option.Some(product), "John Doe", 2);


      return order.map((order) => {
        // const applyDiscount = (product: any) => ({...product, price: product.price - 10, discount: 10})

        console.log("order: ", order, product)
        return order
      })
    },
    Error: (error) => {
      if (error instanceof ProductIsExpired) {
        console.log("hehehe")
      }
      console.log("error: ", error)
      return Result.Error(new Error("business error"))
    },
  });

  invalidProd.match({
    Ok: (product) => {
      const expirationDate = product.expirationDate.match({
        Some: (date) => date.toString(),
        None: () => "Never expires",
      });
      console.log("product: ", {id: product.id, expirationDate})
    },
    Error: (error) => console.log("error: ", error),
  });


  //console.log("yves: ", yves);
};

addProductService();

// * - Apply discount
// * Rules:
// * . product must exist
// * . discount can't be zero or negative
// * . discount can't be more than 20%