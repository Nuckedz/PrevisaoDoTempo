import './TempoInfo5Dias.css';

function TempoInfo5Dias({ tempo5Dias }) {
  console.log(tempo5Dias);


  let previsoesDiarias = {}

  for (let previsoes of tempo5Dias.list) {
    const date = new Date(previsoes.dt * 1000).toLocaleDateString()

    if (!previsoesDiarias[date]) {
      previsoesDiarias[date] = previsoes

    }
  }

  const proximoCincoDias = Object.values(previsoesDiarias).slice(0, 5)

  function conversaoData(date) {
    const newDate = new Date(date.dt * 1000).toLocaleDateString('pt-br', { weekday: 'long', day: '2-digit' })


    return newDate
  }


  return (
    <div className='tempo-container'>
      <h3>Previsão Próximos 5 dias</h3>
      <div className='tempo-lista'>
        {proximoCincoDias.map(previsoes => (
          <div key={previsoes.dt} className='tempo-item'>
            <p className='previsoes-dia'>{conversaoData(previsoes)}</p>

            <img src={`http://openweathermap.org/img/wn/${previsoes.weather[0].icon}.png`} />

            <p className='previsoes-descricao'>{previsoes.weather[0].description}</p>
            <p>{Math.round(previsoes.main.temp_min)}ºC min / {Math.round(previsoes.main.temp_max)}ºC máx</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TempoInfo5Dias;
