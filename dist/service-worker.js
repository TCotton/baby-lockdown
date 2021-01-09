// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/workbox-core/_version.js":[function(require,module,exports) {
"use strict";
// @ts-ignore
try {
    self['workbox:core:6.0.2'] && _();
}
catch (e) { }

},{}],"node_modules/workbox-core/models/messages/messages.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = void 0;

require("../../_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const messages = {
  'invalid-value': ({
    paramName,
    validValueDescription,
    value
  }) => {
    if (!paramName || !validValueDescription) {
      throw new Error(`Unexpected input to 'invalid-value' error.`);
    }

    return `The '${paramName}' parameter was given a value with an ` + `unexpected value. ${validValueDescription} Received a value of ` + `${JSON.stringify(value)}.`;
  },
  'not-an-array': ({
    moduleName,
    className,
    funcName,
    paramName
  }) => {
    if (!moduleName || !className || !funcName || !paramName) {
      throw new Error(`Unexpected input to 'not-an-array' error.`);
    }

    return `The parameter '${paramName}' passed into ` + `'${moduleName}.${className}.${funcName}()' must be an array.`;
  },
  'incorrect-type': ({
    expectedType,
    paramName,
    moduleName,
    className,
    funcName
  }) => {
    if (!expectedType || !paramName || !moduleName || !funcName) {
      throw new Error(`Unexpected input to 'incorrect-type' error.`);
    }

    return `The parameter '${paramName}' passed into ` + `'${moduleName}.${className ? className + '.' : ''}` + `${funcName}()' must be of type ${expectedType}.`;
  },
  'incorrect-class': ({
    expectedClass,
    paramName,
    moduleName,
    className,
    funcName,
    isReturnValueProblem
  }) => {
    if (!expectedClass || !moduleName || !funcName) {
      throw new Error(`Unexpected input to 'incorrect-class' error.`);
    }

    if (isReturnValueProblem) {
      return `The return value from ` + `'${moduleName}.${className ? className + '.' : ''}${funcName}()' ` + `must be an instance of class ${expectedClass.name}.`;
    }

    return `The parameter '${paramName}' passed into ` + `'${moduleName}.${className ? className + '.' : ''}${funcName}()' ` + `must be an instance of class ${expectedClass.name}.`;
  },
  'missing-a-method': ({
    expectedMethod,
    paramName,
    moduleName,
    className,
    funcName
  }) => {
    if (!expectedMethod || !paramName || !moduleName || !className || !funcName) {
      throw new Error(`Unexpected input to 'missing-a-method' error.`);
    }

    return `${moduleName}.${className}.${funcName}() expected the ` + `'${paramName}' parameter to expose a '${expectedMethod}' method.`;
  },
  'add-to-cache-list-unexpected-type': ({
    entry
  }) => {
    return `An unexpected entry was passed to ` + `'workbox-precaching.PrecacheController.addToCacheList()' The entry ` + `'${JSON.stringify(entry)}' isn't supported. You must supply an array of ` + `strings with one or more characters, objects with a url property or ` + `Request objects.`;
  },
  'add-to-cache-list-conflicting-entries': ({
    firstEntry,
    secondEntry
  }) => {
    if (!firstEntry || !secondEntry) {
      throw new Error(`Unexpected input to ` + `'add-to-cache-list-duplicate-entries' error.`);
    }

    return `Two of the entries passed to ` + `'workbox-precaching.PrecacheController.addToCacheList()' had the URL ` + `${firstEntry._entryId} but different revision details. Workbox is ` + `unable to cache and version the asset correctly. Please remove one ` + `of the entries.`;
  },
  'plugin-error-request-will-fetch': ({
    thrownError
  }) => {
    if (!thrownError) {
      throw new Error(`Unexpected input to ` + `'plugin-error-request-will-fetch', error.`);
    }

    return `An error was thrown by a plugins 'requestWillFetch()' method. ` + `The thrown error message was: '${thrownError.message}'.`;
  },
  'invalid-cache-name': ({
    cacheNameId,
    value
  }) => {
    if (!cacheNameId) {
      throw new Error(`Expected a 'cacheNameId' for error 'invalid-cache-name'`);
    }

    return `You must provide a name containing at least one character for ` + `setCacheDetails({${cacheNameId}: '...'}). Received a value of ` + `'${JSON.stringify(value)}'`;
  },
  'unregister-route-but-not-found-with-method': ({
    method
  }) => {
    if (!method) {
      throw new Error(`Unexpected input to ` + `'unregister-route-but-not-found-with-method' error.`);
    }

    return `The route you're trying to unregister was not  previously ` + `registered for the method type '${method}'.`;
  },
  'unregister-route-route-not-registered': () => {
    return `The route you're trying to unregister was not previously ` + `registered.`;
  },
  'queue-replay-failed': ({
    name
  }) => {
    return `Replaying the background sync queue '${name}' failed.`;
  },
  'duplicate-queue-name': ({
    name
  }) => {
    return `The Queue name '${name}' is already being used. ` + `All instances of backgroundSync.Queue must be given unique names.`;
  },
  'expired-test-without-max-age': ({
    methodName,
    paramName
  }) => {
    return `The '${methodName}()' method can only be used when the ` + `'${paramName}' is used in the constructor.`;
  },
  'unsupported-route-type': ({
    moduleName,
    className,
    funcName,
    paramName
  }) => {
    return `The supplied '${paramName}' parameter was an unsupported type. ` + `Please check the docs for ${moduleName}.${className}.${funcName} for ` + `valid input types.`;
  },
  'not-array-of-class': ({
    value,
    expectedClass,
    moduleName,
    className,
    funcName,
    paramName
  }) => {
    return `The supplied '${paramName}' parameter must be an array of ` + `'${expectedClass}' objects. Received '${JSON.stringify(value)},'. ` + `Please check the call to ${moduleName}.${className}.${funcName}() ` + `to fix the issue.`;
  },
  'max-entries-or-age-required': ({
    moduleName,
    className,
    funcName
  }) => {
    return `You must define either config.maxEntries or config.maxAgeSeconds` + `in ${moduleName}.${className}.${funcName}`;
  },
  'statuses-or-headers-required': ({
    moduleName,
    className,
    funcName
  }) => {
    return `You must define either config.statuses or config.headers` + `in ${moduleName}.${className}.${funcName}`;
  },
  'invalid-string': ({
    moduleName,
    funcName,
    paramName
  }) => {
    if (!paramName || !moduleName || !funcName) {
      throw new Error(`Unexpected input to 'invalid-string' error.`);
    }

    return `When using strings, the '${paramName}' parameter must start with ` + `'http' (for cross-origin matches) or '/' (for same-origin matches). ` + `Please see the docs for ${moduleName}.${funcName}() for ` + `more info.`;
  },
  'channel-name-required': () => {
    return `You must provide a channelName to construct a ` + `BroadcastCacheUpdate instance.`;
  },
  'invalid-responses-are-same-args': () => {
    return `The arguments passed into responsesAreSame() appear to be ` + `invalid. Please ensure valid Responses are used.`;
  },
  'expire-custom-caches-only': () => {
    return `You must provide a 'cacheName' property when using the ` + `expiration plugin with a runtime caching strategy.`;
  },
  'unit-must-be-bytes': ({
    normalizedRangeHeader
  }) => {
    if (!normalizedRangeHeader) {
      throw new Error(`Unexpected input to 'unit-must-be-bytes' error.`);
    }

    return `The 'unit' portion of the Range header must be set to 'bytes'. ` + `The Range header provided was "${normalizedRangeHeader}"`;
  },
  'single-range-only': ({
    normalizedRangeHeader
  }) => {
    if (!normalizedRangeHeader) {
      throw new Error(`Unexpected input to 'single-range-only' error.`);
    }

    return `Multiple ranges are not supported. Please use a  single start ` + `value, and optional end value. The Range header provided was ` + `"${normalizedRangeHeader}"`;
  },
  'invalid-range-values': ({
    normalizedRangeHeader
  }) => {
    if (!normalizedRangeHeader) {
      throw new Error(`Unexpected input to 'invalid-range-values' error.`);
    }

    return `The Range header is missing both start and end values. At least ` + `one of those values is needed. The Range header provided was ` + `"${normalizedRangeHeader}"`;
  },
  'no-range-header': () => {
    return `No Range header was found in the Request provided.`;
  },
  'range-not-satisfiable': ({
    size,
    start,
    end
  }) => {
    return `The start (${start}) and end (${end}) values in the Range are ` + `not satisfiable by the cached response, which is ${size} bytes.`;
  },
  'attempt-to-cache-non-get-request': ({
    url,
    method
  }) => {
    return `Unable to cache '${url}' because it is a '${method}' request and ` + `only 'GET' requests can be cached.`;
  },
  'cache-put-with-no-response': ({
    url
  }) => {
    return `There was an attempt to cache '${url}' but the response was not ` + `defined.`;
  },
  'no-response': ({
    url,
    error
  }) => {
    let message = `The strategy could not generate a response for '${url}'.`;

    if (error) {
      message += ` The underlying error is ${error}.`;
    }

    return message;
  },
  'bad-precaching-response': ({
    url,
    status
  }) => {
    return `The precaching request for '${url}' failed` + (status ? ` with an HTTP status of ${status}.` : `.`);
  },
  'non-precached-url': ({
    url
  }) => {
    return `createHandlerBoundToURL('${url}') was called, but that URL is ` + `not precached. Please pass in a URL that is precached instead.`;
  },
  'add-to-cache-list-conflicting-integrities': ({
    url
  }) => {
    return `Two of the entries passed to ` + `'workbox-precaching.PrecacheController.addToCacheList()' had the URL ` + `${url} with different integrity values. Please remove one of them.`;
  },
  'missing-precache-entry': ({
    cacheName,
    url
  }) => {
    return `Unable to find a precached response in ${cacheName} for ${url}.`;
  },
  'cross-origin-copy-response': ({
    origin
  }) => {
    return `workbox-core.copyResponse() can only be used with same-origin ` + `responses. It was passed a response with origin ${origin}.`;
  }
};
exports.messages = messages;
},{"../../_version.js":"node_modules/workbox-core/_version.js"}],"node_modules/workbox-core/models/messages/messageGenerator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageGenerator = void 0;

var _messages = require("./messages.js");

require("../../_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const fallback = (code, ...args) => {
  let msg = code;

  if (args.length > 0) {
    msg += ` :: ${JSON.stringify(args)}`;
  }

  return msg;
};

const generatorFunction = (code, details = {}) => {
  const message = _messages.messages[code];

  if (!message) {
    throw new Error(`Unable to find message for code '${code}'.`);
  }

  return message(details);
};

const messageGenerator = "development" === 'production' ? fallback : generatorFunction;
exports.messageGenerator = messageGenerator;
},{"./messages.js":"node_modules/workbox-core/models/messages/messages.js","../../_version.js":"node_modules/workbox-core/_version.js"}],"node_modules/workbox-core/_private/WorkboxError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkboxError = void 0;

var _messageGenerator = require("../models/messages/messageGenerator.js");

require("../_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Workbox errors should be thrown with this class.
 * This allows use to ensure the type easily in tests,
 * helps developers identify errors from workbox
 * easily and allows use to optimise error
 * messages correctly.
 *
 * @private
 */
class WorkboxError extends Error {
  /**
   *
   * @param {string} errorCode The error code that
   * identifies this particular error.
   * @param {Object=} details Any relevant arguments
   * that will help developers identify issues should
   * be added as a key on the context object.
   */
  constructor(errorCode, details) {
    const message = (0, _messageGenerator.messageGenerator)(errorCode, details);
    super(message);
    this.name = errorCode;
    this.details = details;
  }

}

exports.WorkboxError = WorkboxError;
},{"../models/messages/messageGenerator.js":"node_modules/workbox-core/models/messages/messageGenerator.js","../_version.js":"node_modules/workbox-core/_version.js"}],"node_modules/workbox-core/_private/assert.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assert = void 0;

var _WorkboxError = require("../_private/WorkboxError.js");

require("../_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/*
 * This method throws if the supplied value is not an array.
 * The destructed values are required to produce a meaningful error for users.
 * The destructed and restructured object is so it's clear what is
 * needed.
 */
const isArray = (value, details) => {
  if (!Array.isArray(value)) {
    throw new _WorkboxError.WorkboxError('not-an-array', details);
  }
};

const hasMethod = (object, expectedMethod, details) => {
  const type = typeof object[expectedMethod];

  if (type !== 'function') {
    details['expectedMethod'] = expectedMethod;
    throw new _WorkboxError.WorkboxError('missing-a-method', details);
  }
};

const isType = (object, expectedType, details) => {
  if (typeof object !== expectedType) {
    details['expectedType'] = expectedType;
    throw new _WorkboxError.WorkboxError('incorrect-type', details);
  }
};

const isInstance = (object, expectedClass, details) => {
  if (!(object instanceof expectedClass)) {
    details['expectedClass'] = expectedClass;
    throw new _WorkboxError.WorkboxError('incorrect-class', details);
  }
};

const isOneOf = (value, validValues, details) => {
  if (!validValues.includes(value)) {
    details['validValueDescription'] = `Valid values are ${JSON.stringify(validValues)}.`;
    throw new _WorkboxError.WorkboxError('invalid-value', details);
  }
};

const isArrayOfClass = (value, expectedClass, details) => {
  const error = new _WorkboxError.WorkboxError('not-array-of-class', details);

  if (!Array.isArray(value)) {
    throw error;
  }

  for (const item of value) {
    if (!(item instanceof expectedClass)) {
      throw error;
    }
  }
};

const finalAssertExports = "development" === 'production' ? null : {
  hasMethod,
  isArray,
  isInstance,
  isOneOf,
  isType,
  isArrayOfClass
};
exports.assert = finalAssertExports;
},{"../_private/WorkboxError.js":"node_modules/workbox-core/_private/WorkboxError.js","../_version.js":"node_modules/workbox-core/_version.js"}],"node_modules/workbox-core/_private/logger.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;

require("../_version.js");

/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const logger = "development" === 'production' ? null : (() => {
  // Don't overwrite this value if it's already set.
  // See https://github.com/GoogleChrome/workbox/pull/2284#issuecomment-560470923
  if (!('__WB_DISABLE_DEV_LOGS' in self)) {
    self.__WB_DISABLE_DEV_LOGS = false;
  }

  let inGroup = false;
  const methodToColorMap = {
    debug: `#7f8c8d`,
    log: `#2ecc71`,
    warn: `#f39c12`,
    error: `#c0392b`,
    groupCollapsed: `#3498db`,
    groupEnd: null
  };

  const print = function (method, args) {
    if (self.__WB_DISABLE_DEV_LOGS) {
      return;
    }

    if (method === 'groupCollapsed') {
      // Safari doesn't print all console.groupCollapsed() arguments:
      // https://bugs.webkit.org/show_bug.cgi?id=182754
      if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        console[method](...args);
        return;
      }
    }

    const styles = [`background: ${methodToColorMap[method]}`, `border-radius: 0.5em`, `color: white`, `font-weight: bold`, `padding: 2px 0.5em`]; // When in a group, the workbox prefix is not displayed.

    const logPrefix = inGroup ? [] : ['%cworkbox', styles.join(';')];
    console[method](...logPrefix, ...args);

    if (method === 'groupCollapsed') {
      inGroup = true;
    }

    if (method === 'groupEnd') {
      inGroup = false;
    }
  };

  const api = {};
  const loggerMethods = Object.keys(methodToColorMap);

  for (const key of loggerMethods) {
    const method = key;

    api[method] = (...args) => {
      print(method, args);
    };
  }

  return api;
})();
exports.logger = logger;
},{"../_version.js":"node_modules/workbox-core/_version.js"}],"node_modules/workbox-routing/_version.js":[function(require,module,exports) {
"use strict";
// @ts-ignore
try {
    self['workbox:routing:6.0.2'] && _();
}
catch (e) { }

},{}],"node_modules/workbox-routing/utils/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validMethods = exports.defaultMethod = void 0;

require("../_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * The default HTTP method, 'GET', used when there's no specific method
 * configured for a route.
 *
 * @type {string}
 *
 * @private
 */
const defaultMethod = 'GET';
/**
 * The list of valid HTTP methods associated with requests that could be routed.
 *
 * @type {Array<string>}
 *
 * @private
 */

exports.defaultMethod = defaultMethod;
const validMethods = ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT'];
exports.validMethods = validMethods;
},{"../_version.js":"node_modules/workbox-routing/_version.js"}],"node_modules/workbox-routing/utils/normalizeHandler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeHandler = void 0;

var _assert = require("workbox-core/_private/assert.js");

require("../_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * @param {function()|Object} handler Either a function, or an object with a
 * 'handle' method.
 * @return {Object} An object with a handle method.
 *
 * @private
 */
const normalizeHandler = handler => {
  if (handler && typeof handler === 'object') {
    if ("development" !== 'production') {
      _assert.assert.hasMethod(handler, 'handle', {
        moduleName: 'workbox-routing',
        className: 'Route',
        funcName: 'constructor',
        paramName: 'handler'
      });
    }

    return handler;
  } else {
    if ("development" !== 'production') {
      _assert.assert.isType(handler, 'function', {
        moduleName: 'workbox-routing',
        className: 'Route',
        funcName: 'constructor',
        paramName: 'handler'
      });
    }

    return {
      handle: handler
    };
  }
};

exports.normalizeHandler = normalizeHandler;
},{"workbox-core/_private/assert.js":"node_modules/workbox-core/_private/assert.js","../_version.js":"node_modules/workbox-routing/_version.js"}],"node_modules/workbox-routing/Route.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Route = void 0;

var _assert = require("workbox-core/_private/assert.js");

var _constants = require("./utils/constants.js");

var _normalizeHandler = require("./utils/normalizeHandler.js");

