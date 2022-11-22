import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import ClockLoader from "react-spinners/ClockLoader";

function App() {
	const [weather, setWeather] = useState(null);
	const [city, setCity] = useState("");
	const [loading, setLoading] = useState(true);
	const cities = ["LON", "LIS", "SEL", "PAR", "TYO"];

	const getCurrentLocation = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			let lat = position.coords.latitude;
			let lon = position.coords.longitude;
			getWeatherByCurrentLocation(lat, lon);
		});
	};

	const getWeatherByCurrentLocation = async (lat, lon) => {
		let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=83aeb80a15d50ee7a248d29575f07e8d&units=metric`; //섭시로 바꿔줌
		setLoading(true);
		let response = await fetch(url);
		let data = await response.json();
		setWeather(data);
		setLoading(false);
	};

	const getWeatherByCity = async () => {
		let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=83aeb80a15d50ee7a248d29575f07e8d&units=metric`;
		setLoading(true);
		let response = await fetch(url);
		let data = await response.json();
		setWeather(data);
		setLoading(false);
	};

	useEffect(() => {
		getCurrentLocation();
	}, []);

	const handleCityChange = (city) => {
		if (city === "current") {
			setCity("");
		} else {
			setCity(city);
		}
	};
	useEffect(() => {
		if (city === "") {
			getCurrentLocation();
		} else {
			getWeatherByCity();
		}
		console.log("선택한 도시는?", city);
	}, [city]);

	return (
		<>
			{loading ? (
				<div className="container">
					<ClockLoader
						color="orange"
						size={200}
						loading={loading}
						aria-label="Loading Spinner"
						data-testied="loader"
					/>
				</div>
			) : (
				<div className="container">
					<WeatherBox weather={weather} />
					<WeatherButton
						cities={cities}
						setCity={setCity}
						selectedCity={city}
					/>
				</div>
			)}
		</>
	);
}

export default App;
