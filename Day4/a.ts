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

function playGame(drawsArray: string[], boardsArray: string[][][]) {
	var winnerBoard: string[][] = []
	var boardWon = false
	var lastDraw = ""

	drawsArray.forEach((draw) => {
		boardsArray.forEach((board) => {
			if (boardWon) {
				return
			}
			board.forEach((line, i) => {
				line.forEach((element, j) => {
					if (element == draw) {
						board[i][j] = "X"
					}
				})
			})
			if (
				determineIfBoardWonHorizontally(board) ||
				determineIfBoardWonVertically(board)
			) {
				boardWon = true
				winnerBoard = board
				lastDraw = draw
			}
		})
	})

	return { winnerBoard, lastDraw }
}

function determineIfBoardWonHorizontally(board: string[][]) {
	board.forEach((line) => {
		if (line.every((element) => element == "X")) {
			return true
		}
	})
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
