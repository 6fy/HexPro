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
		generateDefaultColor();
	}

	// Automatically runs
	function generateDefaultColor() {
		let color = randomColor();
		setColor(color);

		let colorList = [color, randomColor(), randomColor()];
		// Shuffle the colorList list
		setAnswers(colorList.sort(() => Math.random() - 0.5));
	}

	useEffect(() => { generateDefaultColor() }, []);

	return (
		<div className="App">
			<div id="resizable" className="guess-color-box-holder">
				<div className="guess-color-box" style={{ background: color }}>
				</div>
			</div>
			
			<div className="guess-buttons-holder">
				<div className="current-guess-counter">
					<p>You have guessed { correctCounter }/{ guessCount } times correctly!</p>
				</div> 

				{currentGuessCount != 0 && 
					<div className="current-guess-counter">
						<p>You tried to guess this color { currentGuessCount } times!</p>
					</div> 
				}

				{
					answers.map(answer => (
						<button key={answer} onClick={() => checkAnswer(answer)}>
							{answer}
						</button>
					))
				}	

				{ result === Result.Incorrect && 
					<div className="incorrect-answer">
						{ incorrectAnswer } is an incorrect answer!
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
