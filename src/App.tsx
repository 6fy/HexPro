import { useEffect, useState } from 'react'
import './App.scss'

enum Result {
	Correct,
	Incorrect
}

interface Provider {
    color: string,
    hide: boolean,
}

function App() {

	const [color, setColor] = useState<string>("red");

	const [answers, setAnswers] = useState<Provider[]>([]);

	const [result, setResult] = useState<Result | undefined>(undefined);

	const [incorrectAnswer, setIncorrectSelection] = useState<string | null>(null);

	const [guessCount, setGuessCount] = useState<number>(0);

	const [correctCounter, setCorrectGuessCount] = useState<number>(0);

	const [currentGuessCount, setCurrentGuessCount] = useState<number>(0);

	const [answersAmount, setAnswersAmount] = useState<number>(3);

	const [previousAnswer, setPreviousAnswer] = useState<string | null>(null);

	// Functions
	function generateRandomColor(): Provider {
		let randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

		// In any case, the color code is invalid
		if (randomColor.length != 7) {
			generateRandomColor();
		}

		let colorObject = {
			color: randomColor,
			hide: false
		}

    	return colorObject;
	}

	function checkAnswer(answer: string) {
		setPreviousAnswer(null);
		setIncorrectSelection(answer);
		setGuessCount(count => {
			return count + 1;
		});
		setCurrentGuessCount(count => {
			return count + 1;
		});

		// Incorrect answer
		if (answer !== color) {
			setResult(Result.Incorrect);
			return;
		}

		// Correct answer
		setResult(Result.Correct);
		setCorrectGuessCount(count => {
			return count + 1;
		});
		setCurrentGuessCount(0);

		// Generate new colors
		generateDefaultColor();
	}

	function changeAmount(amount: number) {
		let old = answersAmount;
		setAnswersAmount(amount);

		if (old > amount) {
			let newList = answers;
			
			newList.splice(newList.indexOf({
				color: color,
				hide: false
			}), 1);

			newList.splice(Math.floor(Math.random() * newList.length), 1);

			newList.push({
				color: color,
				hide: false
			});
			setAnswers(newList);
			return;
		}

		let newList = answers;
		newList.push(generateRandomColor());
		setAnswers(newList);
	}

	function newColor() {
		setCurrentGuessCount(0);
		setPreviousAnswer(color);
		generateDefaultColor();
	}

	// Automatically runs
	function generateDefaultColor() {
		let color = generateRandomColor();
		setColor(color.color);

		// Add to list
		let colorList = [color];

		for (let i = 0; i < (answersAmount - 1); i++) {
			colorList.push(generateRandomColor());
		}

		// Shuffle the colorList list
		setAnswers(colorList.sort(() => Math.random() - 0.5));
	}

	useEffect(() => { generateDefaultColor() }, []);

	return (
		<div className="App">
			<div id="resizable" className="guess-color-box-holder">
				<div className="help-buttons-holder">
					<button onClick={() => newColor()}>New color</button>
				</div>

				<div className="guess-color-box" style={{ background: color }}>
				</div>

				<div className="change-amount-holder">
					{answersAmount > 2 &&
						<button onClick={() => changeAmount(answersAmount - 1)}>-</button>
					}
					{answersAmount <= 2 &&
						<button className="unclickable">-</button>
					}

					<p>{answersAmount} Answers</p>

					{answersAmount < 6 &&
						<button onClick={() => changeAmount(answersAmount + 1)}>+</button>
					}
					{answersAmount >= 6 &&
						<button className="unclickable">+</button>
					}
				</div>
			</div>
			
			<div className="guess-buttons-holder">
				<div className="current-guess-counter">
					<p>You guessed { correctCounter }/{ guessCount } correctly!</p>
				</div> 

				{currentGuessCount != 0 && 
					<div className="current-guess-counter">
						<p>You tried to guess this color { currentGuessCount } time{ currentGuessCount <= 1 ? "" : "s" }!</p>
					</div> 
				}


				{
					answers.map((answer) =>
						<button key={answer.color} onClick={() => checkAnswer(answer.color)}>
							{answer.color}
						</button>
					)
				}

				{previousAnswer != null &&
					<div className="previous-answer">
						{ previousAnswer } was the color!
					</div> 
				}

				{ result === Result.Incorrect && 
					<div className="incorrect-answer">
						{ incorrectAnswer } is incorrect!
					</div> 
				}
				{ result === Result.Correct && 
					<div className="correct-answer">
						{ incorrectAnswer } is correct!
					</div> 
				}
			</div>

		</div>
	)
}

export default App
