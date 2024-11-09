import api from "../config/axios";
import { IVoucher } from "../interface/voucher";

export const GetAllVouchers = async()=>{
    try {
        const {data} = await api.get("vouchers");
        return data
    } catch (error) {
        console.log(error);
                
    }
}
export const GetVoucherById = async(id:number|string)=>{
    try {
        const {data} = await api.get(`vouchers/${id}`);
        return data
    } catch (error) {
        console.log(error);
                
    }
}
export const AddVouchers = async(voucher:IVoucher)=>{
    try {
        const {data} = await api.post('vouchers',voucher);
        return data
    } catch (error) {
        console.log(error);
                
    }
}
export const EditVouchers = async(voucher:IVoucher,id:number|string)=>{
    try {
        const {data} = await api.put(`vouchers/${id}`,voucher);
        return data
    } catch (error) {
        console.log(error);
                
    }
}
export const VoucherDel = async(id:number|string)=>{
    try {
        const {data} = await api.delete(`vouchers/${id}`);
        return data
    } catch (error) {
        console.log(error);
                
    }
}