require("./_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A `Route` consists of a pair of callback functions, "match" and "handler".
 * The "match" callback determine if a route should be used to "handle" a
 * request by returning a non-falsy value if it can. The "handler" callback
 * is called when there is a match and should return a Promise that resolves
 * to a `Response`.
 *
 * @memberof module:workbox-routing
 */
class Route {
  /**
   * Constructor for Route class.
   *
   * @param {module:workbox-routing~matchCallback} match
   * A callback function that determines whether the route matches a given
   * `fetch` event by returning a non-falsy value.
   * @param {module:workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(match, handler, method = _constants.defaultMethod) {
    if ("development" !== 'production') {
      _assert.assert.isType(match, 'function', {
        moduleName: 'workbox-routing',
        className: 'Route',
        funcName: 'constructor',
        paramName: 'match'
      });

      if (method) {
        _assert.assert.isOneOf(method, _constants.validMethods, {
          paramName: 'method'
        });
      }
    } // These values are referenced directly by Router so cannot be
    // altered by minificaton.


    this.handler = (0, _normalizeHandler.normalizeHandler)(handler);
    this.match = match;
    this.method = method;
  }

}

exports.Route = Route;
},{"workbox-core/_private/assert.js":"node_modules/workbox-core/_private/assert.js","./utils/constants.js":"node_modules/workbox-routing/utils/constants.js","./utils/normalizeHandler.js":"node_modules/workbox-routing/utils/normalizeHandler.js","./_version.js":"node_modules/workbox-routing/_version.js"}],"node_modules/workbox-routing/NavigationRoute.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationRoute = void 0;

var _assert = require("workbox-core/_private/assert.js");

var _logger = require("workbox-core/_private/logger.js");

var _Route = require("./Route.js");

require("./_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * NavigationRoute makes it easy to create a
 * [Route]{@link module:workbox-routing.Route} that matches for browser
 * [navigation requests]{@link https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#first_what_are_navigation_requests}.
 *
 * It will only match incoming Requests whose
 * [`mode`]{@link https://fetch.spec.whatwg.org/#concept-request-mode}
 * is set to `navigate`.
 *
 * You can optionally only apply this route to a subset of navigation requests
 * by using one or both of the `denylist` and `allowlist` parameters.
 *
 * @memberof module:workbox-routing
 * @extends module:workbox-routing.Route
 */
class NavigationRoute extends _Route.Route {
  /**
   * If both `denylist` and `allowlist` are provided, the `denylist` will
   * take precedence and the request will not match this route.
   *
   * The regular expressions in `allowlist` and `denylist`
   * are matched against the concatenated
   * [`pathname`]{@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/pathname}
   * and [`search`]{@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/search}
   * portions of the requested URL.
   *
   * @param {module:workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {Object} options
   * @param {Array<RegExp>} [options.denylist] If any of these patterns match,
   * the route will not handle the request (even if a allowlist RegExp matches).
   * @param {Array<RegExp>} [options.allowlist=[/./]] If any of these patterns
   * match the URL's pathname and search parameter, the route will handle the
   * request (assuming the denylist doesn't match).
   */
  constructor(handler, {
    allowlist = [/./],
    denylist = []
  } = {}) {
    if ("development" !== 'production') {
      _assert.assert.isArrayOfClass(allowlist, RegExp, {
        moduleName: 'workbox-routing',
        className: 'NavigationRoute',
        funcName: 'constructor',
        paramName: 'options.allowlist'
      });

      _assert.assert.isArrayOfClass(denylist, RegExp, {
        moduleName: 'workbox-routing',
        className: 'NavigationRoute',
        funcName: 'constructor',
        paramName: 'options.denylist'
      });
    }

    super(options => this._match(options), handler);
    this._allowlist = allowlist;
    this._denylist = denylist;
  }
  /**
   * Routes match handler.
   *
   * @param {Object} options
   * @param {URL} options.url
   * @param {Request} options.request
   * @return {boolean}
   *
   * @private
   */


  _match({
    url,
    request
  }) {
    if (request && request.mode !== 'navigate') {
      return false;
    }

    const pathnameAndSearch = url.pathname + url.search;

    for (const regExp of this._denylist) {
      if (regExp.test(pathnameAndSearch)) {
        if ("development" !== 'production') {
          _logger.logger.log(`The navigation route ${pathnameAndSearch} is not ` + `being used, since the URL matches this denylist pattern: ` + `${regExp}`);
        }

        return false;
      }
    }

    if (this._allowlist.some(regExp => regExp.test(pathnameAndSearch))) {
      if ("development" !== 'production') {
        _logger.logger.debug(`The navigation route ${pathnameAndSearch} ` + `is being used.`);
      }

      return true;
    }

    if ("development" !== 'production') {
      _logger.logger.log(`The navigation route ${pathnameAndSearch} is not ` + `being used, since the URL being navigated to doesn't ` + `match the allowlist.`);
    }

    return false;
  }

}

exports.NavigationRoute = NavigationRoute;
},{"workbox-core/_private/assert.js":"node_modules/workbox-core/_private/assert.js","workbox-core/_private/logger.js":"node_modules/workbox-core/_private/logger.js","./Route.js":"node_modules/workbox-routing/Route.js","./_version.js":"node_modules/workbox-routing/_version.js"}],"node_modules/workbox-routing/RegExpRoute.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegExpRoute = void 0;

var _assert = require("workbox-core/_private/assert.js");

var _logger = require("workbox-core/_private/logger.js");

var _Route = require("./Route.js");

require("./_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * RegExpRoute makes it easy to create a regular expression based
 * [Route]{@link module:workbox-routing.Route}.
 *
 * For same-origin requests the RegExp only needs to match part of the URL. For
 * requests against third-party servers, you must define a RegExp that matches
 * the start of the URL.
 *
 * [See the module docs for info.]{@link https://developers.google.com/web/tools/workbox/modules/workbox-routing}
 *
 * @memberof module:workbox-routing
 * @extends module:workbox-routing.Route
 */
class RegExpRoute extends _Route.Route {
  /**
   * If the regular expression contains
   * [capture groups]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#grouping-back-references},
   * the captured values will be passed to the
   * [handler's]{@link module:workbox-routing~handlerCallback} `params`
   * argument.
   *
   * @param {RegExp} regExp The regular expression to match against URLs.
   * @param {module:workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(regExp, handler, method) {
    if ("development" !== 'production') {
      _assert.assert.isInstance(regExp, RegExp, {
        moduleName: 'workbox-routing',
        className: 'RegExpRoute',
        funcName: 'constructor',
        paramName: 'pattern'
      });
    }

    const match = ({
      url
    }) => {
      const result = regExp.exec(url.href); // Return immediately if there's no match.

      if (!result) {
        return;
      } // Require that the match start at the first character in the URL string
      // if it's a cross-origin request.
      // See https://github.com/GoogleChrome/workbox/issues/281 for the context
      // behind this behavior.


      if (url.origin !== location.origin && result.index !== 0) {
        if ("development" !== 'production') {
          _logger.logger.debug(`The regular expression '${regExp}' only partially matched ` + `against the cross-origin URL '${url}'. RegExpRoute's will only ` + `handle cross-origin requests if they match the entire URL.`);
        }

        return;
      } // If the route matches, but there aren't any capture groups defined, then
      // this will return [], which is truthy and therefore sufficient to
      // indicate a match.
      // If there are capture groups, then it will return their values.


      return result.slice(1);
    };

    super(match, handler, method);
  }

}

exports.RegExpRoute = RegExpRoute;
},{"workbox-core/_private/assert.js":"node_modules/workbox-core/_private/assert.js","workbox-core/_private/logger.js":"node_modules/workbox-core/_private/logger.js","./Route.js":"node_modules/workbox-routing/Route.js","./_version.js":"node_modules/workbox-routing/_version.js"}],"node_modules/workbox-core/_private/getFriendlyURL.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFriendlyURL = void 0;

require("../_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const getFriendlyURL = url => {
  const urlObj = new URL(String(url), location.href); // See https://github.com/GoogleChrome/workbox/issues/2323
  // We want to include everything, except for the origin if it's same-origin.

  return urlObj.href.replace(new RegExp(`^${location.origin}`), '');
};

exports.getFriendlyURL = getFriendlyURL;
},{"../_version.js":"node_modules/workbox-core/_version.js"}],"node_modules/workbox-routing/Router.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;

var _assert = require("workbox-core/_private/assert.js");

var _getFriendlyURL = require("workbox-core/_private/getFriendlyURL.js");

var _constants = require("./utils/constants.js");

var _logger = require("workbox-core/_private/logger.js");

var _normalizeHandler = require("./utils/normalizeHandler.js");

var _WorkboxError = require("workbox-core/_private/WorkboxError.js");

require("./_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * The Router can be used to process a FetchEvent through one or more
 * [Routes]{@link module:workbox-routing.Route} responding  with a Request if
 * a matching route exists.
 *
 * If no route matches a given a request, the Router will use a "default"
 * handler if one is defined.
 *
 * Should the matching Route throw an error, the Router will use a "catch"
 * handler if one is defined to gracefully deal with issues and respond with a
 * Request.
 *
 * If a request matches multiple routes, the **earliest** registered route will
 * be used to respond to the request.
 *
 * @memberof module:workbox-routing
 */
class Router {
  /**
   * Initializes a new Router.
   */
  constructor() {
    this._routes = new Map();
    this._defaultHandlerMap = new Map();
  }
  /**
   * @return {Map<string, Array<module:workbox-routing.Route>>} routes A `Map` of HTTP
   * method name ('GET', etc.) to an array of all the corresponding `Route`
   * instances that are registered.
   */


  get routes() {
    return this._routes;
  }
  /**
   * Adds a fetch event listener to respond to events when a route matches
   * the event's request.
   */


  addFetchListener() {
    // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
    self.addEventListener('fetch', event => {
      const {
        request
      } = event;
      const responsePromise = this.handleRequest({
        request,
        event
      });

      if (responsePromise) {
        event.respondWith(responsePromise);
      }
    });
  }
  /**
   * Adds a message event listener for URLs to cache from the window.
   * This is useful to cache resources loaded on the page prior to when the
   * service worker started controlling it.
   *
   * The format of the message data sent from the window should be as follows.
   * Where the `urlsToCache` array may consist of URL strings or an array of
   * URL string + `requestInit` object (the same as you'd pass to `fetch()`).
   *
   * ```
   * {
   *   type: 'CACHE_URLS',
   *   payload: {
   *     urlsToCache: [
   *       './script1.js',
   *       './script2.js',
   *       ['./script3.js', {mode: 'no-cors'}],
   *     ],
   *   },
   * }
   * ```
   */


  addCacheListener() {
    // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
    self.addEventListener('message', event => {
      if (event.data && event.data.type === 'CACHE_URLS') {
        const {
          payload
        } = event.data;

        if ("development" !== 'production') {
          _logger.logger.debug(`Caching URLs from the window`, payload.urlsToCache);
        }

        const requestPromises = Promise.all(payload.urlsToCache.map(entry => {
          if (typeof entry === 'string') {
            entry = [entry];
          }

          const request = new Request(...entry);
          return this.handleRequest({
            request,
            event
          }); // TODO(philipwalton): TypeScript errors without this typecast for
          // some reason (probably a bug). The real type here should work but
          // doesn't: `Array<Promise<Response> | undefined>`.
        })); // TypeScript

        event.waitUntil(requestPromises); // If a MessageChannel was used, reply to the message on success.

        if (event.ports && event.ports[0]) {
          requestPromises.then(() => event.ports[0].postMessage(true));
        }
      }
    });
  }
  /**
   * Apply the routing rules to a FetchEvent object to get a Response from an
   * appropriate Route's handler.
   *
   * @param {Object} options
   * @param {Request} options.request The request to handle.
   * @param {ExtendableEvent} options.event The event that triggered the
   *     request.
   * @return {Promise<Response>|undefined} A promise is returned if a
   *     registered route can handle the request. If there is no matching
   *     route and there's no `defaultHandler`, `undefined` is returned.
   */


  handleRequest({
    request,
    event
  }) {
    if ("development" !== 'production') {
      _assert.assert.isInstance(request, Request, {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'handleRequest',
        paramName: 'options.request'
      });
    }

    const url = new URL(request.url, location.href);

    if (!url.protocol.startsWith('http')) {
      if ("development" !== 'production') {
        _logger.logger.debug(`Workbox Router only supports URLs that start with 'http'.`);
      }

      return;
    }

    const sameOrigin = url.origin === location.origin;
    const {
      params,
      route
    } = this.findMatchingRoute({
      event,
      request,
      sameOrigin,
      url
    });
    let handler = route && route.handler;
    const debugMessages = [];

    if ("development" !== 'production') {
      if (handler) {
        debugMessages.push([`Found a route to handle this request:`, route]);

        if (params) {
          debugMessages.push([`Passing the following params to the route's handler:`, params]);
        }
      }
    } // If we don't have a handler because there was no matching route, then
    // fall back to defaultHandler if that's defined.


    const method = request.method;

    if (!handler && this._defaultHandlerMap.has(method)) {
      if ("development" !== 'production') {
        debugMessages.push(`Failed to find a matching route. Falling ` + `back to the default handler for ${method}.`);
      }

      handler = this._defaultHandlerMap.get(method);
    }

    if (!handler) {
      if ("development" !== 'production') {
        // No handler so Workbox will do nothing. If logs is set of debug
        // i.e. verbose, we should print out this information.
        _logger.logger.debug(`No route found for: ${(0, _getFriendlyURL.getFriendlyURL)(url)}`);
      }

      return;
    }

    if ("development" !== 'production') {
      // We have a handler, meaning Workbox is going to handle the route.
      // print the routing details to the console.
      _logger.logger.groupCollapsed(`Router is responding to: ${(0, _getFriendlyURL.getFriendlyURL)(url)}`);

      debugMessages.forEach(msg => {
        if (Array.isArray(msg)) {
          _logger.logger.log(...msg);
        } else {
          _logger.logger.log(msg);
        }
      });

      _logger.logger.groupEnd();
    } // Wrap in try and catch in case the handle method throws a synchronous
    // error. It should still callback to the catch handler.


    let responsePromise;

    try {
      responsePromise = handler.handle({
        url,
        request,
        event,
        params
      });
    } catch (err) {
      responsePromise = Promise.reject(err);
    }

    if (responsePromise instanceof Promise && this._catchHandler) {
      responsePromise = responsePromise.catch(err => {
        if ("development" !== 'production') {
          // Still include URL here as it will be async from the console group
          // and may not make sense without the URL
          _logger.logger.groupCollapsed(`Error thrown when responding to: ` + ` ${(0, _getFriendlyURL.getFriendlyURL)(url)}. Falling back to Catch Handler.`);

          _logger.logger.error(`Error thrown by:`, route);

          _logger.logger.error(err);

          _logger.logger.groupEnd();
        }

        return this._catchHandler.handle({
          url,
          request,
          event
        });
      });
    }

    return responsePromise;
  }
  /**
   * Checks a request and URL (and optionally an event) against the list of
   * registered routes, and if there's a match, returns the corresponding
   * route along with any params generated by the match.
   *
   * @param {Object} options
   * @param {URL} options.url
   * @param {Request} options.request The request to match.
   * @param {Event} options.event The corresponding event.
   * @return {Object} An object with `route` and `params` properties.
   *     They are populated if a matching route was found or `undefined`
   *     otherwise.
   */


  findMatchingRoute({
    url,
    sameOrigin,
    request,
    event
  }) {
    const routes = this._routes.get(request.method) || [];

    for (const route of routes) {
      let params;
      const matchResult = route.match({
        url,
        sameOrigin,
        request,
        event
      });

      if (matchResult) {
        if ("development" !== 'production') {
          // Warn developers that using an async matchCallback is almost always
          // not the right thing to do. 
          if (matchResult instanceof Promise) {
            _logger.logger.warn(`While routing ${(0, _getFriendlyURL.getFriendlyURL)(url)}, an async ` + `matchCallback function was used. Please convert the ` + `following route to use a synchronous matchCallback function:`, route);
          }
        } // See https://github.com/GoogleChrome/workbox/issues/2079


        params = matchResult;

        if (Array.isArray(matchResult) && matchResult.length === 0) {
          // Instead of passing an empty array in as params, use undefined.
          params = undefined;
        } else if (matchResult.constructor === Object && Object.keys(matchResult).length === 0) {
          // Instead of passing an empty object in as params, use undefined.
          params = undefined;
        } else if (typeof matchResult === 'boolean') {
          // For the boolean value true (rather than just something truth-y),
          // don't set params.
          // See https://github.com/GoogleChrome/workbox/pull/2134#issuecomment-513924353
          params = undefined;
        } // Return early if have a match.


        return {
          route,
          params
        };
      }
    } // If no match was found above, return and empty object.


    return {};
  }
  /**
   * Define a default `handler` that's called when no routes explicitly
   * match the incoming request.
   *
   * Each HTTP method ('GET', 'POST', etc.) gets its own default handler.
   *
   * Without a default handler, unmatched requests will go against the
   * network as if there were no service worker present.
   *
   * @param {module:workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to associate with this
   * default handler. Each method has its own default.
   */


  setDefaultHandler(handler, method = _constants.defaultMethod) {
    this._defaultHandlerMap.set(method, (0, _normalizeHandler.normalizeHandler)(handler));
  }
  /**
   * If a Route throws an error while handling a request, this `handler`
   * will be called and given a chance to provide a response.
   *
   * @param {module:workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   */


  setCatchHandler(handler) {
    this._catchHandler = (0, _normalizeHandler.normalizeHandler)(handler);
  }
  /**
   * Registers a route with the router.
   *
   * @param {module:workbox-routing.Route} route The route to register.
   */


  registerRoute(route) {
    if ("development" !== 'production') {
      _assert.assert.isType(route, 'object', {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'registerRoute',
        paramName: 'route'
      });

      _assert.assert.hasMethod(route, 'match', {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'registerRoute',
        paramName: 'route'
      });

      _assert.assert.isType(route.handler, 'object', {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'registerRoute',
        paramName: 'route'
      });

      _assert.assert.hasMethod(route.handler, 'handle', {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'registerRoute',
        paramName: 'route.handler'
      });

      _assert.assert.isType(route.method, 'string', {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'registerRoute',
        paramName: 'route.method'
      });
    }

    if (!this._routes.has(route.method)) {
      this._routes.set(route.method, []);
    } // Give precedence to all of the earlier routes by adding this additional
    // route to the end of the array.


    this._routes.get(route.method).push(route);
  }
  /**
   * Unregisters a route with the router.
   *
   * @param {module:workbox-routing.Route} route The route to unregister.
   */


  unregisterRoute(route) {
    if (!this._routes.has(route.method)) {
      throw new _WorkboxError.WorkboxError('unregister-route-but-not-found-with-method', {
        method: route.method
      });
    }

    const routeIndex = this._routes.get(route.method).indexOf(route);

    if (routeIndex > -1) {
      this._routes.get(route.method).splice(routeIndex, 1);
    } else {
      throw new _WorkboxError.WorkboxError('unregister-route-route-not-registered');
    }
  }

}

exports.Router = Router;
},{"workbox-core/_private/assert.js":"node_modules/workbox-core/_private/assert.js","workbox-core/_private/getFriendlyURL.js":"node_modules/workbox-core/_private/getFriendlyURL.js","./utils/constants.js":"node_modules/workbox-routing/utils/constants.js","workbox-core/_private/logger.js":"node_modules/workbox-core/_private/logger.js","./utils/normalizeHandler.js":"node_modules/workbox-routing/utils/normalizeHandler.js","workbox-core/_private/WorkboxError.js":"node_modules/workbox-core/_private/WorkboxError.js","./_version.js":"node_modules/workbox-routing/_version.js"}],"node_modules/workbox-routing/utils/getOrCreateDefaultRouter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrCreateDefaultRouter = void 0;

var _Router = require("../Router.js");

require("../_version.js");

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
let defaultRouter;
/**
 * Creates a new, singleton Router instance if one does not exist. If one
 * does already exist, that instance is returned.
 *
 * @private
 * @return {Router}
 */

const getOrCreateDefaultRouter = () => {
  if (!defaultRouter) {
    defaultRouter = new _Router.Router(); // The helpers that use the default Router assume these listeners exist.

    defaultRouter.addFetchListener();
    defaultRouter.addCacheListener();
  }

  return defaultRouter;
};

exports.getOrCreateDefaultRouter = getOrCreateDefaultRouter;
},{"../Router.js":"node_modules/workbox-routing/Router.js","../_version.js":"node_modules/workbox-routing/_version.js"}],"node_modules/workbox-routing/registerRoute.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerRoute = registerRoute;

var _logger = require("workbox-core/_private/logger.js");

var _WorkboxError = require("workbox-core/_private/WorkboxError.js");

var _Route = require("./Route.js");

var _RegExpRoute = require("./RegExpRoute.js");

var _getOrCreateDefaultRouter = require("./utils/getOrCreateDefaultRouter.js");

