import { readFileSync } from "fs"

const input = readFileSync("./Day3/input.txt", "utf-8")

const lineArray = input.split("\r\n")

let arrayOfMostCommon: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
lineArray.forEach((binary) => {
	for (let i = 0; i < binary.length; i++) {
		const bit = binary[i]
		if (bit === "1") {
			arrayOfMostCommon[i]++
		} else {
			arrayOfMostCommon[i]--
		}
	}
})

const gammaArray = arrayOfMostCommon.map((num) => {
	if (num > 0) {
		return 1
	} else {
		return 0
	}
})

//convert gamma to number
const gamma = gammaArray.join("")

//Invert gammaArray
const epsilon = gammaArray.map((num) => (num === 1 ? 0 : 1)).join("")

function convertToDecimal(binary: number) {
	let decimal = 0
	let n = 0
	while (binary != 0) {
		let remainder = binary % 10
		binary = Math.floor(binary / 10)
		decimal += remainder * Math.pow(2, n)
		n++
	}
	return decimal
}

console.log(convertToDecimal(Number(gamma)) * convertToDecimal(Number(epsilon)))
