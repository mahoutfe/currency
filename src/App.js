import { useEffect, useState } from 'react';
import './App.css';

const getResource = async (currency) => {
	let res = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');

	if (!res.ok) {
		throw new Error(`HTTP error!, status: ${res.status}`);
	}

	const data = await res.json();

	return data;
};

const App = (props) => {
	const [course, setCourse] = useState(props.course);
	const [currency, setCurrency] = useState('RUB');

	function setCurrencyCode(newCode) {
		setCourse(props.course);
		setCurrency(newCode);
	}

	function toogleCourse(data, currency) {
		setCourse(
			(course) =>
				`${
					Math.round(course * data.Valute[currency].Value * 100) / 100
				} ${currency}`
		);
	}

	useEffect(() => {
		if (currency !== 'RUB') {
			getResource()
				.then((res) => toogleCourse(res, currency))
				.catch((error) => console.error('Ошибка при получении данных:', error));
		}
	}, [currency]);

	function resetCourse() {
		setCourse(props.course);
	}

	return (
		<div className='app'>
			{course !== props.course ? (
				<div className='initial'>{props.course} рублей равно:</div>
			) : (
				<div className='initial'>Введите сумму</div>
			)}
			<div className='course'>{course}</div>
			<div className='controls'>
				<button onClick={() => setCurrencyCode('USD')}>USD</button>
				<button onClick={() => setCurrencyCode('EUR')}>EUR</button>
				<button onClick={() => setCurrencyCode('GBP')}>GBP</button>
				<button onClick={() => resetCourse()}>RESET</button>
			</div>
		</div>
	);
};

export default App;
