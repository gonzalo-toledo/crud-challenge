import { createContext, useState, useEffect } from "react";

//creacion del context:
export const UnicornContext = createContext() // al context lo voy a importar en UnicornsContainer.jsx


// el provider es el que va a envolver a los componentes que van a usar el context(toda la funcionalidad)
// al provider lo voy a importar en App.jsx
//children es lo que se va a renderizar dentro del provider, es una palabra reservada
export const UnicornProvider = ({ children }) => {
    const[unicorns, setUnicorns]= useState([]);

    const getUnicorns = async () => {
        const response = await fetch("https://crudcrud.com/api/137d1a6181b341c1b10223e7cb746b29/unicorns")
        const data = await response.json()
        setUnicorns(data) 
    }  

    useEffect(() => {
        getUnicorns()
    }
    , [])

    return (
        <UnicornContext.Provider value={{unicorns, getUnicorns}}>{/* //en el value del provider va la informacion que quiero compartir */}
            {children} {/* //children es lo que se va a renderizar dentro del provider */}
        </UnicornContext.Provider>
    )
}