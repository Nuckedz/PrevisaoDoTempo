import { useState, useRef} from 'react'
import axios from 'axios'
import './App.css'
import TempoInfo from './components/tempoInfo/TempoInfo';

function App() {
  const [tempo, setTempo] = useState()
  const inputRef = useRef()


  async function buscarCidade() {
    const cidade = inputRef.current.value
    const chave = "cc023533fc797f39b8714bffd92f7682"

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`

    const apiInfo = await axios.get(url)
    setTempo(apiInfo.data)  
    
    
  }

  return (
      <div>
        <h1>Previsão do Tempo</h1>
        <input ref={inputRef} type='text' placeholder='Digite o nome da cidade'/>
        <button onClick={buscarCidade}>Buscar</button>

        {tempo && <TempoInfo tempo={tempo}/>}
      </div>
        
  )
}

export default App