require("./_version.js");

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Easily register a RegExp, string, or function with a caching
 * strategy to a singleton Router instance.
 *
 * This method will generate a Route for you if needed and
 * call [registerRoute()]{@link module:workbox-routing.Router#registerRoute}.
 *
 * @param {RegExp|string|module:workbox-routing.Route~matchCallback|module:workbox-routing.Route} capture
 * If the capture param is a `Route`, all other arguments will be ignored.
 * @param {module:workbox-routing~handlerCallback} [handler] A callback
 * function that returns a Promise resulting in a Response. This parameter
 * is required if `capture` is not a `Route` object.
 * @param {string} [method='GET'] The HTTP method to match the Route
 * against.
 * @return {module:workbox-routing.Route} The generated `Route`(Useful for
 * unregistering).
 *
 * @memberof module:workbox-routing
 */
function registerRoute(capture, handler, method) {
  let route;

  if (typeof capture === 'string') {
    const captureUrl = new URL(capture, location.href);

    if ("development" !== 'production') {
      if (!(capture.startsWith('/') || capture.startsWith('http'))) {
        throw new _WorkboxError.WorkboxError('invalid-string', {
          moduleName: 'workbox-routing',
          funcName: 'registerRoute',
          paramName: 'capture'
        });
      } // We want to check if Express-style wildcards are in the pathname only.
      // TODO: Remove this log message in v4.


      const valueToCheck = capture.startsWith('http') ? captureUrl.pathname : capture; // See https://github.com/pillarjs/path-to-regexp#parameters

      const wildcards = '[*:?+]';

      if (new RegExp(`${wildcards}`).exec(valueToCheck)) {
        _logger.logger.debug(`The '$capture' parameter contains an Express-style wildcard ` + `character (${wildcards}). Strings are now always interpreted as ` + `exact matches; use a RegExp for partial or wildcard matches.`);
      }
    }

    const matchCallback = ({
      url
    }) => {
      if ("development" !== 'production') {
        if (url.pathname === captureUrl.pathname && url.origin !== captureUrl.origin) {
          _logger.logger.debug(`${capture} only partially matches the cross-origin URL ` + `${url}. This route will only handle cross-origin requests ` + `if they match the entire URL.`);
        }
      }

      return url.href === captureUrl.href;
    }; // If `capture` is a string then `handler` and `method` must be present.


    route = new _Route.Route(matchCallback, handler, method);
  } else if (capture instanceof RegExp) {
    // If `capture` is a `RegExp` then `handler` and `method` must be present.
    route = new _RegExpRoute.RegExpRoute(capture, handler, method);
  } else if (typeof capture === 'function') {
    // If `capture` is a function then `handler` and `method` must be present.
    route = new _Route.Route(capture, handler, method);
  } else if (capture instanceof _Route.Route) {
    route = capture;
  } else {
    throw new _WorkboxError.WorkboxError('unsupported-route-type', {
      moduleName: 'workbox-routing',
      funcName: 'registerRoute',
      paramName: 'capture'
    });
  }

  const defaultRouter = (0, _getOrCreateDefaultRouter.getOrCreateDefaultRouter)();
  defaultRouter.registerRoute(route);
  return route;
}
},{"workbox-core/_private/logger.js":"node_modules/workbox-core/_private/logger.js","workbox-core/_private/WorkboxError.js":"node_modules/workbox-core/_private/WorkboxError.js","./Route.js":"node_modules/workbox-routing/Route.js","./RegExpRoute.js":"node_modules/workbox-routing/RegExpRoute.js","./utils/getOrCreateDefaultRouter.js":"node_modules/workbox-routing/utils/getOrCreateDefaultRouter.js","./_version.js":"node_modules/workbox-routing/_version.js"}],"node_modules/workbox-routing/setCatchHandler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCatchHandler = setCatchHandler;

var _getOrCreateDefaultRouter = require("./utils/getOrCreateDefaultRouter.js");

require("./_version.js");

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * If a Route throws an error while handling a request, this `handler`
 * will be called and given a chance to provide a response.
 *
 * @param {module:workbox-routing~handlerCallback} handler A callback
 * function that returns a Promise resulting in a Response.
 *
 * @memberof module:workbox-routing
 */
function setCatchHandler(handler) {
  const defaultRouter = (0, _getOrCreateDefaultRouter.getOrCreateDefaultRouter)();
  defaultRouter.setCatchHandler(handler);
}
},{"./utils/getOrCreateDefaultRouter.js":"node_modules/workbox-routing/utils/getOrCreateDefaultRouter.js","./_version.js":"node_modules/workbox-routing/_version.js"}],"node_modules/workbox-routing/setDefaultHandler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDefaultHandler = setDefaultHandler;

var _getOrCreateDefaultRouter = require("./utils/getOrCreateDefaultRouter.js");

require("./_version.js");

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Define a default `handler` that's called when no routes explicitly
 * match the incoming request.
 *
 * Without a default handler, unmatched requests will go against the
 * network as if there were no service worker present.
 *
 * @param {module:workbox-routing~handlerCallback} handler A callback
 * function that returns a Promise resulting in a Response.
 *
 * @memberof module:workbox-routing
 */
function setDefaultHandler(handler) {
  const defaultRouter = (0, _getOrCreateDefaultRouter.getOrCreateDefaultRouter)();
  defaultRouter.setDefaultHandler(handler);
}
},{"./utils/getOrCreateDefaultRouter.js":"node_modules/workbox-routing/utils/getOrCreateDefaultRouter.js","./_version.js":"node_modules/workbox-routing/_version.js"}],"node_modules/workbox-routing/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "NavigationRoute", {
  enumerable: true,
  get: function () {
    return _NavigationRoute.NavigationRoute;
  }
});
Object.defineProperty(exports, "RegExpRoute", {
  enumerable: true,
  get: function () {
    return _RegExpRoute.RegExpRoute;
  }
});
Object.defineProperty(exports, "registerRoute", {
  enumerable: true,
  get: function () {
    return _registerRoute.registerRoute;
  }
});
Object.defineProperty(exports, "Route", {
  enumerable: true,
  get: function () {
    return _Route.Route;
  }
});
Object.defineProperty(exports, "Router", {
  enumerable: true,
  get: function () {
    return _Router.Router;
  }
});
Object.defineProperty(exports, "setCatchHandler", {
  enumerable: true,
  get: function () {
    return _setCatchHandler.setCatchHandler;
  }
});
Object.defineProperty(exports, "setDefaultHandler", {
  enumerable: true,
  get: function () {
    return _setDefaultHandler.setDefaultHandler;
  }
});

var _NavigationRoute = require("./NavigationRoute.js");

var _RegExpRoute = require("./RegExpRoute.js");

var _registerRoute = require("./registerRoute.js");

var _Route = require("./Route.js");

var _Router = require("./Router.js");

var _setCatchHandler = require("./setCatchHandler.js");

var _setDefaultHandler = require("./setDefaultHandler.js");

require("./_version.js");
},{"./NavigationRoute.js":"node_modules/workbox-routing/NavigationRoute.js","./RegExpRoute.js":"node_modules/workbox-routing/RegExpRoute.js","./registerRoute.js":"node_modules/workbox-routing/registerRoute.js","./Route.js":"node_modules/workbox-routing/Route.js","./Router.js":"node_modules/workbox-routing/Router.js","./setCatchHandler.js":"node_modules/workbox-routing/setCatchHandler.js","./setDefaultHandler.js":"node_modules/workbox-routing/setDefaultHandler.js","./_version.js":"node_modules/workbox-routing/_version.js"}],"node_modules/workbox-routing/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("./index.js");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});
},{"./index.js":"node_modules/workbox-routing/index.js"}],"node_modules/workbox-core/_private/cacheNames.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheNames = void 0;

require("../_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const _cacheNameDetails = {
  googleAnalytics: 'googleAnalytics',
  precache: 'precache-v2',
  prefix: 'workbox',
  runtime: 'runtime',
  suffix: typeof registration !== 'undefined' ? registration.scope : ''
};

const _createCacheName = cacheName => {
  return [_cacheNameDetails.prefix, cacheName, _cacheNameDetails.suffix].filter(value => value && value.length > 0).join('-');
};

const eachCacheNameDetail = fn => {
  for (const key of Object.keys(_cacheNameDetails)) {
    fn(key);
  }
};

const cacheNames = {
  updateDetails: details => {
    eachCacheNameDetail(key => {
      if (typeof details[key] === 'string') {
        _cacheNameDetails[key] = details[key];
      }
    });
  },
  getGoogleAnalyticsName: userCacheName => {
    return userCacheName || _createCacheName(_cacheNameDetails.googleAnalytics);
  },
  getPrecacheName: userCacheName => {
    return userCacheName || _createCacheName(_cacheNameDetails.precache);
  },
  getPrefix: () => {
    return _cacheNameDetails.prefix;
  },
  getRuntimeName: userCacheName => {
    return userCacheName || _createCacheName(_cacheNameDetails.runtime);
  },
  getSuffix: () => {
    return _cacheNameDetails.suffix;
  }
};
exports.cacheNames = cacheNames;
},{"../_version.js":"node_modules/workbox-core/_version.js"}],"node_modules/workbox-core/_private/cacheMatchIgnoreParams.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheMatchIgnoreParams = cacheMatchIgnoreParams;

require("../_version.js");

/*
  Copyright 2020 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
function stripParams(fullURL, ignoreParams) {
  const strippedURL = new URL(fullURL);

  for (const param of ignoreParams) {
    strippedURL.searchParams.delete(param);
  }

  return strippedURL.href;
}
/**
 * Matches an item in the cache, ignoring specific URL params. This is similar
 * to the `ignoreSearch` option, but it allows you to ignore just specific
 * params (while continuing to match on the others).
 *
 * @private
 * @param {Cache} cache
 * @param {Request} request
 * @param {Object} matchOptions
 * @param {Array<string>} ignoreParams
 * @return {Promise<Response|undefined>}
 */


async function cacheMatchIgnoreParams(cache, request, ignoreParams, matchOptions) {
  const strippedRequestURL = stripParams(request.url, ignoreParams); // If the request doesn't include any ignored params, match as normal.

  if (request.url === strippedRequestURL) {
    return cache.match(request, matchOptions);
  } // Otherwise, match by comparing keys


  const keysOptions = { ...matchOptions,
    ignoreSearch: true
  };
  const cacheKeys = await cache.keys(request, keysOptions);

  for (const cacheKey of cacheKeys) {
    const strippedCacheKeyURL = stripParams(cacheKey.url, ignoreParams);

    if (strippedRequestURL === strippedCacheKeyURL) {
      return cache.match(cacheKey, matchOptions);
    }
  }

  return;
}
},{"../_version.js":"node_modules/workbox-core/_version.js"}],"node_modules/workbox-core/_private/Deferred.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Deferred = void 0;

require("../_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * The Deferred class composes Promises in a way that allows for them to be
 * resolved or rejected from outside the constructor. In most cases promises
 * should be used directly, but Deferreds can be necessary when the logic to
 * resolve a promise must be separate.
 *
 * @private
 */
class Deferred {
  /**
   * Creates a promise and exposes its resolve and reject functions as methods.
   */
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

}

exports.Deferred = Deferred;
},{"../_version.js":"node_modules/workbox-core/_version.js"}],"node_modules/workbox-core/models/quotaErrorCallbacks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.quotaErrorCallbacks = void 0;

require("../_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
// Callbacks to be executed whenever there's a quota error.
const quotaErrorCallbacks = new Set();
exports.quotaErrorCallbacks = quotaErrorCallbacks;
},{"../_version.js":"node_modules/workbox-core/_version.js"}],"node_modules/workbox-core/_private/executeQuotaErrorCallbacks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeQuotaErrorCallbacks = executeQuotaErrorCallbacks;

var _logger = require("../_private/logger.js");

var _quotaErrorCallbacks = require("../models/quotaErrorCallbacks.js");

require("../_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Runs all of the callback functions, one at a time sequentially, in the order
 * in which they were registered.
 *
 * @memberof module:workbox-core
 * @private
 */
async function executeQuotaErrorCallbacks() {
  if ("development" !== 'production') {
    _logger.logger.log(`About to run ${_quotaErrorCallbacks.quotaErrorCallbacks.size} ` + `callbacks to clean up caches.`);
  }

  for (const callback of _quotaErrorCallbacks.quotaErrorCallbacks) {
    await callback();

    if ("development" !== 'production') {
      _logger.logger.log(callback, 'is complete.');
    }
  }

  if ("development" !== 'production') {
    _logger.logger.log('Finished running callbacks.');
  }
}
},{"../_private/logger.js":"node_modules/workbox-core/_private/logger.js","../models/quotaErrorCallbacks.js":"node_modules/workbox-core/models/quotaErrorCallbacks.js","../_version.js":"node_modules/workbox-core/_version.js"}],"node_modules/workbox-core/_private/timeout.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeout = timeout;

require("../_version.js");

/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Returns a promise that resolves and the passed number of milliseconds.
 * This utility is an async/await-friendly version of `setTimeout`.
 *
 * @param {number} ms
 * @return {Promise}
 * @private
 */
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
},{"../_version.js":"node_modules/workbox-core/_version.js"}],"node_modules/workbox-strategies/_version.js":[function(require,module,exports) {
"use strict";
// @ts-ignore
try {
    self['workbox:strategies:6.0.2'] && _();
}
catch (e) { }

},{}],"node_modules/workbox-strategies/StrategyHandler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StrategyHandler = void 0;

var _assert = require("workbox-core/_private/assert.js");

var _cacheMatchIgnoreParams = require("workbox-core/_private/cacheMatchIgnoreParams.js");

var _Deferred = require("workbox-core/_private/Deferred.js");

var _executeQuotaErrorCallbacks = require("workbox-core/_private/executeQuotaErrorCallbacks.js");

var _getFriendlyURL = require("workbox-core/_private/getFriendlyURL.js");

var _logger = require("workbox-core/_private/logger.js");

var _timeout = require("workbox-core/_private/timeout.js");

var _WorkboxError = require("workbox-core/_private/WorkboxError.js");

require("./_version.js");

/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
function toRequest(input) {
  return typeof input === 'string' ? new Request(input) : input;
}
/**
 * A class created every time a Strategy instance instance calls
 * [handle()]{@link module:workbox-strategies.Strategy~handle} or
 * [handleAll()]{@link module:workbox-strategies.Strategy~handleAll} that wraps all fetch and
 * cache actions around plugin callbacks and keeps track of when the strategy
 * is "done" (i.e. all added `event.waitUntil()` promises have resolved).
 *
 * @memberof module:workbox-strategies
 */


class StrategyHandler {
  /**
   * Creates a new instance associated with the passed strategy and event
   * that's handling the request.
   *
   * The constructor also initializes the state that will be passed to each of
   * the plugins handling this request.
   *
   * @param {module:workbox-strategies.Strategy} strategy
   * @param {Object} options
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params]
   *     [match callback]{@link module:workbox-routing~matchCallback},
   *     (if applicable).
   */
  constructor(strategy, options) {
    this._cacheKeys = {};
    /**
     * The request the strategy is performing (passed to the strategy's
     * `handle()` or `handleAll()` method).
     * @name request
     * @instance
     * @type {Request}
     * @memberof module:workbox-strategies.StrategyHandler
     */

    /**
     * The event associated with this request.
     * @name event
     * @instance
     * @type {ExtendableEvent}
     * @memberof module:workbox-strategies.StrategyHandler
     */

    /**
     * A `URL` instance of `request.url` (if passed to the strategy's
     * `handle()` or `handleAll()` method).
     * Note: the `url` param will be present if the strategy was invoked
     * from a workbox `Route` object.
     * @name url
     * @instance
     * @type {URL|undefined}
     * @memberof module:workbox-strategies.StrategyHandler
     */

    /**
     * A `param` value (if passed to the strategy's
     * `handle()` or `handleAll()` method).
     * Note: the `param` param will be present if the strategy was invoked
     * from a workbox `Route` object and the
     * [match callback]{@link module:workbox-routing~matchCallback} returned
     * a truthy value (it will be that value).
     * @name params
     * @instance
     * @type {*|undefined}
     * @memberof module:workbox-strategies.StrategyHandler
     */

    if ("development" !== 'production') {
      _assert.assert.isInstance(options.event, ExtendableEvent, {
        moduleName: 'workbox-strategies',
        className: 'StrategyHandler',
        funcName: 'constructor',
        paramName: 'options.event'
      });
    }

    Object.assign(this, options);
    this.event = options.event;
    this._strategy = strategy;
    this._handlerDeferred = new _Deferred.Deferred();
    this._extendLifetimePromises = []; // Copy the plugins list (since it's mutable on the strategy),
    // so any mutations don't affect this handler instance.

    this._plugins = [...strategy.plugins];
    this._pluginStateMap = new Map();

    for (const plugin of this._plugins) {
      this._pluginStateMap.set(plugin, {});
    }

    this.event.waitUntil(this._handlerDeferred.promise);
  }
  /**
   * Fetches a given request (and invokes any applicable plugin callback
   * methods) using the `fetchOptions` and `plugins` defined on the strategy
   * object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - `requestWillFetch()`
   * - `fetchDidSucceed()`
   * - `fetchDidFail()`
   *
   * @param {Request|string} input The URL or request to fetch.
   * @return {Promise<Response>}
   */


  fetch(input) {
    return this.waitUntil((async () => {
      const {
        event
      } = this;
      let request = toRequest(input);

      if (request.mode === 'navigate' && event instanceof FetchEvent && event.preloadResponse) {
        const possiblePreloadResponse = await event.preloadResponse;

        if (possiblePreloadResponse) {
          if ("development" !== 'production') {
            _logger.logger.log(`Using a preloaded navigation response for ` + `'${(0, _getFriendlyURL.getFriendlyURL)(request.url)}'`);
          }

          return possiblePreloadResponse;
        }
      } // If there is a fetchDidFail plugin, we need to save a clone of the
      // original request before it's either modified by a requestWillFetch
      // plugin or before the original request's body is consumed via fetch().


      const originalRequest = this.hasCallback('fetchDidFail') ? request.clone() : null;

      try {
        for (const cb of this.iterateCallbacks('requestWillFetch')) {
          request = await cb({
            request: request.clone(),
            event
          });
        }
      } catch (err) {
        throw new _WorkboxError.WorkboxError('plugin-error-request-will-fetch', {
          thrownError: err
        });
      } // The request can be altered by plugins with `requestWillFetch` making
      // the original request (most likely from a `fetch` event) different
      // from the Request we make. Pass both to `fetchDidFail` to aid debugging.


      const pluginFilteredRequest = request.clone();

      try {
        let fetchResponse; // See https://github.com/GoogleChrome/workbox/issues/1796

        fetchResponse = await fetch(request, request.mode === 'navigate' ? undefined : this._strategy.fetchOptions);

        if ("development" !== 'production') {
          _logger.logger.debug(`Network request for ` + `'${(0, _getFriendlyURL.getFriendlyURL)(request.url)}' returned a response with ` + `status '${fetchResponse.status}'.`);
        }

        for (const callback of this.iterateCallbacks('fetchDidSucceed')) {
          fetchResponse = await callback({
            event,
            request: pluginFilteredRequest,
            response: fetchResponse
          });
        }

        return fetchResponse;
      } catch (error) {
        if ("development" !== 'production') {
          _logger.logger.error(`Network request for ` + `'${(0, _getFriendlyURL.getFriendlyURL)(request.url)}' threw an error.`, error);
        } // `originalRequest` will only exist if a `fetchDidFail` callback
        // is being used (see above).


        if (originalRequest) {
          await this.runCallbacks('fetchDidFail', {
            error,
            event,
            originalRequest: originalRequest.clone(),
            request: pluginFilteredRequest.clone()
          });
        }

        throw error;
      }
    })());
  }
  /**
   * Calls `this.fetch()` and (in the background) runs `this.cachePut()` on
   * the response generated by `this.fetch()`.
   *
   * The call to `this.cachePut()` automatically invokes `this.waitUntil()`,
   * so you do not have to manually call `waitUntil()` on the event.
   *
   * @param {Request|string} input The request or URL to fetch and cache.
   * @return {Promise<Response>}
   */


