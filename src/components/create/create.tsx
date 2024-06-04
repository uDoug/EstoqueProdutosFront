import { useEffect, useState } from "react";
import { useProductDataMutate } from "../../hooks/useProductDataMutate";
//import { ProductData } from "../../interface/ProductData";
import './create.css'
import toast from "react-hot-toast";


interface InputProps {
    label: string,
    value: string | number,
    type?: React.HTMLInputTypeAttribute,
    updateValue(value : any): void 
    
}

const Input = ({label, value, updateValue, type="text"}: InputProps) => {
    return(
        <>
            <label>{label}</label>
            <input type={type} value={value} onChange={e => updateValue(e.target.value)} ></input>
        </>
       

    )
}

interface CreateProps{
    closeCreate(): void
}



export function Create({closeCreate}: CreateProps) {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [quantidade, setQuantidade] = useState(Number);
    const  { mutate, isSuccess } = useProductDataMutate(); 

    function submit() {
        
        if(!nome || !descricao || !quantidade){
            return toast.error('Todos os campos devem ser preenchidos')
        }
        if(quantidade < 0){
            return toast.error('A quantidade não pode ser negativa')
        }    
        mutate({nome, descricao, quantidade})
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
                    <Input type={"number"} label="Quantidade" value={quantidade} updateValue={setQuantidade}/>
                </form>
                <button onClick={submit} className="btn-create">Salvar</button>
            </div>

        </div>

    );

}


