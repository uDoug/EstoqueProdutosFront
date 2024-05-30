import axios, { AxiosPromise } from "axios"
import { ProductData } from "../interface/ProductData";
import { useMutation, useQueryClient } from "@tanstack/react-query"

const API_URL = 'http://localhost:8080';

const postData = async (data : ProductData): AxiosPromise<number> => {
    const response = axios.post(API_URL + '/products', data);
    return response;
}

export function useProductDataMutate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['productData']})
        }

    })

    return mutate;
}