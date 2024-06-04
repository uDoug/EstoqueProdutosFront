import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { ProductData } from "../../interface/ProductData";
import './update.css'
import { useProductDataUpdate } from "../../hooks/useProductDataUpdate";
import toast from "react-hot-toast";


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
    nome: string
    descricao: string
    quantidade: number
}



export function Update({closeUpdate,id,...old}: UpdateProps) {

    
    const [nome, setNome] = useState(old.nome);
    const [descricao, setDescricao] = useState(old.descricao);
    const [quantidade, setQuantidade] = useState(old.quantidade);
    const  { mutate: updateData, isSuccess } = useProductDataUpdate(); 
    console.log({id, closeUpdate});
    
    function submit() {
        
        if(!nome || !descricao || !quantidade){
            return toast.error('Todos os campos devem ser preenchidos')
        }
        if(quantidade < 0){
            return toast.error('A quantidade não pode ser negativa')
        }  
        const productData: ProductData = { 
            id,          
            nome,
            descricao,
            quantidade
        }
        Swal.fire({
            title: "Confirmar alteração?",
            text: "Esta ação não poderá ser desfeita!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim!",
            cancelButtonText: "Não!"
          }).then((result) => {
            if (result.isConfirmed) {
              updateData(productData)  
              Swal.fire({
                title: "Atualizado!",
                text: "O produto foi deletado com sucesso",
                icon: "success"
              });
            }
          });  
        
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


