import { ScopedValue } from './_components/scopedValue';
import { SingletonValue } from './_components/singeltonValue';
import { TransienValue } from './_components/transientValue';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			Scoped val1: <ScopedValue />
			Scoped val2: <ScopedValue />
			singletonVal1: <SingletonValue />
			singletonVal2: <SingletonValue />
			transienVal1: <TransienValue />
			transienVal2: <TransienValue />
		</main>
	);
}
