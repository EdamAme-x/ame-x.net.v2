export type asyncFunction<T = any> = () => Promise<T>;

export function useAsync<T = any>(fn: () => T): asyncFunction<T> {
    return async () => fn()
}