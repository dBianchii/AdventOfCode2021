import {readFileSync} from 'fs'

const input = readFileSync('./Day1/input.txt', 'utf-8');

const readings = input.split('\r\n')

let previous = 0
let increments = 0
readings.forEach((reading: number | string) => {
	reading = Number(reading)

	if (previous < reading){
		increments++
	}
	previous = reading
})
increments--

console.log(increments);