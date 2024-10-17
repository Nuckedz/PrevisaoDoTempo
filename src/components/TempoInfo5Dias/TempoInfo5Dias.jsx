import './TempoInfo5Dias.css';

function TempoInfo5Dias({ tempo5Dias }) {
  console.log(tempo5Dias);

  let previsoesDiarias = {};

  // Agrupamento das previsões por data
  for (let previsoes of tempo5Dias.list) {
    const date = new Date(previsoes.dt * 1000).toLocaleDateString(); // Armazena a data formatada

    if (!previsoesDiarias[date]) {
      previsoesDiarias[date] = {
        temp_min: previsoes.main.temp_min,
        temp_max: previsoes.main.temp_max,
        description: previsoes.weather[0].description,
        icon: previsoes.weather[0].icon,
        count: 1 // contagem para calcular a média
      };
    } else {
      previsoesDiarias[date].temp_min = Math.min(previsoesDiarias[date].temp_min, previsoes.main.temp_min);
      previsoesDiarias[date].temp_max = Math.max(previsoesDiarias[date].temp_max, previsoes.main.temp_max);
      previsoesDiarias[date].count += 1;
    }
  }

  const proximoCincoDias = Object.entries(previsoesDiarias).slice(0, 5);

  // Não precisa converter novamente, pois a data já está formatada no loop anterior
  function conversaoData(date) {
    return date; // Agora só retorna a data já formatada
  }

  return (
    <div className='tempo-container'>
      <h3>Previsão Próximos 5 dias</h3>
      <div className='tempo-lista'>
        {proximoCincoDias.map(([date, previsoes]) => (
          <div key={date} className='tempo-item'>
            <p className='previsoes-dia'>{conversaoData(date)}</p> {/* Data já formatada corretamente */}

            <img src={`http://openweathermap.org/img/wn/${previsoes.icon}.png`} alt="weather icon" />

            <p className='previsoes-descricao'>{previsoes.description}</p>
            <p>{Math.round(previsoes.temp_min)}ºC min / {Math.round(previsoes.temp_max)}ºC máx</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TempoInfo5Dias;
