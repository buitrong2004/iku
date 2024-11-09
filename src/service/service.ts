
import { IProduct } from "../interface/product";
import api from "../config/axios";

export const GetAllProducts = async()=>{
    try {
        const {data} = await api.get("products");
        return data
    } catch (error) {
        console.log(error);
                
    }
}
export const GetProductById = async(id:number|string)=>{
    try {
        const {data} = await api.get(`products/${id}`);
        return data
    } catch (error) {
        console.log(error);
                
    }
}
export const AddProducts = async(product:IProduct)=>{
    try {
        const {data} = await api.post('products',product);
        return data
    } catch (error) {
        console.log(error);
                
    }
}
export const UpdateProduct = async(product:IProduct,id:number|string)=>{
    try {
        const {data} = await api.put(`products/${id}`,product);
        return data
    } catch (error) {
        console.log(error);
                
    }
}
export const DeleteProduct = async(id:number|string)=>{
    try {
        const {data} = await api.delete(`products/${id}`);
        return data
    } catch (error) {
        console.log(error);
                
    }
}