const { carts, books, orders, OrderStatus } = require("../data");
const { NotFoundError, ConflictError } = require("../errors/errors");

// cart ->
// {
//   userId: "1098430",
//   items: [
//         {id:17655011,
//          quantity: 3
//         },
//         {id:"4083435"
//         },
//         {id:"4182835", "quantity": 2
//         }
//     ]
// }

const deleteItemFromCart = (userId, orderItem) => {
  // ok so the idea is... if it has a quantity, i will delete the quantity
  // if dont, ill delete all...
  const { id: itemId, quantity } = orderItem;

  const cart = carts.find((cart) => cart.userId === userId);

  if (!cart || !cart.items) {
    throw new NotFoundError("Your cart is empty, there is nothing to delete.");
  }

  const item = cart.items.find((item) => item.id === itemId);

  if (!item) {
    throw new NotFoundError("That item is not in the cart");
  }

  if (item.quantity <= quantity || !quantity) {
    const initialLength = cart.items.length;
    const filteredItems = cart.items.filter((c) => c.id !== itemId);

    //here it clean the cart items and put the updated array without the item.
    cart.items.splice(0, initialLength, ...filteredItems);

    return { message: "Item deleted from cart." };
  }

  item.quantity -= quatity;

  return { message: "Items removed successfully" };
};

const addToCart = (userId, item) => {
  const quantity = item.quantity ?? 1;

  const book = books.find((book) => book.id === item.id);

  if (!book || book.inventory < 1) {
    throw new NotFoundError("Sorry we dont have this book at moment.");
  }

  let cart = carts.find((u) => u.userId === userId);

  if (!cart) {
    cart = { userId: userId, items: [] };
    carts.push(cart);
  }

  const onCartItem = cart.items.find((itemOnCart) => itemOnCart.id === item.id);

  if (!onCartItem) {
    cart.items.push({ id: item.id, quantity });
  } else if (onCartItem.quantity + quantity > 100) {
    throw new ConflictError(
      "Only special orders can ask for 100+ books of same id at once."
    );
  } else {
    onCartItem.quantity += quantity;
  }

  return book;
};

const getCart = (userId) => {
  const cart = carts.find((cart) => cart.userId === userId);

  if (!cart || cart.items.length === 0) {
    throw new NotFoundError("Your cart is empty!");
  }

  return cart;
};

const makeOrder = (userId) => {
  const cart = carts.find((cart) => cart.userId === userId);

  if (!cart || cart.items.length === 0) {
    throw new NotFoundError("Your cart is empty!");
  }

  const { items } = cart;

  let id;

  do {
    id = Math.round(Math.random() * 10000000).toString();
  } while (orders.some((order) => order.id === id));

  let totalPrice = 0.0;

  const bookItems = [];

  items.forEach((item) => {
    const book = books.find((book) => book.id === item.id);

    if (book.inventory > (item.quantity || 0)) {
      book.inventory = book.inventory - (item.quantity || 1);
      book.sold += item.quantity || 1;
      totalPrice += book.price * (item.quantity || 1);

      bookItems.push(book);
    } else {
      throw new ConflictError(
        `There are no ${item.quantity || 1} ${book.title} on the store.`
      );
    }
  });

  if (bookItems.length < 1) {
    throw new ConflictError("There is no books in this order");
  }

  const newOrder = {
    id,
    userId,
    items,
    totalPrice,
    orderStatus: OrderStatus.PENDING,
  };

  // CLEAN CURRENT CART...
  const initialLength = carts.length;
  const filteredCarts = carts.filter((c) => c.userId !== userId);

  carts.splice(0, initialLength, ...filteredCarts);

  orders.push(newOrder);

  return newOrder;
};

module.exports = {
  addToCart,
  makeOrder,
  getCart,
  deleteItemFromCart,
};
