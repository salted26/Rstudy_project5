import React, {useEffect, useState} from 'react'

export default function Weather({ weather }) {

    const [ tempC, setTempC ] = useState('');
    const [ tempF, setTempF ] = useState('');

    const weatherIcon = () =>{
        if(weather !== undefined || weather !== '') {
            let url = `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`
            return (
                <img alt="weather icon" src={url} />
            )
        } else {
            return null;
        }
    }

    const getTempSub = () => {
        if(weather === undefined || weather === null) {
            return null;
        } else {
            setTempC((weather.main.temp).toString());
            setTempF(((weather.main.temp * 9/5) + 32).toString());

            if(tempC.length > 5) {
                setTempC(tempC.substring(0, 5));
            } else if (tempF.length > 5) {
                setTempF(tempF.substring(0, 5));
            }
        }
    }

    useEffect(() => {
        getTempSub();
    }, []);

        return (
        <div className='main_top'>
            <div className="top-left">
                {weatherIcon()}
            </div>
            <div className='weather'>
                <div className='temp'>
                    <div className='temp item'>섭씨
                        <div>{tempC ? tempC : 0} (℃)</div>
                    </div>
                </div>
                <div className='temp'>
                    <div className='temp item'>화씨
                        <div>{tempF ? tempF : 0} (℉)</div>
                    </div>
                </div>
            </div>
            <div className="top-right">
                <div className='city'>{weather && weather.name} <br/>
                    &nbsp;&nbsp;/&nbsp;&nbsp;{weather?.weather[0].main}({weather?.weather[0].description})
                </div>

            </div>
        </div>
    )
}
