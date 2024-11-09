export interface IProduct{
    id:number | string,
    name:string,
    description:string,
    price:number,
    image:string,
    status:string,
    quantity:number
}
export type FormData = Pick<IProduct,'name'|'description'|'price'|'image'>