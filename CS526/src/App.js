import { useState } from 'react';
import { Text, TextInput, View, Button, FlatList } from 'react-native';
import { AiOutlineHistory,AiOutlineSearch } from 'react-icons/ai';
import { faL } from '@fortawesome/free-solid-svg-icons';

function App() {
	const [calc,setCalc] = useState("");
	const [result,setResult] = useState("");
	const [history, setHistory]= useState([]);
	const [searchResult, setSearchResult] = useState([]);
	const [searchInput, setSearchInput] = useState('');
	
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
		if(ops.includes(calc.slice(-1))){
			return;	
		}
		setResult(eval(calc).toString());
		onCalculateButtonPress()
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

	// Calc is the expression, result is the result
	// Pressing the = button will calculate the expression and save it in the history array
	const onCalculateButtonPress = () => {
		try {
			var z = eval(calc);
			setResult(eval(calc).toString());
			var his = history;
			his.push( {
				id: 'history-item' + his.length,
				expression: calc,
				result: z
			});
			setHistory(his);
			setSearchResult(his);
			console.log("history hien tai la ", history);
		} catch (e){
		setResult("");
	  }
	}

	// Function để hiện lên kết quả search bằng Text và có background
	const showSearchResultItem = (item) => {
		return (
			<View style={{backgroundColor: "#ccc",marginBottom:"4px",marginTop:"4px", width: "100%"}}>
				<Text style={{fontSize: 20, color: "red", width: "100%"}}>{item.item.expression} = {item.item.result}</Text>
			</View>
		)
	}
	var indexBug = 1;
	// Hiện History và ô Search
	const showHistoryAndSearch = () => {
		console.log('bug' + indexBug)
		indexBug++;
		var x = document.querySelector(".frame_history") //có thể do lệnh này dẫn đến lỗi phải click 2 lần. 
		if (x.style.display === "none")
			x.style.display = "block";
		else
			x.style.display = "none";
	}
	
	return (
		<div className="App">
			<div className="calculator">

				<div className='nav'>
					<button className='nav__menu' onClick={() => showHistoryAndSearch()}>
						<span>History</span> 
						<i className='nav__icon'><AiOutlineHistory/></i> 
					</button>

					<div  className='frame_history'>
						<div className='history__search'>
							{/* To do : Làm đc hàm search ở trong text input và thể hiện nó trong history body */}
							<span className="txt_search">
								<TextInput
									placeholder='Type to search...'
									onChangeText={input => {
										var x = history.filter((value, index, arr) => 
										{
											return value.expression.includes(input) || value.result.toString().includes(input);
										} );
									console.log(" Ket qua search la " , x);
									setSearchResult(x);
								}}/>	
							</span>	
						</div>

						<div className='history__body'>
							<FlatList style={{width:"100%"}}
								data={searchResult}
								renderItem = {showSearchResultItem}
								keyExtractor = { (item) => item.id }
							/>
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
