import axios, { AxiosPromise } from "axios"
import { ProductData } from "../interface/ProductData";
import { useMutation, useQueryClient } from "@tanstack/react-query"

const API_URL = 'http://estoqueprodutos-production.up.railway.app';

const updateData = async (data : ProductData): AxiosPromise => {
    const response = axios.put(API_URL + `/products/${data.id}`, data);
    return response;
}


export function useProductDataUpdate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: updateData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['productData']})
        }

    })

    return mutate;
}