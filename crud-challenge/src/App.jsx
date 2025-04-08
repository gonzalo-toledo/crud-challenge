import { useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])

  return (
    <>

    </>
  )
}

export default App


// import { Fragment, useState, useEffect } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import './App.css'

// function App() {
//   const [quotes, SetQuotes] = useState([]);

//   const [loading, setLoading] = useState(false);



//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//       const data = await response.json();
//       SetQuotes(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
      
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   //hacer el loading

//   return (
//     <Fragment>
//       {/* <div className="quotes-container">
//         {quotes.map((quote) => {
//           return (
//             <div key={quote.id}>
//               <h3>{quote.title}</h3>
//               <p>{quote.body}</p>
//             </div>
//           );
//         })}
//       </div> */}
//         <h1>TP 01 Consumo de API</h1>
//         <DataTable value={quotes}>
//             <Column field="id" header="Id"></Column>
//             <Column field="title" header="Title"></Column>
//             <Column field="body" header="Cuerpa"></Column>
//         </DataTable>     
//     </Fragment>
//   )
// }

// export default App
