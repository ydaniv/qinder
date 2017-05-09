/**
 * Takes a source URL and returns a Promise that resolves
 * once the image's load or error events trigger.
 *
 * If the image loads successfully it resolves with the
 * given source URL.
 *
 * If the image fails to load it will resolve with `false`.
 *
 * @param src {string} - Source URL for the image to load.
 * @returns {Promise} - Promise containing the future result of the source URL.
 */
function load (src) {
    return new Promise(
        function (resolve, reject) {
            let img = new Image();

            // image is not in cache so set a resolving handlers on its events
            img.onload = function () {
                // clear the memory and resolve the promise
                img = null;
                // true for success
                resolve(src);
            };

            img.onerror = function () {
                // clear the memory and resolve the promise
                img = null;
                // false for error
                resolve(false);
            };

            // set the `src`
            img.src = src;
        });
}

/**
 * Maps an Array of source URLs to a Promise that resolves
 * once all load or error events of the corresponding images
 * have triggered.
 *
 * Resolves with an Array of corresponding values from {@see load}.
 *
 * @param srcs {string[]} - Array of source URLs.
 * @returns {Promise} - Promise containing the future results of source URLs.
 */
function map (srcs) {
    return Promise.All(srcs.map(load));
}

export { load, map }
