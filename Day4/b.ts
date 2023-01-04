import { readFileSync } from "fs"

const input = readFileSync("./Day4/input.txt", "utf-8")

const lineArray = input.split("\r\n")

const draws = lineArray[0].split(",")

const { winnerBoard, lastDraw } = playGame(draws, parseBoards())
var unmarkedSum = 0
winnerBoard.forEach((line) => {
	line.forEach((element) => {
		if (!(element == "X")) {
			unmarkedSum += parseInt(element)
		}
	})
})

console.log(unmarkedSum * parseInt(lastDraw))

function playGame(drawsArray: string[], boardsArray: string[][][]) {
	type WinningObj = {
		winnerBoard: string[][]
		lastDraw: string
	}

	let winningObj: WinningObj = {
		winnerBoard: [],
		lastDraw: "",
	}
	const indexesOfWonBoards: number[] = []

	drawsArray.forEach((draw) => {
		boardsArray.forEach((board, i) => {
			if (indexesOfWonBoards.includes(i)) {
				return
			}

			board.forEach((line, j) => {
				line.forEach((element, p) => {
					if (element == draw) {
						board[j][p] = "X"
					}
				})
			})
			if (
				determineIfBoardWonHorizontally(board) ||
				determineIfBoardWonVertically(board)
			) {
				indexesOfWonBoards.push(i)
				winningObj = {
					winnerBoard: board,
					lastDraw: draw,
				}
			}
		})
	})

	return winningObj
}

function parseBoards() {
	var boards: string[][][] = []
	var currentBoard: string[][] = []
	const regex = /\b\d{1,2}\b/g
	lineArray.forEach((line, i) => {
		if (i < 2) return //Skip first two lines
		if (line == "") {
			//Is empty line
			boards.push(currentBoard)
			currentBoard = []
		} else {
			const numbers = line.match(regex)

			// Convert the numbers to an array of integers
			var numbersArray: string[] = []
			if (numbers) numbersArray = numbers.map((num) => num, 10)
			currentBoard.push(numbersArray)
		}
	})
	return boards
}

function determineIfBoardWonHorizontally(board: string[][]) {
	for (const line of board) {
		if (line.every((element) => element == "X")) {
			return true
		}
	}
	return false
}

function determineIfBoardWonVertically(board: string[][]) {
	for (let i = 0; i < board[0].length; i++) {
		var xCount = 0
		for (let j = 0; j < board.length; j++) {
			if (board[j][i] == "X") {
				xCount++
				if (xCount >= 5) {
					return true
				}
			} else {
				xCount = 0
			}
		}
	}
	return false
}
