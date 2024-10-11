function TempoInfomacoes({ tempo }) {
    if (!tempo || !tempo.weather || tempo.weather.length === 0) {
        return <div></div>; // Ou outra indicação de carregamento
    }

    console.log(tempo);

    return (
        <div>
            <h2>{tempo.name}</h2>
            <div>
                <img src={`http://openweathermap.org/img/wn/${tempo.weather[0].icon}.png`} alt="Icone do tempo" />
                <p>{Math.round(tempo.main.temp)}ºC</p>
            </div>
            <p>{tempo.weather[0].description}</p>
            <div>
                <p>Sensação Térmica: {Math.round(tempo.main.feels_like)}ºC</p>
                <p>Umidade: {tempo.main.humidity}%</p>
                <p>Pressão: {tempo.main.pressure} hPa</p>
            </div>
        </div>
    );
}

export default TempoInfomacoes;
