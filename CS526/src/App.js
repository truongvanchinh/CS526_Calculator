import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { AiOutlineHistory,AiOutlineSearch } from 'react-icons/ai';
import { faL } from '@fortawesome/free-solid-svg-icons';

function App() {
	const [calc,setCalc] = useState("");
	const [result,setResult] = useState("");

	const ops = ['/','*','+','-','.'];
	const updateCalc = value => {
		if(value=='.'){
			var reg = /\d+\.*\d*/g;
			var rs = calc.match(reg);
			if (rs!=null){
				for(let i of rs.slice(-1)[0]){
					if(i==".")
						return;
				}
			}
		}

		if (
			ops.includes(value) && calc === ''||
			ops.includes(value) && ops.includes(calc.slice(-1))
		)
			return;
		// value la nut minh ấn
		setCalc(calc + value);

		// if (!ops.includes(value))
		// {
		// 	setResult(eval(calc+value).toString());
		// }
	}

	const createDigits= () => {
		const digits = [];

		for (let i = 1; i < 10; i++)
		{
			digits.push(
				<button
					key={i}
					onClick={() => updateCalc(i.toString())} >
					{i}
				</button>
			)
		}
		return digits;
	}

	const calculate = () => {
		setResult(eval(calc).toString());
	}

	const deleteLast = () => {
		if(calc === '')
		{
			return;
		}

		// if (ops.includes(value.slice(-1))) {
		// 	setResult(eval(value.toString().slice(0,-1)));  
		// }
		// else{
		// 	setResult(eval(value.toString()));  
		// }

		const value = calc.slice(0,-1)
		setCalc(value);
	}

	const deleteAll = () => {
		if(calc === '')
		{
			return;
		}
		setCalc("");
	}

	return (
		<div className="App">
			<div className="calculator">

				<div className='nav'>
					<button className='nav__menu'>
						<span>History</span> 
						<i className='nav__icon'><AiOutlineHistory/></i> 
					</button>

					<div className='frame_history'>
						<div className='history__search'>
							<span  className="txt_search"><TextInput></TextInput></span>	
							<button className='history__search-item'>
								<span>Search</span> 
								<i className='nav__icon-search'><AiOutlineSearch/></i> 
							</button>
						</div>
						<div className='history__body'>
							
						</div>
					</div>
				</div>
				<div className="display">
					<TextInput value={calc} placeholder='Paste here!'
						onChangeText={calc => setCalc(calc)}>
					</TextInput>
					<div className='inputKey'> {calc || '0'} </div>  
					{<Text> {result} </Text>}
					
				</div>

				<div className="operator">
					<button onClick={() => updateCalc('/')}>/</button>
					<button onClick={() => updateCalc('*')}>*</button>
					<button onClick={() => updateCalc('+')}>+</button>
					<button onClick={() => updateCalc('-')}>-</button>
					
					<button onClick={deleteLast}>DEL</button>
					<button onClick={deleteAll}>AC</button>
				</div>

				<div className="digits">
					{createDigits()}
					<button onClick={() => updateCalc('0')}>0</button>
					<button onClick={() => updateCalc('.')}>.</button>
					<button onClick={calculate}>=</button>
				</div>
			</div>

		</div>
	);
}

export default App;
