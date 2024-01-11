export type CacheContext<X = any> = {
	data: X;
	exp: number;
};

export class useCache {
	private prefix = "_cache_";

	constructor(public key: string) {}

	private createContext<K = any>(data: K, exp: number): CacheContext<K> {
		return {
			data,
			exp: Date.now() + exp
		};
	}

	private isExist(key: string): boolean {
		return localStorage.getItem(this.prefix + key) !== null;
	}

	private async updateCache<T>(getData: () => T, exp: number): Promise<T> {
		localStorage.removeItem(this.prefix + this.key);
		const data = getData();
		localStorage.setItem(this.prefix + this.key, JSON.stringify(this.createContext(data, exp)));
		return data;
	}

	private updateCacheSync<T>(getData: () => T, exp: number): T {
		localStorage.removeItem(this.prefix + this.key);
		const data = getData();
		localStorage.setItem(this.prefix + this.key, JSON.stringify(this.createContext(data, exp)));
		return data;
	}

	private compareExp(exp: number) {
		return Date.now() > exp;
	}

	async set<T = any>(getData: () => Promise<T>, exp: number = 12 * 60 * 60 * 1000): Promise<T> {
		if (this.isExist(this.key)) {
			const cacheContext: ReturnType<typeof this.createContext<T>> = JSON.parse(
				localStorage.getItem(this.prefix + this.key) as string
			);

			if (this.compareExp(cacheContext.exp)) {
				return this.updateCache(getData, exp);
			}

			return cacheContext.data;
		}

		const data = await getData();
		localStorage.setItem(this.prefix + this.key, JSON.stringify(this.createContext(data, exp)));
		return data;
	}

	setSync<T = any>(getData: () => T, exp: number = 12 * 60 * 60 * 1000): T {
		if (this.isExist(this.key)) {
			const cacheContext: ReturnType<typeof this.createContext<T>> = JSON.parse(
				localStorage.getItem(this.prefix + this.key) as string
			);

			if (this.compareExp(cacheContext.exp)) {
				return this.updateCacheSync(getData, exp);
			}

			return cacheContext.data;
		}

		const data = getData();
		localStorage.setItem(this.prefix + this.key, JSON.stringify(this.createContext(data, exp)));
		return data;
	}

	async get<T = any>(): Promise<T | null> {
		if (!this.isExist(this.key)) {
			return null;
		}
		return JSON.parse(localStorage.getItem(this.prefix + this.key) as string).data;
	}

	getSync<T = any>(): T | null {
		if (!this.isExist(this.key)) {
			return null;
		}
		return JSON.parse(localStorage.getItem(this.prefix + this.key) as string).data;
	}

	async remove(): Promise<void> {
		localStorage.removeItem(this.prefix + this.key);
	}

	removeSync(): void {
		localStorage.removeItem(this.prefix + this.key);
	}
}
