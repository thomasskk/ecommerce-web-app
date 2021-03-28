export class CartItem {
  constructor(
    public dname: string,
    public name: string,
    public image: string,
    public price: number,
    public quantity: number,
    public stock: number
  ) {}
}
