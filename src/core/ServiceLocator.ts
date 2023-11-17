export class ServiceLocator {
  private singletons: { [key: string]: any } = {};
  private lazySingletons: { [key: string]: any } = {};
  private types: { [key: string]: any } = {};

  registerSingleton<T>(key: string, instance: T): void {
    this.singletons[key] = instance;
  }

  registerLazySingleton<T>(key: string, getInstance: () => T): void {
    this.lazySingletons[key] = getInstance;
  }

  registerType<T>(key: string, getInstance: () => T): void {
    this.types[key] = getInstance;
  }

  resolve<T>(key: string): T {
    if (this.singletons[key]) {
			return this.singletons[key];
    }
		else if (this.lazySingletons[key]) {
			this.singletons[key] = this.lazySingletons[key]();
      delete this.lazySingletons[key];
			return this.singletons[key];
		}
		else if (this.types[key]) {
			return this.types[key]();
		}

		throw new Error(`Service with key ${key} not registered.`);
  }
}