  async fetchAndCachePut(input) {
    const response = await this.fetch(input);
    const responseClone = response.clone();
    this.waitUntil(this.cachePut(input, responseClone));
    return response;
  }
  /**
   * Matches a request from the cache (and invokes any applicable plugin
   * callback methods) using the `cacheName`, `matchOptions`, and `plugins`
   * defined on the strategy object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - cacheKeyWillByUsed()
   * - cachedResponseWillByUsed()
   *
   * @param {Request|string} key The Request or URL to use as the cache key.
   * @return {Promise<Response|undefined>} A matching response, if found.
   */


  cacheMatch(key) {
    return this.waitUntil((async () => {
      const request = toRequest(key);
      let cachedResponse;
      const {
        cacheName,
        matchOptions
      } = this._strategy;
      const effectiveRequest = await this.getCacheKey(request, 'read');
      const multiMatchOptions = { ...matchOptions,
        ...{
          cacheName
        }
      };
      cachedResponse = await caches.match(effectiveRequest, multiMatchOptions);

      if ("development" !== 'production') {
        if (cachedResponse) {
          _logger.logger.debug(`Found a cached response in '${cacheName}'.`);
        } else {
          _logger.logger.debug(`No cached response found in '${cacheName}'.`);
        }
      }

      for (const callback of this.iterateCallbacks('cachedResponseWillBeUsed')) {
        cachedResponse = (await callback({
          cacheName,
          matchOptions,
          cachedResponse,
          request: effectiveRequest,
          event: this.event
        })) || undefined;
      }

      return cachedResponse;
    })());
  }
  /**
   * Puts a request/response pair in the cache (and invokes any applicable
   * plugin callback methods) using the `cacheName` and `plugins` defined on
   * the strategy object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - cacheKeyWillByUsed()
   * - cacheWillUpdate()
   * - cacheDidUpdate()
   *
   * @param {Request|string} key The request or URL to use as the cache key.
   * @param {Promise<void>} response The response to cache.
   */


  async cachePut(key, response) {
    const request = toRequest(key); // Run in the next task to avoid blocking other cache reads.
    // https://github.com/w3c/ServiceWorker/issues/1397

    await (0, _timeout.timeout)(0);
    const effectiveRequest = await this.getCacheKey(request, 'write');

    if ("development" !== 'production') {
      if (effectiveRequest.method && effectiveRequest.method !== 'GET') {
        throw new _WorkboxError.WorkboxError('attempt-to-cache-non-get-request', {
          url: (0, _getFriendlyURL.getFriendlyURL)(effectiveRequest.url),
          method: effectiveRequest.method
        });
      }
    }

    if (!response) {
      if ("development" !== 'production') {
        _logger.logger.error(`Cannot cache non-existent response for ` + `'${(0, _getFriendlyURL.getFriendlyURL)(effectiveRequest.url)}'.`);
      }

      throw new _WorkboxError.WorkboxError('cache-put-with-no-response', {
        url: (0, _getFriendlyURL.getFriendlyURL)(effectiveRequest.url)
      });
    }

    const responseToCache = await this._ensureResponseSafeToCache(response);

    if (!responseToCache) {
      if ("development" !== 'production') {
        _logger.logger.debug(`Response '${(0, _getFriendlyURL.getFriendlyURL)(effectiveRequest.url)}' ` + `will not be cached.`, responseToCache);
      }

      return;
    }

    const {
      cacheName,
      matchOptions
    } = this._strategy;
    const cache = await self.caches.open(cacheName);
    const hasCacheUpdateCallback = this.hasCallback('cacheDidUpdate');
    const oldResponse = hasCacheUpdateCallback ? await (0, _cacheMatchIgnoreParams.cacheMatchIgnoreParams)( // TODO(philipwalton): the `__WB_REVISION__` param is a precaching
    // feature. Consider into ways to only add this behavior if using
    // precaching.
    cache, effectiveRequest.clone(), ['__WB_REVISION__'], matchOptions) : null;

    if ("development" !== 'production') {
      _logger.logger.debug(`Updating the '${cacheName}' cache with a new Response ` + `for ${(0, _getFriendlyURL.getFriendlyURL)(effectiveRequest.url)}.`);
    }

    try {
      await cache.put(effectiveRequest, hasCacheUpdateCallback ? responseToCache.clone() : responseToCache);
    } catch (error) {
      // See https://developer.mozilla.org/en-US/docs/Web/API/DOMException#exception-QuotaExceededError
      if (error.name === 'QuotaExceededError') {
        await (0, _executeQuotaErrorCallbacks.executeQuotaErrorCallbacks)();
      }

      throw error;
    }

    for (const callback of this.iterateCallbacks('cacheDidUpdate')) {
      await callback({
        cacheName,
        oldResponse,
        newResponse: responseToCache.clone(),
        request: effectiveRequest,
        event: this.event
      });
    }
  }
  /**
   * Checks the list of plugins for the `cacheKeyWillBeUsed` callback, and
   * executes any of those callbacks found in sequence. The final `Request`
   * object returned by the last plugin is treated as the cache key for cache
   * reads and/or writes. If no `cacheKeyWillBeUsed` plugin callbacks have
   * been registered, the passed request is returned unmodified
   *
   * @param {Request} request
   * @param {string} mode
   * @return {Promise<Request>}
   */


  async getCacheKey(request, mode) {
    if (!this._cacheKeys[mode]) {
      let effectiveRequest = request;

      for (const callback of this.iterateCallbacks('cacheKeyWillBeUsed')) {
        effectiveRequest = toRequest(await callback({
          mode,
          request: effectiveRequest,
          event: this.event,
          params: this.params
        }));
      }

      this._cacheKeys[mode] = effectiveRequest;
    }

    return this._cacheKeys[mode];
  }
  /**
   * Returns true if the strategy has at least one plugin with the given
   * callback.
   *
   * @param {string} name The name of the callback to check for.
   * @return {boolean}
   */


  hasCallback(name) {
    for (const plugin of this._strategy.plugins) {
      if (name in plugin) {
        return true;
      }
    }

    return false;
  }
  /**
   * Runs all plugin callbacks matching the given name, in order, passing the
   * given param object (merged ith the current plugin state) as the only
   * argument.
   *
   * Note: since this method runs all plugins, it's not suitable for cases
   * where the return value of a callback needs to be applied prior to calling
   * the next callback. See
   * [`iterateCallbacks()`]{@link module:workbox-strategies.StrategyHandler#iterateCallbacks}
   * below for how to handle that case.
   *
   * @param {string} name The name of the callback to run within each plugin.
   * @param {Object} param The object to pass as the first (and only) param
   *     when executing each callback. This object will be merged with the
   *     current plugin state prior to callback execution.
   */


  async runCallbacks(name, param) {
    for (const callback of this.iterateCallbacks(name)) {
      // TODO(philipwalton): not sure why `any` is needed. It seems like
      // this should work with `as WorkboxPluginCallbackParam[C]`.
      await callback(param);
    }
  }
  /**
   * Accepts a callback and returns an iterable of matching plugin callbacks,
   * where each callback is wrapped with the current handler state (i.e. when
   * you call each callback, whatever object parameter you pass it will
   * be merged with the plugin's current state).
   *
   * @param {string} name The name fo the callback to run
   * @return {Array<Function>}
   */


  *iterateCallbacks(name) {
    for (const plugin of this._strategy.plugins) {
      if (typeof plugin[name] === 'function') {
        const state = this._pluginStateMap.get(plugin);

        const statefulCallback = param => {
          const statefulParam = { ...param,
            state
          }; // TODO(philipwalton): not sure why `any` is needed. It seems like
          // this should work with `as WorkboxPluginCallbackParam[C]`.

          return plugin[name](statefulParam);
        };

        yield statefulCallback;
      }
    }
  }
  /**
   * Adds a promise to the
   * [extend lifetime promises]{@link https://w3c.github.io/ServiceWorker/#extendableevent-extend-lifetime-promises}
   * of the event event associated with the request being handled (usually a
   * `FetchEvent`).
   *
   * Note: you can await
   * [`doneWaiting()`]{@link module:workbox-strategies.StrategyHandler~doneWaiting}
   * to know when all added promises have settled.
   *
   * @param {Promise} promise A promise to add to the extend lifetime promises
   *     of the event that triggered the request.
   */


  waitUntil(promise) {
    this._extendLifetimePromises.push(promise);

    return promise;
  }
  /**
   * Returns a promise that resolves once all promises passed to
   * [`waitUntil()`]{@link module:workbox-strategies.StrategyHandler~waitUntil}
   * have settled.
   *
   * Note: any work done after `doneWaiting()` settles should be manually
   * passed to an event's `waitUntil()` method (not this handler's
   * `waitUntil()` method), otherwise the service worker thread my be killed
   * prior to your work completing.
   */


  async doneWaiting() {
    let promise;

    while (promise = this._extendLifetimePromises.shift()) {
      await promise;
    }
  }
  /**
   * Stops running the strategy and immediately resolves any pending
   * `waitUntil()` promises.
   */


  destroy() {
    this._handlerDeferred.resolve();
  }
  /**
   * This method will call cacheWillUpdate on the available plugins (or use
   * status === 200) to determine if the Response is safe and valid to cache.
   *
   * @param {Request} options.request
   * @param {Response} options.response
   * @return {Promise<Response|undefined>}
   *
   * @private
   */


  async _ensureResponseSafeToCache(response) {
    let responseToCache = response;
    let pluginsUsed = false;

    for (const callback of this.iterateCallbacks('cacheWillUpdate')) {
      responseToCache = (await callback({
        request: this.request,
        response: responseToCache,
        event: this.event
      })) || undefined;
      pluginsUsed = true;

      if (!responseToCache) {
        break;
      }
    }

    if (!pluginsUsed) {
      if (responseToCache && responseToCache.status !== 200) {
        responseToCache = undefined;
      }

      if ("development" !== 'production') {
        if (responseToCache) {
          if (responseToCache.status !== 200) {
            if (responseToCache.status === 0) {
              _logger.logger.warn(`The response for '${this.request.url}' ` + `is an opaque response. The caching strategy that you're ` + `using will not cache opaque responses by default.`);
            } else {
              _logger.logger.debug(`The response for '${this.request.url}' ` + `returned a status code of '${response.status}' and won't ` + `be cached as a result.`);
            }
          }
        }
      }
    }

    return responseToCache;
  }

}

exports.StrategyHandler = StrategyHandler;
},{"workbox-core/_private/assert.js":"node_modules/workbox-core/_private/assert.js","workbox-core/_private/cacheMatchIgnoreParams.js":"node_modules/workbox-core/_private/cacheMatchIgnoreParams.js","workbox-core/_private/Deferred.js":"node_modules/workbox-core/_private/Deferred.js","workbox-core/_private/executeQuotaErrorCallbacks.js":"node_modules/workbox-core/_private/executeQuotaErrorCallbacks.js","workbox-core/_private/getFriendlyURL.js":"node_modules/workbox-core/_private/getFriendlyURL.js","workbox-core/_private/logger.js":"node_modules/workbox-core/_private/logger.js","workbox-core/_private/timeout.js":"node_modules/workbox-core/_private/timeout.js","workbox-core/_private/WorkboxError.js":"node_modules/workbox-core/_private/WorkboxError.js","./_version.js":"node_modules/workbox-strategies/_version.js"}],"node_modules/workbox-strategies/Strategy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Strategy = void 0;

var _cacheNames = require("workbox-core/_private/cacheNames.js");

var _WorkboxError = require("workbox-core/_private/WorkboxError.js");

var _logger = require("workbox-core/_private/logger.js");

var _getFriendlyURL = require("workbox-core/_private/getFriendlyURL.js");

var _StrategyHandler = require("./StrategyHandler.js");

require("./_version.js");

/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * An abstract base class that all other strategy classes must extend from:
 *
 * @memberof module:workbox-strategies
 */
class Strategy {
  /**
   * Creates a new instance of the strategy and sets all documented option
   * properties as public instance properties.
   *
   * Note: if a custom strategy class extends the base Strategy class and does
   * not need more than these properties, it does not need to define its own
   * constructor.
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to the cache names provided by
   * [workbox-core]{@link module:workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * [`init`]{@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters}
   * of all fetch() requests made by this strategy.
   * @param {Object} [options.matchOptions] The
   * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
   * for any `cache.match()` or `cache.put()` calls made by this strategy.
   */
  constructor(options = {}) {
    /**
     * Cache name to store and retrieve
     * requests. Defaults to the cache names provided by
     * [workbox-core]{@link module:workbox-core.cacheNames}.
     *
     * @type {string}
     */
    this.cacheName = _cacheNames.cacheNames.getRuntimeName(options.cacheName);
    /**
     * The list
     * [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
     * used by this strategy.
     *
     * @type {Array<Object>}
     */

    this.plugins = options.plugins || [];
    /**
     * Values passed along to the
     * [`init`]{@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters}
     * of all fetch() requests made by this strategy.
     *
     * @type {Object}
     */

    this.fetchOptions = options.fetchOptions;
    /**
     * The
     * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
     * for any `cache.match()` or `cache.put()` calls made by this strategy.
     *
     * @type {Object}
     */

    this.matchOptions = options.matchOptions;
  }
  /**
   * Perform a request strategy and returns a `Promise` that will resolve with
   * a `Response`, invoking all relevant plugin callbacks.
   *
   * When a strategy instance is registered with a Workbox
   * [route]{@link module:workbox-routing.Route}, this method is automatically
   * called when the route matches.
   *
   * Alternatively, this method can be used in a standalone `FetchEvent`
   * listener by passing it to `event.respondWith()`.
   *
   * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
   *     properties listed below.
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params]
   */


  handle(options) {
    const [responseDone] = this.handleAll(options);
    return responseDone;
  }
  /**
   * Similar to [`handle()`]{@link module:workbox-strategies.Strategy~handle}, but
   * instead of just returning a `Promise` that resolves to a `Response` it
   * it will return an tuple of [response, done] promises, where the former
   * (`response`) is equivalent to what `handle()` returns, and the latter is a
   * Promise that will resolve once any promises that were added to
   * `event.waitUntil()` as part of performing the strategy have completed.
   *
   * You can await the `done` promise to ensure any extra work performed by
   * the strategy (usually caching responses) completes successfully.
   *
   * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
   *     properties listed below.
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params]
   * @return {Array<Promise>} A tuple of [response, done]
   *     promises that can be used to determine when the response resolves as
   *     well as when the handler has completed all its work.
   */


  handleAll(options) {
    // Allow for flexible options to be passed.
    if (options instanceof FetchEvent) {
      options = {
        event: options,
        request: options.request
      };
    }

    const event = options.event;
    const request = typeof options.request === 'string' ? new Request(options.request) : options.request;
    const params = 'params' in options ? options.params : undefined;
    const handler = new _StrategyHandler.StrategyHandler(this, {
      event,
      request,
      params
    });

    const responseDone = this._getResponse(handler, request, event);

    const handlerDone = this._awaitComplete(responseDone, handler, request, event); // Return an array of promises, suitable for use with Promise.all().


    return [responseDone, handlerDone];
  }

  async _getResponse(handler, request, event) {
    await handler.runCallbacks('handlerWillStart', {
      event,
      request
    });
    let response = undefined;

    try {
      response = await this._handle(request, handler); // The "official" Strategy subclasses all throw this error automatically,
      // but in case a third-party Strategy doesn't, ensure that we have a
      // consistent failure when there's no response or an error response.

      if (!response || response.type === 'error') {
        throw new _WorkboxError.WorkboxError('no-response', {
          url: request.url
        });
      }
    } catch (error) {
      for (const callback of handler.iterateCallbacks('handlerDidError')) {
        response = await callback({
          error,
          event,
          request
        });

        if (response) {
          break;
        }
      }

      if (!response) {
        throw error;
      } else if ("development" !== 'production') {
        _logger.logger.log(`While responding to '${(0, _getFriendlyURL.getFriendlyURL)(request.url)}', ` + `an ${error} error occurred. Using a fallback response provided by ` + `a handlerDidError plugin.`);
      }
    }

    for (const callback of handler.iterateCallbacks('handlerWillRespond')) {
      response = await callback({
        event,
        request,
        response
      });
    }

    return response;
  }

  async _awaitComplete(responseDone, handler, request, event) {
    let response;
    let error;

    try {
      response = await responseDone;
    } catch (error) {// Ignore errors, as response errors should be caught via the `response`
      // promise above. The `done` promise will only throw for errors in
      // promises passed to `handler.waitUntil()`.
    }

    try {
      await handler.runCallbacks('handlerDidRespond', {
        event,
        request,
        response
      });
      await handler.doneWaiting();
    } catch (waitUntilError) {
      error = waitUntilError;
    }

    await handler.runCallbacks('handlerDidComplete', {
      event,
      request,
      response,
      error
    });
    handler.destroy();

    if (error) {
      throw error;
    }
  }

}
/**
 * Classes extending the `Strategy` based class should implement this method,
 * and leverage the [`handler`]{@link module:workbox-strategies.StrategyHandler}
 * arg to perform all fetching and cache logic, which will ensure all relevant
 * cache, cache options, fetch options and plugins are used (per the current
 * strategy instance).
 *
 * @name _handle
 * @instance
 * @abstract
 * @function
 * @param {Request} request
 * @param {module:workbox-strategies.StrategyHandler} handler
 * @return {Promise<Response>}
 *
 * @memberof module:workbox-strategies.Strategy
 */


exports.Strategy = Strategy;
},{"workbox-core/_private/cacheNames.js":"node_modules/workbox-core/_private/cacheNames.js","workbox-core/_private/WorkboxError.js":"node_modules/workbox-core/_private/WorkboxError.js","workbox-core/_private/logger.js":"node_modules/workbox-core/_private/logger.js","workbox-core/_private/getFriendlyURL.js":"node_modules/workbox-core/_private/getFriendlyURL.js","./StrategyHandler.js":"node_modules/workbox-strategies/StrategyHandler.js","./_version.js":"node_modules/workbox-strategies/_version.js"}],"node_modules/workbox-strategies/utils/messages.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = void 0;

var _logger = require("workbox-core/_private/logger.js");

var _getFriendlyURL = require("workbox-core/_private/getFriendlyURL.js");

require("../_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const messages = {
  strategyStart: (strategyName, request) => `Using ${strategyName} to respond to '${(0, _getFriendlyURL.getFriendlyURL)(request.url)}'`,
  printFinalResponse: response => {
    if (response) {
      _logger.logger.groupCollapsed(`View the final response here.`);

      _logger.logger.log(response || '[No response returned]');

      _logger.logger.groupEnd();
    }
  }
};
exports.messages = messages;
},{"workbox-core/_private/logger.js":"node_modules/workbox-core/_private/logger.js","workbox-core/_private/getFriendlyURL.js":"node_modules/workbox-core/_private/getFriendlyURL.js","../_version.js":"node_modules/workbox-strategies/_version.js"}],"node_modules/workbox-strategies/CacheFirst.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheFirst = void 0;

