import React from 'react'

export default function Weather({ weather, weatherIcon }) {
    return (
        <div className='main_top'>
            <div className='weather'>
                <div className='temp_info'>
                    <div className="weather-icon">
                        { weatherIcon }
                    </div>
                    <div className="temp-container">
                        <div className='temp'>
                            <div className='temp item'>섭씨
                                <div>{weather ? Math.round(weather.main.temp).toFixed(2) : 0} (℃)</div>
                            </div>
                        </div>
                        <div className='temp'>
                            <div className='temp item'>화씨
                                <div>{weather ? Math.round((weather.main.temp * 9 / 5) + 32).toFixed(2) : 0} (℉)</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='city'>
                    <h4>{weather && weather.name}
                    &nbsp;&nbsp;/&nbsp;&nbsp;{weather?.weather[0].main}({weather?.weather[0].description})</h4>
                </div>
            </div>
        </div>
    )
}
