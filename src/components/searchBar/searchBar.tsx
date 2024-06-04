import './searchBar.css'


export function SearchBar({filter, setFilter}:{setFilter : React.Dispatch<React.SetStateAction<string>>, filter : string}){

    return (
        <div className="divSearchBar">
            <input type="search" name="searchBar" className="search" placeholder="Pesquisar..." value={filter} onChange={e => setFilter(e.target.value)} />

        </div>

    )

}