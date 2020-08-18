const fill = [];

export default function createCache(cache = new Map()) {
    return function (id, args = fill) {
        if (!cache.has(id)) {
            cache.set(id, new Map());
        }
        let memoValue;
        const ref = cache.get(id);
        const isFn = typeof id == "function";
        const isArgsArray = Array.isArray(args);
        if (ref.has(args)) {
            return ref.get(args);
        }
        if (isArgsArray) {
            for (const [memoArgs, memoValue] of ref) {
                if (isEqualArray(args, memoArgs)) return memoValue;
            }
        }
        if (isFn) {
            memoValue = isArgsArray ? id(...args) : id(args);
        } else {
            memoValue = args;
        }
        ref.set(args, memoValue);
        return memoValue;
    };
}

/**
 * compare 2 array
 * ```js
 * isEqualArray([1,2,3,4],[1,2,3,4]) // true
 * isEqualArray([1,2,3,4],[1,2,3])   // false
 * isEqualArray([5,1,2,3],[1,2,3,5]) // false
 * isEqualArray([],[]) // true
 * ```
 * @param {any[]} before
 * @param {any[]} after
 * @returns {boolean}
 */
function isEqualArray(before, after) {
    let length = before.length;
    if (length !== after.length) return false;
    for (let i = 0; i < length; i++) {
        if (before[i] !== after[i]) return false;
    }
    return true;
}
