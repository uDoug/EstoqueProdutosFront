import { useState } from 'react';
import './App.css'
import { Card } from './components/card/card';
import { SearchBar } from './components/searchBar/searchBar';
import { useProductData } from './hooks/useProductData';
import { Create } from './components/create/create';

//import { ProductData } from './interface/ProductData';


function App() {
  let { data } = useProductData();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [filter, setFilter] = useState("")
  if (filter && data){ data = data.filter(n => n.nome.toLowerCase().startsWith(filter.toLowerCase()))}

  const handlesOpenModal = () => {
    setIsCreateOpen(prev => !prev)
  }  

  return (
    <div className='app'>
      <h1>Estoque</h1> 
      <div className='divAdd'>
        <button className='btnAdicionar' title='Adicionar novo' onClick={handlesOpenModal}> + </button>
      </div> 

      <div className="container">
        <div className="top">
          <div className="searchBar">
            <SearchBar filter={filter} setFilter={setFilter} /> 
          </div>
        </div>

        <div className="titles">
            <div id="nome">
              <h5>Nome</h5>
            </div>    
            <div id="descricao">
              <h5 >Descrição</h5>
            </div>
            <div id="quantidade">
              <h5>Quantidade</h5>
            </div>
          
        </div>
          
        <div className="card-grid">
          {data?.map(productData => <Card key={productData.id} id={productData.id} nome={productData.nome} descricao={productData.descricao} quantidade={productData.quantidade} />)}
          
        </div> 

        {isCreateOpen && <Create closeCreate={handlesOpenModal}/>}

      </div>
      
    </div>
  )
}

export default App
