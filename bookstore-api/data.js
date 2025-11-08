const users = [
  {
    id: "17655011",
    name: "jambrolho",
    email: "waeitaapoxa@email.com",
    password: "$2b$10$bGkGd0nZUu.bbZblVp/t1eqk6v.qvmQm2mNfclKJ4/YtiROgxFX82",
    role: "customer",
  },
  {
    id: "97687070",
    name: "henrique",
    email: "niceemail@ciandt.com",
    password: "$2b$10$3UUf7Ih4jZJlT3ugG/OaYOZCt6oAh8wqT4WUjNnTeIlVMacYBQAUu",
    role: "admin",
  },
];

const books = [
  {
    id: "17655011",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 10.99,
    genre: "Classic",
    publicationDate: "1925-04-10",
    inventory: 50,
    sold: 1,
  },
  {
    id: "4083436",
    title: "Harry Pote, and the phenomenal tupperware",
    author: "Piquerez Jr",
    price: 15.99,
    genre: "Fantasy",
    publicationDate: "2004-04-10",
    inventory: 70,
    sold: 12,
  },
  {
    id: "4083435",
    title: "Lord of Pings, the two routers",
    author: "Gustavo Gomez",
    price: 17.99,
    genre: "Fantasy",
    publicationDate: "2004-02-10",
    inventory: 70,
    sold: 29,
  },
  {
    id: "4182835",
    title: "Sherlock Mom's, the intelligent child case",
    author: "Weverton",
    price: 11.99,
    genre: "Mystery",
    publicationDate: "2003-02-10",
    inventory: 30,
    sold: 2,
  },
  {
    id: "4276335",
    title: "How to lose friends and let people angry",
    author: "Rafael Veiga",
    price: 30.99,
    genre: "Self Help",
    publicationDate: "2003-02-10",
    inventory: 30,
    sold: 41293,
  },
  {
    id: "9076345",
    title: "Getting drunk with the devil",
    author: "Vitor Roque",
    price: 5.99,
    genre: "Self Help",
    publicationDate: "2000-03-28",
    inventory: 30,
    sold: 1024,
  },
];

const OrderStatus = Object.freeze({
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
});

const orders = [];
const carts = [
  {
    userId: "1923491",
    items: [
      { id: "17655011", quantity: 3 },
      { id: "4083435" },
      { id: "4182835", quantity: 2 },
    ],
  },
];

// const orderSchema = (data) => {
//   return {
//     id: data.id,
//     itens: data.items || [],
//     totalPrice: data.totalPrice,
//   };
// };

module.exports = { users, books, orders, carts, OrderStatus };