var _assert = require("workbox-core/_private/assert.js");

var _logger = require("workbox-core/_private/logger.js");

var _WorkboxError = require("workbox-core/_private/WorkboxError.js");

var _Strategy = require("./Strategy.js");

var _messages = require("./utils/messages.js");

require("./_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * An implementation of a [cache-first]{@link https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network}
 * request strategy.
 *
 * A cache first strategy is useful for assets that have been revisioned,
 * such as URLs like `/styles/example.a8f5f1.css`, since they
 * can be cached for long periods of time.
 *
 * If the network request fails, and there is no cache match, this will throw
 * a `WorkboxError` exception.
 *
 * @extends module:workbox-strategies.Strategy
 * @memberof module:workbox-strategies
 */
class CacheFirst extends _Strategy.Strategy {
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {module:workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(request, handler) {
    const logs = [];

    if ("development" !== 'production') {
      _assert.assert.isInstance(request, Request, {
        moduleName: 'workbox-strategies',
        className: this.constructor.name,
        funcName: 'makeRequest',
        paramName: 'request'
      });
    }

    let response = await handler.cacheMatch(request);
    let error;

    if (!response) {
      if ("development" !== 'production') {
        logs.push(`No response found in the '${this.cacheName}' cache. ` + `Will respond with a network request.`);
      }

      try {
        response = await handler.fetchAndCachePut(request);
      } catch (err) {
        error = err;
      }

      if ("development" !== 'production') {
        if (response) {
          logs.push(`Got response from network.`);
        } else {
          logs.push(`Unable to get a response from the network.`);
        }
      }
    } else {
      if ("development" !== 'production') {
        logs.push(`Found a cached response in the '${this.cacheName}' cache.`);
      }
    }

    if ("development" !== 'production') {
      _logger.logger.groupCollapsed(_messages.messages.strategyStart(this.constructor.name, request));

      for (const log of logs) {
        _logger.logger.log(log);
      }

      _messages.messages.printFinalResponse(response);

      _logger.logger.groupEnd();
    }

    if (!response) {
      throw new _WorkboxError.WorkboxError('no-response', {
        url: request.url,
        error
      });
    }

    return response;
  }

}

exports.CacheFirst = CacheFirst;
},{"workbox-core/_private/assert.js":"node_modules/workbox-core/_private/assert.js","workbox-core/_private/logger.js":"node_modules/workbox-core/_private/logger.js","workbox-core/_private/WorkboxError.js":"node_modules/workbox-core/_private/WorkboxError.js","./Strategy.js":"node_modules/workbox-strategies/Strategy.js","./utils/messages.js":"node_modules/workbox-strategies/utils/messages.js","./_version.js":"node_modules/workbox-strategies/_version.js"}],"node_modules/workbox-strategies/CacheOnly.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheOnly = void 0;

var _assert = require("workbox-core/_private/assert.js");

var _logger = require("workbox-core/_private/logger.js");

var _WorkboxError = require("workbox-core/_private/WorkboxError.js");

var _Strategy = require("./Strategy.js");

var _messages = require("./utils/messages.js");

require("./_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * An implementation of a
 * [cache-only]{@link https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-only}
 * request strategy.
 *
 * This class is useful if you want to take advantage of any
 * [Workbox plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}.
 *
 * If there is no cache match, this will throw a `WorkboxError` exception.
 *
 * @extends module:workbox-strategies.Strategy
 * @memberof module:workbox-strategies
 */
class CacheOnly extends _Strategy.Strategy {
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {module:workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(request, handler) {
    if ("development" !== 'production') {
      _assert.assert.isInstance(request, Request, {
        moduleName: 'workbox-strategies',
        className: this.constructor.name,
        funcName: 'makeRequest',
        paramName: 'request'
      });
    }

    const response = await handler.cacheMatch(request);

    if ("development" !== 'production') {
      _logger.logger.groupCollapsed(_messages.messages.strategyStart(this.constructor.name, request));

      if (response) {
        _logger.logger.log(`Found a cached response in the '${this.cacheName}' ` + `cache.`);

        _messages.messages.printFinalResponse(response);
      } else {
        _logger.logger.log(`No response found in the '${this.cacheName}' cache.`);
      }

      _logger.logger.groupEnd();
    }

    if (!response) {
      throw new _WorkboxError.WorkboxError('no-response', {
        url: request.url
      });
    }

    return response;
  }

}

exports.CacheOnly = CacheOnly;
},{"workbox-core/_private/assert.js":"node_modules/workbox-core/_private/assert.js","workbox-core/_private/logger.js":"node_modules/workbox-core/_private/logger.js","workbox-core/_private/WorkboxError.js":"node_modules/workbox-core/_private/WorkboxError.js","./Strategy.js":"node_modules/workbox-strategies/Strategy.js","./utils/messages.js":"node_modules/workbox-strategies/utils/messages.js","./_version.js":"node_modules/workbox-strategies/_version.js"}],"node_modules/workbox-strategies/plugins/cacheOkAndOpaquePlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheOkAndOpaquePlugin = void 0;

require("../_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const cacheOkAndOpaquePlugin = {
  /**
   * Returns a valid response (to allow caching) if the status is 200 (OK) or
   * 0 (opaque).
   *
   * @param {Object} options
   * @param {Response} options.response
   * @return {Response|null}
   *
   * @private
   */
  cacheWillUpdate: async ({
    response
  }) => {
    if (response.status === 200 || response.status === 0) {
      return response;
    }

    return null;
  }
};
exports.cacheOkAndOpaquePlugin = cacheOkAndOpaquePlugin;
},{"../_version.js":"node_modules/workbox-strategies/_version.js"}],"node_modules/workbox-strategies/NetworkFirst.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkFirst = void 0;

var _assert = require("workbox-core/_private/assert.js");

var _logger = require("workbox-core/_private/logger.js");

var _WorkboxError = require("workbox-core/_private/WorkboxError.js");

var _cacheOkAndOpaquePlugin = require("./plugins/cacheOkAndOpaquePlugin.js");

var _Strategy = require("./Strategy.js");

var _messages = require("./utils/messages.js");

require("./_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * An implementation of a
 * [network first]{@link https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache}
 * request strategy.
 *
 * By default, this strategy will cache responses with a 200 status code as
 * well as [opaque responses]{@link https://developers.google.com/web/tools/workbox/guides/handle-third-party-requests}.
 * Opaque responses are are cross-origin requests where the response doesn't
 * support [CORS]{@link https://enable-cors.org/}.
 *
 * If the network request fails, and there is no cache match, this will throw
 * a `WorkboxError` exception.
 *
 * @extends module:workbox-strategies.Strategy
 * @memberof module:workbox-strategies
 */
class NetworkFirst extends _Strategy.Strategy {
  /**
   * @param {Object} [options]
   * @param {string} [options.cacheName Cache name to store and retrieve
   * requests. Defaults to cache names provided by
   * [workbox-core]{@link module:workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of all fetch() requests made by this strategy.
   * @param {Object} [options.matchOptions [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
   * @param {number} [options.networkTimeoutSeconds] If set, any network requests
   * that fail to respond within the timeout will fallback to the cache.
   *
   * This option can be used to combat
   * "[lie-fi]{@link https://developers.google.com/web/fundamentals/performance/poor-connectivity/#lie-fi}"
   * scenarios.
   */
  constructor(options = {}) {
    super(options); // If this instance contains no plugins with a 'cacheWillUpdate' callback,
    // prepend the `cacheOkAndOpaquePlugin` plugin to the plugins list.

    if (!this.plugins.some(p => 'cacheWillUpdate' in p)) {
      this.plugins.unshift(_cacheOkAndOpaquePlugin.cacheOkAndOpaquePlugin);
    }

    this._networkTimeoutSeconds = options.networkTimeoutSeconds || 0;

    if ("development" !== 'production') {
      if (this._networkTimeoutSeconds) {
        _assert.assert.isType(this._networkTimeoutSeconds, 'number', {
          moduleName: 'workbox-strategies',
          className: this.constructor.name,
          funcName: 'constructor',
          paramName: 'networkTimeoutSeconds'
        });
      }
    }
  }
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {module:workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */


  async _handle(request, handler) {
    const logs = [];

    if ("development" !== 'production') {
      _assert.assert.isInstance(request, Request, {
        moduleName: 'workbox-strategies',
        className: this.constructor.name,
        funcName: 'handle',
        paramName: 'makeRequest'
      });
    }

    const promises = [];
    let timeoutId;

    if (this._networkTimeoutSeconds) {
      const {
        id,
        promise
      } = this._getTimeoutPromise({
        request,
        logs,
        handler
      });

      timeoutId = id;
      promises.push(promise);
    }

    const networkPromise = this._getNetworkPromise({
      timeoutId,
      request,
      logs,
      handler
    });

    promises.push(networkPromise);

    for (const promise of promises) {
      handler.waitUntil(promise);
    } // Promise.race() will resolve as soon as the first promise resolves.


    let response = await Promise.race(promises); // If Promise.race() resolved with null, it might be due to a network
    // timeout + a cache miss. If that were to happen, we'd rather wait until
    // the networkPromise resolves instead of returning null.
    // Note that it's fine to await an already-resolved promise, so we don't
    // have to check to see if it's still "in flight".

    if (!response) {
      response = await networkPromise;
    }

    if ("development" !== 'production') {
      _logger.logger.groupCollapsed(_messages.messages.strategyStart(this.constructor.name, request));

      for (const log of logs) {
        _logger.logger.log(log);
      }

      _messages.messages.printFinalResponse(response);

      _logger.logger.groupEnd();
    }

    if (!response) {
      throw new _WorkboxError.WorkboxError('no-response', {
        url: request.url
      });
    }

    return response;
  }
  /**
   * @param {Object} options
   * @param {Request} options.request
   * @param {Array} options.logs A reference to the logs array
   * @param {Event} options.event
   * @return {Promise<Response>}
   *
   * @private
   */


  _getTimeoutPromise({
    request,
    logs,
    handler
  }) {
    let timeoutId;
    const timeoutPromise = new Promise(resolve => {
      const onNetworkTimeout = async () => {
        if ("development" !== 'production') {
          logs.push(`Timing out the network response at ` + `${this._networkTimeoutSeconds} seconds.`);
        }

        resolve(await handler.cacheMatch(request));
      };

      timeoutId = setTimeout(onNetworkTimeout, this._networkTimeoutSeconds * 1000);
    });
    return {
      promise: timeoutPromise,
      id: timeoutId
    };
  }
  /**
   * @param {Object} options
   * @param {number|undefined} options.timeoutId
   * @param {Request} options.request
   * @param {Array} options.logs A reference to the logs Array.
   * @param {Event} options.event
   * @return {Promise<Response>}
   *
   * @private
   */


  async _getNetworkPromise({
    timeoutId,
    request,
    logs,
    handler
  }) {
    let error;
    let response;

    try {
      response = await handler.fetchAndCachePut(request);
    } catch (fetchError) {
      error = fetchError;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if ("development" !== 'production') {
      if (response) {
        logs.push(`Got response from network.`);
      } else {
        logs.push(`Unable to get a response from the network. Will respond ` + `with a cached response.`);
      }
    }

    if (error || !response) {
      response = await handler.cacheMatch(request);

      if ("development" !== 'production') {
        if (response) {
          logs.push(`Found a cached response in the '${this.cacheName}'` + ` cache.`);
        } else {
          logs.push(`No response found in the '${this.cacheName}' cache.`);
        }
      }
    }

    return response;
  }

}

exports.NetworkFirst = NetworkFirst;
},{"workbox-core/_private/assert.js":"node_modules/workbox-core/_private/assert.js","workbox-core/_private/logger.js":"node_modules/workbox-core/_private/logger.js","workbox-core/_private/WorkboxError.js":"node_modules/workbox-core/_private/WorkboxError.js","./plugins/cacheOkAndOpaquePlugin.js":"node_modules/workbox-strategies/plugins/cacheOkAndOpaquePlugin.js","./Strategy.js":"node_modules/workbox-strategies/Strategy.js","./utils/messages.js":"node_modules/workbox-strategies/utils/messages.js","./_version.js":"node_modules/workbox-strategies/_version.js"}],"node_modules/workbox-strategies/NetworkOnly.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkOnly = void 0;

var _assert = require("workbox-core/_private/assert.js");

var _logger = require("workbox-core/_private/logger.js");

var _timeout = require("workbox-core/_private/timeout.js");

var _WorkboxError = require("workbox-core/_private/WorkboxError.js");

var _Strategy = require("./Strategy.js");

var _messages = require("./utils/messages.js");

require("./_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * An implementation of a
 * [network-only]{@link https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#network-only}
 * request strategy.
 *
 * This class is useful if you want to take advantage of any
 * [Workbox plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}.
 *
 * If the network request fails, this will throw a `WorkboxError` exception.
 *
 * @extends module:workbox-strategies.Strategy
 * @memberof module:workbox-strategies
 */
class NetworkOnly extends _Strategy.Strategy {
  /**
   * @param {Object} [options]
   * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of all fetch() requests made by this strategy.
   * @param {number} [options.networkTimeoutSeconds] If set, any network requests
   * that fail to respond within the timeout will result in a network error.
   */
  constructor(options = {}) {
    super(options);
    this._networkTimeoutSeconds = options.networkTimeoutSeconds || 0;
  }
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {module:workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */


  async _handle(request, handler) {
    if ("development" !== 'production') {
      _assert.assert.isInstance(request, Request, {
        moduleName: 'workbox-strategies',
        className: this.constructor.name,
        funcName: '_handle',
        paramName: 'request'
      });
    }

    let error = undefined;
    let response;

    try {
      const promises = [handler.fetch(request)];

      if (this._networkTimeoutSeconds) {
        const timeoutPromise = (0, _timeout.timeout)(this._networkTimeoutSeconds * 1000);
        promises.push(timeoutPromise);
      }

      response = await Promise.race(promises);

      if (!response) {
        throw new Error(`Timed out the network response after ` + `${this._networkTimeoutSeconds} seconds.`);
      }
    } catch (err) {
      error = err;
    }

    if ("development" !== 'production') {
      _logger.logger.groupCollapsed(_messages.messages.strategyStart(this.constructor.name, request));

      if (response) {
        _logger.logger.log(`Got response from network.`);
      } else {
        _logger.logger.log(`Unable to get a response from the network.`);
      }

      _messages.messages.printFinalResponse(response);

      _logger.logger.groupEnd();
    }

    if (!response) {
      throw new _WorkboxError.WorkboxError('no-response', {
        url: request.url,
        error
      });
    }

    return response;
  }

}

exports.NetworkOnly = NetworkOnly;
},{"workbox-core/_private/assert.js":"node_modules/workbox-core/_private/assert.js","workbox-core/_private/logger.js":"node_modules/workbox-core/_private/logger.js","workbox-core/_private/timeout.js":"node_modules/workbox-core/_private/timeout.js","workbox-core/_private/WorkboxError.js":"node_modules/workbox-core/_private/WorkboxError.js","./Strategy.js":"node_modules/workbox-strategies/Strategy.js","./utils/messages.js":"node_modules/workbox-strategies/utils/messages.js","./_version.js":"node_modules/workbox-strategies/_version.js"}],"node_modules/workbox-strategies/StaleWhileRevalidate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StaleWhileRevalidate = void 0;

var _assert = require("workbox-core/_private/assert.js");

var _logger = require("workbox-core/_private/logger.js");

var _WorkboxError = require("workbox-core/_private/WorkboxError.js");

var _cacheOkAndOpaquePlugin = require("./plugins/cacheOkAndOpaquePlugin.js");

var _Strategy = require("./Strategy.js");

var _messages = require("./utils/messages.js");

require("./_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * An implementation of a
 * [stale-while-revalidate]{@link https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate}
 * request strategy.
 *
 * Resources are requested from both the cache and the network in parallel.
 * The strategy will respond with the cached version if available, otherwise
 * wait for the network response. The cache is updated with the network response
 * with each successful request.
 *
 * By default, this strategy will cache responses with a 200 status code as
 * well as [opaque responses]{@link https://developers.google.com/web/tools/workbox/guides/handle-third-party-requests}.
 * Opaque responses are cross-origin requests where the response doesn't
 * support [CORS]{@link https://enable-cors.org/}.
 *
 * If the network request fails, and there is no cache match, this will throw
 * a `WorkboxError` exception.
 *
 * @extends module:workbox-strategies.Strategy
 * @memberof module:workbox-strategies
 */
class StaleWhileRevalidate extends _Strategy.Strategy {
  /**
   * @param {Object} options
   * @param {string} options.cacheName Cache name to store and retrieve
   * requests. Defaults to cache names provided by
   * [workbox-core]{@link module:workbox-core.cacheNames}.
   * @param {Array<Object>} options.plugins [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} options.fetchOptions Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of all fetch() requests made by this strategy.
   * @param {Object} options.matchOptions [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
   */
  constructor(options) {
    super(options); // If this instance contains no plugins with a 'cacheWillUpdate' callback,
    // prepend the `cacheOkAndOpaquePlugin` plugin to the plugins list.

    if (!this.plugins.some(p => 'cacheWillUpdate' in p)) {
      this.plugins.unshift(_cacheOkAndOpaquePlugin.cacheOkAndOpaquePlugin);
    }
  }
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {module:workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */


  async _handle(request, handler) {
    const logs = [];

    if ("development" !== 'production') {
      _assert.assert.isInstance(request, Request, {
        moduleName: 'workbox-strategies',
        className: this.constructor.name,
        funcName: 'handle',
        paramName: 'request'
      });
    }

    const fetchAndCachePromise = handler.fetchAndCachePut(request).catch(() => {// Swallow this error because a 'no-response' error will be thrown in
      // main handler return flow. This will be in the `waitUntil()` flow.
    });
    let response = await handler.cacheMatch(request);
    let error;

    if (response) {
      if ("development" !== 'production') {
        logs.push(`Found a cached response in the '${this.cacheName}'` + ` cache. Will update with the network response in the background.`);
      }
    } else {
      if ("development" !== 'production') {
        logs.push(`No response found in the '${this.cacheName}' cache. ` + `Will wait for the network response.`);
      }

      try {
        // NOTE(philipwalton): Really annoying that we have to type cast here.
        // https://github.com/microsoft/TypeScript/issues/20006
        response = await fetchAndCachePromise;
      } catch (err) {
        error = err;
      }
    }

    if ("development" !== 'production') {
      _logger.logger.groupCollapsed(_messages.messages.strategyStart(this.constructor.name, request));

      for (const log of logs) {
        _logger.logger.log(log);
      }

      _messages.messages.printFinalResponse(response);

      _logger.logger.groupEnd();
    }

    if (!response) {
      throw new _WorkboxError.WorkboxError('no-response', {
        url: request.url,
        error
      });
    }

    return response;
  }

}

exports.StaleWhileRevalidate = StaleWhileRevalidate;
},{"workbox-core/_private/assert.js":"node_modules/workbox-core/_private/assert.js","workbox-core/_private/logger.js":"node_modules/workbox-core/_private/logger.js","workbox-core/_private/WorkboxError.js":"node_modules/workbox-core/_private/WorkboxError.js","./plugins/cacheOkAndOpaquePlugin.js":"node_modules/workbox-strategies/plugins/cacheOkAndOpaquePlugin.js","./Strategy.js":"node_modules/workbox-strategies/Strategy.js","./utils/messages.js":"node_modules/workbox-strategies/utils/messages.js","./_version.js":"node_modules/workbox-strategies/_version.js"}],"node_modules/workbox-strategies/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CacheFirst", {
  enumerable: true,
  get: function () {
    return _CacheFirst.CacheFirst;
  }
});
Object.defineProperty(exports, "CacheOnly", {
  enumerable: true,
  get: function () {
    return _CacheOnly.CacheOnly;
  }
});
Object.defineProperty(exports, "NetworkFirst", {
  enumerable: true,
  get: function () {
    return _NetworkFirst.NetworkFirst;
  }
});
Object.defineProperty(exports, "NetworkOnly", {
  enumerable: true,
  get: function () {
    return _NetworkOnly.NetworkOnly;
  }
});
Object.defineProperty(exports, "StaleWhileRevalidate", {
  enumerable: true,
  get: function () {
    return _StaleWhileRevalidate.StaleWhileRevalidate;
  }
});
Object.defineProperty(exports, "Strategy", {
  enumerable: true,
  get: function () {
    return _Strategy.Strategy;
  }
});
Object.defineProperty(exports, "StrategyHandler", {
  enumerable: true,
  get: function () {
    return _StrategyHandler.StrategyHandler;
  }
});

var _CacheFirst = require("./CacheFirst.js");

var _CacheOnly = require("./CacheOnly.js");

var _NetworkFirst = require("./NetworkFirst.js");

var _NetworkOnly = require("./NetworkOnly.js");

var _StaleWhileRevalidate = require("./StaleWhileRevalidate.js");

var _Strategy = require("./Strategy.js");

var _StrategyHandler = require("./StrategyHandler.js");

require("./_version.js");
},{"./CacheFirst.js":"node_modules/workbox-strategies/CacheFirst.js","./CacheOnly.js":"node_modules/workbox-strategies/CacheOnly.js","./NetworkFirst.js":"node_modules/workbox-strategies/NetworkFirst.js","./NetworkOnly.js":"node_modules/workbox-strategies/NetworkOnly.js","./StaleWhileRevalidate.js":"node_modules/workbox-strategies/StaleWhileRevalidate.js","./Strategy.js":"node_modules/workbox-strategies/Strategy.js","./StrategyHandler.js":"node_modules/workbox-strategies/StrategyHandler.js","./_version.js":"node_modules/workbox-strategies/_version.js"}],"node_modules/workbox-strategies/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("./index.js");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});
},{"./index.js":"node_modules/workbox-strategies/index.js"}],"node_modules/workbox-cacheable-response/_version.js":[function(require,module,exports) {
"use strict";
// @ts-ignore
try {
    self['workbox:cacheable-response:6.0.2'] && _();
}
catch (e) { }

},{}],"node_modules/workbox-cacheable-response/CacheableResponse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheableResponse = void 0;

var _assert = require("workbox-core/_private/assert.js");

var _WorkboxError = require("workbox-core/_private/WorkboxError.js");

var _getFriendlyURL = require("workbox-core/_private/getFriendlyURL.js");

var _logger = require("workbox-core/_private/logger.js");

require("./_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * This class allows you to set up rules determining what
 * status codes and/or headers need to be present in order for a
 * [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response)
 * to be considered cacheable.
 *
 * @memberof module:workbox-cacheable-response
 */
class CacheableResponse {
  /**
   * To construct a new CacheableResponse instance you must provide at least
   * one of the `config` properties.
   *
   * If both `statuses` and `headers` are specified, then both conditions must
   * be met for the `Response` to be considered cacheable.
   *
   * @param {Object} config
   * @param {Array<number>} [config.statuses] One or more status codes that a
   * `Response` can have and be considered cacheable.
   * @param {Object<string,string>} [config.headers] A mapping of header names
   * and expected values that a `Response` can have and be considered cacheable.
   * If multiple headers are provided, only one needs to be present.
   */
  constructor(config = {}) {
    if ("development" !== 'production') {
      if (!(config.statuses || config.headers)) {
        throw new _WorkboxError.WorkboxError('statuses-or-headers-required', {
          moduleName: 'workbox-cacheable-response',
          className: 'CacheableResponse',
          funcName: 'constructor'
        });
      }

      if (config.statuses) {
        _assert.assert.isArray(config.statuses, {
          moduleName: 'workbox-cacheable-response',
          className: 'CacheableResponse',
          funcName: 'constructor',
          paramName: 'config.statuses'
        });
      }

      if (config.headers) {
        _assert.assert.isType(config.headers, 'object', {
          moduleName: 'workbox-cacheable-response',
          className: 'CacheableResponse',
          funcName: 'constructor',
          paramName: 'config.headers'
        });
      }
    }

    this._statuses = config.statuses;
    this._headers = config.headers;
  }
  /**
   * Checks a response to see whether it's cacheable or not, based on this
   * object's configuration.
   *
   * @param {Response} response The response whose cacheability is being
   * checked.
   * @return {boolean} `true` if the `Response` is cacheable, and `false`
   * otherwise.
   */


  isResponseCacheable(response) {
    if ("development" !== 'production') {
      _assert.assert.isInstance(response, Response, {
        moduleName: 'workbox-cacheable-response',
        className: 'CacheableResponse',
        funcName: 'isResponseCacheable',
        paramName: 'response'
      });
    }

    let cacheable = true;

    if (this._statuses) {
      cacheable = this._statuses.includes(response.status);
    }

    if (this._headers && cacheable) {
      cacheable = Object.keys(this._headers).some(headerName => {
        return response.headers.get(headerName) === this._headers[headerName];
      });
    }

    if ("development" !== 'production') {
      if (!cacheable) {
        _logger.logger.groupCollapsed(`The request for ` + `'${(0, _getFriendlyURL.getFriendlyURL)(response.url)}' returned a response that does ` + `not meet the criteria for being cached.`);

        _logger.logger.groupCollapsed(`View cacheability criteria here.`);

        _logger.logger.log(`Cacheable statuses: ` + JSON.stringify(this._statuses));

        _logger.logger.log(`Cacheable headers: ` + JSON.stringify(this._headers, null, 2));

        _logger.logger.groupEnd();

        const logFriendlyHeaders = {};
        response.headers.forEach((value, key) => {
          logFriendlyHeaders[key] = value;
        });

        _logger.logger.groupCollapsed(`View response status and headers here.`);

        _logger.logger.log(`Response status: ` + response.status);

        _logger.logger.log(`Response headers: ` + JSON.stringify(logFriendlyHeaders, null, 2));

        _logger.logger.groupEnd();

        _logger.logger.groupCollapsed(`View full response details here.`);

        _logger.logger.log(response.headers);

        _logger.logger.log(response);

        _logger.logger.groupEnd();

        _logger.logger.groupEnd();
      }
    }

    return cacheable;
  }

}

exports.CacheableResponse = CacheableResponse;
},{"workbox-core/_private/assert.js":"node_modules/workbox-core/_private/assert.js","workbox-core/_private/WorkboxError.js":"node_modules/workbox-core/_private/WorkboxError.js","workbox-core/_private/getFriendlyURL.js":"node_modules/workbox-core/_private/getFriendlyURL.js","workbox-core/_private/logger.js":"node_modules/workbox-core/_private/logger.js","./_version.js":"node_modules/workbox-cacheable-response/_version.js"}],"node_modules/workbox-cacheable-response/CacheableResponsePlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheableResponsePlugin = void 0;

