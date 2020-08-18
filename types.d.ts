declare module "@uppercod/cache" {
    export default function createCache(
        cache?: Map<any, any>
    ): (id: any, args?: any) => any;
}
