import { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';
import TempoInfo from './components/TempoInfo/TempoInfo';
import TempoInfo5Dias from './components/tempoInfo5Dias/TempoInfo5Dias';

function App() {
  const [tempo, setTempo] = useState();
  const [tempo5Dias, setTempo5Dias] = useState();
  const [erro, setErro] = useState(null);  // Para exibir erros, caso ocorra

  const inputRef = useRef();

  async function buscarCidade() {
    const cidade = inputRef.current.value;
    const chave = "cc023533fc797f39b8714bffd92f7682";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`;
    const url5Dias = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`;

    try {
      
      const apiInfo = await axios.get(url);
      const apiInfo5Dias = await axios.get(url5Dias);

      setTempo5Dias(apiInfo5Dias.data);
      setTempo(apiInfo.data);
      setErro(null); 
    } catch (error) {

      console.error("Erro ao buscar dados da API:", error);
      setErro("Erro ao buscar dados da previsão do tempo. Verifique a cidade ou tente novamente mais tarde.");
    }
  }

  return (
    <div className='container'>
      <h1>Previsão do Tempo</h1>
      <input ref={inputRef} type='text' placeholder='Digite o nome da cidade' />
      <button onClick={buscarCidade}>Buscar</button>

      {erro && <p className='error'>{erro}</p>}
      {tempo && <TempoInfo tempo={tempo} />}
      {tempo5Dias && <TempoInfo5Dias tempo5Dias={tempo5Dias} />} 
    </div>
  );
}

export default App;
