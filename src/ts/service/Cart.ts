import Buyable from "../domain/Buyable";
import Gadget from "../domain/Gadget";

export default class Cart {
	private _items: Buyable[] = [];

	get items(): Buyable[] {
		return [...this._items];
	}

	add(newItem: Buyable): void {
		const item: Buyable | undefined = this.items.find(item => item.id === newItem.id);
		if (item) {
			if (item instanceof Gadget) {
				item.increase();
			}
		} else {
			this._items.push(newItem);
		}
	}

	remove(id: number, removeAll = false): void {
		const items: Buyable[] = this.items;
		const item: Buyable | undefined = items.find(item => item.id === id);

		if (item && item instanceof Gadget) {
			if (item.quantity > 1 && !removeAll) {
				item.decrease();
				return;
			}
		}

		const index: number = items.findIndex(item => item.id === id);
		if (index !== -1) {
			this._items.splice(index, 1);
		}
	}

	calculateSum(): number {
		let sum = 0;
		for (const item of this.items) {
			sum += item.price;
		}
		return sum;
	}

	calculateSumWithDiscount(discount: number): number {
		return Math.ceil(this.calculateSum() * (1 - discount / 100));
	}
}