var _CacheableResponse = require("./CacheableResponse.js");

require("./_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A class implementing the `cacheWillUpdate` lifecycle callback. This makes it
 * easier to add in cacheability checks to requests made via Workbox's built-in
 * strategies.
 *
 * @memberof module:workbox-cacheable-response
 */
class CacheableResponsePlugin {
  /**
   * To construct a new CacheableResponsePlugin instance you must provide at
   * least one of the `config` properties.
   *
   * If both `statuses` and `headers` are specified, then both conditions must
   * be met for the `Response` to be considered cacheable.
   *
   * @param {Object} config
   * @param {Array<number>} [config.statuses] One or more status codes that a
   * `Response` can have and be considered cacheable.
   * @param {Object<string,string>} [config.headers] A mapping of header names
   * and expected values that a `Response` can have and be considered cacheable.
   * If multiple headers are provided, only one needs to be present.
   */
  constructor(config) {
    /**
     * @param {Object} options
     * @param {Response} options.response
     * @return {Response|null}
     * @private
     */
    this.cacheWillUpdate = async ({
      response
    }) => {
      if (this._cacheableResponse.isResponseCacheable(response)) {
        return response;
      }

      return null;
    };

    this._cacheableResponse = new _CacheableResponse.CacheableResponse(config);
  }

}

exports.CacheableResponsePlugin = CacheableResponsePlugin;
},{"./CacheableResponse.js":"node_modules/workbox-cacheable-response/CacheableResponse.js","./_version.js":"node_modules/workbox-cacheable-response/_version.js"}],"node_modules/workbox-cacheable-response/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CacheableResponse", {
  enumerable: true,
  get: function () {
    return _CacheableResponse.CacheableResponse;
  }
});
Object.defineProperty(exports, "CacheableResponsePlugin", {
  enumerable: true,
  get: function () {
    return _CacheableResponsePlugin.CacheableResponsePlugin;
  }
});

var _CacheableResponse = require("./CacheableResponse.js");

var _CacheableResponsePlugin = require("./CacheableResponsePlugin.js");

require("./_version.js");
},{"./CacheableResponse.js":"node_modules/workbox-cacheable-response/CacheableResponse.js","./CacheableResponsePlugin.js":"node_modules/workbox-cacheable-response/CacheableResponsePlugin.js","./_version.js":"node_modules/workbox-cacheable-response/_version.js"}],"node_modules/workbox-cacheable-response/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("./index.js");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});
},{"./index.js":"node_modules/workbox-cacheable-response/index.js"}],"node_modules/workbox-core/_private/dontWaitFor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dontWaitFor = dontWaitFor;

require("../_version.js");

/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A helper function that prevents a promise from being flagged as unused.
 *
 * @private
 **/
function dontWaitFor(promise) {
  // Effective no-op.
  promise.then(() => {});
}
},{"../_version.js":"node_modules/workbox-core/_version.js"}],"node_modules/workbox-core/_private/DBWrapper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DBWrapper = void 0;

require("../_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A class that wraps common IndexedDB functionality in a promise-based API.
 * It exposes all the underlying power and functionality of IndexedDB, but
 * wraps the most commonly used features in a way that's much simpler to use.
 *
 * @private
 */
class DBWrapper {
  /**
   * @param {string} name
   * @param {number} version
   * @param {Object=} [callback]
   * @param {!Function} [callbacks.onupgradeneeded]
   * @param {!Function} [callbacks.onversionchange] Defaults to
   *     DBWrapper.prototype._onversionchange when not specified.
   * @private
   */
  constructor(name, version, {
    onupgradeneeded,
    onversionchange
  } = {}) {
    this._db = null;
    this._name = name;
    this._version = version;
    this._onupgradeneeded = onupgradeneeded;

    this._onversionchange = onversionchange || (() => this.close());
  }
  /**
   * Returns the IDBDatabase instance (not normally needed).
   * @return {IDBDatabase|undefined}
   *
   * @private
   */


  get db() {
    return this._db;
  }
  /**
   * Opens a connected to an IDBDatabase, invokes any onupgradedneeded
   * callback, and added an onversionchange callback to the database.
   *
   * @return {IDBDatabase}
   * @private
   */


  async open() {
    if (this._db) return;
    this._db = await new Promise((resolve, reject) => {
      // This flag is flipped to true if the timeout callback runs prior
      // to the request failing or succeeding. Note: we use a timeout instead
      // of an onblocked handler since there are cases where onblocked will
      // never never run. A timeout better handles all possible scenarios:
      // https://github.com/w3c/IndexedDB/issues/223
      let openRequestTimedOut = false;
      setTimeout(() => {
        openRequestTimedOut = true;
        reject(new Error('The open request was blocked and timed out'));
      }, this.OPEN_TIMEOUT);
      const openRequest = indexedDB.open(this._name, this._version);

      openRequest.onerror = () => reject(openRequest.error);

      openRequest.onupgradeneeded = evt => {
        if (openRequestTimedOut) {
          openRequest.transaction.abort();
          openRequest.result.close();
        } else if (typeof this._onupgradeneeded === 'function') {
          this._onupgradeneeded(evt);
        }
      };

      openRequest.onsuccess = () => {
        const db = openRequest.result;

        if (openRequestTimedOut) {
          db.close();
        } else {
          db.onversionchange = this._onversionchange.bind(this);
          resolve(db);
        }
      };
    });
    return this;
  }
  /**
   * Polyfills the native `getKey()` method. Note, this is overridden at
   * runtime if the browser supports the native method.
   *
   * @param {string} storeName
   * @param {*} query
   * @return {Array}
   * @private
   */


  async getKey(storeName, query) {
    return (await this.getAllKeys(storeName, query, 1))[0];
  }
  /**
   * Polyfills the native `getAll()` method. Note, this is overridden at
   * runtime if the browser supports the native method.
   *
   * @param {string} storeName
   * @param {*} query
   * @param {number} count
   * @return {Array}
   * @private
   */


  async getAll(storeName, query, count) {
    return await this.getAllMatching(storeName, {
      query,
      count
    });
  }
  /**
   * Polyfills the native `getAllKeys()` method. Note, this is overridden at
   * runtime if the browser supports the native method.
   *
   * @param {string} storeName
   * @param {*} query
   * @param {number} count
   * @return {Array}
   * @private
   */


  async getAllKeys(storeName, query, count) {
    const entries = await this.getAllMatching(storeName, {
      query,
      count,
      includeKeys: true
    });
    return entries.map(entry => entry.key);
  }
  /**
   * Supports flexible lookup in an object store by specifying an index,
   * query, direction, and count. This method returns an array of objects
   * with the signature .
   *
   * @param {string} storeName
   * @param {Object} [opts]
   * @param {string} [opts.index] The index to use (if specified).
   * @param {*} [opts.query]
   * @param {IDBCursorDirection} [opts.direction]
   * @param {number} [opts.count] The max number of results to return.
   * @param {boolean} [opts.includeKeys] When true, the structure of the
   *     returned objects is changed from an array of values to an array of
   *     objects in the form {key, primaryKey, value}.
   * @return {Array}
   * @private
   */


  async getAllMatching(storeName, {
    index,
    query = null,
    // IE/Edge errors if query === `undefined`.
    direction = 'next',
    count,
    includeKeys = false
  } = {}) {
    return await this.transaction([storeName], 'readonly', (txn, done) => {
      const store = txn.objectStore(storeName);
      const target = index ? store.index(index) : store;
      const results = [];
      const request = target.openCursor(query, direction);

      request.onsuccess = () => {
        const cursor = request.result;

        if (cursor) {
          results.push(includeKeys ? cursor : cursor.value);

          if (count && results.length >= count) {
            done(results);
          } else {
            cursor.continue();
          }
        } else {
          done(results);
        }
      };
    });
  }
  /**
   * Accepts a list of stores, a transaction type, and a callback and
   * performs a transaction. A promise is returned that resolves to whatever
   * value the callback chooses. The callback holds all the transaction logic
   * and is invoked with two arguments:
   *   1. The IDBTransaction object
   *   2. A `done` function, that's used to resolve the promise when
   *      when the transaction is done, if passed a value, the promise is
   *      resolved to that value.
   *
   * @param {Array<string>} storeNames An array of object store names
   *     involved in the transaction.
   * @param {string} type Can be `readonly` or `readwrite`.
   * @param {!Function} callback
   * @return {*} The result of the transaction ran by the callback.
   * @private
   */


  async transaction(storeNames, type, callback) {
    await this.open();
    return await new Promise((resolve, reject) => {
      const txn = this._db.transaction(storeNames, type);

      txn.onabort = () => reject(txn.error);

      txn.oncomplete = () => resolve();

      callback(txn, value => resolve(value));
    });
  }
  /**
   * Delegates async to a native IDBObjectStore method.
   *
   * @param {string} method The method name.
   * @param {string} storeName The object store name.
   * @param {string} type Can be `readonly` or `readwrite`.
   * @param {...*} args The list of args to pass to the native method.
   * @return {*} The result of the transaction.
   * @private
   */


  async _call(method, storeName, type, ...args) {
    const callback = (txn, done) => {
      const objStore = txn.objectStore(storeName); // TODO(philipwalton): Fix this underlying TS2684 error.
      // @ts-ignore

      const request = objStore[method].apply(objStore, args);

      request.onsuccess = () => done(request.result);
    };

    return await this.transaction([storeName], type, callback);
  }
  /**
   * Closes the connection opened by `DBWrapper.open()`. Generally this method
   * doesn't need to be called since:
   *   1. It's usually better to keep a connection open since opening
   *      a new connection is somewhat slow.
   *   2. Connections are automatically closed when the reference is
   *      garbage collected.
   * The primary use case for needing to close a connection is when another
   * reference (typically in another tab) needs to upgrade it and would be
   * blocked by the current, open connection.
   *
   * @private
   */


  close() {
    if (this._db) {
      this._db.close();

      this._db = null;
    }
  }

} // Exposed on the prototype to let users modify the default timeout on a
// per-instance or global basis.


exports.DBWrapper = DBWrapper;
DBWrapper.prototype.OPEN_TIMEOUT = 2000; // Wrap native IDBObjectStore methods according to their mode.

const methodsToWrap = {
  readonly: ['get', 'count', 'getKey', 'getAll', 'getAllKeys'],
  readwrite: ['add', 'put', 'clear', 'delete']
};

for (const [mode, methods] of Object.entries(methodsToWrap)) {
  for (const method of methods) {
    if (method in IDBObjectStore.prototype) {
      // Don't use arrow functions here since we're outside of the class.
      DBWrapper.prototype[method] = async function (storeName, ...args) {
        return await this._call(method, storeName, mode, ...args);
      };
    }
  }
}
},{"../_version.js":"node_modules/workbox-core/_version.js"}],"node_modules/workbox-core/_private/deleteDatabase.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteDatabase = void 0;

require("../_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Deletes the database.
 * Note: this is exported separately from the DBWrapper module because most
 * usages of IndexedDB in workbox dont need deleting, and this way it can be
 * reused in tests to delete databases without creating DBWrapper instances.
 *
 * @param {string} name The database name.
 * @private
 */
const deleteDatabase = async name => {
  await new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(name);

    request.onerror = () => {
      reject(request.error);
    };

    request.onblocked = () => {
      reject(new Error('Delete blocked'));
    };

    request.onsuccess = () => {
      resolve();
    };
  });
};

exports.deleteDatabase = deleteDatabase;
},{"../_version.js":"node_modules/workbox-core/_version.js"}],"node_modules/workbox-expiration/_version.js":[function(require,module,exports) {
"use strict";
// @ts-ignore
try {
    self['workbox:expiration:6.0.2'] && _();
}
catch (e) { }

},{}],"node_modules/workbox-expiration/models/CacheTimestampsModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheTimestampsModel = void 0;

var _DBWrapper = require("workbox-core/_private/DBWrapper.js");

var _deleteDatabase = require("workbox-core/_private/deleteDatabase.js");

