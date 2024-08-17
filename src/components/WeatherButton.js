import React from 'react'
import { Button } from 'react-bootstrap';

// 함수를 호출 받을 수 있음 (ex. setCity)
export default function WeatherButton({cities, handleCityData, selected}) {
// App.js로 따로 보내지 않더라도 App.js에서 해당 함수를 가져옴
    return (
        <div className='main_bottom'>
            <div className='button_group'>
                {cities.map((item, index) => (
                    <Button key={index} onClick={ () => handleCityData(item) }
                            variant={`${selected === item ? "dark" : "outline-informaiton"}`} >
                        {item}
                    </Button>
                ))}
            </div>
        </div>
    )
}