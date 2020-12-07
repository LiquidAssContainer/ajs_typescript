import Cart from "../service/Cart";
import Book from "../domain/Book";
import Movie from "../domain/Movie";
import MusicAlbum from "../domain/MusicAlbum";
import Gadget from "../domain/Gadget";

test("New cart should be empty", () => {
	const cart = new Cart();

	expect(cart.items.length).toBe(0);
});

test("Test calculateSum()", () => {
	const cart = new Cart();

	cart.add(new Book(1001, "War and Piece", "Leo Tolstoy", 2000, 1225));
	cart.add(new MusicAlbum(1008, "Meteora", "Linkin Park", 900));
  cart.add(new Movie(1011, "The Avengers", 2012, 750, "USA", "Action", "Avengers Assemble!", 120));
  // попытка повторного добавления, ничего не произойдёт
	cart.add(new Movie(1011, "The Avengers", 2012, 750, "USA", "Action", "Avengers Assemble!", 120));

	expect(cart.calculateSum()).toBe(3650);
});

test("Test calculateSumWithDiscount()", () => {
	const cart = new Cart();

	cart.add(new Book(1001, "War and Piece", "Leo Tolstoy", 2000, 1225));
	cart.add(new MusicAlbum(1008, "Meteora", "Linkin Park", 900));
	cart.add(new Movie(1011, "The Avengers", 2012, 750, "USA", "Action", "Avengers Assemble!", 120));

	expect(cart.calculateSumWithDiscount(15)).toBe(3103);
	expect(cart.calculateSumWithDiscount(20)).toBe(2920);
});

test("Deleting items", () => {
	const cart = new Cart();

	expect(cart.items.length).toBe(0);

	cart.add(new Book(1001, "War and Piece", "Leo Tolstoy", 2000, 1225));
	cart.add(new MusicAlbum(1008, "Meteora", "Linkin Park", 900));
	cart.add(new Movie(1011, "The Avengers", 2012, 750, "USA", "Action", "Avengers Assemble!", 120));

	expect(cart.items.length).toBe(3);

	cart.remove(1008);

	expect(cart.items.length).toBe(2);

  cart.remove(1001);
  // такого id нет, ничего не произойдёт
	cart.remove(1222);

	expect(cart.items.length).toBe(1);
});

test("Test new Gadget()", () => {
  const gadget = new Gadget(2133, "Смартфон puperPhone", 99990, "phone", 1);
  expect(gadget.quantity).toBe(1);

  gadget.increase();
  expect(gadget.quantity).toBe(2);

  gadget.decrease();
  expect(gadget.quantity).toBe(1);
  
  // нельзя уменьшить до 0, но попытка это сделать не выбрасывает ошибку
  gadget.decrease();
  expect(gadget.quantity).toBe(1);
});

test("Adding and removing gadgets", () => {
	const cart = new Cart();

	cart.add(new Book(1001, "War and Piece", "Leo Tolstoy", 2000, 1225));
	cart.add(new MusicAlbum(1008, "Meteora", "Linkin Park", 900));
  cart.add(new Movie(1011, "The Avengers", 2012, 750, "USA", "Action", "Avengers Assemble!", 120));
  cart.add(new Gadget(2099, "Смартфон", 9990, "Phone"));
  cart.add(new Gadget(2099, "Смартфон", 9990, "Phone"));
	expect(cart.items.length).toBe(4);
  expect(cart.calculateSum()).toBe(23630);
  
  cart.remove(2099);
  expect(cart.items.length).toBe(4);
  expect(cart.calculateSum()).toBe(13640);
  
  cart.remove(2099);
  expect(cart.items.length).toBe(3);
	expect(cart.calculateSum()).toBe(3650);
});

test("Remove all gadgets", () => {
	const cart = new Cart();

  cart.add(new Gadget(2099, "Смартфон", 9990, "Phone"));
  cart.add(new Gadget(2099, "Смартфон", 9990, "Phone"));
  expect(cart.calculateSum()).toBe(19980);
  
  cart.remove(2099, true);
  expect(cart.calculateSum()).toBe(0);
});