require("../_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const DB_NAME = 'workbox-expiration';
const OBJECT_STORE_NAME = 'cache-entries';

const normalizeURL = unNormalizedUrl => {
  const url = new URL(unNormalizedUrl, location.href);
  url.hash = '';
  return url.href;
};
/**
 * Returns the timestamp model.
 *
 * @private
 */


class CacheTimestampsModel {
  /**
   *
   * @param {string} cacheName
   *
   * @private
   */
  constructor(cacheName) {
    this._cacheName = cacheName;
    this._db = new _DBWrapper.DBWrapper(DB_NAME, 1, {
      onupgradeneeded: event => this._handleUpgrade(event)
    });
  }
  /**
   * Should perform an upgrade of indexedDB.
   *
   * @param {Event} event
   *
   * @private
   */


  _handleUpgrade(event) {
    const db = event.target.result; // TODO(philipwalton): EdgeHTML doesn't support arrays as a keyPath, so we
    // have to use the `id` keyPath here and create our own values (a
    // concatenation of `url + cacheName`) instead of simply using
    // `keyPath: ['url', 'cacheName']`, which is supported in other browsers.

    const objStore = db.createObjectStore(OBJECT_STORE_NAME, {
      keyPath: 'id'
    }); // TODO(philipwalton): once we don't have to support EdgeHTML, we can
    // create a single index with the keyPath `['cacheName', 'timestamp']`
    // instead of doing both these indexes.

    objStore.createIndex('cacheName', 'cacheName', {
      unique: false
    });
    objStore.createIndex('timestamp', 'timestamp', {
      unique: false
    }); // Previous versions of `workbox-expiration` used `this._cacheName`
    // as the IDBDatabase name.

    (0, _deleteDatabase.deleteDatabase)(this._cacheName);
  }
  /**
   * @param {string} url
   * @param {number} timestamp
   *
   * @private
   */


  async setTimestamp(url, timestamp) {
    url = normalizeURL(url);
    const entry = {
      url,
      timestamp,
      cacheName: this._cacheName,
      // Creating an ID from the URL and cache name won't be necessary once
      // Edge switches to Chromium and all browsers we support work with
      // array keyPaths.
      id: this._getId(url)
    };
    await this._db.put(OBJECT_STORE_NAME, entry);
  }
  /**
   * Returns the timestamp stored for a given URL.
   *
   * @param {string} url
   * @return {number}
   *
   * @private
   */


  async getTimestamp(url) {
    const entry = await this._db.get(OBJECT_STORE_NAME, this._getId(url));
    return entry.timestamp;
  }
  /**
   * Iterates through all the entries in the object store (from newest to
   * oldest) and removes entries once either `maxCount` is reached or the
   * entry's timestamp is less than `minTimestamp`.
   *
   * @param {number} minTimestamp
   * @param {number} maxCount
   * @return {Array<string>}
   *
   * @private
   */


  async expireEntries(minTimestamp, maxCount) {
    const entriesToDelete = await this._db.transaction(OBJECT_STORE_NAME, 'readwrite', (txn, done) => {
      const store = txn.objectStore(OBJECT_STORE_NAME);
      const request = store.index('timestamp').openCursor(null, 'prev');
      const entriesToDelete = [];
      let entriesNotDeletedCount = 0;

      request.onsuccess = () => {
        const cursor = request.result;

        if (cursor) {
          const result = cursor.value; // TODO(philipwalton): once we can use a multi-key index, we
          // won't have to check `cacheName` here.

          if (result.cacheName === this._cacheName) {
            // Delete an entry if it's older than the max age or
            // if we already have the max number allowed.
            if (minTimestamp && result.timestamp < minTimestamp || maxCount && entriesNotDeletedCount >= maxCount) {
              // TODO(philipwalton): we should be able to delete the
              // entry right here, but doing so causes an iteration
              // bug in Safari stable (fixed in TP). Instead we can
              // store the keys of the entries to delete, and then
              // delete the separate transactions.
              // https://github.com/GoogleChrome/workbox/issues/1978
              // cursor.delete();
              // We only need to return the URL, not the whole entry.
              entriesToDelete.push(cursor.value);
            } else {
              entriesNotDeletedCount++;
            }
          }

          cursor.continue();
        } else {
          done(entriesToDelete);
        }
      };
    }); // TODO(philipwalton): once the Safari bug in the following issue is fixed,
    // we should be able to remove this loop and do the entry deletion in the
    // cursor loop above:
    // https://github.com/GoogleChrome/workbox/issues/1978

    const urlsDeleted = [];

    for (const entry of entriesToDelete) {
      await this._db.delete(OBJECT_STORE_NAME, entry.id);
      urlsDeleted.push(entry.url);
    }

    return urlsDeleted;
  }
  /**
   * Takes a URL and returns an ID that will be unique in the object store.
   *
   * @param {string} url
   * @return {string}
   *
   * @private
   */


  _getId(url) {
    // Creating an ID from the URL and cache name won't be necessary once
    // Edge switches to Chromium and all browsers we support work with
    // array keyPaths.
    return this._cacheName + '|' + normalizeURL(url);
  }

}

exports.CacheTimestampsModel = CacheTimestampsModel;
},{"workbox-core/_private/DBWrapper.js":"node_modules/workbox-core/_private/DBWrapper.js","workbox-core/_private/deleteDatabase.js":"node_modules/workbox-core/_private/deleteDatabase.js","../_version.js":"node_modules/workbox-expiration/_version.js"}],"node_modules/workbox-expiration/CacheExpiration.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheExpiration = void 0;

var _assert = require("workbox-core/_private/assert.js");

var _dontWaitFor = require("workbox-core/_private/dontWaitFor.js");

var _logger = require("workbox-core/_private/logger.js");

var _WorkboxError = require("workbox-core/_private/WorkboxError.js");

var _CacheTimestampsModel = require("./models/CacheTimestampsModel.js");

require("./_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * The `CacheExpiration` class allows you define an expiration and / or
 * limit on the number of responses stored in a
 * [`Cache`](https://developer.mozilla.org/en-US/docs/Web/API/Cache).
 *
 * @memberof module:workbox-expiration
 */
class CacheExpiration {
  /**
   * To construct a new CacheExpiration instance you must provide at least
   * one of the `config` properties.
   *
   * @param {string} cacheName Name of the cache to apply restrictions to.
   * @param {Object} config
   * @param {number} [config.maxEntries] The maximum number of entries to cache.
   * Entries used the least will be removed as the maximum is reached.
   * @param {number} [config.maxAgeSeconds] The maximum age of an entry before
   * it's treated as stale and removed.
   * @param {Object} [config.matchOptions] The [`CacheQueryOptions`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/delete#Parameters)
   * that will be used when calling `delete()` on the cache.
   */
  constructor(cacheName, config = {}) {
    this._isRunning = false;
    this._rerunRequested = false;

    if ("development" !== 'production') {
      _assert.assert.isType(cacheName, 'string', {
        moduleName: 'workbox-expiration',
        className: 'CacheExpiration',
        funcName: 'constructor',
        paramName: 'cacheName'
      });

      if (!(config.maxEntries || config.maxAgeSeconds)) {
        throw new _WorkboxError.WorkboxError('max-entries-or-age-required', {
          moduleName: 'workbox-expiration',
          className: 'CacheExpiration',
          funcName: 'constructor'
        });
      }

      if (config.maxEntries) {
        _assert.assert.isType(config.maxEntries, 'number', {
          moduleName: 'workbox-expiration',
          className: 'CacheExpiration',
          funcName: 'constructor',
          paramName: 'config.maxEntries'
        });
      }

      if (config.maxAgeSeconds) {
        _assert.assert.isType(config.maxAgeSeconds, 'number', {
          moduleName: 'workbox-expiration',
          className: 'CacheExpiration',
          funcName: 'constructor',
          paramName: 'config.maxAgeSeconds'
        });
      }
    }

    this._maxEntries = config.maxEntries;
    this._maxAgeSeconds = config.maxAgeSeconds;
    this._matchOptions = config.matchOptions;
    this._cacheName = cacheName;
    this._timestampModel = new _CacheTimestampsModel.CacheTimestampsModel(cacheName);
  }
  /**
   * Expires entries for the given cache and given criteria.
   */


  async expireEntries() {
    if (this._isRunning) {
      this._rerunRequested = true;
      return;
    }

    this._isRunning = true;
    const minTimestamp = this._maxAgeSeconds ? Date.now() - this._maxAgeSeconds * 1000 : 0;
    const urlsExpired = await this._timestampModel.expireEntries(minTimestamp, this._maxEntries); // Delete URLs from the cache

    const cache = await self.caches.open(this._cacheName);

    for (const url of urlsExpired) {
      await cache.delete(url, this._matchOptions);
    }

    if ("development" !== 'production') {
      if (urlsExpired.length > 0) {
        _logger.logger.groupCollapsed(`Expired ${urlsExpired.length} ` + `${urlsExpired.length === 1 ? 'entry' : 'entries'} and removed ` + `${urlsExpired.length === 1 ? 'it' : 'them'} from the ` + `'${this._cacheName}' cache.`);

        _logger.logger.log(`Expired the following ${urlsExpired.length === 1 ? 'URL' : 'URLs'}:`);

        urlsExpired.forEach(url => _logger.logger.log(`    ${url}`));

        _logger.logger.groupEnd();
      } else {
        _logger.logger.debug(`Cache expiration ran and found no entries to remove.`);
      }
    }

    this._isRunning = false;

    if (this._rerunRequested) {
      this._rerunRequested = false;
      (0, _dontWaitFor.dontWaitFor)(this.expireEntries());
    }
  }
  /**
   * Update the timestamp for the given URL. This ensures the when
   * removing entries based on maximum entries, most recently used
   * is accurate or when expiring, the timestamp is up-to-date.
   *
   * @param {string} url
   */


  async updateTimestamp(url) {
    if ("development" !== 'production') {
      _assert.assert.isType(url, 'string', {
        moduleName: 'workbox-expiration',
        className: 'CacheExpiration',
        funcName: 'updateTimestamp',
        paramName: 'url'
      });
    }

    await this._timestampModel.setTimestamp(url, Date.now());
  }
  /**
   * Can be used to check if a URL has expired or not before it's used.
   *
   * This requires a look up from IndexedDB, so can be slow.
   *
   * Note: This method will not remove the cached entry, call
   * `expireEntries()` to remove indexedDB and Cache entries.
   *
   * @param {string} url
   * @return {boolean}
   */


  async isURLExpired(url) {
    if (!this._maxAgeSeconds) {
      if ("development" !== 'production') {
        throw new _WorkboxError.WorkboxError(`expired-test-without-max-age`, {
          methodName: 'isURLExpired',
          paramName: 'maxAgeSeconds'
        });
      }

      return false;
    } else {
      const timestamp = await this._timestampModel.getTimestamp(url);
      const expireOlderThan = Date.now() - this._maxAgeSeconds * 1000;
      return timestamp < expireOlderThan;
    }
  }
  /**
   * Removes the IndexedDB object store used to keep track of cache expiration
   * metadata.
   */


  async delete() {
    // Make sure we don't attempt another rerun if we're called in the middle of
    // a cache expiration.
    this._rerunRequested = false;
    await this._timestampModel.expireEntries(Infinity); // Expires all.
  }

}

exports.CacheExpiration = CacheExpiration;
},{"workbox-core/_private/assert.js":"node_modules/workbox-core/_private/assert.js","workbox-core/_private/dontWaitFor.js":"node_modules/workbox-core/_private/dontWaitFor.js","workbox-core/_private/logger.js":"node_modules/workbox-core/_private/logger.js","workbox-core/_private/WorkboxError.js":"node_modules/workbox-core/_private/WorkboxError.js","./models/CacheTimestampsModel.js":"node_modules/workbox-expiration/models/CacheTimestampsModel.js","./_version.js":"node_modules/workbox-expiration/_version.js"}],"node_modules/workbox-core/registerQuotaErrorCallback.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerQuotaErrorCallback = registerQuotaErrorCallback;

var _logger = require("./_private/logger.js");

var _assert = require("./_private/assert.js");

var _quotaErrorCallbacks = require("./models/quotaErrorCallbacks.js");

require("./_version.js");

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Adds a function to the set of quotaErrorCallbacks that will be executed if
 * there's a quota error.
 *
 * @param {Function} callback
 * @memberof module:workbox-core
 */
function registerQuotaErrorCallback(callback) {
  if ("development" !== 'production') {
    _assert.assert.isType(callback, 'function', {
      moduleName: 'workbox-core',
      funcName: 'register',
      paramName: 'callback'
    });
  }

  _quotaErrorCallbacks.quotaErrorCallbacks.add(callback);

  if ("development" !== 'production') {
    _logger.logger.log('Registered a callback to respond to quota errors.', callback);
  }
}
},{"./_private/logger.js":"node_modules/workbox-core/_private/logger.js","./_private/assert.js":"node_modules/workbox-core/_private/assert.js","./models/quotaErrorCallbacks.js":"node_modules/workbox-core/models/quotaErrorCallbacks.js","./_version.js":"node_modules/workbox-core/_version.js"}],"node_modules/workbox-expiration/ExpirationPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpirationPlugin = void 0;

var _assert = require("workbox-core/_private/assert.js");

var _cacheNames = require("workbox-core/_private/cacheNames.js");

var _dontWaitFor = require("workbox-core/_private/dontWaitFor.js");

var _getFriendlyURL = require("workbox-core/_private/getFriendlyURL.js");

var _logger = require("workbox-core/_private/logger.js");

var _registerQuotaErrorCallback = require("workbox-core/registerQuotaErrorCallback.js");

var _WorkboxError = require("workbox-core/_private/WorkboxError.js");

var _CacheExpiration = require("./CacheExpiration.js");

require("./_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * This plugin can be used in a `workbox-strategy` to regularly enforce a
 * limit on the age and / or the number of cached requests.
 *
 * It can only be used with `workbox-strategy` instances that have a
 * [custom `cacheName` property set](/web/tools/workbox/guides/configure-workbox#custom_cache_names_in_strategies).
 * In other words, it can't be used to expire entries in strategy that uses the
 * default runtime cache name.
 *
 * Whenever a cached request is used or updated, this plugin will look
 * at the associated cache and remove any old or extra requests.
 *
 * When using `maxAgeSeconds`, requests may be used *once* after expiring
 * because the expiration clean up will not have occurred until *after* the
 * cached request has been used. If the request has a "Date" header, then
 * a light weight expiration check is performed and the request will not be
 * used immediately.
 *
 * When using `maxEntries`, the entry least-recently requested will be removed
 * from the cache first.
 *
 * @memberof module:workbox-expiration
 */
class ExpirationPlugin {
  /**
   * @param {Object} config
   * @param {number} [config.maxEntries] The maximum number of entries to cache.
   * Entries used the least will be removed as the maximum is reached.
   * @param {number} [config.maxAgeSeconds] The maximum age of an entry before
   * it's treated as stale and removed.
   * @param {Object} [config.matchOptions] The [`CacheQueryOptions`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/delete#Parameters)
   * that will be used when calling `delete()` on the cache.
   * @param {boolean} [config.purgeOnQuotaError] Whether to opt this cache in to
   * automatic deletion if the available storage quota has been exceeded.
   */
  constructor(config = {}) {
    /**
     * A "lifecycle" callback that will be triggered automatically by the
     * `workbox-strategies` handlers when a `Response` is about to be returned
     * from a [Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache) to
     * the handler. It allows the `Response` to be inspected for freshness and
     * prevents it from being used if the `Response`'s `Date` header value is
     * older than the configured `maxAgeSeconds`.
     *
     * @param {Object} options
     * @param {string} options.cacheName Name of the cache the response is in.
     * @param {Response} options.cachedResponse The `Response` object that's been
     *     read from a cache and whose freshness should be checked.
     * @return {Response} Either the `cachedResponse`, if it's
     *     fresh, or `null` if the `Response` is older than `maxAgeSeconds`.
     *
     * @private
     */
    this.cachedResponseWillBeUsed = async ({
      event,
      request,
      cacheName,
      cachedResponse
    }) => {
      if (!cachedResponse) {
        return null;
      }

      const isFresh = this._isResponseDateFresh(cachedResponse); // Expire entries to ensure that even if the expiration date has
      // expired, it'll only be used once.


      const cacheExpiration = this._getCacheExpiration(cacheName);

      (0, _dontWaitFor.dontWaitFor)(cacheExpiration.expireEntries()); // Update the metadata for the request URL to the current timestamp,
      // but don't `await` it as we don't want to block the response.

      const updateTimestampDone = cacheExpiration.updateTimestamp(request.url);

      if (event) {
        try {
          event.waitUntil(updateTimestampDone);
        } catch (error) {
          if ("development" !== 'production') {
            // The event may not be a fetch event; only log the URL if it is.
            if ('request' in event) {
              _logger.logger.warn(`Unable to ensure service worker stays alive when ` + `updating cache entry for ` + `'${(0, _getFriendlyURL.getFriendlyURL)(event.request.url)}'.`);
            }
          }
        }
      }

      return isFresh ? cachedResponse : null;
    };
    /**
     * A "lifecycle" callback that will be triggered automatically by the
     * `workbox-strategies` handlers when an entry is added to a cache.
     *
     * @param {Object} options
     * @param {string} options.cacheName Name of the cache that was updated.
     * @param {string} options.request The Request for the cached entry.
     *
     * @private
     */


    this.cacheDidUpdate = async ({
      cacheName,
      request
    }) => {
      if ("development" !== 'production') {
        _assert.assert.isType(cacheName, 'string', {
          moduleName: 'workbox-expiration',
          className: 'Plugin',
          funcName: 'cacheDidUpdate',
          paramName: 'cacheName'
        });

        _assert.assert.isInstance(request, Request, {
          moduleName: 'workbox-expiration',
          className: 'Plugin',
          funcName: 'cacheDidUpdate',
          paramName: 'request'
        });
      }

      const cacheExpiration = this._getCacheExpiration(cacheName);

      await cacheExpiration.updateTimestamp(request.url);
      await cacheExpiration.expireEntries();
    };

    if ("development" !== 'production') {
      if (!(config.maxEntries || config.maxAgeSeconds)) {
        throw new _WorkboxError.WorkboxError('max-entries-or-age-required', {
          moduleName: 'workbox-expiration',
          className: 'Plugin',
          funcName: 'constructor'
        });
      }

      if (config.maxEntries) {
        _assert.assert.isType(config.maxEntries, 'number', {
          moduleName: 'workbox-expiration',
          className: 'Plugin',
          funcName: 'constructor',
          paramName: 'config.maxEntries'
        });
      }

      if (config.maxAgeSeconds) {
        _assert.assert.isType(config.maxAgeSeconds, 'number', {
          moduleName: 'workbox-expiration',
          className: 'Plugin',
          funcName: 'constructor',
          paramName: 'config.maxAgeSeconds'
        });
      }
    }

    this._config = config;
    this._maxAgeSeconds = config.maxAgeSeconds;
    this._cacheExpirations = new Map();

    if (config.purgeOnQuotaError) {
      (0, _registerQuotaErrorCallback.registerQuotaErrorCallback)(() => this.deleteCacheAndMetadata());
    }
  }
  /**
   * A simple helper method to return a CacheExpiration instance for a given
   * cache name.
   *
   * @param {string} cacheName
   * @return {CacheExpiration}
   *
   * @private
   */


  _getCacheExpiration(cacheName) {
    if (cacheName === _cacheNames.cacheNames.getRuntimeName()) {
      throw new _WorkboxError.WorkboxError('expire-custom-caches-only');
    }

    let cacheExpiration = this._cacheExpirations.get(cacheName);

    if (!cacheExpiration) {
      cacheExpiration = new _CacheExpiration.CacheExpiration(cacheName, this._config);

      this._cacheExpirations.set(cacheName, cacheExpiration);
    }

    return cacheExpiration;
  }
  /**
   * @param {Response} cachedResponse
   * @return {boolean}
   *
   * @private
   */


  _isResponseDateFresh(cachedResponse) {
    if (!this._maxAgeSeconds) {
      // We aren't expiring by age, so return true, it's fresh
      return true;
    } // Check if the 'date' header will suffice a quick expiration check.
    // See https://github.com/GoogleChromeLabs/sw-toolbox/issues/164 for
    // discussion.


    const dateHeaderTimestamp = this._getDateHeaderTimestamp(cachedResponse);

    if (dateHeaderTimestamp === null) {
      // Unable to parse date, so assume it's fresh.
      return true;
    } // If we have a valid headerTime, then our response is fresh iff the
    // headerTime plus maxAgeSeconds is greater than the current time.


    const now = Date.now();
    return dateHeaderTimestamp >= now - this._maxAgeSeconds * 1000;
  }
  /**
   * This method will extract the data header and parse it into a useful
   * value.
   *
   * @param {Response} cachedResponse
   * @return {number|null}
   *
   * @private
   */


  _getDateHeaderTimestamp(cachedResponse) {
    if (!cachedResponse.headers.has('date')) {
      return null;
    }

    const dateHeader = cachedResponse.headers.get('date');
    const parsedDate = new Date(dateHeader);
    const headerTime = parsedDate.getTime(); // If the Date header was invalid for some reason, parsedDate.getTime()
    // will return NaN.

    if (isNaN(headerTime)) {
      return null;
    }

    return headerTime;
  }
  /**
   * This is a helper method that performs two operations:
   *
   * - Deletes *all* the underlying Cache instances associated with this plugin
   * instance, by calling caches.delete() on your behalf.
   * - Deletes the metadata from IndexedDB used to keep track of expiration
   * details for each Cache instance.
   *
   * When using cache expiration, calling this method is preferable to calling
   * `caches.delete()` directly, since this will ensure that the IndexedDB
   * metadata is also cleanly removed and open IndexedDB instances are deleted.
   *
   * Note that if you're *not* using cache expiration for a given cache, calling
   * `caches.delete()` and passing in the cache's name should be sufficient.
   * There is no Workbox-specific method needed for cleanup in that case.
   */


  async deleteCacheAndMetadata() {
    // Do this one at a time instead of all at once via `Promise.all()` to
    // reduce the chance of inconsistency if a promise rejects.
    for (const [cacheName, cacheExpiration] of this._cacheExpirations) {
      await self.caches.delete(cacheName);
      await cacheExpiration.delete();
    } // Reset this._cacheExpirations to its initial state.


    this._cacheExpirations = new Map();
  }

}

exports.ExpirationPlugin = ExpirationPlugin;
},{"workbox-core/_private/assert.js":"node_modules/workbox-core/_private/assert.js","workbox-core/_private/cacheNames.js":"node_modules/workbox-core/_private/cacheNames.js","workbox-core/_private/dontWaitFor.js":"node_modules/workbox-core/_private/dontWaitFor.js","workbox-core/_private/getFriendlyURL.js":"node_modules/workbox-core/_private/getFriendlyURL.js","workbox-core/_private/logger.js":"node_modules/workbox-core/_private/logger.js","workbox-core/registerQuotaErrorCallback.js":"node_modules/workbox-core/registerQuotaErrorCallback.js","workbox-core/_private/WorkboxError.js":"node_modules/workbox-core/_private/WorkboxError.js","./CacheExpiration.js":"node_modules/workbox-expiration/CacheExpiration.js","./_version.js":"node_modules/workbox-expiration/_version.js"}],"node_modules/workbox-expiration/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CacheExpiration", {
  enumerable: true,
  get: function () {
    return _CacheExpiration.CacheExpiration;
  }
});
Object.defineProperty(exports, "ExpirationPlugin", {
  enumerable: true,
  get: function () {
    return _ExpirationPlugin.ExpirationPlugin;
  }
});

