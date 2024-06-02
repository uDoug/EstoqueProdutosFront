import axios, { AxiosPromise } from "axios"
//import { ProductData } from "../interface/ProductData";
import { useMutation, useQueryClient } from "@tanstack/react-query"

const API_URL = 'http://localhost:8080';



const deleteData = async (id : number): AxiosPromise => {
    const response = axios.delete(API_URL + `/products/${id}`);
    return response;
}

export function useProductDataDelete(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['productData']})
        }

    })

    return mutate;
}