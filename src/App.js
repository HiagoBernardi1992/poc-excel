import React, { useState } from 'react';
import './App.css';
import * as xlsx from 'xlsx'

function App() {
  const [itens, setItens] = useState([])
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = xlsx.read(bufferArray, { type: 'buffer' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = xlsx.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = ((error) => {
        reject(error);
      })
    });

    promise.then((d) => {
      console.log(d);
      setItens(d);
    })
  }

  return (
    <>
      <div className='container-fluid'>
        <br />
        <div className='App'>
          <input type="file" onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }} />
        </div>
        <br />
        <table className="table container">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Descrição</th>
              <th scope="col">Imagem</th>
            </tr>
          </thead>
          <tbody>
            {
              itens.map((d) => (
                <tr key={d.__rowNum__}>
                  <td>{d.Item}</td>
                  <td>{d.Description}</td>
                  <td>
                    <img src={d.Image} class="img-thumbnail img-table-size" alt="Charizard" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>

  );
}

export default App;
