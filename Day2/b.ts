import {readFileSync} from 'fs'

const input = readFileSync('./Day2/input.txt', 'utf-8');

const readings = input.split('\r\n')

var x = 0
var y = 0
var aim = 0
readings.forEach((reading) => {
	let number = Number(reading.charAt(reading.length - 1))
	let instruction = reading.slice(0, -2)
	switch (instruction) {
		case 'forward':
			y += aim * number
			x += number;
			break;
		case 'down':
			aim += number;
			break;
		case 'up':
			aim -= number;
			break;
	}
})

console.log(x*y);