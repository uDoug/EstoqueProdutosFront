import { useEffect, useState } from "react";
import { useProductDataMutate } from "../../hooks/useProductDataMutate";
import { ProductData } from "../../interface/ProductData";
import './create.css'


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

interface CreateProps{
    closeCreate(): void
}



export function Create({closeCreate}: CreateProps) {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [quantidade, setQuantidade] = useState(0);
    const  { mutate, isSuccess } = useProductDataMutate(); 

    function submit() {
        const productData: ProductData = {
            nome,
            descricao,
            quantidade
        }
          
        mutate(productData)
    }

    useEffect(() => {
        if(isSuccess){
            closeCreate()
            
        }
        
    }, [isSuccess])


    return (

        <div className="createOverflow">
            <div className="createContainer">
                <div className="createTop">
                    <h2>Cadastre um novo produto</h2>
                    <button className="createClose" onClick={closeCreate}>X</button>  
                </div>
                
                <form className="creatInputs">
                    <Input label="Nome" value={nome} updateValue={setNome}/>
                    <Input label="Descrição" value={descricao} updateValue={setDescricao}/>
                    <Input label="Quantidade" value={quantidade} updateValue={setQuantidade}/>
                </form>
                <button onClick={submit} className="btn-create">Salvar</button>
            </div>

        </div>

    );

}


