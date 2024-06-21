import { useEffect, useState } from 'react';
import './App.css';

const App = (props) => {
	const [course, setCourse] = useState(props.course);
	const [currency, setCurrency] = useState('RUB');

	const getResource = async (currency) => {
		if (currency != 'RUB') {
			let res = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');

			if (!res.ok) {
				throw new Error(`HTTP error!, status: ${res.status}`);
			}

			const data = await res.json();

			console.log(data.Valute[currency].Value);
			const sum = Math.round(course * data.Valute[currency].Value * 100) / 100;
			setCourse((course) => `${sum} ${currency}`);
		}
	};

	function getCurrCode(newCode) {
		setCourse(props.course);
		setCurrency(newCode);
	}

	useEffect(() => {
		getResource(currency);
	}, [currency]);

	function resetCourse() {
		setCourse(props.course);
	}

	const Initial = () => {
		return <div className='initial'>{props.course} рублей равно:</div>;
	};

	return (
		<div className='app'>
			{course !== props.course ? <Initial /> : null}
			<div className='course'>{course}</div>
			<div className='controls'>
				<button onClick={() => getCurrCode('USD')}>USD</button>
				<button onClick={() => getCurrCode('EUR')}>EUR</button>
				<button onClick={() => getCurrCode('GBP')}>GBP</button>
				<button onClick={() => resetCourse()}>RESET</button>
			</div>
		</div>
	);
};

export default App;
