import { useEffect, useState } from 'react'
import './App.scss'

enum Result {
	Correct,
	Incorrect
}

function App() {

	const [color, setColor] = useState<string>("red");

	const [answers, setAnswers] = useState<string[]>([]);

	const [result, setResult] = useState<Result | undefined>(undefined);

	const [incorrectAnswer, setIncorrectSelection] = useState<string | null>(null);

	const [guessCount, setGuessCount] = useState<number>(0);

	const [correctCounter, setCorrectGuessCount] = useState<number>(0);

	const [currentGuessCount, setCurrentGuessCount] = useState<number>(0);

	const [answersAmount, setAnswersAmount] = useState<number>(3);

	// Functions
	function randomColor(): string {
		return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
	}

	function checkAnswer(answer: string) {
		setIncorrectSelection(answer);
		setGuessCount(guessCount + 1);
		setCurrentGuessCount(currentGuessCount + 1);

		// Incorrect answer
		if (answer !== color) {
			setResult(Result.Incorrect);
			return;
		}

		// Correct answer
		setResult(Result.Correct);
		setCorrectGuessCount(correctCounter + 1);
		setCurrentGuessCount(0);

		// Generate new colors
		generateDefaultColor(false);
	}

	function changeAmount(amount: number) {
		let old = answersAmount;
		setAnswersAmount(amount);

		if (old > amount) {
			let newList = answers;
			newList.splice(newList.indexOf(color), 1);
			newList.splice(Math.floor(Math.random() * newList.length), 1);

			newList.push(color);
			setAnswers(newList);
			return;
		}

		let newList = answers;
		newList.push(randomColor());
		setAnswers(newList);
	}

	// Automatically runs
	function generateDefaultColor(silent: boolean) {
		let color = randomColor();
		setColor(color);

		// Add to list
		let colorList = [color];

		for (let i = 0; i < (answersAmount - 1); i++) {
			colorList.push(randomColor());
		}

		// Shuffle the colorList list
		setAnswers(colorList.sort(() => Math.random() - 0.5));
	}

	useEffect(() => { generateDefaultColor(false) }, []);

	return (
		<div className="App">
			<div id="resizable" className="guess-color-box-holder">
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
						<button key={answer} onClick={() => checkAnswer(answer)}>
							{answer}
						</button>
					)
				}	

				{ result === Result.Incorrect && 
					<div className="incorrect-answer">
						{ incorrectAnswer } incorrect!
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
