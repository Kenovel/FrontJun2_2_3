/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import styles from './app.module.css';

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

function App() {
	const [operand1, setOperand1] = useState('0');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');
	const [isResult, setIsResult] = useState(false);
	const screenText = operand1 + operator + operand2;
	const result = () => {
		if (operand2 === '') return operand1;
		else
			switch (operator) {
				case '-':
					return Number(operand1) - Number(operand2);
				case '+':
					return Number(operand1) + Number(operand2);
				default: //Ничего
			}
	};

	const NumberButtonElement = (number) => {
		return (
			<button
				className={styles.button}
				key={number}
				onClick={() => {
					if (operator === '') {
						if (operand1 === '0' || isResult) setOperand1(number);
						else if (operand1 !== '0') setOperand1(operand1 + number);
					} else {
						if (operand2 === '0') setOperand2(number);
						else setOperand2(operand2 + number);
					}

					setIsResult(false);
				}}
			>
				{number}
			</button>
		);
	};

	const reset = () => {
		setOperand1('0');
		setOperand2('');
		setOperator('');
		setIsResult(false);
	};

	const minus = () => {
		if (operand2 !== '') {
			setOperand1(result());
			setOperand2('');
			setOperator('-');
		} else setOperator('-');
		setIsResult(false);
	};

	const plus = () => {
		if (operand2 !== '') {
			setOperand1(result());
			setOperand2('');
			setOperator('+');
		} else setOperator('+');
		setIsResult(false);
	};

	const resolve = () => {
		setOperand1(result());
		setOperand2('');
		setOperator('');
		setIsResult(true);
	};

	return (
		<div className={styles.app}>
			<div className={`${styles.screen} ${isResult ? styles.resultScreen : ''}`}>
				{screenText}
			</div>
			<div className={styles.buttons}>
				<div className={styles.leftGroup}>
					{numbers.map((number) => NumberButtonElement(number))}
				</div>
				<div className={styles.rightGroup}>
					<button className={styles.button} onClick={() => reset()}>
						C
					</button>
					<button className={styles.button} onClick={() => minus()}>
						-
					</button>
					<button className={styles.button} onClick={() => plus()}>
						+
					</button>
					<button className={styles.button} onClick={() => resolve()}>
						=
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
