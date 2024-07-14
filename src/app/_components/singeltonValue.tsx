import diService from '@/di';

function getNumbers() {
	const number = diService.cradle.randomNumberSingleton;
	return number.randomNumber;
}

export function SingletonValue() {
	return <div>{getNumbers()}</div>;
}
