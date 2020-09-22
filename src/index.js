const fill = [];

const error = Symbol("error");
/**
 * @param {any} value
 */
const regenerate = (value) => {
    if (value && typeof value == "object" && error in value) {
        throw value[error];
    }
    return value;
};

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
            return regenerate(ref.get(args));
        }
        if (isArgsArray) {
            for (const [memoArgs, memoValue] of ref) {
                if (isEqualArray(args, memoArgs)) return memoValue;
            }
        }
        if (isFn) {
            try {
                memoValue = isArgsArray ? id(...args) : id(args);
            } catch (e) {
                memoValue = { [error]: e };
            }
        } else {
            memoValue = args;
        }
        ref.set(args, memoValue);
        return regenerate(memoValue);
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
