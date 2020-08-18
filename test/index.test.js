import test from "ava";
import createCache from "../esm";

test("t1", async (t) => {
    const cache = createCache();

    function getValue(value = 0) {
        return 10 + value;
    }

    t.is(cache(getValue), 10);
    t.is(cache(getValue), 10);

    t.is(cache(getValue, 1), 11);
    t.is(cache(getValue, 1), 11);

    t.is(cache(getValue, 2), 12);
    t.is(cache(getValue, 2), 12);

    t.is(cache(getValue, 3), 13);
    t.is(cache(getValue, 3), 13);
});

test("t2", async (t) => {
    const map = new Map();
    const cache = createCache(map);

    function getValue(a, b) {
        return 10 + a + b;
    }

    t.is(cache(getValue, [1, 1]), 12);
    t.is(cache(getValue, [1, 1]), 12);

    t.is(cache(getValue, [1, 2]), 13);
    t.is(cache(getValue, [1, 2]), 13);

    t.is(cache(getValue, [1, 3]), 14);
    t.is(cache(getValue, [1, 3]), 14);

    t.is(map.get(getValue).size, 3);
});
