# cache

This script creates an in-memory cache that allows:

1. The callback execution when regenerating the arguments.
2. Use references to return arguments.

## install

```
npm install cache
```

## Usage

Suppose that part was a high-cost process, such as template rendering or an asynchronous call.

```js
import createCache from "@uppercod/cache";

const cache = createCache();

function parse(code = "") {
    return code.split(/ */);
}
/**
 * the Cache function will only memorize the first execution, since there is no second parameter.
 */
const value1 = cache(parse);
/**
 * The cache function will memorize the execution of the function based on the second parameter.
 **/
const value2 = cache(parse, "my-code");
/**
 * The cache function memorizes the execution of the function based on the arguments of the second parameter.
 **/
const value3 = cache(parse, ["my-code"]);
```
