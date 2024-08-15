import React from 'react'

export default function weather({ weather }) {

    return (
        <>
            <div className='main_top'>
                <div className='city'>{weather && weather.name}</div>
                <div className='weather'>
                    <div className='tem'>
                        <div className='tem item'>섭씨
                            <div>{weather?weather.main.temp : 0}</div>
                        </div>
                    </div>
                    <div className='tem'>
                        <div className='tem item'>화씨
                            <div>{weather?(weather.main.temp * 9/5) + 32 : 0}</div>
                        </div>

                    </div>
                </div>
                <div>맑음</div>
            </div>
        </>
    )
}
