import { useEffect, useState } from 'react';
import './App.css';

function useCounter() {
	const [counter, setCounter] = useState(null);
	const [initialCounter, setInitialCounter] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				'https://www.random.org/integers/?num=1&min=-50&max=50&col=1&base=10&format=plain&rnd=new'
			);
			const data = await response.json();
			setCounter(data);
			setInitialCounter(data);
		};
		fetchData();
	}, []);

	const incCounter = () => {
		if (counter < 50) {
			setCounter((counter) => counter + 1);
		}
	};

	const decCounter = () => {
		if (counter > -50) {
			setCounter((counter) => counter - 1);
		}
	};

	const rndCounter = () => {
		setCounter(+(Math.random() * (50 - -50) + -50).toFixed(0));
	};

	const resetCounter = () => {
		setCounter(initialCounter);
	};

	return {
		counter,
		initialCounter,
		incCounter,
		decCounter,
		rndCounter,
		resetCounter,
	};
}

const Counter = () => {
	const topCounter = useCounter();

	return (
		<div className='component'>
			<div className='counter'>{topCounter.counter}</div>
			<div className='controls'>
				<button onClick={topCounter.incCounter}>INC</button>
				<button onClick={topCounter.decCounter}>DEC</button>
				<button onClick={topCounter.rndCounter}>RND</button>
				<button onClick={topCounter.resetCounter}>RESET</button>
			</div>
		</div>
	);
};

const RndCounter = () => {
	const lowerCounter = useCounter();

	return (
		<div className='component'>
			<div className='counter'>{lowerCounter.counter}</div>
			<div className='controls'>
				<button onClick={lowerCounter.incCounter}>INC</button>
				<button onClick={lowerCounter.decCounter}>DEC</button>
				<button onClick={lowerCounter.rndCounter}>RND</button>
				<button onClick={lowerCounter.resetCounter}>RESET</button>
			</div>
		</div>
	);
};

const App = () => {
	return (
		<>
			<Counter />
			<RndCounter />
		</>
	);
};

export default App;
