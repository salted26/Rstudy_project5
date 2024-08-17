import {useEffect, useState} from 'react';
import './App.css';
import WeatherBox from './components/WeatherBox'
import WeatherButton from './components/WeatherButton';
import CircleLoader  from "react-spinners/CircleLoader";

// 1. 실행 : 현재 있는 장소의 날씨가 보인다.
// 2. 날씨 정보 : 도시, 섭씨, 화씨, 날씨상태
// 3. 5개의 버튼 : 현재위치, 다른도시 4개
// 4. 도시 버튼을 클릭하면 해당 도시의 날씨가 보인다.
// 5. 현재위치 버튼을 누르면 현재위치 기반의 날씨가 보인다.
// 6. 데이터를 가져오는 동안 로드스피너가 돈다.
function App() {

  const API_KEY = process.env.REACT_APP_API_KEY;

  const [ weather, setWeather ] = useState();
  const cities = [ 'paris', 'jeju', 'sydney', 'hawaii', 'current'];
  const [city, setCity] = useState('');
  const [ selected, setSelected] = useState('');
  const [ apiError, setApiError ] = useState('');

  // spinners : true 사용 / false 미사용
  let [loading, setLoading] = useState(false);

  const getCurrnetWeather = async(lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json()
      setWeather(data);
      setLoading(false);
    } catch (error) {
      setApiError(error.message);
      setLoading(false)
      console.log(`API ERROR : ${apiError} | ERROR : ${error.message}`);
    }
  }

  // eslint-disable-next-line
  const getCurrentLocation = () => {

    navigator.geolocation.getCurrentPosition(position => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      return getCurrnetWeather(lat, lon);
    })
  };

  const getWeatherCity = async() =>{
    try {
      if(city === 'current'){
        getCurrentLocation();
      } else {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        setLoading(true);
        let response = await fetch(url);
        let data = await response.json();
        setWeather(data);
        setLoading(false);
      }
    } catch (error) {
      setApiError(error.message);
      setLoading(false)
      console.log(`API ERROR : ${apiError} | ERROR : ${error.message}`);
    }
  }

  const weatherIcon = () =>{
    try{
      if(weather !== undefined || weather !== '') {
          let url = `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`
          return (
              <img alt="weather icon" src={url} style={{width:125}}/>
          )
      } else {
          return null;
      }
    } catch(error){
      setApiError(error.message);
      setLoading(false)
      console.log(`API ERROR : ${apiError} | ERROR : ${error.message}`);
    }
  }

  const handleCityData = (item) => {
    setCity(item);
    setSelected(item);
  }

  useEffect(()=> {
    if(city === '') {
      getCurrentLocation();
    } else {
      getWeatherCity();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);


  return (
      <div className="App">
        <div className="weather-container">
          {!loading?
              ( <>
                <WeatherBox weather={weather} weatherIcon={weatherIcon()}/>
                {/*<WeatherBox weather={weather} />*/}
                <WeatherButton cities={cities} city={city} selected={selected} handleCityData={handleCityData}/>
              </>) : (<CircleLoader  color='#ccc' loading={loading} size={50} speedMultiplier={2}
                                    aria-label="Loading Spinner" data-testid="loader" />)
          }
        </div>
      </div>
  );
}

export default App;
