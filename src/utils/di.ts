interface Target<T> {
    new(...args: any[]): T
}

class Cache {
    private static MetaDataKey = Symbol("__cacheKey")

    // set metadata property on the target class
    public static SetCacheKey<T>(target: Target<T>) {
        const symbol = Symbol()
        Reflect.defineMetadata(Cache.MetaDataKey, symbol, target)
    }

    // get metadata property on the target class
    public static GetCacheKey<T>(target: Target<T>): symbol | null {
        const reflectCacheKey = Reflect.getMetadata(Cache.MetaDataKey, target)
        return reflectCacheKey
    }

    private storage = new Map<symbol, unknown>()

    // store the target instance in storage if it's key does not exist already
    public store<T>(target: Target<T>, instance: T): void {
        const cacheKey = Cache.GetCacheKey(target)

        if (!cacheKey) return

        if (!this.storage.has(cacheKey)) {
            this.storage.set(cacheKey, instance)
        }
    }

    // retrieve the target instance from storage if it's key exist
    public retrieve<T>(target: Target<T>): T | null {
        const cacheKey = Cache.GetCacheKey(target)

        if (!cacheKey) return null

        return this.storage.get(cacheKey) as T || null
    }
}

class DIContainer {
    private cache: Cache

    constructor() {
        this.cache = new Cache()
    }

    // resolving instances
    resolve<T>(target: Target<T>): T {
        // get target dependencies
        const dependencies: Target<any>[] =
            Reflect.getMetadata("design:paramtypes", target) || []

        // retrieve from cache and return early to avoid refetching dependencies and creating a new instances
        const cached = this.cache.retrieve(target)
        if (cached) return cached

        // recursively resolve dependencies
        const injections = dependencies.map((dependency) =>
            this.resolve(dependency)
        )

        // create new instance with resolved dependencies
        const instance = new target(...injections)

        // store in cache
        this.cache.store(target, instance)

        return instance
    }
}

// singleton instance of DI Container
export const Container = new DIContainer()

// decorates classes as singletons
export function Inject() {
    return (target: Target<object>) => {
        // register in cache
        Cache.SetCacheKey(target)
    }
}
