import diService from '@/di';

function getNumbers() {
	const number = diService.container.resolve('randomNumberTransient');
	return number.randomNumber;
}

export function TransienValue() {
	return <div>{getNumbers()}</div>;
}
