// 날씨 정보가 보이게
// 화씨 -> 섭씨

import React from "react";

//props 대신 destrunturing(구조분해)
const WeatherBox = ({ weather }) => {
	return (
		<div className="Weather-box">
			<div>{weather?.name}</div>
			<h2 className="text-success h1">
				온도: {weather?.main.temp} ºC / 습도: {weather?.main.humidity} %
			</h2>
			<h3 className="text-info h2">
				{weather && weather.weather[0].description}
			</h3>
		</div>
	);
};

export default WeatherBox;
