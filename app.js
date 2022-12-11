const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const board = document.querySelector('#board')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const colors = [
	'linear-gradient(90deg, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)',
	'linear-gradient(90deg, #d65cd2 0%, #b379b1 47%, #9c4999 100%)',
	'linear-gradient(90deg, #60d180 0%, #7bb38b 47%, #347d49 100%)',
	'linear-gradient(90deg, #94b85c 0%, #859668 47%, #59732f 100%)',
	'linear-gradient(90deg, #bfb55c 0%, #948f65 47%, #7a7437 100%)',
	'linear-gradient(90deg, #c96363 0%, #a67979 47%, #8a4949 100%)',
]
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
	event.preventDefault()
	screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'))
		screens[1].classList.add('up')
		startGame()
	}
})

board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++
		event.target.remove()
		createRandomCircle()
	}
})

function startGame() {
	setInterval(decreaseTime, 1000)
	createRandomCircle()
	setTime(time)
}

function decreaseTime() {
	if (time === 0) {
		finishGame()
	} else {
		let current = --time
		if (current < 10) {
			current = `0${current}`
		}
		setTime(current)
	}
}

function setTime(value) {
	timeEl.innerHTML = `00:${value}`
}

function finishGame() {
	timeEl.parentNode.classList.add('hide')
	board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
	const circle = document.createElement('div')
	const size = getRandomNumber(10, 60)
	const {width, height} = board.getBoundingClientRect()
	const x = getRandomNumber(0, width - size)
	const y = getRandomNumber(0, height - size)
	circle.style.background = getRandomColor()

	circle.classList.add('circle')
	circle.style.width = `${size}px`
	circle.style.height = `${size}px`
	circle.style.top = `${y}px`
	circle.style.left = `${x}px`

	board.append(circle)
}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
	const index = Math.floor(Math.random() * colors.length)
	return colors[index]
}

function winTheGame() {
	function kill() {
		const circle = document.querySelector('.circle')

		if (circle) {
			circle.click()
		}
	}

	setInterval(kill, 42)
}
