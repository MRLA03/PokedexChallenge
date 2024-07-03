import { useState } from 'react';
import React from 'react';

const Paginador = ({ cantidadPagina, totalPokemon, paginate }) => {
  const pageNumbers = [];
  const totalP = Math.ceil(totalPokemon / cantidadPagina);
  const [paginaA, setpaginaA] = useState(1);
  const [binicial, setbinicial] = useState(0);
  const [bfinal, setbfinal] = useState(9);
  for (let i = 2; i <= totalP-1; i++) {
    pageNumbers.push(i);
  }

  const cambiarPagina = (numeroP) => {
    paginate(numeroP);
    setpaginaA(numeroP);

    //console.error("NP: "+numeroP+" - BF"+bfinal);
    if(numeroP === bfinal+1){
        setbinicial(binicial+4);
        setbfinal(bfinal+4);
    }

    //console.error("NP: "+numeroP+" - BI"+binicial);
    if(numeroP === binicial+2 && (binicial+2-4)>0){
        setbinicial(binicial-4);
        setbfinal(bfinal-4);
    }
    if(numeroP === 1){
        setbinicial(0);
        setbfinal(9);
    }
    if(numeroP === totalP){
        setbinicial(totalP-11);
        setbfinal(totalP)
    }
  };
  return (
    <nav>
      <ul className='paginador'>    
        <li className='page-item'>
          <a onClick={() => cambiarPagina(paginaA > 1? paginaA-1 : 1)} href='!#' className='page-link'>
            {'<'}
          </a>
        </li>

        <li className={`page-item ${paginaA === 1 ? 'active' : ''}`}>
          <a onClick={() => cambiarPagina(1)} href='!#' className='page-link'>
            1
          </a>
        </li>
            
        {pageNumbers.slice(binicial, bfinal).map(numero => (            
          <li key={numero} className={`page-item ${paginaA === numero ? 'active' : ''}`}>
            <a onClick={() => cambiarPagina(numero)} href='!#' className='page-link'>
              {numero}
            </a>
          </li>
        ))}
        <li className={`page-item ${paginaA === totalP ? 'active' : ''}`}>
          <a onClick={() => cambiarPagina(totalP)} href='!#' className='page-link'>
            {totalP}
          </a>
        </li>
        <li className='page-item'>
          <a onClick={() => cambiarPagina(paginaA < totalP? paginaA+1 : totalP)} href='!#' className='page-link'>
            {'>'}
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Paginador;
