import { useEffect, useState } from "react";

import { ProductData } from "../../interface/ProductData";
import './update.css'
import { useProductDataUpdate } from "../../hooks/useProductDataUpdate";


interface InputProps {
    label: string,
    value: string | number,
    updateValue(value : any): void 
    
}

const Input = ({label, value, updateValue}: InputProps) => {
    return(
        <>
            <label>{label}</label>
            <input value={value} onChange={e => updateValue(e.target.value)} ></input>
        </>
       

    )
}

interface UpdateProps{
    closeUpdate(): void
    id: number
}



export function Update({closeUpdate,id}: UpdateProps) {

    
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [quantidade, setQuantidade] = useState(0);
    const  { mutate: updateData, isSuccess } = useProductDataUpdate(); 
    console.log({id, closeUpdate});
    
    function submit() {
        const productData: ProductData = { 
            id,          
            nome,
            descricao,
            quantidade
        }
          
        updateData(productData)
    }

    useEffect(() => {
        if(isSuccess){
            closeUpdate()
            
        }
        
    }, [isSuccess])


    return (

        <div className="updateOverflow">
            <div className="updateContainer">
                <div className="updateTop">
                    <h2>Atualize os dados do produto</h2>
                    <button className="updateClose" onClick={closeUpdate}>X</button>  
                </div>
                
                <form className="updateInputs">
                    <Input label="Nome" value={nome} updateValue={setNome}/>
                    <Input label="Descrição" value={descricao} updateValue={setDescricao}/>
                    <Input label="Quantidade" value={quantidade} updateValue={setQuantidade}/>
                </form>
                <button onClick={submit} className="btn-update">Salvar</button>
            </div>

        </div>

    );

}


