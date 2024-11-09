export interface IVoucher{
    id:number|string,
    code:string,
    name:string,
    type:string,
    quantity:number,
    start:string,
    end:string,
    status:string,
}
export type FormData = Pick<IVoucher,'code'|'name'|'type'|'quantity'|'start'|'end'|'status'>