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
	const [amount, setAmount] = useState(props.amount);
	const [currency, setCurrency] = useState('RUB');

	function setCurrencyCode(newCode) {
		setCurrency(newCode);
	}

	function toogleCourse(data) {
		setAmount((course) => {
			return (
				Math.round((props.amount / data.Valute[currency].Value) * 100) / 100
			);
		});
	}

	useEffect(() => {
		if (currency !== 'RUB') {
			getResource()
				.then((res) => toogleCourse(res))
				.catch((error) => console.error('Ошибка при получении данных:', error));
		}
	}, [currency]);

	function resetCourse() {
		setAmount(props.amount);
	}

	return (
		<div className='app'>
			{amount !== props.amount ? (
				<div className='initial'>{props.amount} рублей равно:</div>
			) : (
				<div className='initial'>Введите сумму</div>
			)}
			<div className='course'>
				{amount} {currency}
			</div>
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
