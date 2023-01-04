import { readFileSync } from "fs"

const input = readFileSync("./Day3/input.txt", "utf-8")

const lineArray = input.split("\r\n")
function separateArrayOfBinariesBasedOnBit(arrayOfBinaries: string[]) {
	let arrayWithOne: string[] = []
	let arrayWithZero: string[] = []
	arrayOfBinaries.forEach((binary) => {
		if (binary[bitIndexSearch] === "1") {
			arrayWithOne.push(binary)
		} else {
			arrayWithZero.push(binary)
		}
	})
	bitIndexSearch++
	return [arrayWithOne, arrayWithZero]
}

var result = ""
function calculateRating(
	arrayWithOne: string[],
	arrayWithZero: string[],
	ratingType: "oxygen" | "cO2scrubber"
) {
	//Find the most common bit depending on the rating type
	var currentArray: string[] = []
	if (ratingType === "oxygen") {
		currentArray =
			arrayWithOne.length > arrayWithZero.length ? arrayWithOne : arrayWithZero
	} else if (ratingType === "cO2scrubber") {
		currentArray =
			arrayWithOne.length > arrayWithZero.length ? arrayWithZero : arrayWithOne
	}

	if (arrayWithOne.length === arrayWithZero.length) {
		currentArray = arrayWithZero
	}

	if (currentArray.length === 1) {
		result = currentArray[0]
		return
	}

	const [arr0, arr1] = separateArrayOfBinariesBasedOnBit(currentArray)

	calculateRating(arr0, arr1, ratingType)
}

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

//Execute the functions
let bitIndexSearch = 0
const [oneArray, zeroArray] = separateArrayOfBinariesBasedOnBit(lineArray)

calculateRating(oneArray, zeroArray, "oxygen")
const oxygenRating = result

bitIndexSearch = 1
calculateRating(oneArray, zeroArray, "cO2scrubber")
const cO2scrubberRating = result

console.log(
	convertToDecimal(Number(oxygenRating)) *
		convertToDecimal(Number(cO2scrubberRating))
)
