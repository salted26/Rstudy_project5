import { useEffect, useState } from 'react';
import './App.css';
import WeatherBox from './components/WeatherBox'
import WeatherButton from './components/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";

// 1. 실행 : 현재 있는 장소의 날씨가 보인다.
// 2. 날씨 정보 : 도시, 섭씨, 화씨, 날씨상태
// 3. 5개의 버튼 : 현재위치, 다른도시 4개
// 4. 도시 버튼을 클릭하면 해당 도시의 날씨가 보인다.
// 5. 현재위치 버튼을 누르면 현재위치 기반의 날씨가 보인다.
// 6. 데이터를 가져오는 동안 로드스피너가 돈다.
function App() {

  const [ weather, setWeather ] = useState();
  const cities = [ 'hanoi', 'jeju', 'sydney', 'hawaii', 'current'];
  const [city, setCity] = useState('');

  // spinners : true 사용 / false 미사용
  let [loading, setLoading] = useState(false);

  const getCurrnetWeater = async(lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=621e39132136a713226280563270d0a1`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json()
    setWeather(data);
    setLoading(false);
  }

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position)=> {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      getCurrnetWeater(lat, lon);
    });
  }

  const getWeatherCity = async() =>{
    if(city === 'current'){
      getCurrentLocation();
    } else {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=621e39132136a713226280563270d0a1`
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json()
      setWeather(data);
      setLoading(false);
    }
  }

  useEffect(()=> {
    if(city === '') {
      getCurrentLocation();
    } else {
      getWeatherCity()
    }

  }, [city])

  return (
      <div className="App">
        {!loading?
            ( <>
              <WeatherBox weather={weather}/>
              <WeatherButton cities={cities} setCity={setCity} />
            </>) : (<ClipLoader color='#ffffff' loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" />)
        }
      </div>
  );
}

export default App;
