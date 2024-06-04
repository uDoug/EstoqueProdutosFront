import axios from "axios"
import { ProductData } from "../interface/ProductData";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { fatchData } from "./useProductData";

const API_URL = 'http://localhost:8080';

const postData = async (data : ProductData) => {
    const {data : products} = await fatchData();
    const verification = products.find(p => p.nome.toLowerCase() == data.nome.toLowerCase() && p.descricao.toLowerCase() == data.descricao.toLowerCase());
    if (verification){
        return toast.error('O produto ja existe')
    }

    const response = axios.post(API_URL + '/products', data);
    toast.success("Criado com Sucesso");
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