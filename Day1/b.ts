import {readFileSync} from 'fs'

const input = readFileSync('./Day1/input.txt', 'utf-8');

const readings = input.split('\r\n')

let arrA: number[] = []
let arrB: number[] = []

let increment = 0

readings.forEach((reading: number | string, i) => {
	reading = Number(reading)
	
	if (i > 0){
		arrB.push(reading)
	}
	if (i > 3){
		arrA.shift()
		arrB.shift()
	}

	if (i > 2){
		const a = sumArray(arrA)
		const b = sumArray(arrB)
		if (a < b) increment++
	}
	arrA.push(reading)
})

function sumArray(array: number[]) {
	let sum: number = 0; 
	array.forEach(item => { sum += item})
	return sum
}

console.log(increment);

