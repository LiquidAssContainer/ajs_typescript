import Buyable from "./Buyable";

export default class Gadget implements Buyable {
	constructor(
		readonly id: number,
		readonly name: string,
		readonly unitPrice: number,
		readonly type: string,
		private _quantity = 1,
	) { }

	get price(): number {
		return this.unitPrice * this.quantity;
	}

	get quantity(): number {
		return this._quantity;
	}

	increase(): void {
		this._quantity += 1;
	}

	decrease(): void {
		if (this.quantity > 1) {
			this._quantity -= 1;
		}
	}
}
