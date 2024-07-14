import diService from '@/di';

function getNumbers() {
	const number = diService.cradle.randomNumberScoped;
	return number.randomNumber;
}

export function ScopedValue() {
	return <div>{getNumbers()}</div>;
}
