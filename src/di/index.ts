import type { AwilixContainer } from 'awilix';
import { asClass, createContainer, Lifetime } from 'awilix';
import { AsyncLocalStorage } from 'async_hooks';
import { RandomNumber } from '@/lib/RandomNumber';

export type DiModules = {
	randomNumberScoped: RandomNumber;
	randomNumberSingleton: RandomNumber;
	randomNumberTransient: RandomNumber;
};

const diModules = {
	randomNumberScoped: asClass(RandomNumber, { lifetime: Lifetime.SCOPED }),
	randomNumberSingleton: asClass(RandomNumber, { lifetime: Lifetime.SINGLETON }),
	randomNumberTransient: asClass(RandomNumber, { lifetime: Lifetime.TRANSIENT }),
};

class DIService {
	public static instance: DIService = new this();

	private readonly _container: AwilixContainer<DiModules>;

	constructor() {
		console.log('registering di service');
		this._container = createContainer<DiModules>();
		this._container.register(diModules);
	}

	private initializeStorage() {
		//@ts-ignore
		if (!globalThis.scopedContainer) {
			//@ts-ignore
			globalThis.scopedContainer = new AsyncLocalStorage();
		}
	}

	private getContainer(): AwilixContainer<DiModules> {
		//@ts-ignore
		return globalThis.scopedContainer.getStore() ?? this._container;
	}

	createRequestScope(request: () => any) {
		this.initializeStorage();

		//@ts-ignore
		globalThis.scopedContainer.run(this._container.createScope(), request);
	}

	disposeRequestScope() {
		//@ts-ignore
		const store = globalThis.scopedContainer.getStore();

		if (store) {
			store.dispose();
		}
	}

	get rootContainer() {
		return this._container;
	}

	get container() {
		return this.getContainer();
	}

	get cradle() {
		return this.getContainer().cradle;
	}
}

const diService = DIService.instance;

export default diService;