var _CacheExpiration = require("./CacheExpiration.js");

var _ExpirationPlugin = require("./ExpirationPlugin.js");

require("./_version.js");
},{"./CacheExpiration.js":"node_modules/workbox-expiration/CacheExpiration.js","./ExpirationPlugin.js":"node_modules/workbox-expiration/ExpirationPlugin.js","./_version.js":"node_modules/workbox-expiration/_version.js"}],"node_modules/workbox-expiration/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("./index.js");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});
},{"./index.js":"node_modules/workbox-expiration/index.js"}],"node_modules/workbox-range-requests/_version.js":[function(require,module,exports) {
"use strict";
// @ts-ignore
try {
    self['workbox:range-requests:6.0.2'] && _();
}
catch (e) { }

},{}],"node_modules/workbox-range-requests/utils/calculateEffectiveBoundaries.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateEffectiveBoundaries = calculateEffectiveBoundaries;

var _WorkboxError = require("workbox-core/_private/WorkboxError.js");

var _assert = require("workbox-core/_private/assert.js");

require("../_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * @param {Blob} blob A source blob.
 * @param {number} [start] The offset to use as the start of the
 * slice.
 * @param {number} [end] The offset to use as the end of the slice.
 * @return {Object} An object with `start` and `end` properties, reflecting
 * the effective boundaries to use given the size of the blob.
 *
 * @private
 */
function calculateEffectiveBoundaries(blob, start, end) {
  if ("development" !== 'production') {
    _assert.assert.isInstance(blob, Blob, {
      moduleName: 'workbox-range-requests',
      funcName: 'calculateEffectiveBoundaries',
      paramName: 'blob'
    });
  }

  const blobSize = blob.size;

  if (end && end > blobSize || start && start < 0) {
    throw new _WorkboxError.WorkboxError('range-not-satisfiable', {
      size: blobSize,
      end,
      start
    });
  }

  let effectiveStart;
  let effectiveEnd;

  if (start !== undefined && end !== undefined) {
    effectiveStart = start; // Range values are inclusive, so add 1 to the value.

    effectiveEnd = end + 1;
  } else if (start !== undefined && end === undefined) {
    effectiveStart = start;
    effectiveEnd = blobSize;
  } else if (end !== undefined && start === undefined) {
    effectiveStart = blobSize - end;
    effectiveEnd = blobSize;
  }

  return {
    start: effectiveStart,
    end: effectiveEnd
  };
}
},{"workbox-core/_private/WorkboxError.js":"node_modules/workbox-core/_private/WorkboxError.js","workbox-core/_private/assert.js":"node_modules/workbox-core/_private/assert.js","../_version.js":"node_modules/workbox-range-requests/_version.js"}],"node_modules/workbox-range-requests/utils/parseRangeHeader.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseRangeHeader = parseRangeHeader;

var _WorkboxError = require("workbox-core/_private/WorkboxError.js");

var _assert = require("workbox-core/_private/assert.js");

require("../_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * @param {string} rangeHeader A Range: header value.
 * @return {Object} An object with `start` and `end` properties, reflecting
 * the parsed value of the Range: header. If either the `start` or `end` are
 * omitted, then `null` will be returned.
 *
 * @private
 */
function parseRangeHeader(rangeHeader) {
  if ("development" !== 'production') {
    _assert.assert.isType(rangeHeader, 'string', {
      moduleName: 'workbox-range-requests',
      funcName: 'parseRangeHeader',
      paramName: 'rangeHeader'
    });
  }

  const normalizedRangeHeader = rangeHeader.trim().toLowerCase();

  if (!normalizedRangeHeader.startsWith('bytes=')) {
    throw new _WorkboxError.WorkboxError('unit-must-be-bytes', {
      normalizedRangeHeader
    });
  } // Specifying multiple ranges separate by commas is valid syntax, but this
  // library only attempts to handle a single, contiguous sequence of bytes.
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range#Syntax


  if (normalizedRangeHeader.includes(',')) {
    throw new _WorkboxError.WorkboxError('single-range-only', {
      normalizedRangeHeader
    });
  }

  const rangeParts = /(\d*)-(\d*)/.exec(normalizedRangeHeader); // We need either at least one of the start or end values.

  if (!rangeParts || !(rangeParts[1] || rangeParts[2])) {
    throw new _WorkboxError.WorkboxError('invalid-range-values', {
      normalizedRangeHeader
    });
  }

  return {
    start: rangeParts[1] === '' ? undefined : Number(rangeParts[1]),
    end: rangeParts[2] === '' ? undefined : Number(rangeParts[2])
  };
}
},{"workbox-core/_private/WorkboxError.js":"node_modules/workbox-core/_private/WorkboxError.js","workbox-core/_private/assert.js":"node_modules/workbox-core/_private/assert.js","../_version.js":"node_modules/workbox-range-requests/_version.js"}],"node_modules/workbox-range-requests/createPartialResponse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPartialResponse = createPartialResponse;

var _WorkboxError = require("workbox-core/_private/WorkboxError.js");

var _assert = require("workbox-core/_private/assert.js");

var _logger = require("workbox-core/_private/logger.js");

var _calculateEffectiveBoundaries = require("./utils/calculateEffectiveBoundaries.js");

var _parseRangeHeader = require("./utils/parseRangeHeader.js");

require("./_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Given a `Request` and `Response` objects as input, this will return a
 * promise for a new `Response`.
 *
 * If the original `Response` already contains partial content (i.e. it has
 * a status of 206), then this assumes it already fulfills the `Range:`
 * requirements, and will return it as-is.
 *
 * @param {Request} request A request, which should contain a Range:
 * header.
 * @param {Response} originalResponse A response.
 * @return {Promise<Response>} Either a `206 Partial Content` response, with
 * the response body set to the slice of content specified by the request's
 * `Range:` header, or a `416 Range Not Satisfiable` response if the
 * conditions of the `Range:` header can't be met.
 *
 * @memberof module:workbox-range-requests
 */
async function createPartialResponse(request, originalResponse) {
  try {
    if ("development" !== 'production') {
      _assert.assert.isInstance(request, Request, {
        moduleName: 'workbox-range-requests',
        funcName: 'createPartialResponse',
        paramName: 'request'
      });

      _assert.assert.isInstance(originalResponse, Response, {
        moduleName: 'workbox-range-requests',
        funcName: 'createPartialResponse',
        paramName: 'originalResponse'
      });
    }

    if (originalResponse.status === 206) {
      // If we already have a 206, then just pass it through as-is;
      // see https://github.com/GoogleChrome/workbox/issues/1720
      return originalResponse;
    }

    const rangeHeader = request.headers.get('range');

    if (!rangeHeader) {
      throw new _WorkboxError.WorkboxError('no-range-header');
    }

    const boundaries = (0, _parseRangeHeader.parseRangeHeader)(rangeHeader);
    const originalBlob = await originalResponse.blob();
    const effectiveBoundaries = (0, _calculateEffectiveBoundaries.calculateEffectiveBoundaries)(originalBlob, boundaries.start, boundaries.end);
    const slicedBlob = originalBlob.slice(effectiveBoundaries.start, effectiveBoundaries.end);
    const slicedBlobSize = slicedBlob.size;
    const slicedResponse = new Response(slicedBlob, {
      // Status code 206 is for a Partial Content response.
      // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206
      status: 206,
      statusText: 'Partial Content',
      headers: originalResponse.headers
    });
    slicedResponse.headers.set('Content-Length', String(slicedBlobSize));
    slicedResponse.headers.set('Content-Range', `bytes ${effectiveBoundaries.start}-${effectiveBoundaries.end - 1}/` + originalBlob.size);
    return slicedResponse;
  } catch (error) {
    if ("development" !== 'production') {
      _logger.logger.warn(`Unable to construct a partial response; returning a ` + `416 Range Not Satisfiable response instead.`);

      _logger.logger.groupCollapsed(`View details here.`);

      _logger.logger.log(error);

      _logger.logger.log(request);

      _logger.logger.log(originalResponse);

      _logger.logger.groupEnd();
    }

    return new Response('', {
      status: 416,
      statusText: 'Range Not Satisfiable'
    });
  }
}
},{"workbox-core/_private/WorkboxError.js":"node_modules/workbox-core/_private/WorkboxError.js","workbox-core/_private/assert.js":"node_modules/workbox-core/_private/assert.js","workbox-core/_private/logger.js":"node_modules/workbox-core/_private/logger.js","./utils/calculateEffectiveBoundaries.js":"node_modules/workbox-range-requests/utils/calculateEffectiveBoundaries.js","./utils/parseRangeHeader.js":"node_modules/workbox-range-requests/utils/parseRangeHeader.js","./_version.js":"node_modules/workbox-range-requests/_version.js"}],"node_modules/workbox-range-requests/RangeRequestsPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeRequestsPlugin = void 0;

var _createPartialResponse = require("./createPartialResponse.js");

require("./_version.js");

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * The range request plugin makes it easy for a request with a 'Range' header to
 * be fulfilled by a cached response.
 *
 * It does this by intercepting the `cachedResponseWillBeUsed` plugin callback
 * and returning the appropriate subset of the cached response body.
 *
 * @memberof module:workbox-range-requests
 */
class RangeRequestsPlugin {
  constructor() {
    /**
     * @param {Object} options
     * @param {Request} options.request The original request, which may or may not
     * contain a Range: header.
     * @param {Response} options.cachedResponse The complete cached response.
     * @return {Promise<Response>} If request contains a 'Range' header, then a
     * new response with status 206 whose body is a subset of `cachedResponse` is
     * returned. Otherwise, `cachedResponse` is returned as-is.
     *
     * @private
     */
    this.cachedResponseWillBeUsed = async ({
      request,
      cachedResponse
    }) => {
      // Only return a sliced response if there's something valid in the cache,
      // and there's a Range: header in the request.
      if (cachedResponse && request.headers.has('range')) {
        return await (0, _createPartialResponse.createPartialResponse)(request, cachedResponse);
      } // If there was no Range: header, or if cachedResponse wasn't valid, just
      // pass it through as-is.


      return cachedResponse;
    };
  }

}

exports.RangeRequestsPlugin = RangeRequestsPlugin;
},{"./createPartialResponse.js":"node_modules/workbox-range-requests/createPartialResponse.js","./_version.js":"node_modules/workbox-range-requests/_version.js"}],"node_modules/workbox-range-requests/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createPartialResponse", {
  enumerable: true,
  get: function () {
    return _createPartialResponse.createPartialResponse;
  }
});
Object.defineProperty(exports, "RangeRequestsPlugin", {
  enumerable: true,
  get: function () {
    return _RangeRequestsPlugin.RangeRequestsPlugin;
  }
});

var _createPartialResponse = require("./createPartialResponse.js");

var _RangeRequestsPlugin = require("./RangeRequestsPlugin.js");

require("./_version.js");
},{"./createPartialResponse.js":"node_modules/workbox-range-requests/createPartialResponse.js","./RangeRequestsPlugin.js":"node_modules/workbox-range-requests/RangeRequestsPlugin.js","./_version.js":"node_modules/workbox-range-requests/_version.js"}],"node_modules/workbox-range-requests/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("./index.js");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});
},{"./index.js":"node_modules/workbox-range-requests/index.js"}],"service-worker.js":[function(require,module,exports) {
"use strict";

var _workboxRouting = require("workbox-routing");

var _workboxStrategies = require("workbox-strategies");

var _workboxCacheableResponse = require("workbox-cacheable-response");

var _workboxExpiration = require("workbox-expiration");

var _workboxRangeRequests = require("workbox-range-requests");

// Used for filtering matches based on status code, header, or both
// Used to limit entries in cache, remove entries after a certain period of time

/*import { precacheAndRoute } from 'workbox-precaching';

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST);*/
// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
(0, _workboxRouting.registerRoute)(function (_ref) {
  var url = _ref.url;
  return url.origin === 'https://fonts.googleapis.com';
}, new _workboxStrategies.StaleWhileRevalidate({
  cacheName: 'google-fonts-stylesheets'
})); // Cache the underlying font files with a cache-first strategy for 1 year.

(0, _workboxRouting.registerRoute)(function (_ref2) {
  var url = _ref2.url;
  return url.origin === 'https://fonts.gstatic.com';
}, new _workboxStrategies.CacheFirst({
  cacheName: 'google-fonts-webfonts',
  plugins: [new _workboxCacheableResponse.CacheableResponsePlugin({
    statuses: [0, 200]
  }), new _workboxExpiration.ExpirationPlugin({
    maxAgeSeconds: 60 * 60 * 24 * 365,
    maxEntries: 30
  })]
})); // Cache page navigations (html) with a Network First strategy

(0, _workboxRouting.registerRoute)( // Check to see if the request is a navigation to a new page
function (_ref3) {
  var request = _ref3.request;
  return request.mode === 'navigate';
}, // Use a Network First caching strategy
new _workboxStrategies.NetworkFirst({
  // Put all cached files in a cache named 'pages'
  cacheName: 'pages',
  plugins: [// Ensure that only requests that result in a 200 status are cached
  new _workboxCacheableResponse.CacheableResponsePlugin({
    statuses: [200]
  })]
})); // In your service worker:
// It's up to you to either precache or explicitly call cache.add('movie.mp4')
// to populate the cache.
//
// This route will go against the network if there isn't a cache match,
// but it won't populate the cache at runtime.
// If there is a cache match, then it will properly serve partial responses.

(0, _workboxRouting.registerRoute)(function (_ref4) {
  var url = _ref4.url;
  return url.pathname.endsWith('.mp4');
}, new _workboxStrategies.NetworkFirst({
  cacheName: 'mp4-cache',
  plugins: [new _workboxCacheableResponse.CacheableResponsePlugin({
    statuses: [200]
  }), new _workboxRangeRequests.RangeRequestsPlugin()]
})); // Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy

(0, _workboxRouting.registerRoute)( // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
function (_ref5) {
  var request = _ref5.request;
  return request.destination === 'style' || request.destination === 'script' || request.destination === 'worker';
}, // Use a Stale While Revalidate caching strategy
new _workboxStrategies.StaleWhileRevalidate({
  // Put all cached files in a cache named 'assets'
  cacheName: 'assets',
  plugins: [// Ensure that only requests that result in a 200 status are cached
  new _workboxCacheableResponse.CacheableResponsePlugin({
    statuses: [200]
  })]
})); // Cache images with a Cache First strategy

(0, _workboxRouting.registerRoute)( // Check to see if the request's destination is style for an image
function (_ref6) {
  var request = _ref6.request,
      url = _ref6.url;
  return request.destination === 'image' && !url.pathname.endsWith('.mp4');
}, // Use a Cache First caching strategy
new _workboxStrategies.CacheFirst({
  // Put all cached files in a cache named 'images'
  cacheName: 'images',
  plugins: [// Ensure that only requests that result in a 200 status are cached
  new _workboxCacheableResponse.CacheableResponsePlugin({
    statuses: [200]
  }), // Don't cache more than 50 items, and expire them after 30 days
  new _workboxExpiration.ExpirationPlugin({
    maxEntries: 50,
    maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days

  })]
}));
},{"workbox-routing":"node_modules/workbox-routing/index.mjs","workbox-strategies":"node_modules/workbox-strategies/index.mjs","workbox-cacheable-response":"node_modules/workbox-cacheable-response/index.mjs","workbox-expiration":"node_modules/workbox-expiration/index.mjs","workbox-range-requests":"node_modules/workbox-range-requests/index.mjs"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52953" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","service-worker.js"], null)
//# sourceMappingURL=/service-worker.js.map