import { useReducedMotion, motion, AnimatePresence, LayoutGroup, useMotionValue, useTransform, useSpring, useMotionTemplate, useInView, animate, useScroll } from 'framer-motion';
import React9, { forwardRef, useState, useCallback, useId, createContext, useRef, useEffect, useLayoutEffect, useContext, useMemo } from 'react';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { createPortal } from 'react-dom';

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  __defProp(target, "default", { value: mod, enumerable: true }) ,
  mod
));

// node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs
var require_interop_require_wildcard = __commonJS({
  "node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs"(exports$1) {
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function") return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interop_require_wildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) return obj;
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) return cache.get(obj);
      var newObj = { __proto__: null };
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
          else newObj[key] = obj[key];
        }
      }
      newObj.default = obj;
      if (cache) cache.set(obj, newObj);
      return newObj;
    }
    exports$1._ = _interop_require_wildcard;
  }
});

// node_modules/next/dist/shared/lib/router/utils/querystring.js
var require_querystring = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/querystring.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports$1, {
      assign: function() {
        return assign;
      },
      searchParamsToUrlQuery: function() {
        return searchParamsToUrlQuery;
      },
      urlQueryToSearchParams: function() {
        return urlQueryToSearchParams;
      }
    });
    function searchParamsToUrlQuery(searchParams) {
      const query = {};
      for (const [key, value] of searchParams.entries()) {
        const existing = query[key];
        if (typeof existing === "undefined") {
          query[key] = value;
        } else if (Array.isArray(existing)) {
          existing.push(value);
        } else {
          query[key] = [
            existing,
            value
          ];
        }
      }
      return query;
    }
    function stringifyUrlQueryParam(param) {
      if (typeof param === "string") {
        return param;
      }
      if (typeof param === "number" && !isNaN(param) || typeof param === "boolean") {
        return String(param);
      } else {
        return "";
      }
    }
    function urlQueryToSearchParams(query) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(query)) {
        if (Array.isArray(value)) {
          for (const item of value) {
            searchParams.append(key, stringifyUrlQueryParam(item));
          }
        } else {
          searchParams.set(key, stringifyUrlQueryParam(value));
        }
      }
      return searchParams;
    }
    function assign(target, ...searchParamsList) {
      for (const searchParams of searchParamsList) {
        for (const key of searchParams.keys()) {
          target.delete(key);
        }
        for (const [key, value] of searchParams.entries()) {
          target.append(key, value);
        }
      }
      return target;
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/format-url.js
var require_format_url = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/format-url.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports$1, {
      formatUrl: function() {
        return formatUrl;
      },
      formatWithValidation: function() {
        return formatWithValidation;
      },
      urlObjectKeys: function() {
        return urlObjectKeys;
      }
    });
    var _interop_require_wildcard = require_interop_require_wildcard();
    var _querystring = /* @__PURE__ */ _interop_require_wildcard._(require_querystring());
    var slashedProtocols = /https?|ftp|gopher|file/;
    function formatUrl(urlObj) {
      let { auth, hostname } = urlObj;
      let protocol = urlObj.protocol || "";
      let pathname = urlObj.pathname || "";
      let hash = urlObj.hash || "";
      let query = urlObj.query || "";
      let host = false;
      auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ":") + "@" : "";
      if (urlObj.host) {
        host = auth + urlObj.host;
      } else if (hostname) {
        host = auth + (~hostname.indexOf(":") ? `[${hostname}]` : hostname);
        if (urlObj.port) {
          host += ":" + urlObj.port;
        }
      }
      if (query && typeof query === "object") {
        query = String(_querystring.urlQueryToSearchParams(query));
      }
      let search = urlObj.search || query && `?${query}` || "";
      if (protocol && !protocol.endsWith(":")) protocol += ":";
      if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = "//" + (host || "");
        if (pathname && pathname[0] !== "/") pathname = "/" + pathname;
      } else if (!host) {
        host = "";
      }
      if (hash && hash[0] !== "#") hash = "#" + hash;
      if (search && search[0] !== "?") search = "?" + search;
      pathname = pathname.replace(/[?#]/g, encodeURIComponent);
      search = search.replace("#", "%23");
      return `${protocol}${host}${pathname}${search}${hash}`;
    }
    var urlObjectKeys = [
      "auth",
      "hash",
      "host",
      "hostname",
      "href",
      "path",
      "pathname",
      "port",
      "protocol",
      "query",
      "search",
      "slashes"
    ];
    function formatWithValidation(url) {
      if (process.env.NODE_ENV === "development") {
        if (url !== null && typeof url === "object") {
          Object.keys(url).forEach((key) => {
            if (!urlObjectKeys.includes(key)) {
              console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
            }
          });
        }
      }
      return formatUrl(url);
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/omit.js
var require_omit = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/omit.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "omit", {
      enumerable: true,
      get: function() {
        return omit;
      }
    });
    function omit(object, keys) {
      const omitted = {};
      Object.keys(object).forEach((key) => {
        if (!keys.includes(key)) {
          omitted[key] = object[key];
        }
      });
      return omitted;
    }
  }
});

// node_modules/next/dist/shared/lib/utils.js
var require_utils = __commonJS({
  "node_modules/next/dist/shared/lib/utils.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports$1, {
      DecodeError: function() {
        return DecodeError;
      },
      MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
      },
      MissingStaticPage: function() {
        return MissingStaticPage;
      },
      NormalizeError: function() {
        return NormalizeError;
      },
      PageNotFoundError: function() {
        return PageNotFoundError;
      },
      SP: function() {
        return SP;
      },
      ST: function() {
        return ST;
      },
      WEB_VITALS: function() {
        return WEB_VITALS;
      },
      execOnce: function() {
        return execOnce;
      },
      getDisplayName: function() {
        return getDisplayName;
      },
      getLocationOrigin: function() {
        return getLocationOrigin;
      },
      getURL: function() {
        return getURL;
      },
      isAbsoluteUrl: function() {
        return isAbsoluteUrl;
      },
      isResSent: function() {
        return isResSent;
      },
      loadGetInitialProps: function() {
        return loadGetInitialProps;
      },
      normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
      },
      stringifyError: function() {
        return stringifyError;
      }
    });
    var WEB_VITALS = [
      "CLS",
      "FCP",
      "FID",
      "INP",
      "LCP",
      "TTFB"
    ];
    function execOnce(fn) {
      let used = false;
      let result;
      return (...args) => {
        if (!used) {
          used = true;
          result = fn(...args);
        }
        return result;
      };
    }
    var ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
    var isAbsoluteUrl = (url) => ABSOLUTE_URL_REGEX.test(url);
    function getLocationOrigin() {
      const { protocol, hostname, port } = window.location;
      return `${protocol}//${hostname}${port ? ":" + port : ""}`;
    }
    function getURL() {
      const { href } = window.location;
      const origin = getLocationOrigin();
      return href.substring(origin.length);
    }
    function getDisplayName(Component) {
      return typeof Component === "string" ? Component : Component.displayName || Component.name || "Unknown";
    }
    function isResSent(res) {
      return res.finished || res.headersSent;
    }
    function normalizeRepeatedSlashes(url) {
      const urlParts = url.split("?");
      const urlNoQuery = urlParts[0];
      return urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/") + (urlParts[1] ? `?${urlParts.slice(1).join("?")}` : "");
    }
    async function loadGetInitialProps(App, ctx) {
      if (process.env.NODE_ENV !== "production") {
        if (App.prototype?.getInitialProps) {
          const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
          throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
          });
        }
      }
      const res = ctx.res || ctx.ctx && ctx.ctx.res;
      if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
          return {
            pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
          };
        }
        return {};
      }
      const props = await App.getInitialProps(ctx);
      if (res && isResSent(res)) {
        return props;
      }
      if (!props) {
        const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
          value: "E394",
          enumerable: false,
          configurable: true
        });
      }
      if (process.env.NODE_ENV !== "production") {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
          console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
        }
      }
      return props;
    }
    var SP = typeof performance !== "undefined";
    var ST = SP && [
      "mark",
      "measure",
      "getEntriesByName"
    ].every((method) => typeof performance[method] === "function");
    var DecodeError = class extends Error {
    };
    var NormalizeError = class extends Error {
    };
    var PageNotFoundError = class extends Error {
      constructor(page) {
        super();
        this.code = "ENOENT";
        this.name = "PageNotFoundError";
        this.message = `Cannot find module for page: ${page}`;
      }
    };
    var MissingStaticPage = class extends Error {
      constructor(page, message) {
        super();
        this.message = `Failed to load static file for page: ${page} ${message}`;
      }
    };
    var MiddlewareNotFoundError = class extends Error {
      constructor() {
        super();
        this.code = "ENOENT";
        this.message = `Cannot find the middleware module`;
      }
    };
    function stringifyError(error) {
      return JSON.stringify({
        message: error.message,
        stack: error.stack
      });
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/remove-trailing-slash.js
var require_remove_trailing_slash = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/remove-trailing-slash.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "removeTrailingSlash", {
      enumerable: true,
      get: function() {
        return removeTrailingSlash;
      }
    });
    function removeTrailingSlash(route) {
      return route.replace(/\/$/, "") || "/";
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/parse-path.js
var require_parse_path = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/parse-path.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "parsePath", {
      enumerable: true,
      get: function() {
        return parsePath;
      }
    });
    function parsePath(path) {
      const hashIndex = path.indexOf("#");
      const queryIndex = path.indexOf("?");
      const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
      if (hasQuery || hashIndex > -1) {
        return {
          pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
          query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : void 0) : "",
          hash: hashIndex > -1 ? path.slice(hashIndex) : ""
        };
      }
      return {
        pathname: path,
        query: "",
        hash: ""
      };
    }
  }
});

// node_modules/next/dist/client/normalize-trailing-slash.js
var require_normalize_trailing_slash = __commonJS({
  "node_modules/next/dist/client/normalize-trailing-slash.js"(exports$1, module) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "normalizePathTrailingSlash", {
      enumerable: true,
      get: function() {
        return normalizePathTrailingSlash;
      }
    });
    var _removetrailingslash = require_remove_trailing_slash();
    var _parsepath = require_parse_path();
    var normalizePathTrailingSlash = (path) => {
      if (!path.startsWith("/") || process.env.__NEXT_MANUAL_TRAILING_SLASH) {
        return path;
      }
      const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
      if (process.env.__NEXT_TRAILING_SLASH) {
        if (/\.[^/]+\/?$/.test(pathname)) {
          return `${(0, _removetrailingslash.removeTrailingSlash)(pathname)}${query}${hash}`;
        } else if (pathname.endsWith("/")) {
          return `${pathname}${query}${hash}`;
        } else {
          return `${pathname}/${query}${hash}`;
        }
      }
      return `${(0, _removetrailingslash.removeTrailingSlash)(pathname)}${query}${hash}`;
    };
    if ((typeof exports$1.default === "function" || typeof exports$1.default === "object" && exports$1.default !== null) && typeof exports$1.default.__esModule === "undefined") {
      Object.defineProperty(exports$1.default, "__esModule", { value: true });
      Object.assign(exports$1.default, exports$1);
      module.exports = exports$1.default;
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js
var require_path_has_prefix = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "pathHasPrefix", {
      enumerable: true,
      get: function() {
        return pathHasPrefix;
      }
    });
    var _parsepath = require_parse_path();
    function pathHasPrefix(path, prefix) {
      if (typeof path !== "string") {
        return false;
      }
      const { pathname } = (0, _parsepath.parsePath)(path);
      return pathname === prefix || pathname.startsWith(prefix + "/");
    }
  }
});

// node_modules/next/dist/client/has-base-path.js
var require_has_base_path = __commonJS({
  "node_modules/next/dist/client/has-base-path.js"(exports$1, module) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "hasBasePath", {
      enumerable: true,
      get: function() {
        return hasBasePath;
      }
    });
    var _pathhasprefix = require_path_has_prefix();
    var basePath = process.env.__NEXT_ROUTER_BASEPATH || "";
    function hasBasePath(path) {
      return (0, _pathhasprefix.pathHasPrefix)(path, basePath);
    }
    if ((typeof exports$1.default === "function" || typeof exports$1.default === "object" && exports$1.default !== null) && typeof exports$1.default.__esModule === "undefined") {
      Object.defineProperty(exports$1.default, "__esModule", { value: true });
      Object.assign(exports$1.default, exports$1);
      module.exports = exports$1.default;
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/is-local-url.js
var require_is_local_url = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/is-local-url.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "isLocalURL", {
      enumerable: true,
      get: function() {
        return isLocalURL;
      }
    });
    var _utils = require_utils();
    var _hasbasepath = require_has_base_path();
    function isLocalURL(url) {
      if (!(0, _utils.isAbsoluteUrl)(url)) return true;
      try {
        const locationOrigin = (0, _utils.getLocationOrigin)();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
      } catch (_) {
        return false;
      }
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/sorted-routes.js
var require_sorted_routes = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/sorted-routes.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports$1, {
      getSortedRouteObjects: function() {
        return getSortedRouteObjects;
      },
      getSortedRoutes: function() {
        return getSortedRoutes;
      }
    });
    var UrlNode = class _UrlNode {
      insert(urlPath) {
        this._insert(urlPath.split("/").filter(Boolean), [], false);
      }
      smoosh() {
        return this._smoosh();
      }
      _smoosh(prefix = "/") {
        const childrenPaths = [
          ...this.children.keys()
        ].sort();
        if (this.slugName !== null) {
          childrenPaths.splice(childrenPaths.indexOf("[]"), 1);
        }
        if (this.restSlugName !== null) {
          childrenPaths.splice(childrenPaths.indexOf("[...]"), 1);
        }
        if (this.optionalRestSlugName !== null) {
          childrenPaths.splice(childrenPaths.indexOf("[[...]]"), 1);
        }
        const routes = childrenPaths.map((c) => this.children.get(c)._smoosh(`${prefix}${c}/`)).reduce((prev, curr) => [
          ...prev,
          ...curr
        ], []);
        if (this.slugName !== null) {
          routes.push(...this.children.get("[]")._smoosh(`${prefix}[${this.slugName}]/`));
        }
        if (!this.placeholder) {
          const r = prefix === "/" ? "/" : prefix.slice(0, -1);
          if (this.optionalRestSlugName != null) {
            throw Object.defineProperty(new Error(`You cannot define a route with the same specificity as a optional catch-all route ("${r}" and "${r}[[...${this.optionalRestSlugName}]]").`), "__NEXT_ERROR_CODE", {
              value: "E458",
              enumerable: false,
              configurable: true
            });
          }
          routes.unshift(r);
        }
        if (this.restSlugName !== null) {
          routes.push(...this.children.get("[...]")._smoosh(`${prefix}[...${this.restSlugName}]/`));
        }
        if (this.optionalRestSlugName !== null) {
          routes.push(...this.children.get("[[...]]")._smoosh(`${prefix}[[...${this.optionalRestSlugName}]]/`));
        }
        return routes;
      }
      _insert(urlPaths, slugNames, isCatchAll) {
        if (urlPaths.length === 0) {
          this.placeholder = false;
          return;
        }
        if (isCatchAll) {
          throw Object.defineProperty(new Error(`Catch-all must be the last part of the URL.`), "__NEXT_ERROR_CODE", {
            value: "E392",
            enumerable: false,
            configurable: true
          });
        }
        let nextSegment = urlPaths[0];
        if (nextSegment.startsWith("[") && nextSegment.endsWith("]")) {
          let handleSlug = function(previousSlug, nextSlug) {
            if (previousSlug !== null) {
              if (previousSlug !== nextSlug) {
                throw Object.defineProperty(new Error(`You cannot use different slug names for the same dynamic path ('${previousSlug}' !== '${nextSlug}').`), "__NEXT_ERROR_CODE", {
                  value: "E337",
                  enumerable: false,
                  configurable: true
                });
              }
            }
            slugNames.forEach((slug) => {
              if (slug === nextSlug) {
                throw Object.defineProperty(new Error(`You cannot have the same slug name "${nextSlug}" repeat within a single dynamic path`), "__NEXT_ERROR_CODE", {
                  value: "E247",
                  enumerable: false,
                  configurable: true
                });
              }
              if (slug.replace(/\W/g, "") === nextSegment.replace(/\W/g, "")) {
                throw Object.defineProperty(new Error(`You cannot have the slug names "${slug}" and "${nextSlug}" differ only by non-word symbols within a single dynamic path`), "__NEXT_ERROR_CODE", {
                  value: "E499",
                  enumerable: false,
                  configurable: true
                });
              }
            });
            slugNames.push(nextSlug);
          };
          let segmentName = nextSegment.slice(1, -1);
          let isOptional = false;
          if (segmentName.startsWith("[") && segmentName.endsWith("]")) {
            segmentName = segmentName.slice(1, -1);
            isOptional = true;
          }
          if (segmentName.startsWith("\u2026")) {
            throw Object.defineProperty(new Error(`Detected a three-dot character ('\u2026') at ('${segmentName}'). Did you mean ('...')?`), "__NEXT_ERROR_CODE", {
              value: "E147",
              enumerable: false,
              configurable: true
            });
          }
          if (segmentName.startsWith("...")) {
            segmentName = segmentName.substring(3);
            isCatchAll = true;
          }
          if (segmentName.startsWith("[") || segmentName.endsWith("]")) {
            throw Object.defineProperty(new Error(`Segment names may not start or end with extra brackets ('${segmentName}').`), "__NEXT_ERROR_CODE", {
              value: "E421",
              enumerable: false,
              configurable: true
            });
          }
          if (segmentName.startsWith(".")) {
            throw Object.defineProperty(new Error(`Segment names may not start with erroneous periods ('${segmentName}').`), "__NEXT_ERROR_CODE", {
              value: "E288",
              enumerable: false,
              configurable: true
            });
          }
          if (isCatchAll) {
            if (isOptional) {
              if (this.restSlugName != null) {
                throw Object.defineProperty(new Error(`You cannot use both an required and optional catch-all route at the same level ("[...${this.restSlugName}]" and "${urlPaths[0]}" ).`), "__NEXT_ERROR_CODE", {
                  value: "E299",
                  enumerable: false,
                  configurable: true
                });
              }
              handleSlug(this.optionalRestSlugName, segmentName);
              this.optionalRestSlugName = segmentName;
              nextSegment = "[[...]]";
            } else {
              if (this.optionalRestSlugName != null) {
                throw Object.defineProperty(new Error(`You cannot use both an optional and required catch-all route at the same level ("[[...${this.optionalRestSlugName}]]" and "${urlPaths[0]}").`), "__NEXT_ERROR_CODE", {
                  value: "E300",
                  enumerable: false,
                  configurable: true
                });
              }
              handleSlug(this.restSlugName, segmentName);
              this.restSlugName = segmentName;
              nextSegment = "[...]";
            }
          } else {
            if (isOptional) {
              throw Object.defineProperty(new Error(`Optional route parameters are not yet supported ("${urlPaths[0]}").`), "__NEXT_ERROR_CODE", {
                value: "E435",
                enumerable: false,
                configurable: true
              });
            }
            handleSlug(this.slugName, segmentName);
            this.slugName = segmentName;
            nextSegment = "[]";
          }
        }
        if (!this.children.has(nextSegment)) {
          this.children.set(nextSegment, new _UrlNode());
        }
        this.children.get(nextSegment)._insert(urlPaths.slice(1), slugNames, isCatchAll);
      }
      constructor() {
        this.placeholder = true;
        this.children = /* @__PURE__ */ new Map();
        this.slugName = null;
        this.restSlugName = null;
        this.optionalRestSlugName = null;
      }
    };
    function getSortedRoutes(normalizedPages) {
      const root = new UrlNode();
      normalizedPages.forEach((pagePath) => root.insert(pagePath));
      return root.smoosh();
    }
    function getSortedRouteObjects(objects, getter) {
      const indexes = {};
      const pathnames = [];
      for (let i = 0; i < objects.length; i++) {
        const pathname = getter(objects[i]);
        indexes[pathname] = i;
        pathnames[i] = pathname;
      }
      const sorted = getSortedRoutes(pathnames);
      return sorted.map((pathname) => objects[indexes[pathname]]);
    }
  }
});

// node_modules/next/dist/shared/lib/page-path/ensure-leading-slash.js
var require_ensure_leading_slash = __commonJS({
  "node_modules/next/dist/shared/lib/page-path/ensure-leading-slash.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "ensureLeadingSlash", {
      enumerable: true,
      get: function() {
        return ensureLeadingSlash;
      }
    });
    function ensureLeadingSlash(path) {
      return path.startsWith("/") ? path : `/${path}`;
    }
  }
});

// node_modules/next/dist/shared/lib/segment.js
var require_segment = __commonJS({
  "node_modules/next/dist/shared/lib/segment.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports$1, {
      DEFAULT_SEGMENT_KEY: function() {
        return DEFAULT_SEGMENT_KEY;
      },
      NOT_FOUND_SEGMENT_KEY: function() {
        return NOT_FOUND_SEGMENT_KEY;
      },
      PAGE_SEGMENT_KEY: function() {
        return PAGE_SEGMENT_KEY;
      },
      addSearchParamsIfPageSegment: function() {
        return addSearchParamsIfPageSegment;
      },
      computeSelectedLayoutSegment: function() {
        return computeSelectedLayoutSegment;
      },
      getSegmentValue: function() {
        return getSegmentValue;
      },
      getSelectedLayoutSegmentPath: function() {
        return getSelectedLayoutSegmentPath;
      },
      isGroupSegment: function() {
        return isGroupSegment;
      },
      isParallelRouteSegment: function() {
        return isParallelRouteSegment;
      }
    });
    function getSegmentValue(segment) {
      return Array.isArray(segment) ? segment[1] : segment;
    }
    function isGroupSegment(segment) {
      return segment[0] === "(" && segment.endsWith(")");
    }
    function isParallelRouteSegment(segment) {
      return segment.startsWith("@") && segment !== "@children";
    }
    function addSearchParamsIfPageSegment(segment, searchParams) {
      const isPageSegment = segment.includes(PAGE_SEGMENT_KEY);
      if (isPageSegment) {
        const stringifiedQuery = JSON.stringify(searchParams);
        return stringifiedQuery !== "{}" ? PAGE_SEGMENT_KEY + "?" + stringifiedQuery : PAGE_SEGMENT_KEY;
      }
      return segment;
    }
    function computeSelectedLayoutSegment(segments, parallelRouteKey) {
      if (!segments || segments.length === 0) {
        return null;
      }
      const rawSegment = parallelRouteKey === "children" ? segments[0] : segments[segments.length - 1];
      return rawSegment === DEFAULT_SEGMENT_KEY ? null : rawSegment;
    }
    function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first = true, segmentPath = []) {
      let node;
      if (first) {
        node = tree[1][parallelRouteKey];
      } else {
        const parallelRoutes = tree[1];
        node = parallelRoutes.children ?? Object.values(parallelRoutes)[0];
      }
      if (!node) return segmentPath;
      const segment = node[0];
      let segmentValue = getSegmentValue(segment);
      if (!segmentValue || segmentValue.startsWith(PAGE_SEGMENT_KEY)) {
        return segmentPath;
      }
      segmentPath.push(segmentValue);
      return getSelectedLayoutSegmentPath(node, parallelRouteKey, false, segmentPath);
    }
    var PAGE_SEGMENT_KEY = "__PAGE__";
    var DEFAULT_SEGMENT_KEY = "__DEFAULT__";
    var NOT_FOUND_SEGMENT_KEY = "/_not-found";
  }
});

// node_modules/next/dist/shared/lib/router/utils/app-paths.js
var require_app_paths = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/app-paths.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports$1, {
      normalizeAppPath: function() {
        return normalizeAppPath;
      },
      normalizeRscURL: function() {
        return normalizeRscURL;
      }
    });
    var _ensureleadingslash = require_ensure_leading_slash();
    var _segment = require_segment();
    function normalizeAppPath(route) {
      return (0, _ensureleadingslash.ensureLeadingSlash)(route.split("/").reduce((pathname, segment, index, segments) => {
        if (!segment) {
          return pathname;
        }
        if ((0, _segment.isGroupSegment)(segment)) {
          return pathname;
        }
        if (segment[0] === "@") {
          return pathname;
        }
        if ((segment === "page" || segment === "route") && index === segments.length - 1) {
          return pathname;
        }
        return `${pathname}/${segment}`;
      }, ""));
    }
    function normalizeRscURL(url) {
      return url.replace(
        /\.rsc($|\?)/,
        // $1 ensures `?` is preserved
        "$1"
      );
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/interception-routes.js
var require_interception_routes = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/interception-routes.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports$1, {
      INTERCEPTION_ROUTE_MARKERS: function() {
        return INTERCEPTION_ROUTE_MARKERS;
      },
      extractInterceptionRouteInformation: function() {
        return extractInterceptionRouteInformation;
      },
      isInterceptionRouteAppPath: function() {
        return isInterceptionRouteAppPath;
      }
    });
    var _apppaths = require_app_paths();
    var INTERCEPTION_ROUTE_MARKERS = [
      "(..)(..)",
      "(.)",
      "(..)",
      "(...)"
    ];
    function isInterceptionRouteAppPath(path) {
      return path.split("/").find((segment) => INTERCEPTION_ROUTE_MARKERS.find((m) => segment.startsWith(m))) !== void 0;
    }
    function extractInterceptionRouteInformation(path) {
      let interceptingRoute;
      let marker;
      let interceptedRoute;
      for (const segment of path.split("/")) {
        marker = INTERCEPTION_ROUTE_MARKERS.find((m) => segment.startsWith(m));
        if (marker) {
          [interceptingRoute, interceptedRoute] = path.split(marker, 2);
          break;
        }
      }
      if (!interceptingRoute || !marker || !interceptedRoute) {
        throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`), "__NEXT_ERROR_CODE", {
          value: "E269",
          enumerable: false,
          configurable: true
        });
      }
      interceptingRoute = (0, _apppaths.normalizeAppPath)(interceptingRoute);
      switch (marker) {
        case "(.)":
          if (interceptingRoute === "/") {
            interceptedRoute = `/${interceptedRoute}`;
          } else {
            interceptedRoute = interceptingRoute + "/" + interceptedRoute;
          }
          break;
        case "(..)":
          if (interceptingRoute === "/") {
            throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Cannot use (..) marker at the root level, use (.) instead.`), "__NEXT_ERROR_CODE", {
              value: "E207",
              enumerable: false,
              configurable: true
            });
          }
          interceptedRoute = interceptingRoute.split("/").slice(0, -1).concat(interceptedRoute).join("/");
          break;
        case "(...)":
          interceptedRoute = "/" + interceptedRoute;
          break;
        case "(..)(..)":
          const splitInterceptingRoute = interceptingRoute.split("/");
          if (splitInterceptingRoute.length <= 2) {
            throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Cannot use (..)(..) marker at the root level or one level up.`), "__NEXT_ERROR_CODE", {
              value: "E486",
              enumerable: false,
              configurable: true
            });
          }
          interceptedRoute = splitInterceptingRoute.slice(0, -2).concat(interceptedRoute).join("/");
          break;
        default:
          throw Object.defineProperty(new Error("Invariant: unexpected marker"), "__NEXT_ERROR_CODE", {
            value: "E112",
            enumerable: false,
            configurable: true
          });
      }
      return {
        interceptingRoute,
        interceptedRoute
      };
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/is-dynamic.js
var require_is_dynamic = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/is-dynamic.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "isDynamicRoute", {
      enumerable: true,
      get: function() {
        return isDynamicRoute;
      }
    });
    var _interceptionroutes = require_interception_routes();
    var TEST_ROUTE = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/;
    var TEST_STRICT_ROUTE = /\/\[[^/]+\](?=\/|$)/;
    function isDynamicRoute(route, strict = true) {
      if ((0, _interceptionroutes.isInterceptionRouteAppPath)(route)) {
        route = (0, _interceptionroutes.extractInterceptionRouteInformation)(route).interceptedRoute;
      }
      if (strict) {
        return TEST_STRICT_ROUTE.test(route);
      }
      return TEST_ROUTE.test(route);
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/index.js
var require_utils2 = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/index.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports$1, {
      getSortedRouteObjects: function() {
        return _sortedroutes.getSortedRouteObjects;
      },
      getSortedRoutes: function() {
        return _sortedroutes.getSortedRoutes;
      },
      isDynamicRoute: function() {
        return _isdynamic.isDynamicRoute;
      }
    });
    var _sortedroutes = require_sorted_routes();
    var _isdynamic = require_is_dynamic();
  }
});

// node_modules/next/dist/compiled/path-to-regexp/index.js
var require_path_to_regexp = __commonJS({
  "node_modules/next/dist/compiled/path-to-regexp/index.js"(exports$1, module) {
    (() => {
      if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
      var e = {};
      (() => {
        var n = e;
        Object.defineProperty(n, "__esModule", { value: true });
        n.pathToRegexp = n.tokensToRegexp = n.regexpToFunction = n.match = n.tokensToFunction = n.compile = n.parse = void 0;
        function lexer(e2) {
          var n2 = [];
          var r = 0;
          while (r < e2.length) {
            var t = e2[r];
            if (t === "*" || t === "+" || t === "?") {
              n2.push({ type: "MODIFIER", index: r, value: e2[r++] });
              continue;
            }
            if (t === "\\") {
              n2.push({ type: "ESCAPED_CHAR", index: r++, value: e2[r++] });
              continue;
            }
            if (t === "{") {
              n2.push({ type: "OPEN", index: r, value: e2[r++] });
              continue;
            }
            if (t === "}") {
              n2.push({ type: "CLOSE", index: r, value: e2[r++] });
              continue;
            }
            if (t === ":") {
              var a = "";
              var i = r + 1;
              while (i < e2.length) {
                var o = e2.charCodeAt(i);
                if (o >= 48 && o <= 57 || o >= 65 && o <= 90 || o >= 97 && o <= 122 || o === 95) {
                  a += e2[i++];
                  continue;
                }
                break;
              }
              if (!a) throw new TypeError("Missing parameter name at ".concat(r));
              n2.push({ type: "NAME", index: r, value: a });
              r = i;
              continue;
            }
            if (t === "(") {
              var c = 1;
              var f = "";
              var i = r + 1;
              if (e2[i] === "?") {
                throw new TypeError('Pattern cannot start with "?" at '.concat(i));
              }
              while (i < e2.length) {
                if (e2[i] === "\\") {
                  f += e2[i++] + e2[i++];
                  continue;
                }
                if (e2[i] === ")") {
                  c--;
                  if (c === 0) {
                    i++;
                    break;
                  }
                } else if (e2[i] === "(") {
                  c++;
                  if (e2[i + 1] !== "?") {
                    throw new TypeError("Capturing groups are not allowed at ".concat(i));
                  }
                }
                f += e2[i++];
              }
              if (c) throw new TypeError("Unbalanced pattern at ".concat(r));
              if (!f) throw new TypeError("Missing pattern at ".concat(r));
              n2.push({ type: "PATTERN", index: r, value: f });
              r = i;
              continue;
            }
            n2.push({ type: "CHAR", index: r, value: e2[r++] });
          }
          n2.push({ type: "END", index: r, value: "" });
          return n2;
        }
        function parse(e2, n2) {
          if (n2 === void 0) {
            n2 = {};
          }
          var r = lexer(e2);
          var t = n2.prefixes, a = t === void 0 ? "./" : t, i = n2.delimiter, o = i === void 0 ? "/#?" : i;
          var c = [];
          var f = 0;
          var u = 0;
          var p = "";
          var tryConsume = function(e3) {
            if (u < r.length && r[u].type === e3) return r[u++].value;
          };
          var mustConsume = function(e3) {
            var n3 = tryConsume(e3);
            if (n3 !== void 0) return n3;
            var t2 = r[u], a2 = t2.type, i2 = t2.index;
            throw new TypeError("Unexpected ".concat(a2, " at ").concat(i2, ", expected ").concat(e3));
          };
          var consumeText = function() {
            var e3 = "";
            var n3;
            while (n3 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
              e3 += n3;
            }
            return e3;
          };
          var isSafe = function(e3) {
            for (var n3 = 0, r2 = o; n3 < r2.length; n3++) {
              var t2 = r2[n3];
              if (e3.indexOf(t2) > -1) return true;
            }
            return false;
          };
          var safePattern = function(e3) {
            var n3 = c[c.length - 1];
            var r2 = e3 || (n3 && typeof n3 === "string" ? n3 : "");
            if (n3 && !r2) {
              throw new TypeError('Must have text between two parameters, missing text after "'.concat(n3.name, '"'));
            }
            if (!r2 || isSafe(r2)) return "[^".concat(escapeString(o), "]+?");
            return "(?:(?!".concat(escapeString(r2), ")[^").concat(escapeString(o), "])+?");
          };
          while (u < r.length) {
            var v = tryConsume("CHAR");
            var s = tryConsume("NAME");
            var d = tryConsume("PATTERN");
            if (s || d) {
              var g = v || "";
              if (a.indexOf(g) === -1) {
                p += g;
                g = "";
              }
              if (p) {
                c.push(p);
                p = "";
              }
              c.push({ name: s || f++, prefix: g, suffix: "", pattern: d || safePattern(g), modifier: tryConsume("MODIFIER") || "" });
              continue;
            }
            var x = v || tryConsume("ESCAPED_CHAR");
            if (x) {
              p += x;
              continue;
            }
            if (p) {
              c.push(p);
              p = "";
            }
            var h = tryConsume("OPEN");
            if (h) {
              var g = consumeText();
              var l = tryConsume("NAME") || "";
              var m = tryConsume("PATTERN") || "";
              var T = consumeText();
              mustConsume("CLOSE");
              c.push({ name: l || (m ? f++ : ""), pattern: l && !m ? safePattern(g) : m, prefix: g, suffix: T, modifier: tryConsume("MODIFIER") || "" });
              continue;
            }
            mustConsume("END");
          }
          return c;
        }
        n.parse = parse;
        function compile(e2, n2) {
          return tokensToFunction(parse(e2, n2), n2);
        }
        n.compile = compile;
        function tokensToFunction(e2, n2) {
          if (n2 === void 0) {
            n2 = {};
          }
          var r = flags(n2);
          var t = n2.encode, a = t === void 0 ? function(e3) {
            return e3;
          } : t, i = n2.validate, o = i === void 0 ? true : i;
          var c = e2.map((function(e3) {
            if (typeof e3 === "object") {
              return new RegExp("^(?:".concat(e3.pattern, ")$"), r);
            }
          }));
          return function(n3) {
            var r2 = "";
            for (var t2 = 0; t2 < e2.length; t2++) {
              var i2 = e2[t2];
              if (typeof i2 === "string") {
                r2 += i2;
                continue;
              }
              var f = n3 ? n3[i2.name] : void 0;
              var u = i2.modifier === "?" || i2.modifier === "*";
              var p = i2.modifier === "*" || i2.modifier === "+";
              if (Array.isArray(f)) {
                if (!p) {
                  throw new TypeError('Expected "'.concat(i2.name, '" to not repeat, but got an array'));
                }
                if (f.length === 0) {
                  if (u) continue;
                  throw new TypeError('Expected "'.concat(i2.name, '" to not be empty'));
                }
                for (var v = 0; v < f.length; v++) {
                  var s = a(f[v], i2);
                  if (o && !c[t2].test(s)) {
                    throw new TypeError('Expected all "'.concat(i2.name, '" to match "').concat(i2.pattern, '", but got "').concat(s, '"'));
                  }
                  r2 += i2.prefix + s + i2.suffix;
                }
                continue;
              }
              if (typeof f === "string" || typeof f === "number") {
                var s = a(String(f), i2);
                if (o && !c[t2].test(s)) {
                  throw new TypeError('Expected "'.concat(i2.name, '" to match "').concat(i2.pattern, '", but got "').concat(s, '"'));
                }
                r2 += i2.prefix + s + i2.suffix;
                continue;
              }
              if (u) continue;
              var d = p ? "an array" : "a string";
              throw new TypeError('Expected "'.concat(i2.name, '" to be ').concat(d));
            }
            return r2;
          };
        }
        n.tokensToFunction = tokensToFunction;
        function match2(e2, n2) {
          var r = [];
          var t = pathToRegexp(e2, r, n2);
          return regexpToFunction(t, r, n2);
        }
        n.match = match2;
        function regexpToFunction(e2, n2, r) {
          if (r === void 0) {
            r = {};
          }
          var t = r.decode, a = t === void 0 ? function(e3) {
            return e3;
          } : t;
          return function(r2) {
            var t2 = e2.exec(r2);
            if (!t2) return false;
            var i = t2[0], o = t2.index;
            var c = /* @__PURE__ */ Object.create(null);
            var _loop_1 = function(e3) {
              if (t2[e3] === void 0) return "continue";
              var r3 = n2[e3 - 1];
              if (r3.modifier === "*" || r3.modifier === "+") {
                c[r3.name] = t2[e3].split(r3.prefix + r3.suffix).map((function(e4) {
                  return a(e4, r3);
                }));
              } else {
                c[r3.name] = a(t2[e3], r3);
              }
            };
            for (var f = 1; f < t2.length; f++) {
              _loop_1(f);
            }
            return { path: i, index: o, params: c };
          };
        }
        n.regexpToFunction = regexpToFunction;
        function escapeString(e2) {
          return e2.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
        }
        function flags(e2) {
          return e2 && e2.sensitive ? "" : "i";
        }
        function regexpToRegexp(e2, n2) {
          if (!n2) return e2;
          var r = /\((?:\?<(.*?)>)?(?!\?)/g;
          var t = 0;
          var a = r.exec(e2.source);
          while (a) {
            n2.push({ name: a[1] || t++, prefix: "", suffix: "", modifier: "", pattern: "" });
            a = r.exec(e2.source);
          }
          return e2;
        }
        function arrayToRegexp(e2, n2, r) {
          var t = e2.map((function(e3) {
            return pathToRegexp(e3, n2, r).source;
          }));
          return new RegExp("(?:".concat(t.join("|"), ")"), flags(r));
        }
        function stringToRegexp(e2, n2, r) {
          return tokensToRegexp(parse(e2, r), n2, r);
        }
        function tokensToRegexp(e2, n2, r) {
          if (r === void 0) {
            r = {};
          }
          var t = r.strict, a = t === void 0 ? false : t, i = r.start, o = i === void 0 ? true : i, c = r.end, f = c === void 0 ? true : c, u = r.encode, p = u === void 0 ? function(e3) {
            return e3;
          } : u, v = r.delimiter, s = v === void 0 ? "/#?" : v, d = r.endsWith, g = d === void 0 ? "" : d;
          var x = "[".concat(escapeString(g), "]|$");
          var h = "[".concat(escapeString(s), "]");
          var l = o ? "^" : "";
          for (var m = 0, T = e2; m < T.length; m++) {
            var E = T[m];
            if (typeof E === "string") {
              l += escapeString(p(E));
            } else {
              var w = escapeString(p(E.prefix));
              var y = escapeString(p(E.suffix));
              if (E.pattern) {
                if (n2) n2.push(E);
                if (w || y) {
                  if (E.modifier === "+" || E.modifier === "*") {
                    var R = E.modifier === "*" ? "?" : "";
                    l += "(?:".concat(w, "((?:").concat(E.pattern, ")(?:").concat(y).concat(w, "(?:").concat(E.pattern, "))*)").concat(y, ")").concat(R);
                  } else {
                    l += "(?:".concat(w, "(").concat(E.pattern, ")").concat(y, ")").concat(E.modifier);
                  }
                } else {
                  if (E.modifier === "+" || E.modifier === "*") {
                    throw new TypeError('Can not repeat "'.concat(E.name, '" without a prefix and suffix'));
                  }
                  l += "(".concat(E.pattern, ")").concat(E.modifier);
                }
              } else {
                l += "(?:".concat(w).concat(y, ")").concat(E.modifier);
              }
            }
          }
          if (f) {
            if (!a) l += "".concat(h, "?");
            l += !r.endsWith ? "$" : "(?=".concat(x, ")");
          } else {
            var A = e2[e2.length - 1];
            var _ = typeof A === "string" ? h.indexOf(A[A.length - 1]) > -1 : A === void 0;
            if (!a) {
              l += "(?:".concat(h, "(?=").concat(x, "))?");
            }
            if (!_) {
              l += "(?=".concat(h, "|").concat(x, ")");
            }
          }
          return new RegExp(l, flags(r));
        }
        n.tokensToRegexp = tokensToRegexp;
        function pathToRegexp(e2, n2, r) {
          if (e2 instanceof RegExp) return regexpToRegexp(e2, n2);
          if (Array.isArray(e2)) return arrayToRegexp(e2, n2, r);
          return stringToRegexp(e2, n2, r);
        }
        n.pathToRegexp = pathToRegexp;
      })();
      module.exports = e;
    })();
  }
});

// node_modules/next/dist/lib/route-pattern-normalizer.js
var require_route_pattern_normalizer = __commonJS({
  "node_modules/next/dist/lib/route-pattern-normalizer.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports$1, {
      PARAM_SEPARATOR: function() {
        return PARAM_SEPARATOR;
      },
      hasAdjacentParameterIssues: function() {
        return hasAdjacentParameterIssues;
      },
      normalizeAdjacentParameters: function() {
        return normalizeAdjacentParameters;
      },
      normalizeTokensForRegexp: function() {
        return normalizeTokensForRegexp;
      },
      stripNormalizedSeparators: function() {
        return stripNormalizedSeparators;
      },
      stripParameterSeparators: function() {
        return stripParameterSeparators;
      }
    });
    var PARAM_SEPARATOR = "_NEXTSEP_";
    function hasAdjacentParameterIssues(route) {
      if (typeof route !== "string") return false;
      if (/\/\(\.{1,3}\):[^/\s]+/.test(route)) {
        return true;
      }
      if (/:[a-zA-Z_][a-zA-Z0-9_]*:[a-zA-Z_][a-zA-Z0-9_]*/.test(route)) {
        return true;
      }
      return false;
    }
    function normalizeAdjacentParameters(route) {
      let normalized = route;
      normalized = normalized.replace(/(\([^)]*\)):([^/\s]+)/g, `$1${PARAM_SEPARATOR}:$2`);
      normalized = normalized.replace(/:([^:/\s)]+)(?=:)/g, `:$1${PARAM_SEPARATOR}`);
      return normalized;
    }
    function normalizeTokensForRegexp(tokens) {
      return tokens.map((token) => {
        if (typeof token === "object" && token !== null && // Not all token objects have 'modifier' property (e.g., simple text tokens)
        "modifier" in token && // Only repeating modifiers (* or +) cause the validation error
        // Other modifiers like '?' (optional) are fine
        (token.modifier === "*" || token.modifier === "+") && // Token objects can have different shapes depending on route pattern
        "prefix" in token && "suffix" in token && // Both prefix and suffix must be empty strings
        // This is what causes the validation error in path-to-regexp
        token.prefix === "" && token.suffix === "") {
          return {
            ...token,
            prefix: "/"
          };
        }
        return token;
      });
    }
    function stripNormalizedSeparators(pathname) {
      return pathname.replace(new RegExp(`\\)${PARAM_SEPARATOR}`, "g"), ")");
    }
    function stripParameterSeparators(params) {
      const cleaned = {};
      for (const [key, value] of Object.entries(params)) {
        if (typeof value === "string") {
          cleaned[key] = value.replace(new RegExp(`^${PARAM_SEPARATOR}`), "");
        } else if (Array.isArray(value)) {
          cleaned[key] = value.map((item) => typeof item === "string" ? item.replace(new RegExp(`^${PARAM_SEPARATOR}`), "") : item);
        } else {
          cleaned[key] = value;
        }
      }
      return cleaned;
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/route-match-utils.js
var require_route_match_utils = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/route-match-utils.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports$1, {
      safeCompile: function() {
        return safeCompile;
      },
      safePathToRegexp: function() {
        return safePathToRegexp;
      },
      safeRegexpToFunction: function() {
        return safeRegexpToFunction;
      },
      safeRouteMatcher: function() {
        return safeRouteMatcher;
      }
    });
    var _pathtoregexp = require_path_to_regexp();
    var _routepatternnormalizer = require_route_pattern_normalizer();
    function safePathToRegexp(route, keys, options) {
      if (typeof route !== "string") {
        return (0, _pathtoregexp.pathToRegexp)(route, keys, options);
      }
      const needsNormalization = (0, _routepatternnormalizer.hasAdjacentParameterIssues)(route);
      const routeToUse = needsNormalization ? (0, _routepatternnormalizer.normalizeAdjacentParameters)(route) : route;
      try {
        return (0, _pathtoregexp.pathToRegexp)(routeToUse, keys, options);
      } catch (error) {
        if (!needsNormalization) {
          try {
            const normalizedRoute = (0, _routepatternnormalizer.normalizeAdjacentParameters)(route);
            return (0, _pathtoregexp.pathToRegexp)(normalizedRoute, keys, options);
          } catch (retryError) {
            throw error;
          }
        }
        throw error;
      }
    }
    function safeCompile(route, options) {
      const needsNormalization = (0, _routepatternnormalizer.hasAdjacentParameterIssues)(route);
      const routeToUse = needsNormalization ? (0, _routepatternnormalizer.normalizeAdjacentParameters)(route) : route;
      try {
        const compiler = (0, _pathtoregexp.compile)(routeToUse, options);
        if (needsNormalization) {
          return (params) => {
            return (0, _routepatternnormalizer.stripNormalizedSeparators)(compiler(params));
          };
        }
        return compiler;
      } catch (error) {
        if (!needsNormalization) {
          try {
            const normalizedRoute = (0, _routepatternnormalizer.normalizeAdjacentParameters)(route);
            const compiler = (0, _pathtoregexp.compile)(normalizedRoute, options);
            return (params) => {
              return (0, _routepatternnormalizer.stripNormalizedSeparators)(compiler(params));
            };
          } catch (retryError) {
            throw error;
          }
        }
        throw error;
      }
    }
    function safeRegexpToFunction(regexp, keys) {
      const originalMatcher = (0, _pathtoregexp.regexpToFunction)(regexp, keys || []);
      return (pathname) => {
        const result = originalMatcher(pathname);
        if (!result) return false;
        return {
          ...result,
          params: (0, _routepatternnormalizer.stripParameterSeparators)(result.params)
        };
      };
    }
    function safeRouteMatcher(matcherFn) {
      return (pathname) => {
        const result = matcherFn(pathname);
        if (!result) return false;
        return (0, _routepatternnormalizer.stripParameterSeparators)(result);
      };
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/route-matcher.js
var require_route_matcher = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/route-matcher.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "getRouteMatcher", {
      enumerable: true,
      get: function() {
        return getRouteMatcher;
      }
    });
    var _utils = require_utils();
    var _routematchutils = require_route_match_utils();
    function getRouteMatcher({ re, groups }) {
      const rawMatcher = (pathname) => {
        const routeMatch = re.exec(pathname);
        if (!routeMatch) return false;
        const decode = (param) => {
          try {
            return decodeURIComponent(param);
          } catch {
            throw Object.defineProperty(new _utils.DecodeError("failed to decode param"), "__NEXT_ERROR_CODE", {
              value: "E528",
              enumerable: false,
              configurable: true
            });
          }
        };
        const params = {};
        for (const [key, group] of Object.entries(groups)) {
          const match2 = routeMatch[group.pos];
          if (match2 !== void 0) {
            if (group.repeat) {
              params[key] = match2.split("/").map((entry) => decode(entry));
            } else {
              params[key] = decode(match2);
            }
          }
        }
        return params;
      };
      return (0, _routematchutils.safeRouteMatcher)(rawMatcher);
    }
  }
});

// node_modules/next/dist/lib/constants.js
var require_constants = __commonJS({
  "node_modules/next/dist/lib/constants.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports$1, {
      ACTION_SUFFIX: function() {
        return ACTION_SUFFIX;
      },
      APP_DIR_ALIAS: function() {
        return APP_DIR_ALIAS;
      },
      CACHE_ONE_YEAR: function() {
        return CACHE_ONE_YEAR;
      },
      DOT_NEXT_ALIAS: function() {
        return DOT_NEXT_ALIAS;
      },
      ESLINT_DEFAULT_DIRS: function() {
        return ESLINT_DEFAULT_DIRS;
      },
      GSP_NO_RETURNED_VALUE: function() {
        return GSP_NO_RETURNED_VALUE;
      },
      GSSP_COMPONENT_MEMBER_ERROR: function() {
        return GSSP_COMPONENT_MEMBER_ERROR;
      },
      GSSP_NO_RETURNED_VALUE: function() {
        return GSSP_NO_RETURNED_VALUE;
      },
      HTML_CONTENT_TYPE_HEADER: function() {
        return HTML_CONTENT_TYPE_HEADER;
      },
      INFINITE_CACHE: function() {
        return INFINITE_CACHE;
      },
      INSTRUMENTATION_HOOK_FILENAME: function() {
        return INSTRUMENTATION_HOOK_FILENAME;
      },
      JSON_CONTENT_TYPE_HEADER: function() {
        return JSON_CONTENT_TYPE_HEADER;
      },
      MATCHED_PATH_HEADER: function() {
        return MATCHED_PATH_HEADER;
      },
      MIDDLEWARE_FILENAME: function() {
        return MIDDLEWARE_FILENAME;
      },
      MIDDLEWARE_LOCATION_REGEXP: function() {
        return MIDDLEWARE_LOCATION_REGEXP;
      },
      NEXT_BODY_SUFFIX: function() {
        return NEXT_BODY_SUFFIX;
      },
      NEXT_CACHE_IMPLICIT_TAG_ID: function() {
        return NEXT_CACHE_IMPLICIT_TAG_ID;
      },
      NEXT_CACHE_REVALIDATED_TAGS_HEADER: function() {
        return NEXT_CACHE_REVALIDATED_TAGS_HEADER;
      },
      NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER: function() {
        return NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER;
      },
      NEXT_CACHE_SOFT_TAG_MAX_LENGTH: function() {
        return NEXT_CACHE_SOFT_TAG_MAX_LENGTH;
      },
      NEXT_CACHE_TAGS_HEADER: function() {
        return NEXT_CACHE_TAGS_HEADER;
      },
      NEXT_CACHE_TAG_MAX_ITEMS: function() {
        return NEXT_CACHE_TAG_MAX_ITEMS;
      },
      NEXT_CACHE_TAG_MAX_LENGTH: function() {
        return NEXT_CACHE_TAG_MAX_LENGTH;
      },
      NEXT_DATA_SUFFIX: function() {
        return NEXT_DATA_SUFFIX;
      },
      NEXT_INTERCEPTION_MARKER_PREFIX: function() {
        return NEXT_INTERCEPTION_MARKER_PREFIX;
      },
      NEXT_META_SUFFIX: function() {
        return NEXT_META_SUFFIX;
      },
      NEXT_QUERY_PARAM_PREFIX: function() {
        return NEXT_QUERY_PARAM_PREFIX;
      },
      NEXT_RESUME_HEADER: function() {
        return NEXT_RESUME_HEADER;
      },
      NON_STANDARD_NODE_ENV: function() {
        return NON_STANDARD_NODE_ENV;
      },
      PAGES_DIR_ALIAS: function() {
        return PAGES_DIR_ALIAS;
      },
      PRERENDER_REVALIDATE_HEADER: function() {
        return PRERENDER_REVALIDATE_HEADER;
      },
      PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: function() {
        return PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER;
      },
      PROXY_FILENAME: function() {
        return PROXY_FILENAME;
      },
      PROXY_LOCATION_REGEXP: function() {
        return PROXY_LOCATION_REGEXP;
      },
      PUBLIC_DIR_MIDDLEWARE_CONFLICT: function() {
        return PUBLIC_DIR_MIDDLEWARE_CONFLICT;
      },
      ROOT_DIR_ALIAS: function() {
        return ROOT_DIR_ALIAS;
      },
      RSC_ACTION_CLIENT_WRAPPER_ALIAS: function() {
        return RSC_ACTION_CLIENT_WRAPPER_ALIAS;
      },
      RSC_ACTION_ENCRYPTION_ALIAS: function() {
        return RSC_ACTION_ENCRYPTION_ALIAS;
      },
      RSC_ACTION_PROXY_ALIAS: function() {
        return RSC_ACTION_PROXY_ALIAS;
      },
      RSC_ACTION_VALIDATE_ALIAS: function() {
        return RSC_ACTION_VALIDATE_ALIAS;
      },
      RSC_CACHE_WRAPPER_ALIAS: function() {
        return RSC_CACHE_WRAPPER_ALIAS;
      },
      RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS: function() {
        return RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS;
      },
      RSC_MOD_REF_PROXY_ALIAS: function() {
        return RSC_MOD_REF_PROXY_ALIAS;
      },
      RSC_SEGMENTS_DIR_SUFFIX: function() {
        return RSC_SEGMENTS_DIR_SUFFIX;
      },
      RSC_SEGMENT_SUFFIX: function() {
        return RSC_SEGMENT_SUFFIX;
      },
      RSC_SUFFIX: function() {
        return RSC_SUFFIX;
      },
      SERVER_PROPS_EXPORT_ERROR: function() {
        return SERVER_PROPS_EXPORT_ERROR;
      },
      SERVER_PROPS_GET_INIT_PROPS_CONFLICT: function() {
        return SERVER_PROPS_GET_INIT_PROPS_CONFLICT;
      },
      SERVER_PROPS_SSG_CONFLICT: function() {
        return SERVER_PROPS_SSG_CONFLICT;
      },
      SERVER_RUNTIME: function() {
        return SERVER_RUNTIME;
      },
      SSG_FALLBACK_EXPORT_ERROR: function() {
        return SSG_FALLBACK_EXPORT_ERROR;
      },
      SSG_GET_INITIAL_PROPS_CONFLICT: function() {
        return SSG_GET_INITIAL_PROPS_CONFLICT;
      },
      STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR: function() {
        return STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR;
      },
      TEXT_PLAIN_CONTENT_TYPE_HEADER: function() {
        return TEXT_PLAIN_CONTENT_TYPE_HEADER;
      },
      UNSTABLE_REVALIDATE_RENAME_ERROR: function() {
        return UNSTABLE_REVALIDATE_RENAME_ERROR;
      },
      WEBPACK_LAYERS: function() {
        return WEBPACK_LAYERS;
      },
      WEBPACK_RESOURCE_QUERIES: function() {
        return WEBPACK_RESOURCE_QUERIES;
      },
      WEB_SOCKET_MAX_RECONNECTIONS: function() {
        return WEB_SOCKET_MAX_RECONNECTIONS;
      }
    });
    var TEXT_PLAIN_CONTENT_TYPE_HEADER = "text/plain";
    var HTML_CONTENT_TYPE_HEADER = "text/html; charset=utf-8";
    var JSON_CONTENT_TYPE_HEADER = "application/json; charset=utf-8";
    var NEXT_QUERY_PARAM_PREFIX = "nxtP";
    var NEXT_INTERCEPTION_MARKER_PREFIX = "nxtI";
    var MATCHED_PATH_HEADER = "x-matched-path";
    var PRERENDER_REVALIDATE_HEADER = "x-prerender-revalidate";
    var PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER = "x-prerender-revalidate-if-generated";
    var RSC_SEGMENTS_DIR_SUFFIX = ".segments";
    var RSC_SEGMENT_SUFFIX = ".segment.rsc";
    var RSC_SUFFIX = ".rsc";
    var ACTION_SUFFIX = ".action";
    var NEXT_DATA_SUFFIX = ".json";
    var NEXT_META_SUFFIX = ".meta";
    var NEXT_BODY_SUFFIX = ".body";
    var NEXT_CACHE_TAGS_HEADER = "x-next-cache-tags";
    var NEXT_CACHE_REVALIDATED_TAGS_HEADER = "x-next-revalidated-tags";
    var NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER = "x-next-revalidate-tag-token";
    var NEXT_RESUME_HEADER = "next-resume";
    var NEXT_CACHE_TAG_MAX_ITEMS = 128;
    var NEXT_CACHE_TAG_MAX_LENGTH = 256;
    var NEXT_CACHE_SOFT_TAG_MAX_LENGTH = 1024;
    var NEXT_CACHE_IMPLICIT_TAG_ID = "_N_T_";
    var CACHE_ONE_YEAR = 31536e3;
    var INFINITE_CACHE = 4294967294;
    var MIDDLEWARE_FILENAME = "middleware";
    var MIDDLEWARE_LOCATION_REGEXP = `(?:src/)?${MIDDLEWARE_FILENAME}`;
    var PROXY_FILENAME = "proxy";
    var PROXY_LOCATION_REGEXP = `(?:src/)?${PROXY_FILENAME}`;
    var INSTRUMENTATION_HOOK_FILENAME = "instrumentation";
    var PAGES_DIR_ALIAS = "private-next-pages";
    var DOT_NEXT_ALIAS = "private-dot-next";
    var ROOT_DIR_ALIAS = "private-next-root-dir";
    var APP_DIR_ALIAS = "private-next-app-dir";
    var RSC_MOD_REF_PROXY_ALIAS = "private-next-rsc-mod-ref-proxy";
    var RSC_ACTION_VALIDATE_ALIAS = "private-next-rsc-action-validate";
    var RSC_ACTION_PROXY_ALIAS = "private-next-rsc-server-reference";
    var RSC_CACHE_WRAPPER_ALIAS = "private-next-rsc-cache-wrapper";
    var RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS = "private-next-rsc-track-dynamic-import";
    var RSC_ACTION_ENCRYPTION_ALIAS = "private-next-rsc-action-encryption";
    var RSC_ACTION_CLIENT_WRAPPER_ALIAS = "private-next-rsc-action-client-wrapper";
    var PUBLIC_DIR_MIDDLEWARE_CONFLICT = `You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict`;
    var SSG_GET_INITIAL_PROPS_CONFLICT = `You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps`;
    var SERVER_PROPS_GET_INIT_PROPS_CONFLICT = `You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.`;
    var SERVER_PROPS_SSG_CONFLICT = `You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`;
    var STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR = `can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props`;
    var SERVER_PROPS_EXPORT_ERROR = `pages with \`getServerSideProps\` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export`;
    var GSP_NO_RETURNED_VALUE = "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?";
    var GSSP_NO_RETURNED_VALUE = "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?";
    var UNSTABLE_REVALIDATE_RENAME_ERROR = "The `unstable_revalidate` property is available for general use.\nPlease use `revalidate` instead.";
    var GSSP_COMPONENT_MEMBER_ERROR = `can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member`;
    var NON_STANDARD_NODE_ENV = `You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env`;
    var SSG_FALLBACK_EXPORT_ERROR = `Pages with \`fallback\` enabled in \`getStaticPaths\` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export`;
    var ESLINT_DEFAULT_DIRS = [
      "app",
      "pages",
      "components",
      "lib",
      "src"
    ];
    var SERVER_RUNTIME = {
      edge: "edge",
      experimentalEdge: "experimental-edge",
      nodejs: "nodejs"
    };
    var WEB_SOCKET_MAX_RECONNECTIONS = 12;
    var WEBPACK_LAYERS_NAMES = {
      /**
      * The layer for the shared code between the client and server bundles.
      */
      shared: "shared",
      /**
      * The layer for server-only runtime and picking up `react-server` export conditions.
      * Including app router RSC pages and app router custom routes and metadata routes.
      */
      reactServerComponents: "rsc",
      /**
      * Server Side Rendering layer for app (ssr).
      */
      serverSideRendering: "ssr",
      /**
      * The browser client bundle layer for actions.
      */
      actionBrowser: "action-browser",
      /**
      * The Node.js bundle layer for the API routes.
      */
      apiNode: "api-node",
      /**
      * The Edge Lite bundle layer for the API routes.
      */
      apiEdge: "api-edge",
      /**
      * The layer for the middleware code.
      */
      middleware: "middleware",
      /**
      * The layer for the instrumentation hooks.
      */
      instrument: "instrument",
      /**
      * The layer for assets on the edge.
      */
      edgeAsset: "edge-asset",
      /**
      * The browser client bundle layer for App directory.
      */
      appPagesBrowser: "app-pages-browser",
      /**
      * The browser client bundle layer for Pages directory.
      */
      pagesDirBrowser: "pages-dir-browser",
      /**
      * The Edge Lite bundle layer for Pages directory.
      */
      pagesDirEdge: "pages-dir-edge",
      /**
      * The Node.js bundle layer for Pages directory.
      */
      pagesDirNode: "pages-dir-node"
    };
    var WEBPACK_LAYERS = {
      ...WEBPACK_LAYERS_NAMES,
      GROUP: {
        builtinReact: [
          WEBPACK_LAYERS_NAMES.reactServerComponents,
          WEBPACK_LAYERS_NAMES.actionBrowser
        ],
        serverOnly: [
          WEBPACK_LAYERS_NAMES.reactServerComponents,
          WEBPACK_LAYERS_NAMES.actionBrowser,
          WEBPACK_LAYERS_NAMES.instrument,
          WEBPACK_LAYERS_NAMES.middleware
        ],
        neutralTarget: [
          // pages api
          WEBPACK_LAYERS_NAMES.apiNode,
          WEBPACK_LAYERS_NAMES.apiEdge
        ],
        clientOnly: [
          WEBPACK_LAYERS_NAMES.serverSideRendering,
          WEBPACK_LAYERS_NAMES.appPagesBrowser
        ],
        bundled: [
          WEBPACK_LAYERS_NAMES.reactServerComponents,
          WEBPACK_LAYERS_NAMES.actionBrowser,
          WEBPACK_LAYERS_NAMES.serverSideRendering,
          WEBPACK_LAYERS_NAMES.appPagesBrowser,
          WEBPACK_LAYERS_NAMES.shared,
          WEBPACK_LAYERS_NAMES.instrument,
          WEBPACK_LAYERS_NAMES.middleware
        ],
        appPages: [
          // app router pages and layouts
          WEBPACK_LAYERS_NAMES.reactServerComponents,
          WEBPACK_LAYERS_NAMES.serverSideRendering,
          WEBPACK_LAYERS_NAMES.appPagesBrowser,
          WEBPACK_LAYERS_NAMES.actionBrowser
        ]
      }
    };
    var WEBPACK_RESOURCE_QUERIES = {
      edgeSSREntry: "__next_edge_ssr_entry__",
      metadata: "__next_metadata__",
      metadataRoute: "__next_metadata_route__",
      metadataImageMeta: "__next_metadata_image_meta__"
    };
  }
});

// node_modules/next/dist/shared/lib/escape-regexp.js
var require_escape_regexp = __commonJS({
  "node_modules/next/dist/shared/lib/escape-regexp.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "escapeStringRegexp", {
      enumerable: true,
      get: function() {
        return escapeStringRegexp;
      }
    });
    var reHasRegExp = /[|\\{}()[\]^$+*?.-]/;
    var reReplaceRegExp = /[|\\{}()[\]^$+*?.-]/g;
    function escapeStringRegexp(str) {
      if (reHasRegExp.test(str)) {
        return str.replace(reReplaceRegExp, "\\$&");
      }
      return str;
    }
  }
});

// node_modules/next/dist/shared/lib/invariant-error.js
var require_invariant_error = __commonJS({
  "node_modules/next/dist/shared/lib/invariant-error.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "InvariantError", {
      enumerable: true,
      get: function() {
        return InvariantError;
      }
    });
    var InvariantError = class extends Error {
      constructor(message, options) {
        super(`Invariant: ${message.endsWith(".") ? message : message + "."} This is a bug in Next.js.`, options);
        this.name = "InvariantError";
      }
    };
  }
});

// node_modules/next/dist/shared/lib/router/utils/parse-loader-tree.js
var require_parse_loader_tree = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/parse-loader-tree.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "parseLoaderTree", {
      enumerable: true,
      get: function() {
        return parseLoaderTree;
      }
    });
    var _segment = require_segment();
    function parseLoaderTree(tree) {
      const [segment, parallelRoutes, modules] = tree;
      const { layout, template } = modules;
      let { page } = modules;
      page = segment === _segment.DEFAULT_SEGMENT_KEY ? modules.defaultPage : page;
      const conventionPath = layout?.[1] || template?.[1] || page?.[1];
      return {
        page,
        segment,
        modules,
        /* it can be either layout / template / page */
        conventionPath,
        parallelRoutes
      };
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/get-segment-param.js
var require_get_segment_param = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/get-segment-param.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports$1, {
      getParamProperties: function() {
        return getParamProperties;
      },
      getSegmentParam: function() {
        return getSegmentParam;
      },
      isCatchAll: function() {
        return isCatchAll;
      }
    });
    var _interceptionroutes = require_interception_routes();
    function getSegmentParam(segment) {
      const interceptionMarker = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.find((marker) => segment.startsWith(marker));
      if (interceptionMarker) {
        segment = segment.slice(interceptionMarker.length);
      }
      if (segment.startsWith("[[...") && segment.endsWith("]]")) {
        return {
          // TODO-APP: Optional catchall does not currently work with parallel routes,
          // so for now aren't handling a potential interception marker.
          paramType: "optional-catchall",
          paramName: segment.slice(5, -2)
        };
      }
      if (segment.startsWith("[...") && segment.endsWith("]")) {
        return {
          paramType: interceptionMarker ? `catchall-intercepted-${interceptionMarker}` : "catchall",
          paramName: segment.slice(4, -1)
        };
      }
      if (segment.startsWith("[") && segment.endsWith("]")) {
        return {
          paramType: interceptionMarker ? `dynamic-intercepted-${interceptionMarker}` : "dynamic",
          paramName: segment.slice(1, -1)
        };
      }
      return null;
    }
    function isCatchAll(type) {
      return type === "catchall" || type === "catchall-intercepted-(..)(..)" || type === "catchall-intercepted-(.)" || type === "catchall-intercepted-(..)" || type === "catchall-intercepted-(...)" || type === "optional-catchall";
    }
    function getParamProperties(paramType) {
      let repeat = false;
      let optional = false;
      switch (paramType) {
        case "catchall":
        case "catchall-intercepted-(..)(..)":
        case "catchall-intercepted-(.)":
        case "catchall-intercepted-(..)":
        case "catchall-intercepted-(...)":
          repeat = true;
          break;
        case "optional-catchall":
          repeat = true;
          optional = true;
          break;
      }
      return {
        repeat,
        optional
      };
    }
  }
});

// node_modules/next/dist/shared/lib/router/routes/app.js
var require_app = __commonJS({
  "node_modules/next/dist/shared/lib/router/routes/app.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports$1, {
      isInterceptionAppRoute: function() {
        return isInterceptionAppRoute;
      },
      isNormalizedAppRoute: function() {
        return isNormalizedAppRoute;
      },
      parseAppRoute: function() {
        return parseAppRoute;
      },
      parseAppRouteSegment: function() {
        return parseAppRouteSegment;
      }
    });
    var _invarianterror = require_invariant_error();
    var _getsegmentparam = require_get_segment_param();
    var _interceptionroutes = require_interception_routes();
    function parseAppRouteSegment(segment) {
      if (segment === "") {
        return null;
      }
      const interceptionMarker = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.find((m) => segment.startsWith(m));
      const param = (0, _getsegmentparam.getSegmentParam)(segment);
      if (param) {
        return {
          type: "dynamic",
          name: segment,
          param,
          interceptionMarker
        };
      } else if (segment.startsWith("(") && segment.endsWith(")")) {
        return {
          type: "route-group",
          name: segment,
          interceptionMarker
        };
      } else if (segment.startsWith("@")) {
        return {
          type: "parallel-route",
          name: segment,
          interceptionMarker
        };
      } else {
        return {
          type: "static",
          name: segment,
          interceptionMarker
        };
      }
    }
    function isNormalizedAppRoute(route) {
      return route.normalized;
    }
    function isInterceptionAppRoute(route) {
      return route.interceptionMarker !== void 0 && route.interceptingRoute !== void 0 && route.interceptedRoute !== void 0;
    }
    function parseAppRoute(pathname, normalized) {
      const pathnameSegments = pathname.split("/").filter(Boolean);
      const segments = [];
      let interceptionMarker;
      let interceptingRoute;
      let interceptedRoute;
      for (const segment of pathnameSegments) {
        const appSegment = parseAppRouteSegment(segment);
        if (!appSegment) {
          continue;
        }
        if (normalized && (appSegment.type === "route-group" || appSegment.type === "parallel-route")) {
          throw Object.defineProperty(new _invarianterror.InvariantError(`${pathname} is being parsed as a normalized route, but it has a route group or parallel route segment.`), "__NEXT_ERROR_CODE", {
            value: "E923",
            enumerable: false,
            configurable: true
          });
        }
        segments.push(appSegment);
        if (appSegment.interceptionMarker) {
          const parts = pathname.split(appSegment.interceptionMarker);
          if (parts.length !== 2) {
            throw Object.defineProperty(new Error(`Invalid interception route: ${pathname}`), "__NEXT_ERROR_CODE", {
              value: "E924",
              enumerable: false,
              configurable: true
            });
          }
          interceptingRoute = normalized ? parseAppRoute(parts[0], true) : parseAppRoute(parts[0], false);
          interceptedRoute = normalized ? parseAppRoute(parts[1], true) : parseAppRoute(parts[1], false);
          interceptionMarker = appSegment.interceptionMarker;
        }
      }
      const dynamicSegments = segments.filter((segment) => segment.type === "dynamic");
      return {
        normalized,
        pathname,
        segments,
        dynamicSegments,
        interceptionMarker,
        interceptingRoute,
        interceptedRoute
      };
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/interception-prefix-from-param-type.js
var require_interception_prefix_from_param_type = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/interception-prefix-from-param-type.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "interceptionPrefixFromParamType", {
      enumerable: true,
      get: function() {
        return interceptionPrefixFromParamType;
      }
    });
    function interceptionPrefixFromParamType(paramType) {
      switch (paramType) {
        case "catchall-intercepted-(..)(..)":
        case "dynamic-intercepted-(..)(..)":
          return "(..)(..)";
        case "catchall-intercepted-(.)":
        case "dynamic-intercepted-(.)":
          return "(.)";
        case "catchall-intercepted-(..)":
        case "dynamic-intercepted-(..)":
          return "(..)";
        case "catchall-intercepted-(...)":
        case "dynamic-intercepted-(...)":
          return "(...)";
        case "catchall":
        case "dynamic":
        case "optional-catchall":
        default:
          return null;
      }
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/resolve-param-value.js
var require_resolve_param_value = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/resolve-param-value.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "resolveParamValue", {
      enumerable: true,
      get: function() {
        return resolveParamValue;
      }
    });
    var _invarianterror = require_invariant_error();
    var _interceptionprefixfromparamtype = require_interception_prefix_from_param_type();
    function getParamValueFromSegment(pathSegment, params, paramType) {
      if (pathSegment.type === "dynamic") {
        return params[pathSegment.param.paramName];
      }
      const interceptionPrefix = (0, _interceptionprefixfromparamtype.interceptionPrefixFromParamType)(paramType);
      if (interceptionPrefix === pathSegment.interceptionMarker) {
        return pathSegment.name.replace(pathSegment.interceptionMarker, "");
      }
      return pathSegment.name;
    }
    function resolveParamValue(paramName, paramType, depth, route, params) {
      switch (paramType) {
        case "catchall":
        case "optional-catchall":
        case "catchall-intercepted-(..)(..)":
        case "catchall-intercepted-(.)":
        case "catchall-intercepted-(..)":
        case "catchall-intercepted-(...)":
          const processedSegments = [];
          for (let index = depth; index < route.segments.length; index++) {
            const pathSegment = route.segments[index];
            if (pathSegment.type === "static") {
              let value = pathSegment.name;
              const interceptionPrefix = (0, _interceptionprefixfromparamtype.interceptionPrefixFromParamType)(paramType);
              if (interceptionPrefix && index === depth && interceptionPrefix === pathSegment.interceptionMarker) {
                value = value.replace(pathSegment.interceptionMarker, "");
              }
              processedSegments.push(value);
            } else {
              if (!params.hasOwnProperty(pathSegment.param.paramName)) {
                if (pathSegment.param.paramType === "optional-catchall") {
                  break;
                }
                return void 0;
              }
              const paramValue = params[pathSegment.param.paramName];
              if (Array.isArray(paramValue)) {
                processedSegments.push(...paramValue);
              } else {
                processedSegments.push(paramValue);
              }
            }
          }
          if (processedSegments.length > 0) {
            return processedSegments;
          } else if (paramType === "optional-catchall") {
            return void 0;
          } else {
            throw Object.defineProperty(new _invarianterror.InvariantError(`Unexpected empty path segments match for a route "${route.pathname}" with param "${paramName}" of type "${paramType}"`), "__NEXT_ERROR_CODE", {
              value: "E931",
              enumerable: false,
              configurable: true
            });
          }
        case "dynamic":
        case "dynamic-intercepted-(..)(..)":
        case "dynamic-intercepted-(.)":
        case "dynamic-intercepted-(..)":
        case "dynamic-intercepted-(...)":
          if (depth < route.segments.length) {
            const pathSegment = route.segments[depth];
            if (pathSegment.type === "dynamic" && !params.hasOwnProperty(pathSegment.param.paramName)) {
              return void 0;
            }
            return getParamValueFromSegment(pathSegment, params, paramType);
          }
          return void 0;
      }
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/get-dynamic-param.js
var require_get_dynamic_param = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/get-dynamic-param.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports$1, {
      PARAMETER_PATTERN: function() {
        return PARAMETER_PATTERN;
      },
      getDynamicParam: function() {
        return getDynamicParam;
      },
      interpolateParallelRouteParams: function() {
        return interpolateParallelRouteParams;
      },
      parseMatchedParameter: function() {
        return parseMatchedParameter;
      },
      parseParameter: function() {
        return parseParameter;
      }
    });
    var _invarianterror = require_invariant_error();
    var _parseloadertree = require_parse_loader_tree();
    var _app = require_app();
    var _resolveparamvalue = require_resolve_param_value();
    function getParamValue(interpolatedParams, segmentKey, fallbackRouteParams) {
      let value = interpolatedParams[segmentKey];
      if (fallbackRouteParams?.has(segmentKey)) {
        const [searchValue] = fallbackRouteParams.get(segmentKey);
        value = searchValue;
      } else if (Array.isArray(value)) {
        value = value.map((i) => encodeURIComponent(i));
      } else if (typeof value === "string") {
        value = encodeURIComponent(value);
      }
      return value;
    }
    function interpolateParallelRouteParams(loaderTree, params, pagePath, fallbackRouteParams) {
      const interpolated = structuredClone(params);
      const stack = [
        {
          tree: loaderTree,
          depth: 0
        }
      ];
      const route = (0, _app.parseAppRoute)(pagePath, true);
      while (stack.length > 0) {
        const { tree, depth } = stack.pop();
        const { segment, parallelRoutes } = (0, _parseloadertree.parseLoaderTree)(tree);
        const appSegment = (0, _app.parseAppRouteSegment)(segment);
        if (appSegment?.type === "dynamic" && !interpolated.hasOwnProperty(appSegment.param.paramName) && // If the param is in the fallback route params, we don't need to
        // interpolate it because it's already marked as being unknown.
        !fallbackRouteParams?.has(appSegment.param.paramName)) {
          const { paramName, paramType } = appSegment.param;
          const paramValue = (0, _resolveparamvalue.resolveParamValue)(paramName, paramType, depth, route, interpolated);
          if (paramValue !== void 0) {
            interpolated[paramName] = paramValue;
          } else if (paramType !== "optional-catchall") {
            throw Object.defineProperty(new _invarianterror.InvariantError(`Could not resolve param value for segment: ${paramName}`), "__NEXT_ERROR_CODE", {
              value: "E932",
              enumerable: false,
              configurable: true
            });
          }
        }
        let nextDepth = depth;
        if (appSegment && appSegment.type !== "route-group" && appSegment.type !== "parallel-route") {
          nextDepth++;
        }
        for (const parallelRoute of Object.values(parallelRoutes)) {
          stack.push({
            tree: parallelRoute,
            depth: nextDepth
          });
        }
      }
      return interpolated;
    }
    function getDynamicParam(interpolatedParams, segmentKey, dynamicParamType, fallbackRouteParams) {
      let value = getParamValue(interpolatedParams, segmentKey, fallbackRouteParams);
      if (!value || value.length === 0) {
        if (dynamicParamType === "oc") {
          return {
            param: segmentKey,
            value: null,
            type: dynamicParamType,
            treeSegment: [
              segmentKey,
              "",
              dynamicParamType
            ]
          };
        }
        throw Object.defineProperty(new _invarianterror.InvariantError(`Missing value for segment key: "${segmentKey}" with dynamic param type: ${dynamicParamType}`), "__NEXT_ERROR_CODE", {
          value: "E864",
          enumerable: false,
          configurable: true
        });
      }
      return {
        param: segmentKey,
        // The value that is passed to user code.
        value,
        // The value that is rendered in the router tree.
        treeSegment: [
          segmentKey,
          Array.isArray(value) ? value.join("/") : value,
          dynamicParamType
        ],
        type: dynamicParamType
      };
    }
    var PARAMETER_PATTERN = /^([^[]*)\[((?:\[[^\]]*\])|[^\]]+)\](.*)$/;
    function parseParameter(param) {
      const match2 = param.match(PARAMETER_PATTERN);
      if (!match2) {
        return parseMatchedParameter(param);
      }
      return parseMatchedParameter(match2[2]);
    }
    function parseMatchedParameter(param) {
      const optional = param.startsWith("[") && param.endsWith("]");
      if (optional) {
        param = param.slice(1, -1);
      }
      const repeat = param.startsWith("...");
      if (repeat) {
        param = param.slice(3);
      }
      return {
        key: param,
        repeat,
        optional
      };
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/route-regex.js
var require_route_regex = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/route-regex.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports$1, {
      getNamedMiddlewareRegex: function() {
        return getNamedMiddlewareRegex;
      },
      getNamedRouteRegex: function() {
        return getNamedRouteRegex;
      },
      getRouteRegex: function() {
        return getRouteRegex;
      }
    });
    var _constants = require_constants();
    var _interceptionroutes = require_interception_routes();
    var _escaperegexp = require_escape_regexp();
    var _removetrailingslash = require_remove_trailing_slash();
    var _getdynamicparam = require_get_dynamic_param();
    function getParametrizedRoute(route, includeSuffix, includePrefix) {
      const groups = {};
      let groupIndex = 1;
      const segments = [];
      for (const segment of (0, _removetrailingslash.removeTrailingSlash)(route).slice(1).split("/")) {
        const markerMatch = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.find((m) => segment.startsWith(m));
        const paramMatches = segment.match(_getdynamicparam.PARAMETER_PATTERN);
        if (markerMatch && paramMatches && paramMatches[2]) {
          const { key, optional, repeat } = (0, _getdynamicparam.parseMatchedParameter)(paramMatches[2]);
          groups[key] = {
            pos: groupIndex++,
            repeat,
            optional
          };
          segments.push(`/${(0, _escaperegexp.escapeStringRegexp)(markerMatch)}([^/]+?)`);
        } else if (paramMatches && paramMatches[2]) {
          const { key, repeat, optional } = (0, _getdynamicparam.parseMatchedParameter)(paramMatches[2]);
          groups[key] = {
            pos: groupIndex++,
            repeat,
            optional
          };
          if (includePrefix && paramMatches[1]) {
            segments.push(`/${(0, _escaperegexp.escapeStringRegexp)(paramMatches[1])}`);
          }
          let s = repeat ? optional ? "(?:/(.+?))?" : "/(.+?)" : "/([^/]+?)";
          if (includePrefix && paramMatches[1]) {
            s = s.substring(1);
          }
          segments.push(s);
        } else {
          segments.push(`/${(0, _escaperegexp.escapeStringRegexp)(segment)}`);
        }
        if (includeSuffix && paramMatches && paramMatches[3]) {
          segments.push((0, _escaperegexp.escapeStringRegexp)(paramMatches[3]));
        }
      }
      return {
        parameterizedRoute: segments.join(""),
        groups
      };
    }
    function getRouteRegex(normalizedRoute, { includeSuffix = false, includePrefix = false, excludeOptionalTrailingSlash = false } = {}) {
      const { parameterizedRoute, groups } = getParametrizedRoute(normalizedRoute, includeSuffix, includePrefix);
      let re = parameterizedRoute;
      if (!excludeOptionalTrailingSlash) {
        re += "(?:/)?";
      }
      return {
        re: new RegExp(`^${re}$`),
        groups
      };
    }
    function buildGetSafeRouteKey() {
      let i = 0;
      return () => {
        let routeKey = "";
        let j = ++i;
        while (j > 0) {
          routeKey += String.fromCharCode(97 + (j - 1) % 26);
          j = Math.floor((j - 1) / 26);
        }
        return routeKey;
      };
    }
    function getSafeKeyFromSegment({ interceptionMarker, getSafeRouteKey, segment, routeKeys, keyPrefix, backreferenceDuplicateKeys }) {
      const { key, optional, repeat } = (0, _getdynamicparam.parseMatchedParameter)(segment);
      let cleanedKey = key.replace(/\W/g, "");
      if (keyPrefix) {
        cleanedKey = `${keyPrefix}${cleanedKey}`;
      }
      let invalidKey = false;
      if (cleanedKey.length === 0 || cleanedKey.length > 30) {
        invalidKey = true;
      }
      if (!isNaN(parseInt(cleanedKey.slice(0, 1)))) {
        invalidKey = true;
      }
      if (invalidKey) {
        cleanedKey = getSafeRouteKey();
      }
      const duplicateKey = cleanedKey in routeKeys;
      if (keyPrefix) {
        routeKeys[cleanedKey] = `${keyPrefix}${key}`;
      } else {
        routeKeys[cleanedKey] = key;
      }
      const interceptionPrefix = interceptionMarker ? (0, _escaperegexp.escapeStringRegexp)(interceptionMarker) : "";
      let pattern;
      if (duplicateKey && backreferenceDuplicateKeys) {
        pattern = `\\k<${cleanedKey}>`;
      } else if (repeat) {
        pattern = `(?<${cleanedKey}>.+?)`;
      } else {
        pattern = `(?<${cleanedKey}>[^/]+?)`;
      }
      return {
        key,
        pattern: optional ? `(?:/${interceptionPrefix}${pattern})?` : `/${interceptionPrefix}${pattern}`,
        cleanedKey,
        optional,
        repeat
      };
    }
    function getNamedParametrizedRoute(route, prefixRouteKeys, includeSuffix, includePrefix, backreferenceDuplicateKeys, reference = {
      names: {},
      intercepted: {}
    }) {
      var _a, _b;
      const getSafeRouteKey = buildGetSafeRouteKey();
      const routeKeys = {};
      const segments = [];
      const inverseParts = [];
      reference = structuredClone(reference);
      for (const segment of (0, _removetrailingslash.removeTrailingSlash)(route).slice(1).split("/")) {
        const hasInterceptionMarker = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.some((m) => segment.startsWith(m));
        const paramMatches = segment.match(_getdynamicparam.PARAMETER_PATTERN);
        const interceptionMarker = hasInterceptionMarker ? paramMatches?.[1] : void 0;
        let keyPrefix;
        if (interceptionMarker && paramMatches?.[2]) {
          keyPrefix = prefixRouteKeys ? _constants.NEXT_INTERCEPTION_MARKER_PREFIX : void 0;
          reference.intercepted[paramMatches[2]] = interceptionMarker;
        } else if (paramMatches?.[2] && reference.intercepted[paramMatches[2]]) {
          keyPrefix = prefixRouteKeys ? _constants.NEXT_INTERCEPTION_MARKER_PREFIX : void 0;
        } else {
          keyPrefix = prefixRouteKeys ? _constants.NEXT_QUERY_PARAM_PREFIX : void 0;
        }
        if (interceptionMarker && paramMatches && paramMatches[2]) {
          const { key, pattern, cleanedKey, repeat, optional } = getSafeKeyFromSegment({
            getSafeRouteKey,
            interceptionMarker,
            segment: paramMatches[2],
            routeKeys,
            keyPrefix,
            backreferenceDuplicateKeys
          });
          segments.push(pattern);
          inverseParts.push(`/${paramMatches[1]}:${reference.names[key] ?? cleanedKey}${repeat ? optional ? "*" : "+" : ""}`);
          (_a = reference.names)[key] ?? (_a[key] = cleanedKey);
        } else if (paramMatches && paramMatches[2]) {
          if (includePrefix && paramMatches[1]) {
            segments.push(`/${(0, _escaperegexp.escapeStringRegexp)(paramMatches[1])}`);
            inverseParts.push(`/${paramMatches[1]}`);
          }
          const { key, pattern, cleanedKey, repeat, optional } = getSafeKeyFromSegment({
            getSafeRouteKey,
            segment: paramMatches[2],
            routeKeys,
            keyPrefix,
            backreferenceDuplicateKeys
          });
          let s = pattern;
          if (includePrefix && paramMatches[1]) {
            s = s.substring(1);
          }
          segments.push(s);
          inverseParts.push(`/:${reference.names[key] ?? cleanedKey}${repeat ? optional ? "*" : "+" : ""}`);
          (_b = reference.names)[key] ?? (_b[key] = cleanedKey);
        } else {
          segments.push(`/${(0, _escaperegexp.escapeStringRegexp)(segment)}`);
          inverseParts.push(`/${segment}`);
        }
        if (includeSuffix && paramMatches && paramMatches[3]) {
          segments.push((0, _escaperegexp.escapeStringRegexp)(paramMatches[3]));
          inverseParts.push(paramMatches[3]);
        }
      }
      return {
        namedParameterizedRoute: segments.join(""),
        routeKeys,
        pathToRegexpPattern: inverseParts.join(""),
        reference
      };
    }
    function getNamedRouteRegex(normalizedRoute, options) {
      const result = getNamedParametrizedRoute(normalizedRoute, options.prefixRouteKeys, options.includeSuffix ?? false, options.includePrefix ?? false, options.backreferenceDuplicateKeys ?? false, options.reference);
      let namedRegex = result.namedParameterizedRoute;
      if (!options.excludeOptionalTrailingSlash) {
        namedRegex += "(?:/)?";
      }
      return {
        ...getRouteRegex(normalizedRoute, options),
        namedRegex: `^${namedRegex}$`,
        routeKeys: result.routeKeys,
        pathToRegexpPattern: result.pathToRegexpPattern,
        reference: result.reference
      };
    }
    function getNamedMiddlewareRegex(normalizedRoute, options) {
      const { parameterizedRoute } = getParametrizedRoute(normalizedRoute, false, false);
      const { catchAll = true } = options;
      if (parameterizedRoute === "/") {
        let catchAllRegex = catchAll ? ".*" : "";
        return {
          namedRegex: `^/${catchAllRegex}$`
        };
      }
      const { namedParameterizedRoute } = getNamedParametrizedRoute(normalizedRoute, false, false, false, false, void 0);
      let catchAllGroupedRegex = catchAll ? "(?:(/.*)?)" : "";
      return {
        namedRegex: `^${namedParameterizedRoute}${catchAllGroupedRegex}$`
      };
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/interpolate-as.js
var require_interpolate_as = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/interpolate-as.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "interpolateAs", {
      enumerable: true,
      get: function() {
        return interpolateAs;
      }
    });
    var _routematcher = require_route_matcher();
    var _routeregex = require_route_regex();
    function interpolateAs(route, asPathname, query) {
      let interpolatedRoute = "";
      const dynamicRegex = (0, _routeregex.getRouteRegex)(route);
      const dynamicGroups = dynamicRegex.groups;
      const dynamicMatches = (
        // Try to match the dynamic route against the asPath
        (asPathname !== route ? (0, _routematcher.getRouteMatcher)(dynamicRegex)(asPathname) : "") || // Fall back to reading the values from the href
        // TODO: should this take priority; also need to change in the router.
        query
      );
      interpolatedRoute = route;
      const params = Object.keys(dynamicGroups);
      if (!params.every((param) => {
        let value = dynamicMatches[param] || "";
        const { repeat, optional } = dynamicGroups[param];
        let replaced = `[${repeat ? "..." : ""}${param}]`;
        if (optional) {
          replaced = `${!value ? "/" : ""}[${replaced}]`;
        }
        if (repeat && !Array.isArray(value)) value = [
          value
        ];
        return (optional || param in dynamicMatches) && // Interpolate group into data URL if present
        (interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map(
          // these values should be fully encoded instead of just
          // path delimiter escaped since they are being inserted
          // into the URL and we expect URL encoded segments
          // when parsing dynamic route params
          (segment) => encodeURIComponent(segment)
        ).join("/") : encodeURIComponent(value)) || "/");
      })) {
        interpolatedRoute = "";
      }
      return {
        params,
        result: interpolatedRoute
      };
    }
  }
});

// node_modules/next/dist/client/resolve-href.js
var require_resolve_href = __commonJS({
  "node_modules/next/dist/client/resolve-href.js"(exports$1, module) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "resolveHref", {
      enumerable: true,
      get: function() {
        return resolveHref;
      }
    });
    var _querystring = require_querystring();
    var _formaturl = require_format_url();
    var _omit = require_omit();
    var _utils = require_utils();
    var _normalizetrailingslash = require_normalize_trailing_slash();
    var _islocalurl = require_is_local_url();
    var _utils1 = require_utils2();
    var _interpolateas = require_interpolate_as();
    var _routeregex = require_route_regex();
    var _routematcher = require_route_matcher();
    function resolveHref(router, href, resolveAs) {
      let base;
      let urlAsString = typeof href === "string" ? href : (0, _formaturl.formatWithValidation)(href);
      const urlProtoMatch = urlAsString.match(/^[a-z][a-z0-9+.-]*:\/\//i);
      const urlAsStringNoProto = urlProtoMatch ? urlAsString.slice(urlProtoMatch[0].length) : urlAsString;
      const urlParts = urlAsStringNoProto.split("?", 1);
      if ((urlParts[0] || "").match(/(\/\/|\\)/)) {
        console.error(`Invalid href '${urlAsString}' passed to next/router in page: '${router.pathname}'. Repeated forward-slashes (//) or backslashes \\ are not valid in the href.`);
        const normalizedUrl = (0, _utils.normalizeRepeatedSlashes)(urlAsStringNoProto);
        urlAsString = (urlProtoMatch ? urlProtoMatch[0] : "") + normalizedUrl;
      }
      if (!(0, _islocalurl.isLocalURL)(urlAsString)) {
        return resolveAs ? [
          urlAsString
        ] : urlAsString;
      }
      try {
        let baseBase = urlAsString.startsWith("#") ? router.asPath : router.pathname;
        if (urlAsString.startsWith("?")) {
          baseBase = router.asPath;
          if ((0, _utils1.isDynamicRoute)(router.pathname)) {
            baseBase = router.pathname;
            const routeRegex = (0, _routeregex.getRouteRegex)(router.pathname);
            const match2 = (0, _routematcher.getRouteMatcher)(routeRegex)(router.asPath);
            if (!match2) {
              baseBase = router.asPath;
            }
          }
        }
        base = new URL(baseBase, "http://n");
      } catch (_) {
        base = new URL("/", "http://n");
      }
      try {
        const finalUrl = new URL(urlAsString, base);
        finalUrl.pathname = (0, _normalizetrailingslash.normalizePathTrailingSlash)(finalUrl.pathname);
        let interpolatedAs = "";
        if ((0, _utils1.isDynamicRoute)(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
          const query = (0, _querystring.searchParamsToUrlQuery)(finalUrl.searchParams);
          const { result, params } = (0, _interpolateas.interpolateAs)(finalUrl.pathname, finalUrl.pathname, query);
          if (result) {
            interpolatedAs = (0, _formaturl.formatWithValidation)({
              pathname: result,
              hash: finalUrl.hash,
              query: (0, _omit.omit)(query, params)
            });
          }
        }
        const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
        return resolveAs ? [
          resolvedHref,
          interpolatedAs || resolvedHref
        ] : resolvedHref;
      } catch (_) {
        return resolveAs ? [
          urlAsString
        ] : urlAsString;
      }
    }
    if ((typeof exports$1.default === "function" || typeof exports$1.default === "object" && exports$1.default !== null) && typeof exports$1.default.__esModule === "undefined") {
      Object.defineProperty(exports$1.default, "__esModule", { value: true });
      Object.assign(exports$1.default, exports$1);
      module.exports = exports$1.default;
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js
var require_add_path_prefix = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "addPathPrefix", {
      enumerable: true,
      get: function() {
        return addPathPrefix;
      }
    });
    var _parsepath = require_parse_path();
    function addPathPrefix(path, prefix) {
      if (!path.startsWith("/") || !prefix) {
        return path;
      }
      const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
      return `${prefix}${pathname}${query}${hash}`;
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/add-locale.js
var require_add_locale = __commonJS({
  "node_modules/next/dist/shared/lib/router/utils/add-locale.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "addLocale", {
      enumerable: true,
      get: function() {
        return addLocale;
      }
    });
    var _addpathprefix = require_add_path_prefix();
    var _pathhasprefix = require_path_has_prefix();
    function addLocale(path, locale, defaultLocale, ignorePrefix) {
      if (!locale || locale === defaultLocale) return path;
      const lower = path.toLowerCase();
      if (!ignorePrefix) {
        if ((0, _pathhasprefix.pathHasPrefix)(lower, "/api")) return path;
        if ((0, _pathhasprefix.pathHasPrefix)(lower, `/${locale.toLowerCase()}`)) return path;
      }
      return (0, _addpathprefix.addPathPrefix)(path, `/${locale}`);
    }
  }
});

// node_modules/next/dist/client/add-locale.js
var require_add_locale2 = __commonJS({
  "node_modules/next/dist/client/add-locale.js"(exports$1, module) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "addLocale", {
      enumerable: true,
      get: function() {
        return addLocale;
      }
    });
    var _normalizetrailingslash = require_normalize_trailing_slash();
    var addLocale = (path, ...args) => {
      if (process.env.__NEXT_I18N_SUPPORT) {
        return (0, _normalizetrailingslash.normalizePathTrailingSlash)(require_add_locale().addLocale(path, ...args));
      }
      return path;
    };
    if ((typeof exports$1.default === "function" || typeof exports$1.default === "object" && exports$1.default !== null) && typeof exports$1.default.__esModule === "undefined") {
      Object.defineProperty(exports$1.default, "__esModule", { value: true });
      Object.assign(exports$1.default, exports$1);
      module.exports = exports$1.default;
    }
  }
});

// node_modules/@swc/helpers/cjs/_interop_require_default.cjs
var require_interop_require_default = __commonJS({
  "node_modules/@swc/helpers/cjs/_interop_require_default.cjs"(exports$1) {
    function _interop_require_default(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    exports$1._ = _interop_require_default;
  }
});

// node_modules/next/dist/shared/lib/router-context.shared-runtime.js
var require_router_context_shared_runtime = __commonJS({
  "node_modules/next/dist/shared/lib/router-context.shared-runtime.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "RouterContext", {
      enumerable: true,
      get: function() {
        return RouterContext;
      }
    });
    var _interop_require_default = require_interop_require_default();
    var _react = /* @__PURE__ */ _interop_require_default._(__require("react"));
    var RouterContext = _react.default.createContext(null);
    if (process.env.NODE_ENV !== "production") {
      RouterContext.displayName = "RouterContext";
    }
  }
});

// node_modules/next/dist/client/request-idle-callback.js
var require_request_idle_callback = __commonJS({
  "node_modules/next/dist/client/request-idle-callback.js"(exports$1, module) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports$1, {
      cancelIdleCallback: function() {
        return cancelIdleCallback;
      },
      requestIdleCallback: function() {
        return requestIdleCallback;
      }
    });
    var requestIdleCallback = typeof self !== "undefined" && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(cb) {
      let start = Date.now();
      return self.setTimeout(function() {
        cb({
          didTimeout: false,
          timeRemaining: function() {
            return Math.max(0, 50 - (Date.now() - start));
          }
        });
      }, 1);
    };
    var cancelIdleCallback = typeof self !== "undefined" && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(id) {
      return clearTimeout(id);
    };
    if ((typeof exports$1.default === "function" || typeof exports$1.default === "object" && exports$1.default !== null) && typeof exports$1.default.__esModule === "undefined") {
      Object.defineProperty(exports$1.default, "__esModule", { value: true });
      Object.assign(exports$1.default, exports$1);
      module.exports = exports$1.default;
    }
  }
});

// node_modules/next/dist/client/use-intersection.js
var require_use_intersection = __commonJS({
  "node_modules/next/dist/client/use-intersection.js"(exports$1, module) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "useIntersection", {
      enumerable: true,
      get: function() {
        return useIntersection;
      }
    });
    var _react = __require("react");
    var _requestidlecallback = require_request_idle_callback();
    var hasIntersectionObserver = typeof IntersectionObserver === "function";
    var observers = /* @__PURE__ */ new Map();
    var idList = [];
    function createObserver(options) {
      const id = {
        root: options.root || null,
        margin: options.rootMargin || ""
      };
      const existing = idList.find((obj) => obj.root === id.root && obj.margin === id.margin);
      let instance;
      if (existing) {
        instance = observers.get(existing);
        if (instance) {
          return instance;
        }
      }
      const elements = /* @__PURE__ */ new Map();
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const callback = elements.get(entry.target);
          const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;
          if (callback && isVisible) {
            callback(isVisible);
          }
        });
      }, options);
      instance = {
        id,
        observer,
        elements
      };
      idList.push(id);
      observers.set(id, instance);
      return instance;
    }
    function observe(element, callback, options) {
      const { id, observer, elements } = createObserver(options);
      elements.set(element, callback);
      observer.observe(element);
      return function unobserve() {
        elements.delete(element);
        observer.unobserve(element);
        if (elements.size === 0) {
          observer.disconnect();
          observers.delete(id);
          const index = idList.findIndex((obj) => obj.root === id.root && obj.margin === id.margin);
          if (index > -1) {
            idList.splice(index, 1);
          }
        }
      };
    }
    function useIntersection({ rootRef, rootMargin, disabled }) {
      const isDisabled = disabled || !hasIntersectionObserver;
      const [visible, setVisible] = (0, _react.useState)(false);
      const elementRef = (0, _react.useRef)(null);
      const setElement = (0, _react.useCallback)((element) => {
        elementRef.current = element;
      }, []);
      (0, _react.useEffect)(() => {
        if (hasIntersectionObserver) {
          if (isDisabled || visible) return;
          const element = elementRef.current;
          if (element && element.tagName) {
            const unobserve = observe(element, (isVisible) => isVisible && setVisible(isVisible), {
              root: rootRef?.current,
              rootMargin
            });
            return unobserve;
          }
        } else {
          if (!visible) {
            const idleCallback = (0, _requestidlecallback.requestIdleCallback)(() => setVisible(true));
            return () => (0, _requestidlecallback.cancelIdleCallback)(idleCallback);
          }
        }
      }, [
        isDisabled,
        rootMargin,
        rootRef,
        visible,
        elementRef.current
      ]);
      const resetVisible = (0, _react.useCallback)(() => {
        setVisible(false);
      }, []);
      return [
        setElement,
        visible,
        resetVisible
      ];
    }
    if ((typeof exports$1.default === "function" || typeof exports$1.default === "object" && exports$1.default !== null) && typeof exports$1.default.__esModule === "undefined") {
      Object.defineProperty(exports$1.default, "__esModule", { value: true });
      Object.assign(exports$1.default, exports$1);
      module.exports = exports$1.default;
    }
  }
});

// node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js
var require_normalize_locale_path = __commonJS({
  "node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "normalizeLocalePath", {
      enumerable: true,
      get: function() {
        return normalizeLocalePath;
      }
    });
    var cache = /* @__PURE__ */ new WeakMap();
    function normalizeLocalePath(pathname, locales) {
      if (!locales) return {
        pathname
      };
      let lowercasedLocales = cache.get(locales);
      if (!lowercasedLocales) {
        lowercasedLocales = locales.map((locale) => locale.toLowerCase());
        cache.set(locales, lowercasedLocales);
      }
      let detectedLocale;
      const segments = pathname.split("/", 2);
      if (!segments[1]) return {
        pathname
      };
      const segment = segments[1].toLowerCase();
      const index = lowercasedLocales.indexOf(segment);
      if (index < 0) return {
        pathname
      };
      detectedLocale = locales[index];
      pathname = pathname.slice(detectedLocale.length + 1) || "/";
      return {
        pathname,
        detectedLocale
      };
    }
  }
});

// node_modules/next/dist/client/normalize-locale-path.js
var require_normalize_locale_path2 = __commonJS({
  "node_modules/next/dist/client/normalize-locale-path.js"(exports$1, module) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "normalizeLocalePath", {
      enumerable: true,
      get: function() {
        return normalizeLocalePath;
      }
    });
    var normalizeLocalePath = (pathname, locales) => {
      if (process.env.__NEXT_I18N_SUPPORT) {
        return require_normalize_locale_path().normalizeLocalePath(pathname, locales);
      }
      return {
        pathname,
        detectedLocale: void 0
      };
    };
    if ((typeof exports$1.default === "function" || typeof exports$1.default === "object" && exports$1.default !== null) && typeof exports$1.default.__esModule === "undefined") {
      Object.defineProperty(exports$1.default, "__esModule", { value: true });
      Object.assign(exports$1.default, exports$1);
      module.exports = exports$1.default;
    }
  }
});

// node_modules/next/dist/shared/lib/i18n/detect-domain-locale.js
var require_detect_domain_locale = __commonJS({
  "node_modules/next/dist/shared/lib/i18n/detect-domain-locale.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "detectDomainLocale", {
      enumerable: true,
      get: function() {
        return detectDomainLocale;
      }
    });
    function detectDomainLocale(domainItems, hostname, detectedLocale) {
      if (!domainItems) return;
      if (detectedLocale) {
        detectedLocale = detectedLocale.toLowerCase();
      }
      for (const item of domainItems) {
        const domainHostname = item.domain?.split(":", 1)[0].toLowerCase();
        if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || item.locales?.some((locale) => locale.toLowerCase() === detectedLocale)) {
          return item;
        }
      }
    }
  }
});

// node_modules/next/dist/client/detect-domain-locale.js
var require_detect_domain_locale2 = __commonJS({
  "node_modules/next/dist/client/detect-domain-locale.js"(exports$1, module) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "detectDomainLocale", {
      enumerable: true,
      get: function() {
        return detectDomainLocale;
      }
    });
    var detectDomainLocale = (...args) => {
      if (process.env.__NEXT_I18N_SUPPORT) {
        return require_detect_domain_locale().detectDomainLocale(...args);
      }
    };
    if ((typeof exports$1.default === "function" || typeof exports$1.default === "object" && exports$1.default !== null) && typeof exports$1.default.__esModule === "undefined") {
      Object.defineProperty(exports$1.default, "__esModule", { value: true });
      Object.assign(exports$1.default, exports$1);
      module.exports = exports$1.default;
    }
  }
});

// node_modules/next/dist/client/get-domain-locale.js
var require_get_domain_locale = __commonJS({
  "node_modules/next/dist/client/get-domain-locale.js"(exports$1, module) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "getDomainLocale", {
      enumerable: true,
      get: function() {
        return getDomainLocale;
      }
    });
    var _normalizetrailingslash = require_normalize_trailing_slash();
    var basePath = process.env.__NEXT_ROUTER_BASEPATH || "";
    function getDomainLocale(path, locale, locales, domainLocales) {
      if (process.env.__NEXT_I18N_SUPPORT) {
        const normalizeLocalePath = require_normalize_locale_path2().normalizeLocalePath;
        const detectDomainLocale = require_detect_domain_locale2().detectDomainLocale;
        const target = locale || normalizeLocalePath(path, locales).detectedLocale;
        const domain = detectDomainLocale(domainLocales, void 0, target);
        if (domain) {
          const proto = `http${domain.http ? "" : "s"}://`;
          const finalLocale = target === domain.defaultLocale ? "" : `/${target}`;
          return `${proto}${domain.domain}${(0, _normalizetrailingslash.normalizePathTrailingSlash)(`${basePath}${finalLocale}${path}`)}`;
        }
        return false;
      } else {
        return false;
      }
    }
    if ((typeof exports$1.default === "function" || typeof exports$1.default === "object" && exports$1.default !== null) && typeof exports$1.default.__esModule === "undefined") {
      Object.defineProperty(exports$1.default, "__esModule", { value: true });
      Object.assign(exports$1.default, exports$1);
      module.exports = exports$1.default;
    }
  }
});

// node_modules/next/dist/client/add-base-path.js
var require_add_base_path = __commonJS({
  "node_modules/next/dist/client/add-base-path.js"(exports$1, module) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "addBasePath", {
      enumerable: true,
      get: function() {
        return addBasePath;
      }
    });
    var _addpathprefix = require_add_path_prefix();
    var _normalizetrailingslash = require_normalize_trailing_slash();
    var basePath = process.env.__NEXT_ROUTER_BASEPATH || "";
    function addBasePath(path, required) {
      return (0, _normalizetrailingslash.normalizePathTrailingSlash)(process.env.__NEXT_MANUAL_CLIENT_BASE_PATH && !required ? path : (0, _addpathprefix.addPathPrefix)(path, basePath));
    }
    if ((typeof exports$1.default === "function" || typeof exports$1.default === "object" && exports$1.default !== null) && typeof exports$1.default.__esModule === "undefined") {
      Object.defineProperty(exports$1.default, "__esModule", { value: true });
      Object.assign(exports$1.default, exports$1);
      module.exports = exports$1.default;
    }
  }
});

// node_modules/next/dist/client/use-merged-ref.js
var require_use_merged_ref = __commonJS({
  "node_modules/next/dist/client/use-merged-ref.js"(exports$1, module) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "useMergedRef", {
      enumerable: true,
      get: function() {
        return useMergedRef;
      }
    });
    var _react = __require("react");
    function useMergedRef(refA, refB) {
      const cleanupA = (0, _react.useRef)(null);
      const cleanupB = (0, _react.useRef)(null);
      return (0, _react.useCallback)((current) => {
        if (current === null) {
          const cleanupFnA = cleanupA.current;
          if (cleanupFnA) {
            cleanupA.current = null;
            cleanupFnA();
          }
          const cleanupFnB = cleanupB.current;
          if (cleanupFnB) {
            cleanupB.current = null;
            cleanupFnB();
          }
        } else {
          if (refA) {
            cleanupA.current = applyRef(refA, current);
          }
          if (refB) {
            cleanupB.current = applyRef(refB, current);
          }
        }
      }, [
        refA,
        refB
      ]);
    }
    function applyRef(refA, current) {
      if (typeof refA === "function") {
        const cleanup = refA(current);
        if (typeof cleanup === "function") {
          return cleanup;
        } else {
          return () => refA(null);
        }
      } else {
        refA.current = current;
        return () => {
          refA.current = null;
        };
      }
    }
    if ((typeof exports$1.default === "function" || typeof exports$1.default === "object" && exports$1.default !== null) && typeof exports$1.default.__esModule === "undefined") {
      Object.defineProperty(exports$1.default, "__esModule", { value: true });
      Object.assign(exports$1.default, exports$1);
      module.exports = exports$1.default;
    }
  }
});

// node_modules/next/dist/shared/lib/utils/error-once.js
var require_error_once = __commonJS({
  "node_modules/next/dist/shared/lib/utils/error-once.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    Object.defineProperty(exports$1, "errorOnce", {
      enumerable: true,
      get: function() {
        return errorOnce;
      }
    });
    var errorOnce = (_) => {
    };
    if (process.env.NODE_ENV !== "production") {
      const errors = /* @__PURE__ */ new Set();
      errorOnce = (msg) => {
        if (!errors.has(msg)) {
          console.error(msg);
        }
        errors.add(msg);
      };
    }
  }
});

// node_modules/next/dist/client/link.js
var require_link = __commonJS({
  "node_modules/next/dist/client/link.js"(exports$1, module) {
    "use client";
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports$1, {
      default: function() {
        return _default;
      },
      useLinkStatus: function() {
        return useLinkStatus;
      }
    });
    var _interop_require_wildcard = require_interop_require_wildcard();
    var _jsxruntime = __require("react/jsx-runtime");
    var _react = /* @__PURE__ */ _interop_require_wildcard._(__require("react"));
    var _resolvehref = require_resolve_href();
    var _islocalurl = require_is_local_url();
    var _formaturl = require_format_url();
    var _utils = require_utils();
    var _addlocale = require_add_locale2();
    var _routercontextsharedruntime = require_router_context_shared_runtime();
    var _useintersection = require_use_intersection();
    var _getdomainlocale = require_get_domain_locale();
    var _addbasepath = require_add_base_path();
    var _usemergedref = require_use_merged_ref();
    var _erroronce = require_error_once();
    var prefetched = /* @__PURE__ */ new Set();
    function prefetch(router, href, as, options) {
      if (typeof window === "undefined") {
        return;
      }
      if (!(0, _islocalurl.isLocalURL)(href)) {
        return;
      }
      if (!options.bypassPrefetchedCheck) {
        const locale = (
          // Let the link's locale prop override the default router locale.
          typeof options.locale !== "undefined" ? options.locale : "locale" in router ? router.locale : void 0
        );
        const prefetchedKey = href + "%" + as + "%" + locale;
        if (prefetched.has(prefetchedKey)) {
          return;
        }
        prefetched.add(prefetchedKey);
      }
      router.prefetch(href, as, options).catch((err) => {
        if (process.env.NODE_ENV !== "production") {
          throw err;
        }
      });
    }
    function isModifiedEvent(event) {
      const eventTarget = event.currentTarget;
      const target = eventTarget.getAttribute("target");
      return target && target !== "_self" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
      event.nativeEvent && event.nativeEvent.which === 2;
    }
    function linkClicked(e, router, href, as, replace, shallow, scroll, locale, onNavigate) {
      const { nodeName } = e.currentTarget;
      const isAnchorNodeName = nodeName.toUpperCase() === "A";
      if (isAnchorNodeName && isModifiedEvent(e) || e.currentTarget.hasAttribute("download")) {
        return;
      }
      if (!(0, _islocalurl.isLocalURL)(href)) {
        if (replace) {
          e.preventDefault();
          location.replace(href);
        }
        return;
      }
      e.preventDefault();
      const navigate = () => {
        if (onNavigate) {
          let isDefaultPrevented = false;
          onNavigate({
            preventDefault: () => {
              isDefaultPrevented = true;
            }
          });
          if (isDefaultPrevented) {
            return;
          }
        }
        const routerScroll = scroll ?? true;
        if ("beforePopState" in router) {
          router[replace ? "replace" : "push"](href, as, {
            shallow,
            locale,
            scroll: routerScroll
          });
        } else {
          router[replace ? "replace" : "push"](as || href, {
            scroll: routerScroll
          });
        }
      };
      navigate();
    }
    function formatStringOrUrl(urlObjOrString) {
      if (typeof urlObjOrString === "string") {
        return urlObjOrString;
      }
      return (0, _formaturl.formatUrl)(urlObjOrString);
    }
    var Link2 = /* @__PURE__ */ _react.default.forwardRef(function LinkComponent(props, forwardedRef) {
      let children;
      const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, locale, onClick, onNavigate, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, ...restProps } = props;
      children = childrenProp;
      if (legacyBehavior && (typeof children === "string" || typeof children === "number")) {
        children = /* @__PURE__ */ (0, _jsxruntime.jsx)("a", {
          children
        });
      }
      const router = _react.default.useContext(_routercontextsharedruntime.RouterContext);
      const prefetchEnabled = prefetchProp !== false;
      if (process.env.NODE_ENV !== "production") {
        let createPropError = function(args) {
          return Object.defineProperty(new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + (typeof window !== "undefined" ? "\nOpen your browser's console to view the Component stack trace." : "")), "__NEXT_ERROR_CODE", {
            value: "E319",
            enumerable: false,
            configurable: true
          });
        };
        const requiredPropsGuard = {
          href: true
        };
        const requiredProps = Object.keys(requiredPropsGuard);
        requiredProps.forEach((key) => {
          if (key === "href") {
            if (props[key] == null || typeof props[key] !== "string" && typeof props[key] !== "object") {
              throw createPropError({
                key,
                expected: "`string` or `object`",
                actual: props[key] === null ? "null" : typeof props[key]
              });
            }
          }
        });
        const optionalPropsGuard = {
          as: true,
          replace: true,
          scroll: true,
          shallow: true,
          passHref: true,
          prefetch: true,
          locale: true,
          onClick: true,
          onMouseEnter: true,
          onTouchStart: true,
          legacyBehavior: true,
          onNavigate: true
        };
        const optionalProps = Object.keys(optionalPropsGuard);
        optionalProps.forEach((key) => {
          const valType = typeof props[key];
          if (key === "as") {
            if (props[key] && valType !== "string" && valType !== "object") {
              throw createPropError({
                key,
                expected: "`string` or `object`",
                actual: valType
              });
            }
          } else if (key === "locale") {
            if (props[key] && valType !== "string") {
              throw createPropError({
                key,
                expected: "`string`",
                actual: valType
              });
            }
          } else if (key === "onClick" || key === "onMouseEnter" || key === "onTouchStart" || key === "onNavigate") {
            if (props[key] && valType !== "function") {
              throw createPropError({
                key,
                expected: "`function`",
                actual: valType
              });
            }
          } else if (key === "replace" || key === "scroll" || key === "shallow" || key === "passHref" || key === "legacyBehavior") {
            if (props[key] != null && valType !== "boolean") {
              throw createPropError({
                key,
                expected: "`boolean`",
                actual: valType
              });
            }
          } else if (key === "prefetch") {
            if (props[key] != null && valType !== "boolean" && props[key] !== "auto") {
              throw createPropError({
                key,
                expected: '`boolean | "auto"`',
                actual: valType
              });
            }
          } else ;
        });
      }
      const { href, as } = _react.default.useMemo(() => {
        if (!router) {
          const resolvedHref2 = formatStringOrUrl(hrefProp);
          return {
            href: resolvedHref2,
            as: asProp ? formatStringOrUrl(asProp) : resolvedHref2
          };
        }
        const [resolvedHref, resolvedAs] = (0, _resolvehref.resolveHref)(router, hrefProp, true);
        return {
          href: resolvedHref,
          as: asProp ? (0, _resolvehref.resolveHref)(router, asProp) : resolvedAs || resolvedHref
        };
      }, [
        router,
        hrefProp,
        asProp
      ]);
      const previousHref = _react.default.useRef(href);
      const previousAs = _react.default.useRef(as);
      let child;
      if (legacyBehavior) {
        if (process.env.NODE_ENV === "development") {
          if (onClick) {
            console.warn(`"onClick" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link`);
          }
          if (onMouseEnterProp) {
            console.warn(`"onMouseEnter" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link`);
          }
          try {
            child = _react.default.Children.only(children);
          } catch (err) {
            if (!children) {
              throw Object.defineProperty(new Error(`No children were passed to <Link> with \`href\` of \`${hrefProp}\` but one child is required https://nextjs.org/docs/messages/link-no-children`), "__NEXT_ERROR_CODE", {
                value: "E320",
                enumerable: false,
                configurable: true
              });
            }
            throw Object.defineProperty(new Error(`Multiple children were passed to <Link> with \`href\` of \`${hrefProp}\` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children` + (typeof window !== "undefined" ? " \nOpen your browser's console to view the Component stack trace." : "")), "__NEXT_ERROR_CODE", {
              value: "E266",
              enumerable: false,
              configurable: true
            });
          }
        } else {
          child = _react.default.Children.only(children);
        }
      } else {
        if (process.env.NODE_ENV === "development") {
          if (children?.type === "a") {
            throw Object.defineProperty(new Error("Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor"), "__NEXT_ERROR_CODE", {
              value: "E209",
              enumerable: false,
              configurable: true
            });
          }
        }
      }
      const childRef = legacyBehavior ? child && typeof child === "object" && child.ref : forwardedRef;
      const [setIntersectionRef, isVisible, resetVisible] = (0, _useintersection.useIntersection)({
        rootMargin: "200px"
      });
      const setIntersectionWithResetRef = _react.default.useCallback((el) => {
        if (previousAs.current !== as || previousHref.current !== href) {
          resetVisible();
          previousAs.current = as;
          previousHref.current = href;
        }
        setIntersectionRef(el);
      }, [
        as,
        href,
        resetVisible,
        setIntersectionRef
      ]);
      const setRef = (0, _usemergedref.useMergedRef)(setIntersectionWithResetRef, childRef);
      _react.default.useEffect(() => {
        if (process.env.NODE_ENV !== "production") {
          return;
        }
        if (!router) {
          return;
        }
        if (!isVisible || !prefetchEnabled) {
          return;
        }
        prefetch(router, href, as, {
          locale
        });
      }, [
        as,
        href,
        isVisible,
        locale,
        prefetchEnabled,
        router?.locale,
        router
      ]);
      const childProps = {
        ref: setRef,
        onClick(e) {
          if (process.env.NODE_ENV !== "production") {
            if (!e) {
              throw Object.defineProperty(new Error(`Component rendered inside next/link has to pass click event to "onClick" prop.`), "__NEXT_ERROR_CODE", {
                value: "E312",
                enumerable: false,
                configurable: true
              });
            }
          }
          if (!legacyBehavior && typeof onClick === "function") {
            onClick(e);
          }
          if (legacyBehavior && child.props && typeof child.props.onClick === "function") {
            child.props.onClick(e);
          }
          if (!router) {
            return;
          }
          if (e.defaultPrevented) {
            return;
          }
          linkClicked(e, router, href, as, replace, shallow, scroll, locale, onNavigate);
        },
        onMouseEnter(e) {
          if (!legacyBehavior && typeof onMouseEnterProp === "function") {
            onMouseEnterProp(e);
          }
          if (legacyBehavior && child.props && typeof child.props.onMouseEnter === "function") {
            child.props.onMouseEnter(e);
          }
          if (!router) {
            return;
          }
          prefetch(router, href, as, {
            locale,
            priority: true,
            // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
            bypassPrefetchedCheck: true
          });
        },
        onTouchStart: process.env.__NEXT_LINK_NO_TOUCH_START ? void 0 : function onTouchStart(e) {
          if (!legacyBehavior && typeof onTouchStartProp === "function") {
            onTouchStartProp(e);
          }
          if (legacyBehavior && child.props && typeof child.props.onTouchStart === "function") {
            child.props.onTouchStart(e);
          }
          if (!router) {
            return;
          }
          prefetch(router, href, as, {
            locale,
            priority: true,
            // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
            bypassPrefetchedCheck: true
          });
        }
      };
      if ((0, _utils.isAbsoluteUrl)(as)) {
        childProps.href = as;
      } else if (!legacyBehavior || passHref || child.type === "a" && !("href" in child.props)) {
        const curLocale = typeof locale !== "undefined" ? locale : router?.locale;
        const localeDomain = router?.isLocaleDomain && (0, _getdomainlocale.getDomainLocale)(as, curLocale, router?.locales, router?.domainLocales);
        childProps.href = localeDomain || (0, _addbasepath.addBasePath)((0, _addlocale.addLocale)(as, curLocale, router?.defaultLocale));
      }
      if (legacyBehavior) {
        if (process.env.NODE_ENV === "development") {
          (0, _erroronce.errorOnce)("`legacyBehavior` is deprecated and will be removed in a future release. A codemod is available to upgrade your components:\n\nnpx @next/codemod@latest new-link .\n\nLearn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components");
        }
        return /* @__PURE__ */ _react.default.cloneElement(child, childProps);
      }
      return /* @__PURE__ */ (0, _jsxruntime.jsx)("a", {
        ...restProps,
        ...childProps,
        children
      });
    });
    var LinkStatusContext = /* @__PURE__ */ (0, _react.createContext)({
      // We do not support link status in the Pages Router, so we always return false
      pending: false
    });
    var useLinkStatus = () => {
      return (0, _react.useContext)(LinkStatusContext);
    };
    var _default = Link2;
    if ((typeof exports$1.default === "function" || typeof exports$1.default === "object" && exports$1.default !== null) && typeof exports$1.default.__esModule === "undefined") {
      Object.defineProperty(exports$1.default, "__esModule", { value: true });
      Object.assign(exports$1.default, exports$1);
      module.exports = exports$1.default;
    }
  }
});

// node_modules/next/link.js
var require_link2 = __commonJS({
  "node_modules/next/link.js"(exports$1, module) {
    module.exports = require_link();
  }
});
var spring = {
  /** zeta ~0.88. Controls and indicators. */
  snappy: { type: "spring", stiffness: 520, damping: 40, mass: 1 },
  /** zeta ~0.87. The default for things that appear. */
  smooth: { type: "spring", stiffness: 320, damping: 31, mass: 1 },
  /** zeta ~1.0. Large panels and anything that travels far. */
  gentle: { type: "spring", stiffness: 210, damping: 29, mass: 1 },
  /** zeta ~0.52. Visible overshoot, for moments of delight. */
  bouncy: { type: "spring", stiffness: 380, damping: 20, mass: 1 },
  /** zeta ~0.35. Decorative jelly only. */
  wobbly: { type: "spring", stiffness: 180, damping: 9.5, mass: 1 }
};
var springValue = {
  snappy: { stiffness: 520, damping: 40, mass: 1 },
  smooth: { stiffness: 320, damping: 31, mass: 1 },
  gentle: { stiffness: 210, damping: 29, mass: 1 },
  bouncy: { stiffness: 380, damping: 20, mass: 1 },
  wobbly: { stiffness: 180, damping: 9.5, mass: 1 }
};
var exit = {
  /** Small things: tooltips, menus, toasts. */
  quick: { duration: 0.12, ease: [0.4, 0, 1, 1] },
  /** Overlays and panels. */
  panel: { duration: 0.18, ease: [0.4, 0, 1, 1] }
};
var fade = {
  in: { duration: 0.2, ease: [0, 0, 0.2, 1] },
  out: { duration: 0.15, ease: [0.4, 0, 1, 1] }
};
var stagger = { tight: 0.025, normal: 0.04, loose: 0.06 };
var reducedTransition = { duration: 0.12, ease: "linear" };
function useMotionPrefs() {
  const reduced = useReducedMotion() ?? false;
  return {
    reduced,
    spring: (name) => reduced ? reducedTransition : spring[name],
    exit: (name = "panel") => reduced ? reducedTransition : exit[name]
  };
}
var springs = {
  snappy: spring.snappy,
  smooth: spring.smooth,
  quick: spring.snappy
};
var baseClasses = "relative inline-flex items-center justify-center font-medium rounded-[8px] focus:outline-none select-none overflow-hidden";
var variantClasses = {
  default: "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
  secondary: "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100",
  ghost: "bg-transparent text-neutral-700 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800/60",
  destructive: "bg-red-600 text-white dark:bg-red-500"
};
var sizeClasses = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2 gap-2",
  lg: "text-base px-6 py-2.5 gap-2.5"
};
var shadowIdle = "0 1px 2px 0 rgba(0,0,0,0.05)";
var shadowHover = "0 4px 12px -2px rgba(0,0,0,0.12)";
var shadowPress = "0 1px 1px 0 rgba(0,0,0,0.04)";
var Spinner = () => /* @__PURE__ */ jsx(
  motion.svg,
  {
    className: "h-4 w-4",
    viewBox: "0 0 24 24",
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1, rotate: 360 },
    exit: { opacity: 0, scale: 0.5 },
    transition: {
      opacity: { duration: 0.15 },
      scale: springs.snappy,
      rotate: { duration: 0.8, repeat: Infinity, ease: "linear" }
    },
    children: /* @__PURE__ */ jsx(
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "10",
        stroke: "currentColor",
        strokeWidth: "3",
        fill: "none",
        strokeDasharray: "32 32",
        strokeLinecap: "round"
      }
    )
  }
);
var Checkmark = () => /* @__PURE__ */ jsx(
  motion.svg,
  {
    className: "h-4 w-4",
    viewBox: "0 0 24 24",
    fill: "none",
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 },
    transition: springs.snappy,
    children: /* @__PURE__ */ jsx(
      motion.path,
      {
        d: "M5 13l4 4L19 7",
        stroke: "currentColor",
        strokeWidth: "2.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        initial: { pathLength: 0 },
        animate: { pathLength: 1 },
        transition: { duration: 0.3, delay: 0.1 }
      }
    )
  }
);
var Button = forwardRef(
  ({
    variant = "default",
    size = "md",
    loading = false,
    success = false,
    disabled,
    children,
    className = "",
    ...props
  }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const [isFocusVisible, setIsFocusVisible] = useState(false);
    const handleFocus = useCallback((e) => {
      if (e.target.matches(":focus-visible")) setIsFocusVisible(true);
    }, []);
    const handleBlur = useCallback(() => setIsFocusVisible(false), []);
    const isDisabled = disabled || loading;
    const hoverAnimation = prefersReducedMotion ? {} : { scale: 1.02, boxShadow: shadowHover };
    const tapAnimation = prefersReducedMotion ? {} : { scale: 0.97, boxShadow: shadowPress };
    return /* @__PURE__ */ jsxs(
      motion.button,
      {
        ref,
        disabled: isDisabled,
        className: `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${isDisabled ? "opacity-60 cursor-default" : "cursor-pointer"} ${className}`,
        layout: true,
        initial: false,
        animate: {
          boxShadow: variant === "ghost" ? "none" : shadowIdle
        },
        whileHover: isDisabled ? void 0 : hoverAnimation,
        whileTap: isDisabled ? void 0 : tapAnimation,
        transition: {
          ...springs.smooth,
          boxShadow: { type: "tween", duration: 0.15, ease: "easeOut" }
        },
        onFocus: handleFocus,
        onBlur: handleBlur,
        ...props,
        children: [
          /* @__PURE__ */ jsx(AnimatePresence, { children: isFocusVisible && /* @__PURE__ */ jsx(
            motion.span,
            {
              className: "absolute inset-0 rounded-[8px] ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-neutral-900",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: springs.quick,
              "aria-hidden": true
            }
          ) }),
          /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", initial: false, children: loading ? /* @__PURE__ */ jsxs(
            motion.span,
            {
              className: "flex items-center gap-2",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.15 },
              children: [
                /* @__PURE__ */ jsx(Spinner, {}),
                /* @__PURE__ */ jsx("span", { children: "Loading\u2026" })
              ]
            },
            "loading"
          ) : success ? /* @__PURE__ */ jsxs(
            motion.span,
            {
              className: "flex items-center gap-2",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.15 },
              children: [
                /* @__PURE__ */ jsx(Checkmark, {}),
                /* @__PURE__ */ jsx("span", { children: "Done" })
              ]
            },
            "success"
          ) : /* @__PURE__ */ jsx(
            motion.span,
            {
              className: "flex items-center gap-2",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.15 },
              children
            },
            "default"
          ) })
        ]
      }
    );
  }
);
Button.displayName = "Button";
var springs2 = {
  snappy: spring.snappy,
  smooth: spring.smooth,
  quick: spring.snappy
};
var shakeVariants = {
  idle: { x: 0 },
  shake: {
    x: [0, -6, 6, -4, 4, -2, 0],
    transition: { duration: 0.4, ease: "easeOut" }
  }
};
var sizeClasses2 = {
  sm: { input: "text-sm px-3 pt-4 pb-1.5", label: "text-xs left-3" },
  md: { input: "text-sm px-4 pt-5 pb-2", label: "text-xs left-4" },
  lg: { input: "text-base px-4 pt-6 pb-2.5", label: "text-sm left-4" }
};
var borderColors = {
  default: "border-neutral-300 dark:border-neutral-700",
  error: "border-red-500 dark:border-red-400",
  success: "border-emerald-500 dark:border-emerald-400"
};
var Input = forwardRef(
  ({
    label,
    size = "md",
    state = "default",
    errorMessage,
    className = "",
    onFocus,
    onBlur,
    value,
    defaultValue,
    ...props
  }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(
      !!(value || defaultValue || props.placeholder)
    );
    const id = useId();
    const inputId = props.id || id;
    const isFloated = isFocused || hasValue;
    const handleFocus = (e) => {
      setIsFocused(true);
      onFocus?.(e);
    };
    const handleBlur = (e) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      onBlur?.(e);
    };
    const handleChange = (e) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "relative",
          variants: shakeVariants,
          animate: state === "error" ? "shake" : "idle",
          children: [
            /* @__PURE__ */ jsx(AnimatePresence, { children: isFocused && /* @__PURE__ */ jsx(
              motion.div,
              {
                className: `absolute -inset-[3px] rounded-[11px] ${state === "error" ? "bg-red-500/10" : state === "success" ? "bg-emerald-500/10" : "bg-blue-500/10"}`,
                initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.98 },
                transition: springs2.quick
              }
            ) }),
            label && /* @__PURE__ */ jsx(
              motion.label,
              {
                htmlFor: inputId,
                className: `absolute ${sizeClasses2[size].label} pointer-events-none text-neutral-500 dark:text-neutral-400 origin-left`,
                animate: {
                  y: isFloated ? 4 : size === "lg" ? 14 : size === "md" ? 10 : 6,
                  scale: isFloated ? 0.75 : 1,
                  color: isFocused ? state === "error" ? "rgb(239 68 68)" : state === "success" ? "rgb(16 185 129)" : "rgb(59 130 246)" : ""
                },
                transition: prefersReducedMotion ? { duration: 0 } : springs2.smooth,
                children: label
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                ref,
                id: inputId,
                className: `
              relative w-full rounded-[8px] border bg-white dark:bg-neutral-900
              text-neutral-900 dark:text-neutral-100
              outline-none leading-tight
              placeholder:text-neutral-400 dark:placeholder:text-neutral-500
              ${sizeClasses2[size].input}
              ${borderColors[state]}
              ${props.disabled ? "opacity-60 cursor-default" : ""}
              ${className}
            `,
                onFocus: handleFocus,
                onBlur: handleBlur,
                onChange: handleChange,
                value,
                defaultValue,
                ...props
              }
            ),
            /* @__PURE__ */ jsx(AnimatePresence, { children: state === "success" && /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500",
                initial: { opacity: 0, scale: 0.5 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.5 },
                transition: springs2.snappy,
                children: /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx(
                  motion.path,
                  {
                    d: "M5 13l4 4L19 7",
                    stroke: "currentColor",
                    strokeWidth: "2.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    initial: { pathLength: 0 },
                    animate: { pathLength: 1 },
                    transition: { duration: 0.3, delay: 0.1 }
                  }
                ) })
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsx(AnimatePresence, { children: state === "error" && errorMessage && /* @__PURE__ */ jsx(
        motion.p,
        {
          className: "text-xs text-red-500 dark:text-red-400 px-1",
          initial: { opacity: 0, y: -4, height: 0 },
          animate: { opacity: 1, y: 0, height: "auto" },
          exit: { opacity: 0, y: -4, height: 0 },
          transition: springs2.quick,
          children: errorMessage
        }
      ) })
    ] });
  }
);
Input.displayName = "Input";
var sizes = {
  sm: { w: 36, h: 20, thumb: 14, pad: 3, stretch: 4 },
  md: { w: 44, h: 24, thumb: 18, pad: 3, stretch: 5 },
  lg: { w: 56, h: 30, thumb: 22, pad: 4, stretch: 6 }
};
var Toggle = forwardRef(function Toggle2({ checked: controlled, defaultChecked = false, onChange, size = "md", disabled = false, className = "", onClassName = "bg-green-500", ...aria }, ref) {
  const m = useMotionPrefs();
  const [internal, setInternal] = useState(defaultChecked);
  const [pressed, setPressed] = useState(false);
  const checked = controlled ?? internal;
  const s = sizes[size];
  const travel = s.w - s.thumb - s.pad * 2;
  const stretch = pressed && !m.reduced ? s.stretch : 0;
  const flip = () => {
    if (disabled) return;
    const next = !checked;
    if (controlled === void 0) setInternal(next);
    onChange?.(next);
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      role: "switch",
      "aria-checked": checked,
      disabled,
      onClick: flip,
      onPointerDown: () => setPressed(true),
      onPointerUp: () => setPressed(false),
      onPointerLeave: () => setPressed(false),
      onPointerCancel: () => setPressed(false),
      className: `relative inline-flex shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900 ${checked ? onClassName : "bg-neutral-300 dark:bg-neutral-700"} ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${className}`,
      style: { width: s.w, height: s.h, padding: s.pad },
      ...aria,
      children: /* @__PURE__ */ jsx(
        motion.span,
        {
          "aria-hidden": true,
          className: "block rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)]",
          style: { height: s.thumb },
          initial: false,
          animate: {
            width: s.thumb + stretch,
            // When on, grow leftward so the thumb stays pinned to the right edge.
            x: checked ? travel - stretch : 0
          },
          transition: m.spring("snappy")
        }
      )
    }
  );
});
function Tabs({ items, value: controlled, defaultValue, onValueChange, className = "" }) {
  const m = useMotionPrefs();
  const id = useId();
  const listRef = useRef(null);
  const [internal, setInternal] = useState(defaultValue ?? items.find((t) => !t.disabled)?.value ?? "");
  const active = controlled ?? internal;
  const activeIndex = items.findIndex((t) => t.value === active);
  const [prev, setPrev] = useState({ index: activeIndex, dir: 1 });
  if (prev.index !== activeIndex) setPrev({ index: activeIndex, dir: activeIndex > prev.index ? 1 : -1 });
  const dir = prev.dir;
  const select = (value) => {
    if (controlled === void 0) setInternal(value);
    onValueChange?.(value);
  };
  const onKeyDown = (e) => {
    const enabled = items.filter((t) => !t.disabled);
    const at = enabled.findIndex((t) => t.value === active);
    const next = {
      ArrowRight: enabled[(at + 1) % enabled.length],
      ArrowDown: enabled[(at + 1) % enabled.length],
      ArrowLeft: enabled[(at - 1 + enabled.length) % enabled.length],
      ArrowUp: enabled[(at - 1 + enabled.length) % enabled.length],
      Home: enabled[0],
      End: enabled[enabled.length - 1]
    }[e.key];
    if (!next) return;
    e.preventDefault();
    select(next.value);
    listRef.current?.querySelector(`[data-tab-value="${CSS.escape(next.value)}"]`)?.focus();
  };
  const current = items[activeIndex];
  const offset = m.reduced ? 0 : 16;
  return /* @__PURE__ */ jsxs("div", { className: `flex flex-col ${className}`, children: [
    /* @__PURE__ */ jsx(LayoutGroup, { id, children: /* @__PURE__ */ jsx(
      "div",
      {
        ref: listRef,
        role: "tablist",
        "aria-orientation": "horizontal",
        onKeyDown,
        className: "relative flex items-center gap-1 rounded-[8px] bg-neutral-100 p-1 dark:bg-neutral-800/60",
        children: items.map((item) => {
          const isActive = item.value === active;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              role: "tab",
              "data-tab-value": item.value,
              id: `${id}-tab-${item.value}`,
              "aria-selected": isActive,
              "aria-controls": `${id}-panel-${item.value}`,
              tabIndex: isActive ? 0 : -1,
              disabled: item.disabled,
              onClick: () => select(item.value),
              className: `relative rounded-[6px] px-4 py-2 text-sm font-medium transition-colors duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${item.disabled ? "cursor-not-allowed opacity-40" : isActive ? "text-neutral-900 dark:text-white" : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"}`,
              children: [
                isActive && /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    layoutId: "indicator",
                    "aria-hidden": true,
                    className: "absolute inset-0 rounded-[6px] bg-white shadow-sm dark:bg-neutral-700",
                    transition: m.reduced ? { duration: 0 } : spring.snappy
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "relative", children: item.label })
              ]
            },
            item.value
          );
        })
      }
    ) }),
    /* @__PURE__ */ jsx(motion.div, { layout: m.reduced ? false : "size", transition: { layout: spring.smooth }, className: "relative mt-3 overflow-hidden", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", initial: false, custom: dir, children: current && /* @__PURE__ */ jsx(
      motion.div,
      {
        role: "tabpanel",
        id: `${id}-panel-${current.value}`,
        "aria-labelledby": `${id}-tab-${current.value}`,
        tabIndex: 0,
        custom: dir,
        variants: {
          enter: (d) => ({ x: d * offset, opacity: 0 }),
          center: { x: 0, opacity: 1 },
          exit: (d) => ({ x: d * -offset, opacity: 0 })
        },
        initial: "enter",
        animate: "center",
        exit: "exit",
        transition: m.reduced ? m.spring("smooth") : { ...spring.smooth, opacity: { duration: 0.16 } },
        className: "rounded-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        children: current.content
      },
      current.value
    ) }) })
  ] });
}
Tabs.displayName = "Tabs";
function Accordion({ items, type = "single", value: controlled, defaultValue, onValueChange, className = "" }) {
  const m = useMotionPrefs();
  const id = useId();
  const rootRef = useRef(null);
  const [internal, setInternal] = useState(defaultValue ?? []);
  const open = controlled ?? internal;
  const toggle = (value) => {
    const isOpen = open.includes(value);
    const next = type === "single" ? isOpen ? [] : [value] : isOpen ? open.filter((v) => v !== value) : [...open, value];
    if (controlled === void 0) setInternal(next);
    onValueChange?.(next);
  };
  const onKeyDown = (e) => {
    const triggers = Array.from(rootRef.current?.querySelectorAll("[data-accordion-trigger]:not([disabled])") ?? []);
    const at = triggers.indexOf(document.activeElement);
    if (at < 0) return;
    const target = {
      ArrowDown: triggers[(at + 1) % triggers.length],
      ArrowUp: triggers[(at - 1 + triggers.length) % triggers.length],
      Home: triggers[0],
      End: triggers[triggers.length - 1]
    }[e.key];
    if (target) {
      e.preventDefault();
      target.focus();
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: rootRef,
      onKeyDown,
      className: `divide-y divide-neutral-200 overflow-hidden rounded-[8px] border border-neutral-200 dark:divide-neutral-700 dark:border-neutral-700 ${className}`,
      children: items.map((item) => {
        const isOpen = open.includes(item.value);
        const triggerId = `${id}-trigger-${item.value}`;
        const panelId = `${id}-panel-${item.value}`;
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "m-0", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              "data-accordion-trigger": true,
              id: triggerId,
              "aria-expanded": isOpen,
              "aria-controls": panelId,
              disabled: item.disabled,
              onClick: () => toggle(item.value),
              className: `flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium transition-colors duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 ${item.disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer text-neutral-900 hover:bg-neutral-50 dark:text-neutral-100 dark:hover:bg-neutral-800/50"}`,
              children: [
                /* @__PURE__ */ jsx("span", { children: item.trigger }),
                /* @__PURE__ */ jsx(
                  motion.svg,
                  {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 16 16",
                    fill: "none",
                    "aria-hidden": true,
                    className: "shrink-0 text-neutral-500 dark:text-neutral-400",
                    initial: false,
                    animate: { rotate: isOpen ? 180 : 0 },
                    transition: m.spring("snappy"),
                    children: /* @__PURE__ */ jsx("path", { d: "M4 6l4 4 4-4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: isOpen && /* @__PURE__ */ jsx(
            motion.div,
            {
              id: panelId,
              role: "region",
              "aria-labelledby": triggerId,
              className: "overflow-hidden",
              initial: { height: 0, opacity: 0 },
              animate: {
                height: "auto",
                opacity: 1,
                transition: m.reduced ? m.spring("smooth") : { height: spring.smooth, opacity: { duration: 0.18, delay: 0.05 } }
              },
              exit: { height: 0, opacity: 0, transition: m.reduced ? m.exit() : { height: exit.panel, opacity: { duration: 0.1 } } },
              children: /* @__PURE__ */ jsx("div", { className: "px-4 pb-4 pt-1 text-sm text-neutral-600 dark:text-neutral-300", children: item.content })
            }
          ) })
        ] }, item.value);
      })
    }
  );
}
Accordion.displayName = "Accordion";
var useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
var FOCUSABLE = 'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), iframe, [contenteditable="true"], [tabindex]:not([tabindex="-1"])';
function focusables(root) {
  return Array.from(root.querySelectorAll(FOCUSABLE)).filter(
    (el) => !el.hasAttribute("inert") && el.getClientRects().length > 0
  );
}
function useFocusTrap(ref, active, initialFocus) {
  useEffect(() => {
    if (!active) return;
    const previous = document.activeElement;
    const root = ref.current;
    const raf = requestAnimationFrame(() => {
      if (!root) return;
      const target = initialFocus?.current ?? focusables(root)[0] ?? root;
      target.focus({ preventScroll: true });
    });
    const onKeyDown = (e) => {
      if (e.key !== "Tab" || !root) return;
      const items = focusables(root);
      if (items.length === 0) {
        e.preventDefault();
        root.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      if (e.shiftKey && (current === first || !root.contains(current))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (current === last || !root.contains(current))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      if (previous && document.contains(previous)) previous.focus({ preventScroll: true });
    };
  }, [active, ref, initialFocus]);
}
var lockCount = 0;
var saved = null;
function useScrollLock(active) {
  useIsoLayoutEffect(() => {
    if (!active) return;
    const body = document.body;
    if (lockCount === 0) {
      const scrollbar = window.innerWidth - document.documentElement.clientWidth;
      saved = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
      body.style.overflow = "hidden";
      if (scrollbar > 0) {
        const current = parseFloat(getComputedStyle(body).paddingRight) || 0;
        body.style.paddingRight = `${current + scrollbar}px`;
      }
    }
    lockCount++;
    return () => {
      lockCount--;
      if (lockCount === 0 && saved) {
        body.style.overflow = saved.overflow;
        body.style.paddingRight = saved.paddingRight;
        saved = null;
      }
    };
  }, [active]);
}
var escapeStack = [];
function useEscape(active, onEscape) {
  const cb = useRef(onEscape);
  useEffect(() => {
    cb.current = onEscape;
  });
  useEffect(() => {
    if (!active) return;
    const handler = () => cb.current();
    escapeStack.push(handler);
    const onKeyDown = (e) => {
      if (e.key === "Escape" && escapeStack[escapeStack.length - 1] === handler && !e.isComposing) {
        e.preventDefault();
        handler();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      const i = escapeStack.lastIndexOf(handler);
      if (i >= 0) escapeStack.splice(i, 1);
    };
  }, [active]);
}
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
var sizeClasses3 = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl"
};
var DialogIds = createContext(null);
var Dialog = forwardRef(function Dialog2({ open, onClose, size = "md", children, className = "", title, closeOnBackdrop = true }, ref) {
  const mounted = useMounted();
  const m = useMotionPrefs();
  const panelRef = useRef(null);
  const baseId = useId();
  const ids = { titleId: `${baseId}-title`, descId: `${baseId}-desc` };
  useFocusTrap(panelRef, open);
  useScrollLock(open);
  useEscape(open, onClose);
  if (!mounted) return null;
  return createPortal(
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          "aria-hidden": true,
          className: "absolute inset-0 bg-black/40 backdrop-blur-sm",
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: fade.in },
          exit: { opacity: 0, transition: fade.out },
          onClick: closeOnBackdrop ? onClose : void 0
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          ref: (node) => {
            panelRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          },
          role: "dialog",
          "aria-modal": "true",
          "aria-label": title,
          "aria-labelledby": title ? void 0 : ids.titleId,
          "aria-describedby": ids.descId,
          tabIndex: -1,
          className: `relative w-full ${sizeClasses3[size]} rounded-[8px] bg-white p-6 shadow-xl outline-none dark:bg-neutral-900 ${className}`,
          initial: m.reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 },
          animate: { opacity: 1, scale: 1, y: 0, transition: m.spring("smooth") },
          exit: m.reduced ? { opacity: 0, transition: m.exit() } : { opacity: 0, scale: 0.98, y: 4, transition: m.exit() },
          children: /* @__PURE__ */ jsx(DialogIds.Provider, { value: ids, children })
        }
      )
    ] }) }),
    document.body
  );
});
function DialogTitle({ children, className = "" }) {
  const ids = useContext(DialogIds);
  return /* @__PURE__ */ jsx("h2", { id: ids?.titleId, className: `mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100 ${className}`, children });
}
function DialogDescription({ children, className = "" }) {
  const ids = useContext(DialogIds);
  return /* @__PURE__ */ jsx("p", { id: ids?.descId, className: `mb-6 text-sm text-neutral-500 dark:text-neutral-400 ${className}`, children });
}
function DialogFooter({ children, className = "" }) {
  return /* @__PURE__ */ jsx("div", { className: `mt-6 flex justify-end gap-3 ${className}`, children });
}
var springs3 = {
  smooth: spring.smooth
};
var TOOLTIP_OFFSET = 8;
function getFlippedPosition(position, triggerRect) {
  const { innerWidth: vw, innerHeight: vh } = window;
  switch (position) {
    case "top":
      return triggerRect.top < 60 ? "bottom" : "top";
    case "bottom":
      return triggerRect.bottom > vh - 60 ? "top" : "bottom";
    case "left":
      return triggerRect.left < 120 ? "right" : "left";
    case "right":
      return triggerRect.right > vw - 120 ? "left" : "right";
    default:
      return position;
  }
}
function getFixedPositionStyles(pos, triggerPos) {
  switch (pos) {
    case "top":
      return {
        position: "fixed",
        left: triggerPos.x + triggerPos.width / 2,
        top: triggerPos.y - TOOLTIP_OFFSET,
        transform: "translate(-50%, -100%)"
      };
    case "bottom":
      return {
        position: "fixed",
        left: triggerPos.x + triggerPos.width / 2,
        top: triggerPos.y + triggerPos.height + TOOLTIP_OFFSET,
        transform: "translateX(-50%)"
      };
    case "left":
      return {
        position: "fixed",
        left: triggerPos.x - TOOLTIP_OFFSET,
        top: triggerPos.y + triggerPos.height / 2,
        transform: "translate(-100%, -50%)"
      };
    case "right":
      return {
        position: "fixed",
        left: triggerPos.x + triggerPos.width + TOOLTIP_OFFSET,
        top: triggerPos.y + triggerPos.height / 2,
        transform: "translateY(-50%)"
      };
  }
}
function getArrowStyles(pos) {
  const base = {
    position: "absolute",
    width: 8,
    height: 8,
    background: "inherit",
    borderRadius: 1
  };
  switch (pos) {
    case "top":
      return { ...base, bottom: -4, left: "50%", marginLeft: -4, transform: "rotate(45deg)" };
    case "bottom":
      return { ...base, top: -4, left: "50%", marginLeft: -4, transform: "rotate(45deg)" };
    case "left":
      return { ...base, right: -4, top: "50%", marginTop: -4, transform: "rotate(45deg)" };
    case "right":
      return { ...base, left: -4, top: "50%", marginTop: -4, transform: "rotate(45deg)" };
  }
}
function Tooltip({
  content,
  children,
  position = "top",
  delay = 300,
  followCursor = false,
  className = ""
}) {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [resolvedPos, setResolvedPos] = useState(position);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [triggerPos, setTriggerPos] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const triggerRef = useRef(null);
  const timerRef = useRef(null);
  const handleMouseEnter = useCallback(() => {
    timerRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setResolvedPos(getFlippedPosition(position, rect));
        setTriggerPos({
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY,
          width: rect.width,
          height: rect.height
        });
      }
      setVisible(true);
    }, delay);
  }, [delay, position]);
  const handleMouseLeave = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);
  const handleMouseMove = useCallback(
    (e) => {
      if (followCursor) {
        setCursorPos({
          x: e.pageX,
          y: e.pageY
        });
      }
    },
    [followCursor]
  );
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  const originMap = {
    top: "bottom center",
    bottom: "top center",
    left: "right center",
    right: "left center"
  };
  const variants = prefersReducedMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  } : {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };
  const followCursorStyle = followCursor ? {
    position: "fixed",
    left: cursorPos.x + 12,
    top: cursorPos.y - 8,
    transform: "none"
  } : getFixedPositionStyles(resolvedPos, triggerPos);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "span",
      {
        ref: triggerRef,
        className: "relative inline-flex",
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseMove: handleMouseMove,
        children
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: visible && typeof window !== "undefined" && createPortal(
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          role: "tooltip",
          className: `z-[9999] px-3 py-1.5 text-xs font-medium rounded-[8px] bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 whitespace-nowrap pointer-events-none ${className}`,
          style: {
            ...followCursorStyle,
            transformOrigin: originMap[resolvedPos]
          },
          variants,
          initial: "hidden",
          animate: "visible",
          exit: "exit",
          transition: {
            ...springs3.smooth,
            // Exit should be instant — tween override
            opacity: { duration: 0.1 }
          },
          children: [
            content,
            !followCursor && /* @__PURE__ */ jsx(
              "span",
              {
                style: getArrowStyles(resolvedPos),
                className: "bg-neutral-900 dark:bg-neutral-100",
                "aria-hidden": true
              }
            )
          ]
        }
      ),
      document.body
    ) })
  ] });
}
var springs4 = {
  smooth: spring.smooth,
  quick: spring.snappy
};
function Dropdown({
  trigger,
  items,
  align = "left",
  className = ""
}) {
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [triggerPos, setTriggerPos] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const itemRefs = useRef([]);
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);
  useEffect(() => {
    if (!open) setFocusedIndex(-1);
  }, [open]);
  useEffect(() => {
    if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);
  const handleKeyDown = useCallback(
    (e) => {
      const selectableIndices = items.map((item, i) => !item.disabled && !item.separator ? i : -1).filter((i) => i >= 0);
      if (!open) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen(true);
          setFocusedIndex(selectableIndices[0] ?? 0);
        }
        return;
      }
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const currentPos = selectableIndices.indexOf(focusedIndex);
          const next = selectableIndices[(currentPos + 1) % selectableIndices.length];
          setFocusedIndex(next);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const currentPos = selectableIndices.indexOf(focusedIndex);
          const prev = selectableIndices[(currentPos - 1 + selectableIndices.length) % selectableIndices.length];
          setFocusedIndex(prev);
          break;
        }
        case "Enter":
        case " ": {
          e.preventDefault();
          if (focusedIndex >= 0 && items[focusedIndex] && !items[focusedIndex].disabled) {
            items[focusedIndex].onClick?.();
            setOpen(false);
          }
          break;
        }
        case "Escape": {
          e.preventDefault();
          setOpen(false);
          break;
        }
        case "Tab": {
          setOpen(false);
          break;
        }
      }
    },
    [open, focusedIndex, items]
  );
  const toggleOpen = useCallback(() => {
    setOpen((prev) => {
      if (!prev && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setTriggerPos({
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY,
          width: rect.width,
          height: rect.height
        });
      }
      return !prev;
    });
  }, []);
  const menuVariants2 = prefersReducedMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  } : {
    hidden: { opacity: 0, scale: 0.95, y: -4 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -4 }
  };
  const itemVariants2 = prefersReducedMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  } : {
    hidden: { opacity: 0, y: 4 },
    visible: { opacity: 1, y: 0 }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: "relative inline-block",
      onKeyDown: handleKeyDown,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: triggerRef,
            onClick: toggleOpen,
            role: "button",
            "aria-haspopup": "menu",
            "aria-expanded": open,
            tabIndex: 0,
            className: "cursor-pointer",
            children: trigger
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { children: open && typeof window !== "undefined" && createPortal(
          /* @__PURE__ */ jsx(
            motion.div,
            {
              role: "menu",
              className: `fixed z-[9999] min-w-[180px] rounded-[8px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg py-1 ${className}`,
              style: {
                left: align === "right" ? triggerPos.x + triggerPos.width - 180 : triggerPos.x,
                // Align left edge
                top: triggerPos.y + triggerPos.height + 8,
                // 8px gap
                transformOrigin: align === "right" ? "top right" : "top left"
              },
              variants: menuVariants2,
              initial: "hidden",
              animate: "visible",
              exit: "exit",
              transition: springs4.smooth,
              children: items.map((item, index) => /* @__PURE__ */ jsxs(React9.Fragment, { children: [
                item.separator && /* @__PURE__ */ jsx("div", { className: "my-1 h-px bg-neutral-200 dark:bg-neutral-800", role: "separator" }),
                /* @__PURE__ */ jsxs(
                  motion.button,
                  {
                    ref: (el) => {
                      itemRefs.current[index] = el;
                    },
                    role: "menuitem",
                    disabled: item.disabled,
                    tabIndex: -1,
                    className: `w-full text-left px-3 py-2 text-sm flex items-center gap-2 outline-none ${item.disabled ? "text-neutral-400 dark:text-neutral-600 cursor-default" : "text-neutral-700 dark:text-neutral-300 cursor-pointer"}`,
                    onClick: () => {
                      if (!item.disabled) {
                        item.onClick?.();
                        setOpen(false);
                      }
                    },
                    variants: itemVariants2,
                    initial: "hidden",
                    animate: "visible",
                    transition: {
                      ...springs4.smooth,
                      delay: prefersReducedMotion ? 0 : index * 0.03
                    },
                    whileHover: item.disabled ? void 0 : {
                      backgroundColor: "var(--dropdown-hover, rgba(0,0,0,0.05))"
                    },
                    whileFocus: item.disabled ? void 0 : {
                      backgroundColor: "var(--dropdown-hover, rgba(0,0,0,0.05))"
                    },
                    style: { "--dropdown-hover": "rgba(0,0,0,0.05)" },
                    children: [
                      item.icon && /* @__PURE__ */ jsx("span", { className: "flex-shrink-0", children: item.icon }),
                      item.label
                    ]
                  }
                )
              ] }, index))
            }
          ),
          document.body
        ) })
      ]
    }
  );
}
var springs5 = {
  smooth: spring.smooth,
  snappy: spring.snappy,
  gentle: spring.gentle
};
var shadows = {
  idle: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
  hover: "0 10px 25px -3px rgba(0,0,0,0.15), 0 4px 6px -4px rgba(0,0,0,0.1)",
  press: "0 1px 2px 0 rgba(0,0,0,0.05), 0 1px 1px -1px rgba(0,0,0,0.04)"
};
var enterVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springs5.gentle
  }
};
var baseClasses2 = "relative overflow-hidden rounded-[8px] select-none";
var variantClasses2 = {
  default: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800",
  outlined: "bg-transparent border-2 border-neutral-300 dark:border-neutral-700",
  elevated: "bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800"
};
var sizeClasses4 = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg"
};
var Card = forwardRef(
  ({
    variant = "default",
    size = "md",
    children,
    className = "",
    static: isStatic = false,
    animated = false,
    delay = 0,
    ...props
  }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const isInteractive = !isStatic;
    const getBaseShadow = () => {
      if (variant === "elevated") return shadows.hover;
      if (variant === "outlined") return "none";
      return shadows.idle;
    };
    const hoverAnimation = !prefersReducedMotion && isInteractive ? {
      scale: 1.02,
      y: -4,
      boxShadow: variant === "outlined" ? "none" : shadows.hover
    } : {};
    const tapAnimation = !prefersReducedMotion && isInteractive ? {
      scale: 0.98,
      y: 0,
      boxShadow: variant === "outlined" ? "none" : shadows.press
    } : {};
    return /* @__PURE__ */ jsx(
      motion.div,
      {
        ref,
        className: `${baseClasses2} ${variantClasses2[variant]} ${sizeClasses4[size]} ${isInteractive ? "cursor-pointer" : ""} ${className}`,
        initial: animated ? "hidden" : false,
        animate: animated ? "visible" : { boxShadow: getBaseShadow() },
        variants: animated ? enterVariants : void 0,
        transition: animated ? { ...springs5.gentle, delay } : void 0,
        whileHover: hoverAnimation,
        whileTap: isInteractive ? tapAnimation : void 0,
        style: {
          transition: !prefersReducedMotion ? "box-shadow 0.2s ease-out" : void 0
        },
        ...props,
        children
      }
    );
  }
);
Card.displayName = "Card";
var CardImage = ({ src, alt, className = "" }) => /* @__PURE__ */ jsx("div", { className: `relative w-full aspect-[16/10] overflow-hidden ${className}`, children: /* @__PURE__ */ jsx(
  "img",
  {
    src,
    alt,
    className: "w-full h-full object-cover"
  }
) });
var CardContent = ({ title, description, children, className = "" }) => /* @__PURE__ */ jsxs("div", { className: `p-6 ${className}`, children: [
  title && /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-neutral-900 dark:text-white mb-2 leading-tight", children: title }),
  description && /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4", children: description }),
  children
] });
var CardActions = ({ children, className = "" }) => /* @__PURE__ */ jsx("div", { className: `px-6 pb-6 flex items-center gap-3 ${className}`, children });
var CardGrid = ({
  children,
  columns = 2,
  gap = "md",
  staggerDelay = 0.1,
  className = ""
}) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  };
  const gridGap = {
    sm: "gap-3",
    md: "gap-6",
    lg: "gap-8"
  };
  const staggeredChildren = React9.Children.map(children, (child, index) => {
    if (React9.isValidElement(child) && child.type === Card) {
      return React9.cloneElement(child, {
        animated: true,
        delay: index * staggerDelay
      });
    }
    return child;
  });
  return /* @__PURE__ */ jsx("div", { className: `grid ${gridCols[columns]} ${gridGap[gap]} ${className}`, children: staggeredChildren });
};
var CardHeader = ({ children, className = "" }) => /* @__PURE__ */ jsx("div", { className: `px-6 pt-6 pb-2 ${className}`, children });
var CardFooter = ({ children, className = "" }) => /* @__PURE__ */ jsx("div", { className: `px-6 pt-2 pb-6 ${className}`, children });
function FlipCard({
  front,
  back,
  flipped: controlledFlipped,
  onFlip,
  className = ""
}) {
  const prefersReducedMotion = useReducedMotion();
  const [internalFlipped, setInternalFlipped] = React9.useState(false);
  const isFlipped = controlledFlipped ?? internalFlipped;
  const handleClick = () => {
    const next = !isFlipped;
    setInternalFlipped(next);
    onFlip?.(next);
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `relative cursor-pointer ${className}`,
      onClick: handleClick,
      style: { perspective: 1e3 },
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "relative w-full",
          animate: { rotateY: isFlipped ? 180 : 0 },
          transition: prefersReducedMotion ? { duration: 0 } : springs5.smooth,
          style: { transformStyle: "preserve-3d" },
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "rounded-[8px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden",
                style: { backfaceVisibility: "hidden" },
                children: front
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute inset-0 rounded-[8px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden",
                style: {
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)"
                },
                children: back
              }
            )
          ]
        }
      )
    }
  );
}
var springs6 = {
  smooth: spring.smooth
};
var shimmerClass = "before:absolute before:inset-0 before:translate-x-[-100%] before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 dark:before:via-white/30 before:to-transparent";
var pulseClass = "animate-pulse";
function SkeletonBase({
  className = "",
  style,
  pulse,
  rounded = "rounded-[8px]"
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `
        relative overflow-hidden
        bg-neutral-300/60 dark:bg-neutral-700/80
        ${rounded}
        ${pulse ? pulseClass : shimmerClass}
        ${className}
      `,
      style
    }
  );
}
function Skeleton({
  variant = "text",
  loaded = false,
  children,
  width,
  height,
  lines = 3,
  pulse = false,
  className = ""
}) {
  const prefersReducedMotion = useReducedMotion();
  return /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: loaded && children ? /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 },
      animate: { opacity: 1, scale: 1 },
      transition: springs6.smooth,
      className,
      children
    },
    "content"
  ) : /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 1 },
      exit: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 },
      transition: { duration: 0.15 },
      className,
      children: [
        variant === "avatar" && /* @__PURE__ */ jsx(
          SkeletonBase,
          {
            rounded: "rounded-full",
            style: { width: height || 40, height: height || 40 },
            pulse
          }
        ),
        variant === "card" && /* @__PURE__ */ jsx(
          SkeletonBase,
          {
            style: { width: width || "100%", height: height || 200 },
            pulse
          }
        ),
        variant === "text" && /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ jsx(
          SkeletonBase,
          {
            style: {
              width: i === lines - 1 ? "60%" : width || "100%",
              height: height || 16
            },
            pulse
          },
          i
        )) }),
        variant === "custom" && /* @__PURE__ */ jsx(
          SkeletonBase,
          {
            style: { width: width || "100%", height: height || 40 },
            pulse
          }
        )
      ]
    },
    "skeleton"
  ) });
}
var ToastContext = createContext(null);
function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}
var tone = {
  default: { ring: "border-neutral-200 dark:border-neutral-700", icon: "", bar: "bg-neutral-400 dark:bg-neutral-500" },
  success: { ring: "border-green-200 dark:border-green-900", icon: "text-green-600 dark:text-green-400", bar: "bg-green-500" },
  error: { ring: "border-red-200 dark:border-red-900", icon: "text-red-600 dark:text-red-400", bar: "bg-red-500" },
  warning: { ring: "border-amber-200 dark:border-amber-900", icon: "text-amber-600 dark:text-amber-400", bar: "bg-amber-500" }
};
function Icon({ variant }) {
  if (variant === "default") return null;
  const paths = {
    success: /* @__PURE__ */ jsx("path", { d: "M5 8.2l2 2 4-4.4" }),
    error: /* @__PURE__ */ jsx("path", { d: "M5.5 5.5l5 5M10.5 5.5l-5 5" }),
    warning: /* @__PURE__ */ jsx("path", { d: "M8 4.5v4.2M8 11.2v.1" })
  }[variant];
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `mt-0.5 shrink-0 ${tone[variant].icon}`,
      "aria-hidden": true,
      children: [
        /* @__PURE__ */ jsx("circle", { cx: "8", cy: "8", r: "6.6", strokeOpacity: ".35" }),
        paths
      ]
    }
  );
}
function ToastItem({ toast: t, onDismiss }) {
  const m = useMotionPrefs();
  const variant = t.variant ?? "default";
  const duration = t.duration ?? 4e3;
  const x = useMotionValue(0);
  const dragOpacity = useTransform(x, [-160, 0, 160], [0, 1, 0]);
  const progress = useMotionValue(1);
  const timer = useRef(null);
  const holds = useRef(/* @__PURE__ */ new Set());
  const leaving = useRef(false);
  useEffect(() => {
    if (!Number.isFinite(duration)) return;
    const controls = animate(progress, 0, {
      duration: duration / 1e3,
      ease: "linear",
      onComplete: () => !leaving.current && onDismiss(t.id)
    });
    timer.current = controls;
    const onVisibility = () => document.hidden ? controls.pause() : holds.current.size === 0 && controls.play();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      controls.stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [duration, onDismiss, progress, t.id]);
  const hold = (reason, on) => {
    if (on) holds.current.add(reason);
    else holds.current.delete(reason);
    if (holds.current.size > 0) timer.current?.pause();
    else if (!document.hidden) timer.current?.play();
  };
  const onDragEnd = (_, info) => {
    hold("drag", false);
    const { offset, velocity } = info;
    if (Math.abs(offset.x) > 90 || Math.abs(velocity.x) > 450) {
      leaving.current = true;
      const dir = Math.sign(offset.x || velocity.x) || 1;
      animate(x, dir * 420, { ...spring.smooth, velocity: velocity.x }).then(() => onDismiss(t.id));
    } else {
      animate(x, 0, spring.snappy);
    }
  };
  const assertive = variant === "error";
  return /* @__PURE__ */ jsx(
    motion.li,
    {
      layout: m.reduced ? false : "position",
      initial: m.reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 },
      animate: { opacity: 1, y: 0, scale: 1, transition: m.spring("smooth") },
      exit: { opacity: 0, scale: m.reduced ? 1 : 0.97, transition: m.exit("quick") },
      transition: { layout: spring.smooth },
      className: "pointer-events-auto list-none",
      onPointerEnter: () => hold("hover", true),
      onPointerLeave: () => hold("hover", false),
      onFocus: () => hold("focus", true),
      onBlur: (e) => !e.currentTarget.contains(e.relatedTarget) && hold("focus", false),
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          role: assertive ? "alert" : "status",
          "aria-atomic": "true",
          drag: m.reduced ? false : "x",
          dragConstraints: { left: 0, right: 0 },
          dragElastic: 0.9,
          dragMomentum: false,
          onDragStart: () => hold("drag", true),
          onDragEnd,
          style: { x, opacity: dragOpacity, touchAction: "pan-y" },
          className: `relative w-[min(22rem,calc(100vw-2rem))] cursor-grab overflow-hidden rounded-[10px] border bg-white shadow-lg active:cursor-grabbing dark:bg-neutral-900 ${tone[variant].ring}`,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-4", children: [
              /* @__PURE__ */ jsx(Icon, { variant }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-neutral-900 dark:text-neutral-100", children: t.title }),
                t.description && /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-[13px] leading-snug text-neutral-500 dark:text-neutral-400", children: t.description })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => onDismiss(t.id),
                  "aria-label": "Dismiss notification",
                  className: "-mr-1 -mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-[6px] text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-200",
                  children: /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": true, children: /* @__PURE__ */ jsx("path", { d: "M2.5 2.5l7 7M9.5 2.5l-7 7", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) })
                }
              )
            ] }),
            Number.isFinite(duration) && /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "h-0.5 w-full bg-neutral-100 dark:bg-neutral-800", children: /* @__PURE__ */ jsx(motion.div, { className: `h-full origin-left ${tone[variant].bar}`, style: { scaleX: progress } }) })
          ]
        }
      )
    }
  );
}
var toastCounter = 0;
function ToastProvider({ children, max = 4 }) {
  const [toasts, setToasts] = useState([]);
  const toast = useCallback(
    (t) => {
      const id = `toast-${++toastCounter}`;
      setToasts((prev) => [...prev, { ...t, id }].slice(-max));
      return id;
    },
    [max]
  );
  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  return /* @__PURE__ */ jsxs(ToastContext.Provider, { value: { toast, dismiss }, children: [
    children,
    /* @__PURE__ */ jsx("section", { "aria-label": "Notifications", className: "pointer-events-none fixed bottom-4 right-4 z-[100]", children: /* @__PURE__ */ jsx("ol", { className: "flex flex-col-reverse gap-2", children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: toasts.map((t) => /* @__PURE__ */ jsx(ToastItem, { toast: t, onDismiss: dismiss }, t.id)) }) }) })
  ] });
}
var springs7 = {
  snappy: spring.snappy,
  smooth: spring.smooth
};
function NavMenu({
  items,
  activeId,
  onActiveChange,
  className = ""
}) {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState(null);
  return /* @__PURE__ */ jsx(
    "nav",
    {
      className: `flex items-center gap-1 p-1 rounded-[8px] bg-neutral-100 dark:bg-neutral-900 ${className}`,
      onMouseLeave: () => setHoveredId(null),
      children: items.map((item) => {
        const isActive = item.id === activeId;
        const isHovered = item.id === hoveredId;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            className: `
              relative px-4 py-2 text-sm font-medium rounded-[6px]
              transition-none outline-none
              ${isActive ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-500 dark:text-neutral-400"}
            `,
            onMouseEnter: () => setHoveredId(item.id),
            onClick: () => {
              onActiveChange?.(item.id);
              item.onClick?.();
            },
            children: [
              isHovered && !isActive && /* @__PURE__ */ jsx(
                motion.div,
                {
                  layoutId: "nav-hover",
                  className: "absolute inset-0 rounded-[6px] bg-neutral-200/60 dark:bg-neutral-800/60",
                  transition: prefersReducedMotion ? { duration: 0 } : springs7.smooth
                }
              ),
              isActive && /* @__PURE__ */ jsx(
                motion.div,
                {
                  layoutId: "nav-active",
                  className: "absolute inset-0 rounded-[6px] bg-white dark:bg-neutral-800 shadow-sm",
                  transition: prefersReducedMotion ? { duration: 0 } : springs7.snappy
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "relative z-10", children: item.label })
            ]
          },
          item.id
        );
      })
    }
  );
}
var variantClasses3 = {
  default: "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100",
  secondary: "bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200",
  success: "bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800",
  warning: "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800",
  error: "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800",
  info: "bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800",
  outline: "border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 bg-transparent"
};
var sizeClasses5 = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-sm"
};
var iconSizes = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-4 h-4"
};
var springConfig = spring.smooth;
function Badge({
  children,
  variant = "default",
  size = "md",
  icon,
  pulse = false,
  removable = false,
  onRemove,
  className = "",
  onClick
}) {
  const isClickable = onClick || removable;
  return /* @__PURE__ */ jsxs(
    motion.span,
    {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
      transition: springConfig,
      whileHover: isClickable ? { scale: 1.05 } : void 0,
      whileTap: isClickable ? { scale: 0.95 } : void 0,
      className: `
        inline-flex items-center gap-1.5 rounded-full font-medium
        ${variantClasses3[variant]}
        ${sizeClasses5[size]}
        ${isClickable ? "cursor-pointer" : ""}
        ${pulse ? "animate-pulse" : ""}
        ${className}
      `,
      onClick,
      children: [
        pulse && /* @__PURE__ */ jsx("span", { className: `
          flex-shrink-0 rounded-full bg-current opacity-75 
          ${size === "sm" ? "w-1.5 h-1.5" : size === "md" ? "w-2 h-2" : "w-2.5 h-2.5"}
        `, children: /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-40" }) }),
        icon && !pulse && /* @__PURE__ */ jsx("span", { className: `flex-shrink-0 ${iconSizes[size]}`, children: icon }),
        /* @__PURE__ */ jsx("span", { children }),
        removable && /* @__PURE__ */ jsx(
          motion.button,
          {
            onClick: (e) => {
              e.stopPropagation();
              onRemove?.();
            },
            whileHover: { scale: 1.1 },
            whileTap: { scale: 0.9 },
            className: `
            flex-shrink-0 rounded-full hover:bg-black/10 dark:hover:bg-white/10
            ${size === "sm" ? "w-3 h-3 p-0.5" : size === "md" ? "w-4 h-4 p-0.5" : "w-5 h-5 p-1"}
          `,
            "aria-label": "Remove badge",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                viewBox: "0 0 12 12",
                fill: "currentColor",
                className: "w-full h-full",
                children: /* @__PURE__ */ jsx("path", { d: "M9 3L3 9M3 3l6 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
              }
            )
          }
        )
      ]
    }
  );
}
function AnimatedBadge({ children, ...props }) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
      transition: springConfig,
      className: "inline-block",
      children: /* @__PURE__ */ jsx(Badge, { ...props, children })
    }
  );
}
function NotificationBadge({
  children,
  count = 0,
  max = 99,
  dot = false,
  variant = "error",
  position = "top-right",
  showZero = false,
  className = ""
}) {
  const showBadge = dot || count > 0 || showZero;
  const displayCount = count > max ? `${max}+` : count.toString();
  const positionClasses = {
    "top-right": "-top-2 -right-2",
    "top-left": "-top-2 -left-2",
    "bottom-right": "-bottom-2 -right-2",
    "bottom-left": "-bottom-2 -left-2"
  };
  return /* @__PURE__ */ jsxs("div", { className: `relative inline-block ${className}`, children: [
    children,
    showBadge && /* @__PURE__ */ jsx(
      motion.span,
      {
        initial: { opacity: 0, scale: 0 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0 },
        transition: springConfig,
        className: `
            absolute ${positionClasses[position]}
            ${dot ? "w-2 h-2 rounded-full" : "min-w-[1.25rem] h-5 rounded-full px-1 flex items-center justify-center text-xs font-bold"}
            ${variantClasses3[variant]}
          `,
        children: !dot && displayCount
      }
    )
  ] });
}
var badgeVariants = {
  status: {
    online: /* @__PURE__ */ jsx(Badge, { variant: "success", icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 12 12", className: "w-full h-full", children: /* @__PURE__ */ jsx("circle", { cx: "6", cy: "6", r: "2", fill: "currentColor" }) }), children: "Online" }),
    offline: /* @__PURE__ */ jsx(Badge, { variant: "secondary", icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 12 12", className: "w-full h-full", children: /* @__PURE__ */ jsx("circle", { cx: "6", cy: "6", r: "2", fill: "currentColor" }) }), children: "Offline" }),
    busy: /* @__PURE__ */ jsx(Badge, { variant: "warning", icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 12 12", className: "w-full h-full", children: /* @__PURE__ */ jsx("circle", { cx: "6", cy: "6", r: "2", fill: "currentColor" }) }), children: "Busy" })
  },
  priority: {
    low: /* @__PURE__ */ jsx(Badge, { variant: "info", children: "Low" }),
    medium: /* @__PURE__ */ jsx(Badge, { variant: "warning", children: "Medium" }),
    high: /* @__PURE__ */ jsx(Badge, { variant: "error", children: "High" }),
    critical: /* @__PURE__ */ jsx(Badge, { variant: "error", pulse: true, children: "Critical" })
  },
  category: {
    new: /* @__PURE__ */ jsx(Badge, { variant: "success", children: "New" }),
    featured: /* @__PURE__ */ jsx(Badge, { variant: "info", children: "Featured" }),
    popular: /* @__PURE__ */ jsx(Badge, { variant: "warning", children: "Popular" }),
    sale: /* @__PURE__ */ jsx(Badge, { variant: "error", children: "Sale" })
  }
};
var itemVariants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 }
};
var springConfig2 = spring.smooth;
var defaultSeparator = /* @__PURE__ */ jsx(
  "svg",
  {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor",
    className: "text-neutral-400 dark:text-neutral-600",
    children: /* @__PURE__ */ jsx("path", { d: "M4.5 2.5L7.5 6L4.5 9.5", stroke: "currentColor", strokeWidth: "1.5", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" })
  }
);
var homeIcon = /* @__PURE__ */ jsxs(
  "svg",
  {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "currentColor",
    className: "text-neutral-500 dark:text-neutral-400",
    children: [
      /* @__PURE__ */ jsx("path", { d: "M7 1L13 6v7H1V6L7 1z", stroke: "currentColor", strokeWidth: "1.2", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }),
      /* @__PURE__ */ jsx("path", { d: "M5 13V8h4v5", stroke: "currentColor", strokeWidth: "1.2", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" })
    ]
  }
);
function Breadcrumbs({
  items,
  separator = defaultSeparator,
  maxItems,
  showHomeIcon = false,
  className = ""
}) {
  if (!items.length) return null;
  let displayItems = items;
  if (maxItems && items.length > maxItems) {
    const keepFromEnd = maxItems - 2;
    displayItems = [
      items[0],
      { id: "ellipsis", label: "\u2026", disabled: true },
      ...items.slice(-keepFromEnd)
    ];
  }
  const renderItem = (item, index, isLast) => {
    const isClickable = !item.disabled && !isLast && (item.href || item.onClick);
    const isHome = index === 0 && showHomeIcon;
    const content = /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
      isHome ? homeIcon : item.icon,
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: isHome ? "" : item.label })
    ] });
    const baseClasses3 = `
      flex items-center gap-1.5 rounded-lg px-2 py-1 transition-colors
      ${isClickable ? "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer" : isLast ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-500 dark:text-neutral-500 cursor-default"}
      ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}
    `;
    if (isClickable) {
      if (item.href) {
        return /* @__PURE__ */ jsx(
          motion.a,
          {
            href: item.href,
            className: baseClasses3,
            variants: itemVariants,
            initial: "initial",
            animate: "animate",
            transition: { ...springConfig2, delay: index * 0.05 },
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
            children: content
          },
          item.id
        );
      } else {
        return /* @__PURE__ */ jsx(
          motion.button,
          {
            onClick: item.onClick,
            className: baseClasses3,
            variants: itemVariants,
            initial: "initial",
            animate: "animate",
            transition: { ...springConfig2, delay: index * 0.05 },
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
            children: content
          },
          item.id
        );
      }
    }
    return /* @__PURE__ */ jsx(
      motion.span,
      {
        className: baseClasses3,
        variants: itemVariants,
        initial: "initial",
        animate: "animate",
        transition: { ...springConfig2, delay: index * 0.05 },
        children: content
      },
      item.id
    );
  };
  return /* @__PURE__ */ jsx("nav", { className: `flex items-center ${className}`, "aria-label": "Breadcrumb", children: /* @__PURE__ */ jsx("ol", { className: "flex items-center flex-wrap gap-1", children: displayItems.map((item, index) => {
    const isLast = index === displayItems.length - 1;
    return /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
      renderItem(item, index, isLast),
      !isLast && /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          transition: { ...springConfig2, delay: index * 0.05 + 0.1 },
          className: "flex items-center",
          "aria-hidden": "true",
          children: separator
        }
      )
    ] }, item.id);
  }) }) });
}
var breadcrumbPatterns = {
  /** Simple text breadcrumbs */
  simple: (labels, onNavigate) => labels.map((label, index) => ({
    id: `item-${index}`,
    label,
    onClick: onNavigate ? () => onNavigate(index) : void 0
  })),
  /** File system style breadcrumbs */
  filesystem: (path, onNavigate) => {
    const parts = path.split("/").filter(Boolean);
    return [
      {
        id: "root",
        label: "Root",
        icon: homeIcon,
        onClick: onNavigate ? () => onNavigate("/") : void 0
      },
      ...parts.map((part, index) => ({
        id: `path-${index}`,
        label: part,
        onClick: onNavigate ? () => onNavigate("/" + parts.slice(0, index + 1).join("/")) : void 0
      }))
    ];
  },
  /** Page hierarchy breadcrumbs */
  pages: (pages, onNavigate) => pages.map((page, index) => ({
    id: `page-${index}`,
    label: page.name,
    href: page.path,
    onClick: page.path && onNavigate ? () => onNavigate(page.path) : void 0
  }))
};
var menuVariants = {
  closed: {
    opacity: 0,
    scale: 0.95,
    y: -10
  },
  open: {
    opacity: 1,
    scale: 1,
    y: 0
  }
};
var springConfig3 = spring.smooth;
function ContextMenu({ children, items, disabled = false, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const handleContextMenu = (e) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    e.target.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    setPosition({ x, y });
    setIsOpen(true);
  };
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    const handleScroll = () => {
      setIsOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;
    const menu2 = menuRef.current;
    const rect = menu2.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    let { x, y } = position;
    if (x + rect.width > viewport.width) {
      x = viewport.width - rect.width - 8;
    }
    if (x < 8) x = 8;
    if (y + rect.height > viewport.height) {
      y = y - rect.height - 8;
    }
    if (y < 8) y = 8;
    if (x !== position.x || y !== position.y) {
      setPosition({ x, y });
    }
  }, [isOpen, position]);
  const handleItemClick = (item) => {
    if (item.disabled || item.separator) return;
    item.onClick?.();
    setIsOpen(false);
  };
  const renderItems = (items2) => {
    return items2.map((item, index) => {
      if (item.separator) {
        return /* @__PURE__ */ jsx("hr", { className: "my-1 border-neutral-200 dark:border-neutral-800" }, `separator-${index}`);
      }
      return /* @__PURE__ */ jsxs(
        motion.button,
        {
          onClick: () => handleItemClick(item),
          className: `
            w-full flex items-center gap-3 px-3 py-2 text-sm text-left
            rounded-lg transition-colors
            ${item.disabled ? "text-neutral-400 dark:text-neutral-600 cursor-not-allowed" : item.danger ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50" : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"}
          `,
          disabled: item.disabled,
          whileTap: item.disabled ? {} : { scale: 0.98 },
          transition: springConfig3,
          children: [
            item.icon && /* @__PURE__ */ jsx("span", { className: "w-4 h-4 flex-shrink-0 flex items-center justify-center", children: item.icon }),
            /* @__PURE__ */ jsx("span", { className: "flex-1", children: item.label }),
            item.shortcut && /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-500 dark:text-neutral-500 font-mono", children: item.shortcut }),
            item.submenu && /* @__PURE__ */ jsx("span", { className: "w-4 h-4 flex-shrink-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M4.5 3l3 3-3 3", stroke: "currentColor", strokeWidth: "1.5", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }) }) })
          ]
        },
        item.id
      );
    });
  };
  const menu = isOpen && /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(
    motion.div,
    {
      ref: menuRef,
      initial: "closed",
      animate: "open",
      exit: "closed",
      variants: menuVariants,
      transition: springConfig3,
      className: "\n          fixed z-50 min-w-[200px] p-1\n          bg-white dark:bg-neutral-900\n          border border-neutral-200 dark:border-neutral-800\n          rounded-lg shadow-lg\n          focus:outline-none\n        ",
      style: {
        left: position.x,
        top: position.y
      },
      role: "menu",
      tabIndex: -1,
      children: renderItems(items)
    }
  ) });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: triggerRef,
        onContextMenu: handleContextMenu,
        className,
        children
      }
    ),
    typeof document !== "undefined" && createPortal(menu, document.body)
  ] });
}
var contextMenuItems = {
  copy: (onClick) => ({
    id: "copy",
    label: "Copy",
    icon: /* @__PURE__ */ jsxs("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: [
      /* @__PURE__ */ jsx("path", { d: "M8 2H4a1 1 0 00-1 1v6a1 1 0 001 1h4a1 1 0 001-1V3a1 1 0 00-1-1zM4 1a2 2 0 00-2 2v6a2 2 0 002 2h4a2 2 0 002-2V3a2 2 0 00-2-2H4z" }),
      /* @__PURE__ */ jsx("path", { d: "M1.5 4.5a.5.5 0 01.5-.5h1a.5.5 0 010 1H2v4.5a.5.5 0 01-1 0V4.5z" })
    ] }),
    shortcut: "\u2318C",
    onClick
  }),
  cut: (onClick) => ({
    id: "cut",
    label: "Cut",
    icon: /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M8.5 2.5a1 1 0 11-2 0 1 1 0 012 0zM2 7l3-3m0 0l3 3m-3-3v6", stroke: "currentColor", strokeWidth: "1", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }) }),
    shortcut: "\u2318X",
    onClick
  }),
  paste: (onClick) => ({
    id: "paste",
    label: "Paste",
    icon: /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M8 1H6a1 1 0 00-1 1v1H3a1 1 0 00-1 1v7a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1H7V2a1 1 0 00-1-1z" }) }),
    shortcut: "\u2318V",
    onClick
  }),
  delete: (onClick) => ({
    id: "delete",
    label: "Delete",
    icon: /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M3.5 2.5h5a.5.5 0 000-1h-5a.5.5 0 000 1zM2 3v7a1 1 0 001 1h6a1 1 0 001-1V3H2zm2.5 1.5v4a.5.5 0 01-1 0v-4a.5.5 0 011 0zm3 0v4a.5.5 0 01-1 0v-4a.5.5 0 011 0z" }) }),
    shortcut: "\u2326",
    danger: true,
    onClick
  }),
  separator: () => ({
    id: "separator",
    label: "",
    separator: true
  }),
  rename: (onClick) => ({
    id: "rename",
    label: "Rename",
    icon: /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M8.5 1.5l2 2L4 10H2v-2L8.5 1.5z", stroke: "currentColor", strokeWidth: "1", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }) }),
    shortcut: "F2",
    onClick
  }),
  duplicate: (onClick) => ({
    id: "duplicate",
    label: "Duplicate",
    icon: /* @__PURE__ */ jsxs("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: [
      /* @__PURE__ */ jsx("path", { d: "M8 2H4a1 1 0 00-1 1v6a1 1 0 001 1h4a1 1 0 001-1V3a1 1 0 00-1-1z", stroke: "currentColor", strokeWidth: "1", fill: "none" }),
      /* @__PURE__ */ jsx("path", { d: "M1.5 4.5h-1v5a2 2 0 002 2h5v-1", stroke: "currentColor", strokeWidth: "1", fill: "none" })
    ] }),
    shortcut: "\u2318D",
    onClick
  })
};
var offscreen = {
  left: { x: "-100%" },
  right: { x: "100%" },
  top: { y: "-100%" },
  bottom: { y: "100%" }
};
function Drawer({
  open,
  onClose,
  side = "right",
  size,
  backdrop = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  dragToClose = true,
  title,
  children,
  className = ""
}) {
  const mounted = useMounted();
  const m = useMotionPrefs();
  const panelRef = useRef(null);
  const horizontal = side === "left" || side === "right";
  const sign = side === "left" || side === "top" ? -1 : 1;
  useFocusTrap(panelRef, open);
  useScrollLock(open);
  useEscape(open && closeOnEscape, onClose);
  const drag = useMotionValue(0);
  const backdropOpacity = useTransform(drag, (v) => {
    if (typeof v === "string") return 1;
    const extent = panelRef.current ? horizontal ? panelRef.current.offsetWidth : panelRef.current.offsetHeight : 400;
    return 1 - Math.min(1, Math.max(0, v * sign / extent));
  });
  const onDragEnd = (_, info) => {
    const offset = (horizontal ? info.offset.x : info.offset.y) * sign;
    const velocity = (horizontal ? info.velocity.x : info.velocity.y) * sign;
    const extent = panelRef.current ? horizontal ? panelRef.current.offsetWidth : panelRef.current.offsetHeight : 400;
    if (offset > extent * 0.35 || velocity > 500) {
      onClose();
    } else {
      animate(drag, 0, spring.snappy);
    }
  };
  const dimension = size ?? (horizontal ? 320 : 280);
  const sizeStyle = horizontal ? { width: dimension, maxWidth: "100vw", height: "100dvh" } : { height: dimension, maxHeight: "100dvh", width: "100vw" };
  const placement = {
    left: "left-0 top-0 border-r",
    right: "right-0 top-0 border-l",
    top: "top-0 left-0 border-b",
    bottom: "bottom-0 left-0 border-t rounded-t-[12px]"
  }[side];
  if (!mounted) return null;
  return createPortal(
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50", children: [
      backdrop && /* @__PURE__ */ jsx(
        motion.div,
        {
          "aria-hidden": true,
          className: "absolute inset-0",
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: fade.in },
          exit: { opacity: 0, transition: fade.out },
          onClick: closeOnBackdropClick ? onClose : void 0,
          children: /* @__PURE__ */ jsx(motion.div, { className: "h-full w-full bg-black/30 backdrop-blur-[6px] dark:bg-black/50", style: { opacity: backdropOpacity } })
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          ref: panelRef,
          role: "dialog",
          "aria-modal": "true",
          "aria-label": title,
          tabIndex: -1,
          className: `absolute flex flex-col border-neutral-200 bg-white shadow-xl outline-none dark:border-neutral-800 dark:bg-neutral-900 ${placement} ${className}`,
          style: { ...sizeStyle, [horizontal ? "x" : "y"]: drag },
          initial: m.reduced ? { opacity: 0 } : offscreen[side],
          animate: { x: 0, y: 0, opacity: 1, transition: m.spring("gentle") },
          exit: m.reduced ? { opacity: 0, transition: m.exit() } : { ...offscreen[side], transition: m.exit("panel") },
          drag: dragToClose && !m.reduced ? horizontal ? "x" : "y" : false,
          dragDirectionLock: true,
          dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
          dragElastic: horizontal ? { left: side === "left" ? 1 : 0.04, right: side === "right" ? 1 : 0.04 } : { top: side === "top" ? 1 : 0.04, bottom: side === "bottom" ? 1 : 0.04 },
          dragMomentum: false,
          onDragEnd,
          children: [
            side === "bottom" && dragToClose && /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700" }),
            children
          ]
        }
      )
    ] }) }),
    document.body
  );
}
function DrawerHeader({ children, onClose, showCloseButton = true, className = "" }) {
  return /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-800 ${className}`, children: [
    /* @__PURE__ */ jsx("div", { className: "font-semibold text-neutral-900 dark:text-neutral-100", children }),
    showCloseButton && onClose && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: onClose,
        "aria-label": "Close",
        className: "grid h-8 w-8 place-items-center rounded-[6px] text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
        children: /* @__PURE__ */ jsx("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", "aria-hidden": true, children: /* @__PURE__ */ jsx("path", { d: "M3 3l8 8M11 3l-8 8", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" }) })
      }
    )
  ] });
}
function DrawerContent({ children, className = "" }) {
  return /* @__PURE__ */ jsx("div", { className: `flex-1 overflow-y-auto overscroll-contain p-4 ${className}`, children });
}
function DrawerFooter({ children, className = "" }) {
  return /* @__PURE__ */ jsx("div", { className: `border-t border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950 ${className}`, children });
}
var popoverVariants = {
  closed: {
    opacity: 0,
    scale: 0.95,
    y: -10
  },
  open: {
    opacity: 1,
    scale: 1,
    y: 0
  }
};
var springConfig4 = spring.smooth;
function Popover({
  children,
  content,
  open: controlledOpen,
  onOpenChange,
  placement = "bottom",
  trigger = "click",
  delay = 200,
  arrow = true,
  offset = 8,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  className = "",
  container
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [actualPlacement, setActualPlacement] = useState(placement);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const hoverTimeoutRef = useRef(void 0);
  const isControlled = controlledOpen !== void 0;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setOpen = (open) => {
    if (isControlled) {
      onOpenChange?.(open);
    } else {
      setInternalOpen(open);
      onOpenChange?.(open);
    }
  };
  const calculatePosition = () => {
    if (!triggerRef.current || !popoverRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    let x = 0;
    let y = 0;
    let finalPlacement = placement;
    switch (placement) {
      case "top":
      case "top-start":
      case "top-end":
        y = triggerRect.top - popoverRect.height - offset;
        break;
      case "bottom":
      case "bottom-start":
      case "bottom-end":
        y = triggerRect.bottom + offset;
        break;
      case "left":
      case "left-start":
      case "left-end":
        x = triggerRect.left - popoverRect.width - offset;
        break;
      case "right":
      case "right-start":
      case "right-end":
        x = triggerRect.right + offset;
        break;
    }
    if (placement.includes("top") || placement.includes("bottom")) {
      if (placement.includes("start")) {
        x = triggerRect.left;
      } else if (placement.includes("end")) {
        x = triggerRect.right - popoverRect.width;
      } else {
        x = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
      }
    }
    if (placement.includes("left") || placement.includes("right")) {
      if (placement.includes("start")) {
        y = triggerRect.top;
      } else if (placement.includes("end")) {
        y = triggerRect.bottom - popoverRect.height;
      } else {
        y = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
      }
    }
    if (placement.includes("top") && y < 0) {
      y = triggerRect.bottom + offset;
      finalPlacement = placement.replace("top", "bottom");
    } else if (placement.includes("bottom") && y + popoverRect.height > viewport.height) {
      y = triggerRect.top - popoverRect.height - offset;
      finalPlacement = placement.replace("bottom", "top");
    }
    if (placement.includes("left") && x < 0) {
      x = triggerRect.right + offset;
      finalPlacement = placement.replace("left", "right");
    } else if (placement.includes("right") && x + popoverRect.width > viewport.width) {
      x = triggerRect.left - popoverRect.width - offset;
      finalPlacement = placement.replace("right", "left");
    }
    x = Math.max(8, Math.min(x, viewport.width - popoverRect.width - 8));
    y = Math.max(8, Math.min(y, viewport.height - popoverRect.height - 8));
    setPosition({ x, y });
    setActualPlacement(finalPlacement);
  };
  useEffect(() => {
    if (isOpen) {
      calculatePosition();
    }
  }, [isOpen, placement]);
  useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) return;
    const handleClickOutside = (e) => {
      if (popoverRef.current && triggerRef.current && !popoverRef.current.contains(e.target) && !triggerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeOnOutsideClick]);
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEscape]);
  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => {
      if (isOpen) {
        calculatePosition();
      }
    };
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isOpen]);
  const handleClick = () => {
    if (trigger === "click") {
      setOpen(!isOpen);
    }
  };
  const handleMouseEnter = () => {
    if (trigger === "hover") {
      clearTimeout(hoverTimeoutRef.current);
      setOpen(true);
    }
  };
  const handleMouseLeave = () => {
    if (trigger === "hover") {
      hoverTimeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, delay);
    }
  };
  const handleFocus = () => {
    if (trigger === "focus") {
      setOpen(true);
    }
  };
  const handleBlur = () => {
    if (trigger === "focus") {
      setOpen(false);
    }
  };
  const renderArrow = () => {
    if (!arrow) return null;
    const arrowClasses = "absolute w-2 h-2 rotate-45 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800";
    let arrowStyle = {};
    let arrowClassName = arrowClasses;
    if (actualPlacement.includes("top")) {
      arrowStyle = { bottom: -8 / 2, left: "50%", transform: "translateX(-50%)" };
      arrowClassName += " border-t-0 border-l-0";
    } else if (actualPlacement.includes("bottom")) {
      arrowStyle = { top: -8 / 2, left: "50%", transform: "translateX(-50%)" };
      arrowClassName += " border-b-0 border-r-0";
    } else if (actualPlacement.includes("left")) {
      arrowStyle = { right: -8 / 2, top: "50%", transform: "translateY(-50%)" };
      arrowClassName += " border-l-0 border-t-0";
    } else if (actualPlacement.includes("right")) {
      arrowStyle = { left: -8 / 2, top: "50%", transform: "translateY(-50%)" };
      arrowClassName += " border-r-0 border-b-0";
    }
    return /* @__PURE__ */ jsx("div", { className: arrowClassName, style: arrowStyle });
  };
  const popover = /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref: popoverRef,
      initial: "closed",
      animate: "open",
      exit: "closed",
      variants: popoverVariants,
      transition: springConfig4,
      className: `
          fixed z-50 max-w-xs
          bg-white dark:bg-neutral-900 
          border border-neutral-200 dark:border-neutral-800
          rounded-lg shadow-lg p-3
          ${className}
        `,
      style: {
        left: position.x,
        top: position.y
      },
      onMouseEnter: trigger === "hover" ? handleMouseEnter : void 0,
      onMouseLeave: trigger === "hover" ? handleMouseLeave : void 0,
      children: [
        renderArrow(),
        content
      ]
    }
  ) });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: triggerRef,
        onClick: handleClick,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onFocus: handleFocus,
        onBlur: handleBlur,
        className: "inline-block",
        children
      }
    ),
    typeof document !== "undefined" && createPortal(popover, container || document.body)
  ] });
}
var springs8 = {
  snappy: spring.snappy,
  smooth: spring.smooth,
  quick: spring.snappy
};
function StepIndicator({
  index,
  label,
  status,
  reduced
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors
          ${status === "complete" ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900" : ""}
          ${status === "active" ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 ring-2 ring-neutral-900/20 dark:ring-white/20" : ""}
          ${status === "upcoming" ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500" : ""}
        `,
        animate: {
          scale: status === "active" ? 1 : 1
        },
        transition: springs8.snappy,
        children: status === "complete" ? /* @__PURE__ */ jsx(
          motion.svg,
          {
            width: "14",
            height: "14",
            viewBox: "0 0 14 14",
            fill: "none",
            initial: reduced ? false : { pathLength: 0 },
            animate: { pathLength: 1 },
            transition: springs8.smooth,
            children: /* @__PURE__ */ jsx(
              motion.path,
              {
                d: "M3 7l3 3 5-6",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                initial: { pathLength: 0 },
                animate: { pathLength: 1 },
                transition: springs8.smooth
              }
            )
          }
        ) : index + 1
      }
    ),
    /* @__PURE__ */ jsx(
      "span",
      {
        className: `text-xs font-medium hidden sm:block transition-colors
          ${status === "active" ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-400 dark:text-neutral-500"}
        `,
        children: label
      }
    )
  ] });
}
function ProgressBar({
  current,
  total,
  reduced,
  direction
}) {
  const progress = total <= 1 ? current === total - 1 ? 1 : 0 : current / (total - 1);
  const progressTransition = reduced ? { duration: 0.1 } : direction < 0 ? spring.gentle : spring.gentle;
  return /* @__PURE__ */ jsx("div", { className: "h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "h-full bg-neutral-900 dark:bg-white rounded-full",
      animate: { width: `${progress * 100}%` },
      transition: progressTransition
    }
  ) });
}
function Stepper({
  steps,
  activeStep: controlledStep,
  defaultStep = 0,
  onChange,
  className = "",
  showControls = true,
  onFinish
}) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isControlled = controlledStep !== void 0;
  const [internalStep, setInternalStep] = useState(defaultStep);
  const [direction, setDirection] = useState(0);
  const current = isControlled ? controlledStep : internalStep;
  const goTo = useCallback(
    (step) => {
      if (step < 0 || step >= steps.length) return;
      setDirection(step > current ? 1 : -1);
      if (!isControlled) setInternalStep(step);
      onChange?.(step);
    },
    [current, steps.length, isControlled, onChange]
  );
  const slideVariants = useMemo(
    () => ({
      enter: (dir) => ({
        x: dir > 0 ? 200 : -200,
        opacity: 0
      }),
      center: {
        x: 0,
        opacity: 1
      },
      exit: (dir) => ({
        x: dir > 0 ? -200 : 200,
        opacity: 0
      })
    }),
    []
  );
  const isLast = current === steps.length - 1;
  const isFirst = current === 0;
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: `flex flex-col gap-4 ${className}`,
      initial: prefersReducedMotion ? false : { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: springs8.smooth,
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between gap-2", children: steps.map((step, i) => {
          const status = i < current ? "complete" : i === current ? "active" : "upcoming";
          return /* @__PURE__ */ jsxs(React9.Fragment, { children: [
            /* @__PURE__ */ jsx(
              StepIndicator,
              {
                index: i,
                label: step.label,
                status,
                reduced: prefersReducedMotion
              }
            ),
            i < steps.length - 1 && /* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-neutral-200 dark:bg-neutral-700" })
          ] }, step.id);
        }) }),
        /* @__PURE__ */ jsx(ProgressBar, { current, total: steps.length, reduced: prefersReducedMotion, direction }),
        /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden min-h-[120px]", children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, custom: direction, mode: "wait", children: /* @__PURE__ */ jsx(
          motion.div,
          {
            custom: direction,
            variants: slideVariants,
            initial: "enter",
            animate: "center",
            exit: "exit",
            transition: prefersReducedMotion ? { duration: 0.1 } : {
              x: spring.smooth,
              opacity: {
                duration: 0.25,
                ease: [0.25, 0.1, 0.25, 1]
                // Custom eased curve
              }
            },
            children: steps[current]?.content
          },
          current
        ) }) }),
        showControls && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-2", children: [
          /* @__PURE__ */ jsx(
            motion.button,
            {
              type: "button",
              onClick: () => goTo(current - 1),
              disabled: isFirst,
              className: `px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer
              ${isFirst ? "opacity-30 cursor-default" : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"}
            `,
              whileTap: isFirst || prefersReducedMotion ? void 0 : { scale: 0.97 },
              transition: springs8.quick,
              children: "\u2190 Back"
            }
          ),
          /* @__PURE__ */ jsx(
            motion.button,
            {
              type: "button",
              onClick: () => {
                if (isLast) {
                  onFinish?.();
                } else {
                  goTo(current + 1);
                }
              },
              className: "px-4 py-2 text-sm font-medium rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors cursor-pointer",
              whileTap: prefersReducedMotion ? void 0 : { scale: 0.97 },
              transition: springs8.quick,
              children: isLast ? "Finish \u2713" : "Next \u2192"
            }
          )
        ] })
      ]
    }
  );
}
Stepper.displayName = "Stepper";
var springs9 = {
  snappy: spring.snappy,
  smooth: spring.smooth,
  quick: spring.snappy
};
function TagPill({
  tag,
  onRemove,
  reduced,
  index
}) {
  return /* @__PURE__ */ jsxs(
    motion.span,
    {
      layoutId: `tag-${tag}`,
      layout: !reduced,
      initial: reduced ? false : { opacity: 0, scale: 0.8, y: -4 },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)"
      },
      exit: reduced ? { opacity: 0 } : {
        opacity: 0,
        scale: 0.8,
        y: -4,
        filter: "blur(2px)"
      },
      transition: {
        layout: spring.smooth,
        scale: springs9.snappy,
        opacity: { duration: 0.15, ease: "easeOut" },
        y: springs9.snappy,
        filter: { duration: 0.1 },
        delay: index * 0.02
      },
      className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 shrink-0",
      children: [
        tag,
        /* @__PURE__ */ jsx(
          motion.button,
          {
            type: "button",
            onClick: onRemove,
            className: "text-neutral-400 hover:text-red-400 dark:text-neutral-500 dark:hover:text-red-400 transition-colors cursor-pointer ml-0.5",
            whileHover: { scale: 1.2 },
            whileTap: { scale: 0.85 },
            transition: springs9.quick,
            "aria-label": `Remove ${tag}`,
            children: /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ jsx("path", { d: "M3 3l6 6M9 3l-6 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) })
          }
        )
      ]
    }
  );
}
function MultiSelect({
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = "Type and press Enter...",
  className = "",
  suggestions = [],
  maxTags
}) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isControlled = controlledValue !== void 0;
  const [internalValue, setInternalValue] = useState(() => defaultValue ?? []);
  const tags = isControlled ? controlledValue : internalValue;
  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const update = useCallback(
    (next) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );
  const addTag = useCallback(
    (tag) => {
      const trimmed = tag.trim();
      if (!trimmed || tags.includes(trimmed)) return;
      if (maxTags && tags.length >= maxTags) return;
      update([...tags, trimmed]);
      setInputValue("");
    },
    [tags, update, maxTags]
  );
  const removeTag = useCallback(
    (index) => {
      update(tags.filter((_, i) => i !== index));
    },
    [tags, update]
  );
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addTag(inputValue);
      } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
        removeTag(tags.length - 1);
      }
    },
    [inputValue, tags, addTag, removeTag]
  );
  const filteredSuggestions = inputValue.length > 0 ? suggestions.filter(
    (s) => s.toLowerCase().includes(inputValue.toLowerCase()) && !tags.includes(s)
  ) : [];
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref: containerRef,
      className: `relative ${className}`,
      initial: prefersReducedMotion ? false : { opacity: 0, y: 4 },
      animate: { opacity: 1, y: 0 },
      transition: springs9.smooth,
      children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: `flex flex-wrap items-center gap-1.5 px-3 py-2 rounded-lg border bg-white dark:bg-neutral-900 min-h-[42px] cursor-text transition-colors
          ${focused ? "border-blue-500 ring-2 ring-blue-500/20" : "border-neutral-200 dark:border-neutral-700"}
        `,
            onClick: () => inputRef.current?.focus(),
            animate: {
              borderColor: focused ? "rgb(59, 130, 246)" : void 0
            },
            transition: springs9.quick,
            children: [
              /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "popLayout", children: tags.map((tag, i) => /* @__PURE__ */ jsx(
                TagPill,
                {
                  tag,
                  index: i,
                  onRemove: () => removeTag(i),
                  reduced: prefersReducedMotion
                },
                `tag-${tag}-${i}`
              )) }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  ref: inputRef,
                  type: "text",
                  value: inputValue,
                  onChange: (e) => setInputValue(e.target.value),
                  onKeyDown: handleKeyDown,
                  onFocus: () => setFocused(true),
                  onBlur: () => {
                    setFocused(false);
                    if (inputValue.trim()) addTag(inputValue);
                  },
                  placeholder: tags.length === 0 ? placeholder : "",
                  className: "flex-1 min-w-[100px] bg-transparent outline-none text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { children: focused && filteredSuggestions.length > 0 && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -4, scale: 0.97 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.97 },
            transition: springs9.snappy,
            className: "absolute top-full left-0 right-0 mt-1 z-50 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-lg overflow-hidden",
            children: filteredSuggestions.slice(0, 6).map((s) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onMouseDown: (e) => {
                  e.preventDefault();
                  addTag(s);
                },
                className: "w-full text-left px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer",
                children: s
              },
              s
            ))
          }
        ) }),
        maxTags && /* @__PURE__ */ jsxs("div", { className: "mt-1 text-[10px] text-neutral-400 text-right", children: [
          tags.length,
          "/",
          maxTags
        ] })
      ]
    }
  );
}
MultiSelect.displayName = "MultiSelect";
var springs10 = {
  snappy: spring.snappy,
  smooth: spring.smooth,
  quick: spring.snappy
};
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay();
}
function formatDate(d) {
  if (!d) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isInRange(date, start, end) {
  if (!start || !end) return false;
  const t = date.getTime();
  return t > start.getTime() && t < end.getTime();
}
var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
function Calendar({
  year,
  month,
  onMonthChange,
  range,
  selecting,
  onDayClick,
  onDayHover,
  hoverDate,
  reduced
}) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const effectiveEnd = selecting === "end" && hoverDate ? hoverDate : range.end;
  const effectiveStart = range.start;
  return /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsx(
        motion.button,
        {
          type: "button",
          onClick: () => onMonthChange(-1),
          className: "w-7 h-7 flex items-center justify-center rounded-md text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer",
          whileTap: reduced ? void 0 : { scale: 0.85 },
          transition: springs10.quick,
          children: /* @__PURE__ */ jsx("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ jsx("path", { d: "M10 4l-4 4 4 4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
        }
      ),
      /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium text-neutral-900 dark:text-neutral-100", children: [
        MONTH_NAMES[month],
        " ",
        year
      ] }),
      /* @__PURE__ */ jsx(
        motion.button,
        {
          type: "button",
          onClick: () => onMonthChange(1),
          className: "w-7 h-7 flex items-center justify-center rounded-md text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer",
          whileTap: reduced ? void 0 : { scale: 0.85 },
          transition: springs10.quick,
          children: /* @__PURE__ */ jsx("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ jsx("path", { d: "M6 4l4 4-4 4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-0 mb-1", children: DAY_LABELS.map((d) => /* @__PURE__ */ jsx("span", { className: "text-[10px] text-center text-neutral-400 dark:text-neutral-500 font-medium py-1", children: d }, d)) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-7 gap-0", children: [
      Array.from({ length: firstDay }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "h-8" }, `empty-${i}`)),
      Array.from({ length: daysInMonth }).map((_, i) => {
        const day = i + 1;
        const date = new Date(year, month, day);
        const isStart = isSameDay(date, effectiveStart);
        const isEnd = isSameDay(date, effectiveEnd);
        const inRange = isInRange(date, effectiveStart, effectiveEnd);
        const isSelected = isStart || isEnd;
        return /* @__PURE__ */ jsx(
          motion.button,
          {
            type: "button",
            onClick: () => onDayClick(date),
            onMouseEnter: () => onDayHover(date),
            onMouseLeave: () => onDayHover(null),
            className: `h-8 w-full text-xs font-medium rounded-md relative cursor-pointer transition-colors
                ${isSelected ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 z-10" : ""}
                ${inRange ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100" : ""}
                ${!isSelected && !inRange ? "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800" : ""}
              `,
            whileTap: reduced ? void 0 : { scale: 0.85 },
            transition: springs10.quick,
            children: day
          },
          day
        );
      })
    ] })
  ] });
}
function DateRangePicker({
  value: controlledValue,
  defaultValue,
  onChange,
  className = "",
  placeholder
}) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isControlled = controlledValue !== void 0;
  const [internalValue, setInternalValue] = useState(
    () => defaultValue ?? { start: null, end: null }
  );
  const range = isControlled ? controlledValue : internalValue;
  const [open, setOpen] = useState(false);
  const [selecting, setSelecting] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0, width: 0 });
  const ref = useRef(null);
  const triggerRef = useRef(null);
  const today = useMemo(() => /* @__PURE__ */ new Date(), []);
  const [viewYear, setViewYear] = useState(range.start?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(range.start?.getMonth() ?? today.getMonth());
  const update = useCallback(
    (next) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );
  const handleMonthChange = useCallback((delta) => {
    setViewMonth((m) => {
      const nm = m + delta;
      if (nm < 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      if (nm > 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return nm;
    });
  }, []);
  const handleDayClick = useCallback(
    (date) => {
      if (!selecting || selecting === "start") {
        update({ start: date, end: null });
        setSelecting("end");
      } else {
        const start = range.start;
        if (date.getTime() < start.getTime()) {
          update({ start: date, end: start });
        } else {
          update({ start, end: date });
        }
        setSelecting(null);
        setOpen(false);
      }
    },
    [selecting, range, update]
  );
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setSelecting(null);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);
  const handleOpen = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPos({
        x: rect.left + window.scrollX,
        y: rect.bottom + window.scrollY + 8,
        width: rect.width
      });
    }
    setOpen(true);
    setSelecting("start");
    if (range.start) {
      setViewYear(range.start.getFullYear());
      setViewMonth(range.start.getMonth());
    }
  }, [range]);
  return /* @__PURE__ */ jsxs("div", { ref, className: `relative inline-block ${className}`, children: [
    /* @__PURE__ */ jsxs(
      motion.button,
      {
        ref: triggerRef,
        type: "button",
        onClick: handleOpen,
        className: "flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors min-w-[280px]",
        whileTap: prefersReducedMotion ? void 0 : { scale: 0.98 },
        transition: springs10.quick,
        children: [
          /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", className: "text-neutral-400 shrink-0", children: [
            /* @__PURE__ */ jsx("rect", { x: "2", y: "3", width: "12", height: "11", rx: "2", stroke: "currentColor", strokeWidth: "1.2" }),
            /* @__PURE__ */ jsx("path", { d: "M2 7h12M5 1v4M11 1v4", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: range.start ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-400", children: range.start ? formatDate(range.start) : placeholder?.start ?? "Start date" }),
          /* @__PURE__ */ jsx("span", { className: "text-neutral-300 dark:text-neutral-600", children: "\u2192" }),
          /* @__PURE__ */ jsx("span", { className: range.end ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-400", children: range.end ? formatDate(range.end) : placeholder?.end ?? "End date" })
        ]
      }
    ),
    range.start && range.end && /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute -bottom-1 left-3 right-3 h-0.5 bg-neutral-900 dark:bg-white rounded-full",
        initial: prefersReducedMotion ? false : { scaleX: 0, originX: 0 },
        animate: { scaleX: 1 },
        transition: springs10.snappy
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && typeof window !== "undefined" && createPortal(
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8, scale: 0.96 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.96 },
          transition: springs10.snappy,
          className: "fixed z-[9999] rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl",
          style: {
            left: dropdownPos.x,
            top: dropdownPos.y,
            minWidth: Math.max(dropdownPos.width, 280)
          },
          children: [
            /* @__PURE__ */ jsx(
              Calendar,
              {
                year: viewYear,
                month: viewMonth,
                onMonthChange: handleMonthChange,
                range,
                selecting,
                onDayClick: handleDayClick,
                onDayHover: setHoverDate,
                hoverDate,
                reduced: prefersReducedMotion
              }
            ),
            selecting && /* @__PURE__ */ jsx("div", { className: "px-3 pb-2 text-[10px] text-neutral-400 text-center", children: selecting === "start" ? "Select start date" : "Select end date" })
          ]
        }
      ),
      document.body
    ) })
  ] });
}
DateRangePicker.displayName = "DateRangePicker";
var springs11 = {
  snappy: spring.snappy,
  smooth: spring.smooth,
  quick: spring.snappy
};
var DEFAULT_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
var DEFAULT_SLOT = { from: "09:00", to: "17:00" };
function buildDefaultValue(days) {
  const val = {};
  for (const day of days) {
    val[day] = {
      enabled: day === "Monday",
      // Only Monday enabled by default
      slots: [{ ...DEFAULT_SLOT }]
    };
  }
  return val;
}
function TimeInput({
  value,
  onChange,
  label,
  reduced
}) {
  return /* @__PURE__ */ jsxs(
    motion.label,
    {
      className: "flex flex-col gap-1",
      initial: reduced ? false : { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: springs11.quick,
      children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-medium", children: label }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "time",
            value,
            onChange: (e) => onChange(e.target.value),
            className: "px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 outline-none focus:ring-2 focus:ring-blue-500/40 transition-shadow w-[110px] tabular-nums [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:dark:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
          }
        )
      ]
    }
  );
}
function SlotRow({
  slot,
  index,
  onUpdate,
  onRemove,
  canRemove,
  reduced
}) {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      layout: !reduced,
      initial: reduced ? false : { opacity: 0, scale: 0.9, y: -8 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, height: 0, marginTop: 0 },
      transition: {
        layout: springs11.smooth,
        opacity: { duration: 0.15 },
        scale: springs11.quick,
        y: springs11.quick,
        height: springs11.smooth,
        // Stagger entrance based on index
        delay: index * 0.05
      },
      className: "flex items-end gap-3",
      children: [
        /* @__PURE__ */ jsx(
          TimeInput,
          {
            label: "From",
            value: slot.from,
            onChange: (from) => onUpdate(index, { ...slot, from }),
            reduced
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-neutral-400 dark:text-neutral-500 pb-2 text-sm", children: "\u2192" }),
        /* @__PURE__ */ jsx(
          TimeInput,
          {
            label: "To",
            value: slot.to,
            onChange: (to) => onUpdate(index, { ...slot, to }),
            reduced
          }
        ),
        canRemove && /* @__PURE__ */ jsx(
          motion.button,
          {
            type: "button",
            onClick: () => onRemove(index),
            className: "pb-2 text-neutral-400 hover:text-red-400 dark:text-neutral-500 dark:hover:text-red-400 transition-colors cursor-pointer",
            whileHover: { scale: 1.15 },
            whileTap: { scale: 0.9 },
            transition: springs11.quick,
            "aria-label": "Remove time slot",
            children: /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ jsx("path", { d: "M4 4l8 8M12 4l-8 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) })
          }
        )
      ]
    }
  );
}
function DayRow({
  day,
  schedule,
  onToggle,
  onUpdateSlot,
  onRemoveSlot,
  onAddSlot,
  reduced
}) {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      layout: !reduced,
      className: "border border-neutral-200 dark:border-neutral-700/60 rounded-lg overflow-hidden bg-white dark:bg-neutral-900/50",
      transition: springs11.smooth,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-3", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-neutral-900 dark:text-neutral-100", children: day }),
          /* @__PURE__ */ jsx(
            Toggle,
            {
              size: "sm",
              checked: schedule.enabled,
              onChange: onToggle,
              "aria-label": `Toggle ${day}`
            }
          )
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: schedule.enabled && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: reduced ? false : { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: reduced ? { duration: 0.1 } : {
              height: springs11.smooth,
              opacity: { duration: 0.2, ease: "easeOut" }
            },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxs("div", { className: "px-4 pb-4 pt-1 border-t border-neutral-100 dark:border-neutral-800", children: [
              /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3 mt-3", children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "popLayout", children: schedule.slots.map((slot, i) => /* @__PURE__ */ jsx(
                SlotRow,
                {
                  slot,
                  index: i,
                  onUpdate: onUpdateSlot,
                  onRemove: onRemoveSlot,
                  canRemove: schedule.slots.length > 1,
                  reduced
                },
                `${i}-${slot.from}-${slot.to}`
              )) }) }),
              /* @__PURE__ */ jsx(
                motion.button,
                {
                  type: "button",
                  onClick: onAddSlot,
                  className: "mt-3 text-xs font-medium text-blue-500 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer",
                  whileHover: reduced ? void 0 : { x: 2 },
                  whileTap: reduced ? void 0 : { scale: 0.97 },
                  transition: springs11.quick,
                  children: "+ Add More"
                }
              )
            ] })
          }
        ) })
      ]
    }
  );
}
function SchedulePicker({
  value: controlledValue,
  defaultValue,
  onChange,
  days = DEFAULT_DAYS,
  className = ""
}) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isControlled = controlledValue !== void 0;
  const [internalValue, setInternalValue] = useState(
    () => defaultValue ?? buildDefaultValue(days)
  );
  const value = isControlled ? controlledValue : internalValue;
  const update = useCallback(
    (next) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );
  const handleToggle = useCallback(
    (day) => {
      const current = value[day] ?? { enabled: false, slots: [{ ...DEFAULT_SLOT }] };
      update({
        ...value,
        [day]: { ...current, enabled: !current.enabled }
      });
    },
    [value, update]
  );
  const handleUpdateSlot = useCallback(
    (day, index, slot) => {
      const current = value[day];
      if (!current) return;
      const slots = [...current.slots];
      slots[index] = slot;
      update({ ...value, [day]: { ...current, slots } });
    },
    [value, update]
  );
  const handleRemoveSlot = useCallback(
    (day, index) => {
      const current = value[day];
      if (!current || current.slots.length <= 1) return;
      const slots = current.slots.filter((_, i) => i !== index);
      update({ ...value, [day]: { ...current, slots } });
    },
    [value, update]
  );
  const handleAddSlot = useCallback(
    (day) => {
      const current = value[day];
      if (!current) return;
      const lastSlot = current.slots[current.slots.length - 1];
      update({
        ...value,
        [day]: {
          ...current,
          slots: [...current.slots, { from: lastSlot?.to ?? "09:00", to: "17:00" }]
        }
      });
    },
    [value, update]
  );
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: `flex flex-col gap-2 ${className}`,
      initial: prefersReducedMotion ? false : { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: springs11.smooth,
      children: days.map((day) => {
        const schedule = value[day] ?? {
          enabled: false,
          slots: [{ ...DEFAULT_SLOT }]
        };
        return /* @__PURE__ */ jsx(
          DayRow,
          {
            day,
            schedule,
            onToggle: () => handleToggle(day),
            onUpdateSlot: (i, s) => handleUpdateSlot(day, i, s),
            onRemoveSlot: (i) => handleRemoveSlot(day, i),
            onAddSlot: () => handleAddSlot(day),
            reduced: prefersReducedMotion
          },
          day
        );
      })
    }
  );
}
SchedulePicker.displayName = "SchedulePicker";
var SPRING = spring.smooth;
function CodeBlock({ code, label = "Code" }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);
  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
  };
  return /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
    /* @__PURE__ */ jsxs(
      motion.button,
      {
        onClick: () => setOpen(!open),
        className: `
          relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer
          border transition-colors
          ${open ? "bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100" : "bg-transparent border-neutral-300 dark:border-neutral-800 text-neutral-500 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600"}
        `,
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.97 },
        transition: SPRING,
        children: [
          /* @__PURE__ */ jsxs(
            "svg",
            {
              width: "14",
              height: "14",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx("polyline", { points: "16 18 22 12 16 6" }),
                /* @__PURE__ */ jsx("polyline", { points: "8 6 2 12 8 18" })
              ]
            }
          ),
          label,
          /* @__PURE__ */ jsx(
            motion.div,
            {
              animate: { rotate: open ? 180 : 0 },
              transition: SPRING,
              className: "ml-0.5",
              children: /* @__PURE__ */ jsx("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", children: /* @__PURE__ */ jsx("path", { d: "M2.5 3.5L5 6L7.5 3.5" }) })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { height: 0, opacity: 0, y: -4 },
        animate: { height: "auto", opacity: 1, y: 0 },
        exit: { height: 0, opacity: 0, y: -4 },
        transition: SPRING,
        className: "overflow-hidden",
        children: /* @__PURE__ */ jsxs("div", { className: "relative mt-2 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 group", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2 flex gap-1.5", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: copy,
              className: `text-[11px] px-2.5 py-1 rounded-md font-medium cursor-pointer transition-all
                    ${copied ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 border border-transparent"}`,
              children: copied ? "\u2713 Copied" : "Copy"
            }
          ) }),
          /* @__PURE__ */ jsx("pre", { className: "p-4 pr-20 text-xs leading-relaxed text-neutral-700 dark:text-neutral-300 overflow-x-auto font-mono", style: { scrollbarWidth: "none" }, children: /* @__PURE__ */ jsx("code", { children: code }) })
        ] })
      }
    ) })
  ] });
}
function highlightTSX(code) {
  return code.replace(/(<\/?)([A-Z][a-zA-Z0-9]*|[a-z]+)(\s|>)/g, '$1<span class="token-tag">$2</span>$3').replace(/(\s)([a-zA-Z-]+)(=)/g, '$1<span class="token-attr">$2</span>$3').replace(/"([^"]*)"/g, '"<span class="token-string">$1</span>"').replace(/'([^']*)'/g, `'<span class="token-string">$1</span>'`).replace(/`([^`]*)`/g, '`<span class="token-template">$1</span>`').replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="token-number">$1</span>').replace(/\b(const|let|var|function|return|if|else|for|while|class|export|import|from|default|type|interface|extends|implements)\b/g, '<span class="token-keyword">$1</span>').replace(/\b(true|false|null|undefined)\b/g, '<span class="token-boolean">$1</span>').replace(/\/\*[\s\S]*?\*\//g, '<span class="token-comment">$&</span>').replace(/\/\/.*$/gm, '<span class="token-comment">$&</span>').replace(/(\w+)(\s*:)/g, '<span class="token-property">$1</span>$2').replace(/\{([^}]*)\}/g, '{<span class="token-expression">$1</span>}');
}
function CodeDisplay({ title, code, language = "tsx" }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2e3);
    return () => clearTimeout(t);
  }, [copied]);
  const highlightedCode = useMemo(() => {
    if (language === "tsx" || language === "jsx") {
      return highlightTSX(code);
    }
    return code;
  }, [code, language]);
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
    }
  }, [code]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-white", children: title }),
      /* @__PURE__ */ jsx(
        motion.button,
        {
          className: `px-3 py-1.5 text-sm font-mono rounded transition-colors ${copied ? "bg-green-600 text-white" : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"}`,
          onClick: handleCopy,
          whileTap: { scale: 0.95 },
          children: copied ? "\u2713 Copied!" : "Copy Code"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "px-4 py-2 bg-neutral-900 border-b border-neutral-800", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-neutral-400 uppercase", children: language }) }),
        /* @__PURE__ */ jsx("div", { className: "p-4 overflow-x-auto", children: /* @__PURE__ */ jsx("pre", { className: "text-sm font-mono text-neutral-200 leading-relaxed", children: /* @__PURE__ */ jsx(
          "code",
          {
            dangerouslySetInnerHTML: { __html: highlightedCode },
            className: "syntax-highlight"
          }
        ) }) })
      ] }),
      copied && /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "absolute inset-0 bg-green-500 bg-opacity-10 border-2 border-green-500 rounded-lg flex items-center justify-center pointer-events-none",
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.9 },
          children: /* @__PURE__ */ jsx("div", { className: "bg-green-600 text-white px-3 py-1 rounded text-sm font-medium", children: "Code copied to clipboard!" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
        :global(.syntax-highlight .token-tag) { color: #ff7b72; }
        :global(.syntax-highlight .token-attr) { color: #79c0ff; }
        :global(.syntax-highlight .token-string) { color: #a5d6ff; }
        :global(.syntax-highlight .token-template) { color: #a5d6ff; }
        :global(.syntax-highlight .token-number) { color: #79c0ff; }
        :global(.syntax-highlight .token-keyword) { color: #ff7b72; font-weight: 600; }
        :global(.syntax-highlight .token-boolean) { color: #79c0ff; }
        :global(.syntax-highlight .token-comment) { color: #8b949e; font-style: italic; }
        :global(.syntax-highlight .token-property) { color: #79c0ff; }
        :global(.syntax-highlight .token-expression) { color: #ffa657; }
      ` })
  ] });
}
var MAGNETIC_RADIUS = 100;
var MAX_DISPLACEMENT = 8;
var SPRING_CONFIG = springValue.smooth;
function MagneticButton({
  children,
  intensity = 1,
  className = "",
  disabled = false,
  as = "div",
  ...props
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);
  const handleMouseMove = useCallback(
    (e) => {
      if (disabled || prefersReducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance < MAGNETIC_RADIUS) {
        const pull = (1 - distance / MAGNETIC_RADIUS) * MAX_DISPLACEMENT * intensity;
        const angle = Math.atan2(deltaY, deltaX);
        x.set(Math.cos(angle) * pull);
        y.set(Math.sin(angle) * pull);
      } else {
        x.set(0);
        y.set(0);
      }
    },
    [disabled, prefersReducedMotion, intensity, x, y]
  );
  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);
  const Component = motion[as];
  return /* @__PURE__ */ jsx(
    Component,
    {
      ref,
      className: `inline-block ${className}`,
      style: { x: springX, y: springY },
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      ...props,
      children
    }
  );
}
function GlowCard({
  children,
  className = "",
  borderGlow = false,
  glowColor,
  glowSize = 200,
  glowOpacity = 0.15
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(-glowSize);
  const mouseY = useMotionValue(-glowSize);
  const defaultColor = glowColor || "rgba(99,102,241,0.6)";
  const surfaceGlow = useMotionTemplate`radial-gradient(${glowSize}px circle at ${mouseX}px ${mouseY}px, ${defaultColor}, transparent 80%)`;
  const borderGlowBg = useMotionTemplate`radial-gradient(${glowSize}px circle at ${mouseX}px ${mouseY}px, ${defaultColor}, transparent 80%)`;
  const handleMouseMove = useCallback(
    (e) => {
      if (prefersReducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [prefersReducedMotion, mouseX, mouseY]
  );
  const handleMouseLeave = useCallback(() => {
    mouseX.set(-glowSize);
    mouseY.set(-glowSize);
  }, [mouseX, mouseY, glowSize]);
  if (borderGlow) {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: `relative rounded-[8px] p-[1px] ${className}`,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute inset-0 rounded-[8px] transition-opacity duration-300",
              style: {
                background: borderGlowBg,
                opacity: glowOpacity
              },
              "aria-hidden": true
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-[8px] border border-neutral-200 dark:border-neutral-800", "aria-hidden": true }),
          /* @__PURE__ */ jsx("div", { className: "relative rounded-[7px] bg-white dark:bg-neutral-950 p-6", children })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref,
      className: `relative overflow-hidden rounded-[8px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 ${className}`,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "pointer-events-none absolute inset-0 rounded-[8px]",
            style: {
              background: surfaceGlow,
              opacity: glowOpacity
            },
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative z-10", children })
      ]
    }
  );
}
var DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
function Column({ digit }) {
  const m = useMotionPrefs();
  return /* @__PURE__ */ jsxs("span", { className: "relative inline-block h-[1lh] overflow-hidden", style: { width: "1ch" }, children: [
    /* @__PURE__ */ jsx(
      motion.span,
      {
        className: "absolute left-0 top-0 flex flex-col",
        initial: false,
        animate: { y: `${-digit * 10}%` },
        transition: m.reduced ? { duration: 0 } : m.spring("smooth"),
        children: DIGITS.map((d) => /* @__PURE__ */ jsx("span", { className: "block h-[1lh] text-center", children: d }, d))
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "invisible", children: "0" })
  ] });
}
function NumberTicker({ value, prefix = "", suffix = "", decimals = 0, commas = true, className = "", fontSize, locale = "en-US" }) {
  const m = useMotionPrefs();
  const formatted = useMemo(
    () => new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: commas
    }).format(value),
    [value, decimals, commas, locale]
  );
  const chars = formatted.split("").map((ch, i, all) => ({ ch, place: all.length - 1 - i }));
  return /* @__PURE__ */ jsxs("span", { className: `inline-flex items-baseline ${fontSize ?? ""} ${className}`, style: { fontVariantNumeric: "tabular-nums", lineHeight: 1.1 }, children: [
    /* @__PURE__ */ jsx("span", { className: "sr-only", children: `${prefix}${formatted}${suffix}` }),
    /* @__PURE__ */ jsxs("span", { "aria-hidden": true, className: "inline-flex items-baseline", children: [
      prefix && /* @__PURE__ */ jsx("span", { children: prefix }),
      /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "popLayout", children: chars.map(({ ch, place }) => /* @__PURE__ */ jsx(
        motion.span,
        {
          layout: m.reduced ? false : "position",
          initial: m.reduced ? false : { opacity: 0, y: "-40%" },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: m.reduced ? 0 : "40%", transition: { duration: 0.12 } },
          transition: m.spring("smooth"),
          className: "inline-block",
          children: /\d/.test(ch) ? /* @__PURE__ */ jsx(Column, { digit: Number(ch) }) : /* @__PURE__ */ jsx("span", { children: ch })
        },
        `p${place}`
      )) }),
      suffix && /* @__PURE__ */ jsx("span", { children: suffix })
    ] })
  ] });
}
var MORPH_SPRING = spring.smooth;
var RAY_SPRING = spring.snappy;
function ModeSwitcher({
  mode: controlledMode,
  onChange,
  irisWipe = false,
  size = 40,
  className = ""
}) {
  const prefersReducedMotion = useReducedMotion();
  const buttonRef = useRef(null);
  const [internalMode, setInternalMode] = useState("light");
  useEffect(() => {
    if (typeof document !== "undefined") {
      const isDark2 = document.documentElement.classList.contains("dark");
      setInternalMode(isDark2 ? "dark" : "light");
    }
  }, []);
  const currentMode = controlledMode ?? internalMode;
  const isDark = currentMode === "dark";
  const toggle = useCallback(() => {
    const next = isDark ? "light" : "dark";
    if (irisWipe && !prefersReducedMotion && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );
      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 9999; pointer-events: none;
        background: ${next === "dark" ? "#0a0a0a" : "#ffffff"};
        clip-path: circle(0px at ${x}px ${y}px);
      `;
      document.body.appendChild(overlay);
      const anim = overlay.animate(
        [
          { clipPath: `circle(0px at ${x}px ${y}px)` },
          { clipPath: `circle(${maxRadius}px at ${x}px ${y}px)` }
        ],
        { duration: 500, easing: "ease-out", fill: "forwards" }
      );
      setTimeout(() => {
        document.documentElement.classList.toggle("dark", next === "dark");
      }, 250);
      anim.onfinish = () => overlay.remove();
    } else {
      document.documentElement.classList.toggle("dark", next === "dark");
    }
    localStorage.setItem("theme", next);
    setInternalMode(next);
    onChange?.(next);
  }, [isDark, irisWipe, prefersReducedMotion, onChange]);
  const center = 12;
  const sunRadius = isDark ? 5 : 4;
  const maskCx = isDark ? 15 : 12;
  const maskCy = isDark ? 7 : 12;
  const maskRadius = isDark ? 4.5 : 0;
  const rays = Array.from({ length: 8 }, (_, i) => {
    const angle = i * 45 * Math.PI / 180;
    const innerR = 6.5;
    const outerR = 9;
    return {
      x1: center + Math.cos(angle) * innerR,
      y1: center + Math.sin(angle) * innerR,
      x2: center + Math.cos(angle) * outerR,
      y2: center + Math.sin(angle) * outerR
    };
  });
  return /* @__PURE__ */ jsx(
    motion.button,
    {
      ref: buttonRef,
      type: "button",
      onClick: toggle,
      className: `inline-flex items-center justify-center rounded-[8px] cursor-pointer
        bg-neutral-100 dark:bg-neutral-800 
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        ${className}`,
      style: { width: size, height: size },
      whileHover: prefersReducedMotion ? void 0 : { scale: 1.05 },
      whileTap: prefersReducedMotion ? void 0 : { scale: 0.92 },
      transition: RAY_SPRING,
      "aria-label": isDark ? "Switch to light mode" : "Switch to dark mode",
      children: /* @__PURE__ */ jsxs(
        motion.svg,
        {
          viewBox: "0 0 24 24",
          fill: "none",
          width: size * 0.5,
          height: size * 0.5,
          animate: { rotate: isDark ? 40 : 0 },
          transition: MORPH_SPRING,
          children: [
            /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("mask", { id: "moon-mask", children: [
              /* @__PURE__ */ jsx("rect", { x: "0", y: "0", width: "24", height: "24", fill: "white" }),
              /* @__PURE__ */ jsx(
                motion.circle,
                {
                  animate: { cx: maskCx, cy: maskCy, r: maskRadius },
                  transition: MORPH_SPRING,
                  fill: "black"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx(
              motion.circle,
              {
                cx: center,
                cy: center,
                fill: "currentColor",
                mask: "url(#moon-mask)",
                animate: { r: sunRadius },
                transition: MORPH_SPRING,
                className: "text-neutral-800 dark:text-neutral-100"
              }
            ),
            /* @__PURE__ */ jsx("g", { className: "text-neutral-800 dark:text-neutral-100", children: rays.map((ray, i) => /* @__PURE__ */ jsx(
              motion.line,
              {
                x1: ray.x1,
                y1: ray.y1,
                x2: ray.x2,
                y2: ray.y2,
                stroke: "currentColor",
                strokeWidth: 1.5,
                strokeLinecap: "round",
                animate: {
                  // WHY scale via coordinates instead of CSS scale: Per-line
                  // coordinate animation lets each ray retract to center
                  // independently. CSS scale would shrink the whole group.
                  x1: isDark ? center : ray.x1,
                  y1: isDark ? center : ray.y1,
                  x2: isDark ? center : ray.x2,
                  y2: isDark ? center : ray.y2,
                  opacity: isDark ? 0 : 1
                },
                transition: {
                  ...RAY_SPRING,
                  // WHY staggered delay: Rays retracting one by one looks like
                  // the sun "closing" rather than just disappearing. 20ms stagger
                  // is fast enough to feel unified, slow enough to see the wave.
                  delay: i * 0.02
                }
              },
              i
            )) })
          ]
        }
      )
    }
  );
}
var LINE_SPRING = spring.snappy;
function MorphingHamburger({
  open: controlledOpen,
  onToggle,
  size = 40,
  className = ""
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isOpen = controlledOpen ?? internalOpen;
  const toggle = useCallback(() => {
    const next = !isOpen;
    setInternalOpen(next);
    onToggle?.(next);
  }, [isOpen, onToggle]);
  const strokeWidth = 2;
  const topY = 7;
  const midY = 12;
  const botY = 17;
  return /* @__PURE__ */ jsx(
    motion.button,
    {
      type: "button",
      onClick: toggle,
      className: `inline-flex items-center justify-center rounded-[8px] cursor-pointer
        bg-neutral-100 dark:bg-neutral-800 
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        ${className}`,
      style: { width: size, height: size },
      whileHover: prefersReducedMotion ? void 0 : { scale: 1.05 },
      whileTap: prefersReducedMotion ? void 0 : { scale: 0.92 },
      transition: LINE_SPRING,
      "aria-label": isOpen ? "Close menu" : "Open menu",
      "aria-expanded": isOpen,
      children: /* @__PURE__ */ jsxs(
        motion.svg,
        {
          viewBox: "0 0 24 24",
          width: size * 0.5,
          height: size * 0.5,
          animate: { rotate: isOpen ? 90 : 0 },
          transition: LINE_SPRING,
          children: [
            /* @__PURE__ */ jsx(
              motion.line,
              {
                x1: 5,
                x2: 19,
                stroke: "currentColor",
                strokeWidth,
                strokeLinecap: "round",
                className: "text-neutral-800 dark:text-neutral-100",
                animate: {
                  y1: isOpen ? midY : topY,
                  y2: isOpen ? midY : topY,
                  rotate: isOpen ? 45 : 0
                },
                style: { transformOrigin: "center" },
                transition: LINE_SPRING
              }
            ),
            /* @__PURE__ */ jsx(
              motion.line,
              {
                x1: 5,
                x2: 19,
                y1: midY,
                y2: midY,
                stroke: "currentColor",
                strokeWidth,
                strokeLinecap: "round",
                className: "text-neutral-800 dark:text-neutral-100",
                animate: {
                  opacity: isOpen ? 0 : 1,
                  scaleX: isOpen ? 0 : 1
                },
                style: { transformOrigin: "center" },
                transition: LINE_SPRING
              }
            ),
            /* @__PURE__ */ jsx(
              motion.line,
              {
                x1: 5,
                x2: 19,
                stroke: "currentColor",
                strokeWidth,
                strokeLinecap: "round",
                className: "text-neutral-800 dark:text-neutral-100",
                animate: {
                  y1: isOpen ? midY : botY,
                  y2: isOpen ? midY : botY,
                  rotate: isOpen ? -45 : 0
                },
                style: { transformOrigin: "center" },
                transition: LINE_SPRING
              }
            )
          ]
        }
      )
    }
  );
}
var CHAR_SPRING = spring.snappy;
function Typewriter({
  text,
  speed = 50,
  delay = 0,
  cursor = true,
  persistCursor = true,
  onComplete,
  loop,
  loopPause = 2e3,
  className = ""
}) {
  const prefersReducedMotion = useReducedMotion();
  const [displayedCount, setDisplayedCount] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [phase, setPhase] = useState("idle");
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef(void 0);
  const texts = loop && loop.length > 0 ? loop : [text];
  const currentText = texts[currentTextIndex];
  useEffect(() => {
    if (!loop) {
      setDisplayedCount(0);
      setIsComplete(false);
      setPhase("idle");
    }
  }, [text, loop]);
  useEffect(() => {
    clearTimeout(timerRef.current);
    if (prefersReducedMotion) {
      setDisplayedCount(currentText.length);
      setIsComplete(true);
      onComplete?.();
      return;
    }
    if (phase === "idle") {
      timerRef.current = setTimeout(() => setPhase("typing"), delay || 0);
      return () => clearTimeout(timerRef.current);
    }
    if (phase === "typing") {
      if (displayedCount >= currentText.length) {
        if (loop) {
          setPhase("pausing");
        } else {
          setIsComplete(true);
          onComplete?.();
        }
        return;
      }
      const jitter = speed * (0.7 + Math.random() * 0.6);
      timerRef.current = setTimeout(() => {
        setDisplayedCount((c) => c + 1);
      }, jitter);
      return () => clearTimeout(timerRef.current);
    }
    if (phase === "pausing") {
      timerRef.current = setTimeout(() => setPhase("deleting"), loopPause);
      return () => clearTimeout(timerRef.current);
    }
    if (phase === "deleting") {
      if (displayedCount <= 0) {
        setCurrentTextIndex((i) => (i + 1) % texts.length);
        setPhase("typing");
        return;
      }
      timerRef.current = setTimeout(() => {
        setDisplayedCount((c) => c - 1);
      }, speed * 0.4);
      return () => clearTimeout(timerRef.current);
    }
  }, [phase, displayedCount, currentText, currentTextIndex, delay, loop, loopPause, speed, texts.length, onComplete, prefersReducedMotion]);
  const showCursor = cursor && (!isComplete || persistCursor || !!loop);
  return /* @__PURE__ */ jsxs("span", { className: `inline ${className}`, "aria-label": currentText, role: "status", children: [
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: currentText.slice(0, displayedCount).split("").map((char, i) => /* @__PURE__ */ jsx(
      motion.span,
      {
        initial: prefersReducedMotion ? false : { opacity: 0, y: 4 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -2 },
        transition: CHAR_SPRING,
        style: { display: "inline-block", whiteSpace: "pre" },
        children: char
      },
      `${currentTextIndex}-${i}-${char}`
    )) }),
    showCursor && /* @__PURE__ */ jsx(
      "span",
      {
        className: "inline-block w-[2px] h-[1em] bg-current ml-[1px] align-text-bottom animate-pulse",
        "aria-hidden": true
      }
    )
  ] });
}
function DockIcon({
  item,
  pointerX,
  base,
  max,
  range,
  reduced
}) {
  const ref = useRef(null);
  const focused = useMotionValue(0);
  const target = useTransform([pointerX, focused], ([x, f]) => {
    if (reduced) return base;
    if (f) return max;
    const el = ref.current;
    if (!el || !Number.isFinite(x)) return base;
    const r = el.getBoundingClientRect();
    const d = Math.abs(x - (r.left + r.width / 2));
    if (d >= range) return base;
    const t = (Math.cos(d / range * Math.PI) + 1) / 2;
    return base + (max - base) * t;
  });
  const width = useSpring(target, springValue.bouncy);
  const iconScale = useTransform(width, [base, max], [1, 1.18]);
  return /* @__PURE__ */ jsxs(
    motion.button,
    {
      ref,
      type: "button",
      onClick: item.onClick,
      onFocus: (e) => e.currentTarget.matches(":focus-visible") && focused.set(1),
      onBlur: () => focused.set(0),
      "aria-label": item.label,
      style: { width, height: width },
      className: "group relative flex shrink-0 items-center justify-center self-end rounded-[12px] border border-neutral-200 bg-neutral-100 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800",
      whileTap: reduced ? void 0 : { scale: 0.92 },
      children: [
        /* @__PURE__ */ jsx(motion.span, { className: "pointer-events-none text-xl leading-none", style: { scale: iconScale }, children: item.icon }),
        /* @__PURE__ */ jsx(
          "span",
          {
            role: "tooltip",
            className: "pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-[6px] bg-neutral-900 px-2 py-1 text-xs text-white opacity-0 transition duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 dark:bg-neutral-100 dark:text-neutral-900",
            children: item.label
          }
        )
      ]
    }
  );
}
function MagneticDock({ items, maxScale = 1.6, magneticRange = 110, size = 44, className = "" }) {
  const m = useMotionPrefs();
  const pointerX = useMotionValue(Number.POSITIVE_INFINITY);
  const max = size * maxScale;
  return /* @__PURE__ */ jsx(
    "nav",
    {
      "aria-label": "Dock",
      onPointerMove: (e) => e.pointerType === "mouse" && pointerX.set(e.clientX),
      onPointerLeave: () => pointerX.set(Number.POSITIVE_INFINITY),
      className: `inline-flex items-end gap-2 rounded-[18px] border border-neutral-200 bg-white/80 px-2.5 pb-2.5 pt-2.5 shadow-lg backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/80 ${className}`,
      style: { height: max + 20 },
      children: items.map((item) => /* @__PURE__ */ jsx(DockIcon, { item, pointerX, base: size, max, range: magneticRange, reduced: m.reduced }, item.id))
    }
  );
}
var containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
      when: "afterChildren"
    }
  }
};
var itemVariantsSlideUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: spring.smooth
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(4px)",
    transition: spring.snappy
  }
};
var itemVariantsFade = {
  hidden: { opacity: 0, filter: "blur(4px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: spring.smooth
  },
  exit: {
    opacity: 0,
    filter: "blur(4px)",
    transition: { duration: 0.15 }
  }
};
var itemVariantsSlideLeft = {
  hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: spring.bouncy
  },
  exit: {
    opacity: 0,
    x: 20,
    filter: "blur(4px)",
    transition: spring.bouncy
  }
};
var variantMap = {
  "slide-up": itemVariantsSlideUp,
  "fade-blur": itemVariantsFade,
  "slide-left": itemVariantsSlideLeft
};
function StaggeredList({
  items,
  variant = "slide-up",
  itemClassName = "",
  className = ""
}) {
  const prefersReducedMotion = useReducedMotion();
  const itemVariants2 = variantMap[variant];
  if (prefersReducedMotion) {
    return /* @__PURE__ */ jsx("div", { className, children: items.map((item) => /* @__PURE__ */ jsx("div", { className: itemClassName, children: item.content }, item.id)) });
  }
  return /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: /* @__PURE__ */ jsx(
    motion.div,
    {
      className,
      variants: containerVariants,
      initial: "hidden",
      animate: "show",
      exit: "exit",
      children: items.map((item) => /* @__PURE__ */ jsx(
        motion.div,
        {
          variants: itemVariants2,
          layout: true,
          className: itemClassName,
          children: item.content
        },
        item.id
      ))
    },
    items.map((i) => i.id).join(",")
  ) });
}
function ParallaxTiltCard({
  children,
  className = "",
  maxTilt = 15,
  springConfig: springConfig5 = { stiffness: 300, damping: 20 },
  glare = true
}) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [maxTilt, -maxTilt]),
    springConfig5
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-maxTilt, maxTilt]),
    springConfig5
  );
  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);
  const handleMove = (e) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`
  );
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref,
      onMouseMove: handleMove,
      onMouseLeave: handleLeave,
      style: {
        rotateX: prefersReduced ? 0 : rotateX,
        rotateY: prefersReduced ? 0 : rotateY,
        transformPerspective: 800,
        transformStyle: "preserve-3d"
      },
      className: `relative rounded-[8px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden ${className}`,
      children: [
        children,
        glare && !prefersReduced && /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "pointer-events-none absolute inset-0 rounded-[8px]",
            style: {
              background: glareBackground
            }
          }
        )
      ]
    }
  );
}
function ParallaxLayer({
  children,
  depth = 1,
  className = ""
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className,
      style: { transform: `translateZ(${depth * 30}px)`, transformStyle: "preserve-3d" },
      children
    }
  );
}
var hiddenVariants = {
  "fade-up": { opacity: 0, y: 60, filter: "blur(4px)" },
  "fade-down": { opacity: 0, y: -60, filter: "blur(4px)" },
  "fade-left": { opacity: 0, x: -60, filter: "blur(4px)" },
  "fade-right": { opacity: 0, x: 60, filter: "blur(4px)" },
  scale: { opacity: 0, scale: 0.7, filter: "blur(6px)" },
  blur: { opacity: 0, filter: "blur(20px)" }
};
var visibleVariant = {
  opacity: 1,
  y: 0,
  x: 0,
  scale: 1,
  filter: "blur(0px)"
};
function ScrollReveal({
  children,
  variant = "fade-up",
  className = "",
  delay = 0,
  margin = "-80px",
  once = true,
  stiffness = 260,
  damping = 20
}) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) {
    return /* @__PURE__ */ jsx("div", { className, children });
  }
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className,
      initial: hiddenVariants[variant],
      whileInView: visibleVariant,
      viewport: { once, margin },
      transition: {
        type: "spring",
        stiffness,
        damping,
        delay
      },
      children
    }
  );
}
function Marquee({
  children,
  className = "",
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  gap = 24
}) {
  const prefersReduced = useReducedMotion();
  const directionMultiplier = direction === "left" ? -1 : 1;
  if (prefersReduced) {
    return /* @__PURE__ */ jsx("div", { className: `flex overflow-hidden ${className}`, style: { gap }, children });
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `group flex overflow-hidden ${className}`,
      style: { maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" },
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "flex shrink-0",
          style: { gap },
          animate: { x: [`${directionMultiplier === -1 ? "0%" : "-50%"}`, `${directionMultiplier === -1 ? "-50%" : "0%"}`] },
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 1e3 / speed * 20,
              ease: "linear"
            }
          },
          whileHover: pauseOnHover ? { x: void 0 } : void 0,
          children: [
            children,
            children
          ]
        }
      )
    }
  );
}
function MarqueeItem({
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsx("div", { className: `shrink-0 ${className}`, children });
}
var rippleId = 0;
function RippleButton({
  children,
  className = "",
  rippleColor = "rgba(255,255,255,0.35)",
  onClick,
  disabled = false
}) {
  const [ripples, setRipples] = useState([]);
  const prefersReduced = useReducedMotion();
  const handleClick = useCallback(
    (e) => {
      if (disabled) return;
      onClick?.(e);
      if (prefersReduced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2.5;
      const newRipple = { id: ++rippleId, x, y, size };
      setRipples((prev) => [...prev, newRipple]);
    },
    [disabled, onClick, prefersReduced]
  );
  return /* @__PURE__ */ jsxs(
    motion.button,
    {
      onClick: handleClick,
      disabled,
      className: `relative overflow-hidden rounded-[8px] bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`,
      whileTap: !disabled && !prefersReduced ? { scale: 0.95 } : {},
      transition: spring.bouncy,
      children: [
        /* @__PURE__ */ jsx("span", { className: "relative z-10", children }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: ripples.map((ripple) => /* @__PURE__ */ jsx(
          motion.span,
          {
            className: "absolute rounded-full pointer-events-none",
            style: {
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: rippleColor
            },
            initial: { scale: 0, opacity: 0.6 },
            animate: { scale: 1, opacity: 0 },
            onAnimationComplete: () => setRipples((prev) => prev.filter((r) => r.id !== ripple.id)),
            exit: { opacity: 0 },
            transition: {
              scale: spring.bouncy,
              opacity: { duration: 0.5, ease: "easeOut" }
            }
          },
          ripple.id
        )) })
      ]
    }
  );
}
function GradientBorder({
  children,
  className = "",
  borderWidth = 2,
  duration = 3,
  colors = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#6366f1"]
}) {
  const prefersReduced = useReducedMotion();
  const gradientStops = colors.map((c, i) => `${c} ${i / (colors.length - 1) * 100}%`).join(", ");
  return /* @__PURE__ */ jsxs("div", { className: `relative ${className}`, children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute inset-0 rounded-[8px] blur-md opacity-40",
        style: {
          background: `conic-gradient(from 0deg, ${gradientStops})`
        },
        animate: prefersReduced ? {} : { rotate: 360 },
        transition: prefersReduced ? {} : {
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"
        },
        "aria-hidden": true
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-[8px]", style: { padding: borderWidth }, children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "absolute",
          style: {
            inset: "-50%",
            width: "200%",
            height: "200%",
            background: `conic-gradient(from 0deg, ${gradientStops})`
          },
          animate: prefersReduced ? {} : { rotate: 360 },
          transition: prefersReduced ? {} : {
            duration,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          },
          "aria-hidden": true
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "relative rounded-[6px] bg-neutral-950 h-full", children })
    ] })
  ] });
}
function Spotlight({
  children,
  className = "",
  duration = 2.5,
  delay = 4,
  color = "rgba(255,255,255,0.15)",
  beamWidth = 30
}) {
  const prefersReduced = useReducedMotion();
  return /* @__PURE__ */ jsxs("div", { className: `relative overflow-hidden ${className}`, children: [
    children,
    !prefersReduced && /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute inset-0 pointer-events-none",
        style: {
          background: `linear-gradient(105deg, transparent 0%, transparent ${50 - beamWidth / 2}%, ${color} 50%, transparent ${50 + beamWidth / 2}%, transparent 100%)`,
          backgroundSize: "200% 100%"
        },
        animate: {
          backgroundPosition: ["200% 0%", "-200% 0%"]
        },
        transition: {
          duration,
          delay,
          repeat: Infinity,
          repeatDelay: delay,
          type: "spring",
          stiffness: 30,
          damping: 15
        }
      }
    )
  ] });
}
function TextShimmer({
  children,
  duration = 2.5,
  className = ""
}) {
  const reduced = useReducedMotion();
  if (reduced) return /* @__PURE__ */ jsx("span", { className: `text-neutral-600 dark:text-neutral-300 ${className}`, children });
  return /* @__PURE__ */ jsx(
    motion.span,
    {
      className: `inline-block bg-clip-text text-transparent bg-[length:200%_100%] bg-gradient-to-r from-neutral-400 via-neutral-900 to-neutral-400 dark:from-neutral-600 dark:via-neutral-100 dark:to-neutral-600 ${className}`,
      animate: { backgroundPosition: ["200% center", "-200% center"] },
      transition: { duration, repeat: Infinity, ease: "linear" },
      children
    }
  );
}
var SPRING2 = springValue.wobbly;
function WobbleCard({ children, className = "" }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, SPRING2);
  const springY = useSpring(rotateY, SPRING2);
  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 20);
    rotateY.set(x * 20);
  };
  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: `rounded-[8px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden ${className}`,
      style: { rotateX: springX, rotateY: springY, transformPerspective: 600 },
      onMouseMove: handleMouse,
      onMouseLeave: handleLeave,
      children
    }
  );
}
var TAB_SPRING = spring.smooth;
function AnimatedTabs({ items, defaultId, className = "" }) {
  const [activeId, setActiveId] = useState(defaultId || items[0]?.id);
  const active = items.find((i) => i.id === activeId) || items[0];
  const containerRef = useRef(null);
  const tabRefs = useRef(/* @__PURE__ */ new Map());
  const [blobStyle, setBlobStyle] = useState(null);
  const isResizing = useRef(false);
  const resizeTimer = useRef(void 0);
  const measureBlob = useCallback(() => {
    const container = containerRef.current;
    const activeTab = tabRefs.current.get(activeId);
    if (!container || !activeTab) return;
    const containerRect = container.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();
    setBlobStyle({
      left: tabRect.left - containerRect.left,
      width: tabRect.width
    });
  }, [activeId]);
  useEffect(() => {
    measureBlob();
  }, [measureBlob]);
  useEffect(() => {
    const onResize = () => {
      isResizing.current = true;
      measureBlob();
      clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(() => {
        isResizing.current = false;
      }, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer.current);
    };
  }, [measureBlob]);
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsxs("div", { ref: containerRef, className: "relative flex gap-1 p-1 rounded-[8px] bg-neutral-100 dark:bg-neutral-800/60", children: [
      blobStyle && /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "absolute top-1 bottom-1 rounded-[6px] bg-white dark:bg-neutral-700 shadow-sm",
          initial: false,
          animate: { x: blobStyle.left, width: blobStyle.width },
          transition: isResizing.current ? { duration: 0 } : TAB_SPRING,
          style: { zIndex: 0, left: 0 }
        }
      ),
      items.map((item) => /* @__PURE__ */ jsx(
        "button",
        {
          ref: (el) => {
            if (el) tabRefs.current.set(item.id, el);
          },
          onClick: () => setActiveId(item.id),
          className: "relative z-10 flex-1 px-3 py-1.5 text-sm font-medium rounded-[6px] transition-colors",
          children: item.label
        },
        item.id
      ))
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: spring.snappy,
        className: "mt-3",
        children: active.content
      },
      active.id
    ) })
  ] });
}
function match(query, text) {
  const q = query.trim().toLowerCase();
  if (!q) return { score: 0, hits: [] };
  const t = text.toLowerCase();
  const at = t.indexOf(q);
  if (at === 0) return { score: 300 - t.length, hits: [...Array(q.length)].map((_, i) => i) };
  if (at > 0) {
    const wordStart = /\s|-|_|\//.test(t[at - 1]);
    return { score: (wordStart ? 200 : 100) - at, hits: [...Array(q.length)].map((_, i) => at + i) };
  }
  const hits = [];
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      hits.push(ti);
      qi++;
    }
  }
  if (qi < q.length) return null;
  const spread = hits[hits.length - 1] - hits[0];
  return { score: 50 - spread, hits };
}
function Highlight({ text, hits }) {
  if (!hits.length) return /* @__PURE__ */ jsx(Fragment, { children: text });
  const set = new Set(hits);
  return /* @__PURE__ */ jsx(Fragment, { children: text.split("").map(
    (ch, i) => set.has(i) ? /* @__PURE__ */ jsx("span", { className: "font-semibold text-neutral-950 dark:text-white", children: ch }, i) : /* @__PURE__ */ jsx(React9.Fragment, { children: ch }, i)
  ) });
}
function CommandPalette({
  items,
  open,
  onClose,
  placeholder = "Type a command\u2026",
  query: externalQuery,
  onQueryChange,
  emptyText = "No matching commands."
}) {
  const mounted = useMounted();
  const m = useMotionPrefs();
  const uid = useId();
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [internalQuery, setInternalQuery] = useState("");
  const [active, setActive] = useState(0);
  const [openedAt, setOpenedAt] = useState(0);
  const query = externalQuery ?? internalQuery;
  const setQuery = (q) => {
    if (externalQuery === void 0) setInternalQuery(q);
    onQueryChange?.(q);
    setActive(0);
  };
  useFocusTrap(panelRef, open, inputRef);
  useScrollLock(open);
  useEscape(open, onClose);
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      if (externalQuery === void 0) setInternalQuery("");
      setActive(0);
      setOpenedAt((n) => n + 1);
    }
  }
  const results = useMemo(() => {
    return items.map((item) => {
      const best = [item.label, ...item.keywords ?? []].map((text, i) => {
        const r = match(query, text);
        return r ? { ...r, onLabel: i === 0 } : null;
      }).filter(Boolean).sort((a, b) => b.score - a.score)[0];
      return best ? { item, score: best.score, hits: best.onLabel ? best.hits : [] } : null;
    }).filter((r) => r !== null).sort((a, b) => b.score - a.score);
  }, [items, query]);
  const activeIndex = Math.min(active, Math.max(0, results.length - 1));
  const activeId = results[activeIndex] ? `${uid}-opt-${results[activeIndex].item.id}` : void 0;
  useEffect(() => {
    if (!activeId) return;
    document.getElementById(activeId)?.scrollIntoView({ block: "nearest" });
  }, [activeId]);
  const run = (item) => {
    onClose();
    requestAnimationFrame(() => item.onSelect());
  };
  const onKeyDown = (e) => {
    if (e.nativeEvent.isComposing || results.length === 0) return;
    const last = results.length - 1;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive(activeIndex >= last ? 0 : activeIndex + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(activeIndex <= 0 ? last : activeIndex - 1);
    } else if (e.key === "Home" && e.ctrlKey) {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End" && e.ctrlKey) {
      e.preventDefault();
      setActive(last);
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[activeIndex].item);
    }
  };
  if (!mounted) return null;
  return createPortal(
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[9999] flex items-start justify-center px-4 pt-[14vh]", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          "aria-hidden": true,
          className: "absolute inset-0 bg-black/50 backdrop-blur-md",
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: fade.in },
          exit: { opacity: 0, transition: fade.out },
          onClick: onClose
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          ref: panelRef,
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "Command palette",
          className: "relative w-full max-w-md overflow-hidden rounded-[10px] border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900",
          initial: m.reduced ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 },
          animate: { opacity: 1, y: 0, scale: 1, transition: m.spring("smooth") },
          exit: m.reduced ? { opacity: 0, transition: m.exit("quick") } : { opacity: 0, y: -6, scale: 0.98, transition: m.exit("quick") },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800", children: [
              /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", className: "shrink-0 text-neutral-400", "aria-hidden": true, children: [
                /* @__PURE__ */ jsx("circle", { cx: "7", cy: "7", r: "4.5", stroke: "currentColor", strokeWidth: "1.5" }),
                /* @__PURE__ */ jsx("path", { d: "M10.5 10.5L14 14", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  ref: inputRef,
                  value: query,
                  onChange: (e) => setQuery(e.target.value),
                  onKeyDown,
                  placeholder,
                  role: "combobox",
                  "aria-expanded": "true",
                  "aria-controls": `${uid}-list`,
                  "aria-activedescendant": activeId,
                  "aria-autocomplete": "list",
                  autoComplete: "off",
                  spellCheck: false,
                  className: "flex-1 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-neutral-100"
                }
              ),
              /* @__PURE__ */ jsx("kbd", { className: "hidden rounded border border-neutral-200 px-1.5 py-0.5 text-[11px] text-neutral-400 sm:block dark:border-neutral-700", children: "esc" })
            ] }),
            /* @__PURE__ */ jsxs("div", { ref: listRef, id: `${uid}-list`, role: "listbox", "aria-label": "Commands", className: "max-h-72 overflow-y-auto overscroll-contain p-1.5", children: [
              results.length === 0 && /* @__PURE__ */ jsx("p", { className: "px-3 py-6 text-center text-sm text-neutral-400", role: "status", children: emptyText }),
              results.map(({ item, hits }, i) => {
                const isActive = i === activeIndex;
                return /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    id: `${uid}-opt-${item.id}`,
                    role: "option",
                    "aria-selected": isActive,
                    onPointerMove: () => !isActive && setActive(i),
                    onClick: () => run(item),
                    className: `relative flex cursor-pointer items-center gap-3 rounded-[6px] px-3 py-2 text-sm ${isActive ? "text-neutral-900 dark:text-white" : "text-neutral-600 dark:text-neutral-300"}`,
                    initial: m.reduced || query ? false : { opacity: 0, y: 4 },
                    animate: { opacity: 1, y: 0 },
                    transition: { ...m.spring("smooth"), delay: query ? 0 : Math.min(i, 8) * stagger.tight },
                    children: [
                      isActive && /* @__PURE__ */ jsx(
                        motion.div,
                        {
                          layoutId: `${uid}-highlight`,
                          className: "absolute inset-0 rounded-[6px] bg-neutral-100 dark:bg-neutral-800",
                          transition: m.spring("snappy")
                        }
                      ),
                      item.icon && /* @__PURE__ */ jsx("span", { className: "relative grid w-5 place-items-center text-base", children: item.icon }),
                      /* @__PURE__ */ jsx("span", { className: "relative flex-1 truncate", children: /* @__PURE__ */ jsx(Highlight, { text: item.label, hits }) }),
                      item.shortcut && /* @__PURE__ */ jsx("kbd", { className: "relative rounded border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-[11px] text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-400", children: item.shortcut })
                    ]
                  },
                  `${openedAt}-${item.id}`
                );
              })
            ] })
          ]
        }
      )
    ] }) }),
    document.body
  );
}
var RADIUS = 10;
function ExpandableCard({ preview, detail, className = "", id, label }) {
  const mounted = useMounted();
  const m = useMotionPrefs();
  const uid = useId();
  const layoutId = `expandable-${id ?? uid}`;
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const morph = m.reduced ? { duration: 0 } : m.spring("smooth");
  useFocusTrap(dialogRef, open);
  useScrollLock(open);
  useEscape(open, () => setOpen(false));
  const card = "border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 overflow-hidden";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: `relative ${className}`, children: /* @__PURE__ */ jsx(
      motion.div,
      {
        layoutId,
        role: "button",
        tabIndex: open ? -1 : 0,
        "aria-expanded": open,
        "aria-haspopup": "dialog",
        onClick: () => setOpen(true),
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        },
        style: { borderRadius: RADIUS, visibility: open ? "hidden" : "visible" },
        transition: morph,
        whileHover: m.reduced || open ? void 0 : { y: -2 },
        className: `${card} cursor-pointer shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`,
        children: /* @__PURE__ */ jsx(motion.div, { layout: "position", className: "p-5", children: preview })
      }
    ) }),
    mounted && createPortal(
      /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            "aria-hidden": true,
            className: "absolute inset-0 bg-black/40 backdrop-blur-sm",
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: fade.in },
            exit: { opacity: 0, transition: fade.out },
            onClick: () => setOpen(false)
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            ref: dialogRef,
            layoutId,
            role: "dialog",
            "aria-modal": "true",
            "aria-label": label,
            tabIndex: -1,
            style: { borderRadius: RADIUS },
            transition: morph,
            className: `${card} relative w-full max-w-lg shadow-2xl outline-none`,
            children: [
              /* @__PURE__ */ jsx(motion.div, { layout: "position", className: "p-5 pr-12", children: preview }),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: "px-5 pb-5",
                  initial: { opacity: 0, y: m.reduced ? 0 : 6 },
                  animate: { opacity: 1, y: 0, transition: { ...m.spring("smooth"), delay: m.reduced ? 0 : 0.12 } },
                  exit: { opacity: 0, transition: { duration: 0.08 } },
                  children: detail
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setOpen(false),
                  "aria-label": "Close",
                  className: "absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-[6px] text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
                  children: /* @__PURE__ */ jsx("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", "aria-hidden": true, children: /* @__PURE__ */ jsx("path", { d: "M3 3l8 8M11 3l-8 8", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" }) })
                }
              )
            ]
          }
        )
      ] }) }),
      document.body
    )
  ] });
}
function TrailDot({ x, y, size, color, index, total }) {
  const config = { stiffness: Math.max(60, 220 - index * 18), damping: 22, mass: 0.25 };
  const sx = useSpring(x, config);
  const sy = useSpring(y, config);
  const s = size * (1 - index / total * 0.6);
  const fill = color === "currentColor" ? `hsl(${index / total * 360}, 85%, 60%)` : color;
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      "aria-hidden": true,
      className: "pointer-events-none fixed left-0 top-0 z-50 rounded-full",
      style: {
        x: sx,
        y: sy,
        width: s,
        height: s,
        marginLeft: -s / 2,
        marginTop: -s / 2,
        opacity: 1 - index / total * 0.8,
        backgroundColor: fill
      }
    }
  );
}
function CursorTrail({ count = 8, size = 8, color = "currentColor", className = "" }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  useEffect(() => {
    if (reduced) return;
    const move = (e) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduced, x, y]);
  if (reduced) return null;
  return /* @__PURE__ */ jsx("div", { className, children: Array.from({ length: count }, (_, i) => /* @__PURE__ */ jsx(TrailDot, { x, y, size, color, index: i, total: count }, i)) });
}
function SwipeCards({ cards: initial, className = "", onSwipe, threshold = 110, labels = { left: "Nope", right: "Like" } }) {
  const m = useMotionPrefs();
  const [cards, setCards] = useState(initial);
  const [exitDir, setExitDir] = useState({ dir: 1, velocity: 0 });
  const [source, setSource] = useState(initial);
  if (source !== initial) {
    setSource(initial);
    setCards(initial);
  }
  const decide = (direction, velocity = 0) => {
    const top = cards[0];
    if (!top) return;
    setExitDir({ dir: direction === "right" ? 1 : -1, velocity });
    setCards((prev) => prev.slice(1));
    onSwipe?.(top.id, direction);
  };
  const visible = cards.slice(0, 3);
  return /* @__PURE__ */ jsxs("div", { className: `flex flex-col items-center gap-5 ${className}`, children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        role: "group",
        "aria-roledescription": "card stack",
        "aria-label": `${cards.length} cards left`,
        tabIndex: 0,
        onKeyDown: (e) => {
          if (e.key === "ArrowLeft") decide("left");
          if (e.key === "ArrowRight") decide("right");
        },
        className: "relative h-[300px] w-full max-w-sm rounded-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4",
        children: [
          /* @__PURE__ */ jsx(AnimatePresence, { custom: exitDir, children: visible.map((card, i) => /* @__PURE__ */ jsx(
            SwipeCard,
            {
              card,
              depth: i,
              threshold,
              reduced: m.reduced,
              labels,
              onDecide: decide
            },
            card.id
          )).reverse() }),
          cards.length === 0 && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid place-items-center rounded-[12px] border border-dashed border-neutral-300 text-sm text-neutral-400 dark:border-neutral-700", children: "That\u2019s the whole deck." })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: ["left", "right"].map((d) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        disabled: cards.length === 0,
        onClick: () => decide(d),
        className: "rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-40 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800",
        children: d === "left" ? `\u2190 ${labels.left}` : `${labels.right} \u2192`
      },
      d
    )) })
  ] });
}
function SwipeCard({
  card,
  depth,
  threshold,
  reduced,
  labels,
  onDecide
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-240, 0, 240], [-14, 0, 14]);
  const rightLabel = useTransform(x, [20, threshold], [0, 1]);
  const leftLabel = useTransform(x, [-threshold, -20], [1, 0]);
  const isTop = depth === 0;
  const onDragEnd = (_, info) => {
    const { offset, velocity } = info;
    if (Math.abs(offset.x) > threshold || Math.abs(velocity.x) > 600) {
      onDecide((offset.x || velocity.x) > 0 ? "right" : "left", velocity.x);
    } else {
      animate(x, 0, spring.snappy);
    }
  };
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "absolute inset-0",
      style: { x, rotate, transformOrigin: "50% 120%", zIndex: 10 - depth, touchAction: "pan-y" },
      initial: reduced ? { opacity: 0 } : { scale: 0.9, y: 24, opacity: 0 },
      animate: { scale: 1 - depth * 0.05, y: depth * 10, opacity: depth > 2 ? 0 : 1, transition: spring.smooth },
      exit: reduced ? { opacity: 0, transition: { duration: 0.12 } } : "thrown",
      variants: {
        thrown: (c) => ({
          x: c.dir * 520,
          rotate: c.dir * 22,
          opacity: 0,
          transition: { x: { ...spring.smooth, velocity: c.velocity }, rotate: spring.smooth, opacity: { duration: 0.25, delay: 0.05 } }
        })
      },
      drag: isTop && !reduced ? "x" : false,
      dragSnapToOrigin: false,
      dragMomentum: false,
      onDragEnd: isTop ? onDragEnd : void 0,
      "aria-hidden": !isTop,
      children: /* @__PURE__ */ jsxs("div", { className: `relative h-full select-none overflow-hidden rounded-[12px] border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 ${isTop && !reduced ? "cursor-grab active:cursor-grabbing" : ""}`, children: [
        card.content,
        isTop && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(motion.span, { style: { opacity: rightLabel }, className: "pointer-events-none absolute left-5 top-5 -rotate-12 rounded-[6px] border-2 border-green-500 px-2 py-0.5 text-sm font-bold uppercase tracking-wide text-green-600", children: labels.right }),
          /* @__PURE__ */ jsx(motion.span, { style: { opacity: leftLabel }, className: "pointer-events-none absolute right-5 top-5 rotate-12 rounded-[6px] border-2 border-red-500 px-2 py-0.5 text-sm font-bold uppercase tracking-wide text-red-600", children: labels.left })
        ] })
      ] })
    }
  );
}
function LiquidButton({
  children,
  className = "",
  onClick,
  color = "#3b82f6"
}) {
  const ref = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const isHovered = useMotionValue(0);
  const filterId = useId();
  const hoverSpring = useSpring(isHovered, { stiffness: 300, damping: 20 });
  const xSpring = useSpring(mouseX, { stiffness: 200, damping: 15 });
  const ySpring = useSpring(mouseY, { stiffness: 200, damping: 15 });
  const blobPath = useTransform(
    [xSpring, ySpring, hoverSpring],
    ([x, y, h]) => {
      const stretch = h * 8;
      const dx = (x - 0.5) * stretch * 0.5;
      const dy = (y - 0.5) * stretch * 0.5;
      const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
      const x1 = clamp(50 + dx, 10, 90);
      const y1 = clamp(15 + dy, 5, 25);
      const x2 = clamp(85 + stretch * 0.3, 70, 95);
      const y2 = clamp(50, 25, 75);
      const x3 = clamp(50 + dx, 10, 90);
      const y3 = clamp(85 - dy, 75, 95);
      const x4 = clamp(15 - stretch * 0.3, 5, 30);
      const y4 = clamp(50, 25, 75);
      return `M ${x1},${y1} C ${x2},${y1} ${x2},${y2} ${x2},${y2} C ${x2},${y3} ${x3},${y3} ${x3},${y3} C ${x4},${y3} ${x4},${y4} ${x4},${y4} C ${x4},${y1} ${x1},${y1} ${x1},${y1} Z`;
    }
  );
  const handleMouseMove = useCallback(
    (e) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ref,
      onClick,
      onMouseEnter: () => isHovered.set(1),
      onMouseLeave: () => {
        isHovered.set(0);
        mouseX.set(0.5);
        mouseY.set(0.5);
      },
      onMouseMove: handleMouseMove,
      className: `relative inline-flex items-center justify-center px-6 py-3 cursor-pointer border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors ${className}`,
      children: [
        /* @__PURE__ */ jsxs(
          "svg",
          {
            className: "absolute inset-0 w-full h-full pointer-events-none",
            viewBox: "0 0 100 100",
            preserveAspectRatio: "none",
            style: { filter: `url(#goo-${filterId})` },
            children: [
              /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("filter", { id: `goo-${filterId}`, x: "-20%", y: "-20%", width: "140%", height: "140%", children: [
                /* @__PURE__ */ jsx("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "3", result: "blur" }),
                /* @__PURE__ */ jsx(
                  "feColorMatrix",
                  {
                    in: "blur",
                    mode: "matrix",
                    values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8",
                    result: "goo"
                  }
                ),
                /* @__PURE__ */ jsx("feComposite", { in: "SourceGraphic", in2: "goo", operator: "atop" })
              ] }) }),
              /* @__PURE__ */ jsx(
                motion.path,
                {
                  d: blobPath,
                  fill: color,
                  opacity: 0.3,
                  style: {
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                  }
                }
              ),
              /* @__PURE__ */ jsx(
                motion.path,
                {
                  d: blobPath,
                  fill: "none",
                  stroke: color,
                  strokeWidth: 2,
                  opacity: 0.8
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "relative z-10 text-sm font-medium", children })
      ]
    }
  );
}
function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2,
  className = "",
  showReplayButton = false
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: !showReplayButton, margin: "-50px" });
  const m = useMotionPrefs();
  const value = useMotionValue(0);
  const controls = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [runs, setRuns] = useState(0);
  const display = useTransform(value, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);
  useEffect(() => {
    if (!isInView) return;
    controls.current?.stop();
    if (m.reduced) {
      value.set(target);
      return;
    }
    value.set(0);
    setIsAnimating(true);
    controls.current = animate(value, target, {
      type: "spring",
      duration,
      bounce: 0,
      onComplete: () => setIsAnimating(false)
    });
    return () => controls.current?.stop();
  }, [isInView, target, duration, m.reduced, value, runs]);
  return /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-3", children: [
    /* @__PURE__ */ jsx(motion.span, { ref, className, style: { fontVariantNumeric: "tabular-nums", minWidth: "max-content" }, children: display }),
    showReplayButton && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => setRuns((n) => n + 1),
        disabled: isAnimating,
        className: "rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700",
        children: isAnimating ? "Counting\u2026" : "\u21BB Replay"
      }
    )
  ] });
}
function StatCard({
  value,
  label,
  prefix = "",
  suffix = "",
  decimals = 0,
  icon,
  showReplayButton = false
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref,
      initial: { opacity: 0, y: 20 },
      animate: isInView ? { opacity: 1, y: 0 } : {},
      transition: spring.gentle,
      className: "p-5 rounded-[8px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900",
      children: [
        icon && /* @__PURE__ */ jsx("span", { className: "text-2xl mb-2 block", children: icon }),
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold tabular-nums", children: /* @__PURE__ */ jsx(
          AnimatedCounter,
          {
            target: value,
            prefix,
            suffix,
            decimals,
            showReplayButton
          }
        ) }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-neutral-500 dark:text-neutral-400 mt-1 block", children: label })
      ]
    }
  );
}
var sizePresets = {
  sm: { size: 80, strokeWidth: 6, fontSize: "text-sm" },
  md: { size: 120, strokeWidth: 8, fontSize: "text-lg" },
  lg: { size: 160, strokeWidth: 10, fontSize: "text-xl" },
  xl: { size: 200, strokeWidth: 12, fontSize: "text-2xl" }
};
function ProgressRing({
  value,
  size = "md",
  strokeWidth,
  color = "#6366f1",
  trackColor = "currentColor",
  showLabel = true,
  className = ""
}) {
  const sizeConfig = typeof size === "string" ? sizePresets[size] : null;
  const actualSize = sizeConfig?.size ?? (typeof size === "number" ? size : 120);
  const actualStrokeWidth = strokeWidth ?? sizeConfig?.strokeWidth ?? 8;
  const fontSize = sizeConfig?.fontSize ?? "text-lg";
  const radius = (actualSize - actualStrokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const spring2 = useSpring(0, springValue.gentle);
  const strokeDashoffset = useTransform(
    spring2,
    (v) => circumference - v / 100 * circumference
  );
  const displayValue = useTransform(spring2, (v) => Math.round(v));
  useEffect(() => {
    spring2.set(Math.min(100, Math.max(0, value)));
  }, [value, spring2]);
  return /* @__PURE__ */ jsxs("div", { className: `relative inline-flex items-center justify-center ${className}`, children: [
    /* @__PURE__ */ jsxs("svg", { width: actualSize, height: actualSize, className: "-rotate-90", children: [
      /* @__PURE__ */ jsx(
        "circle",
        {
          cx: actualSize / 2,
          cy: actualSize / 2,
          r: radius,
          fill: "none",
          stroke: trackColor,
          strokeWidth: actualStrokeWidth,
          opacity: 0.1
        }
      ),
      /* @__PURE__ */ jsx(
        motion.circle,
        {
          cx: actualSize / 2,
          cy: actualSize / 2,
          r: radius,
          fill: "none",
          stroke: color,
          strokeWidth: actualStrokeWidth,
          strokeLinecap: "round",
          strokeDasharray: circumference,
          style: { strokeDashoffset }
        }
      )
    ] }),
    showLabel && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex items-center justify-center", children: [
      /* @__PURE__ */ jsx(motion.span, { className: `font-bold tabular-nums ${fontSize}`, children: displayValue }),
      /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-400 ml-0.5", children: "%" })
    ] })
  ] });
}
function ProgressRingGroup({
  variant = "uniform",
  className = "",
  children
}) {
  const baseClasses3 = "flex items-center justify-center gap-6";
  const variantClasses4 = {
    uniform: "flex-row",
    // all same size, horizontal
    graduated: "flex-row items-end",
    // different sizes, aligned to bottom
    mixed: "flex-wrap justify-center"
    // flexible layout
  };
  return /* @__PURE__ */ jsx("div", { className: `${baseClasses3} ${variantClasses4[variant]} ${className}`, children });
}
function SpringCarousel({ items, itemWidth = 260, gap = 16, className = "", label = "Carousel" }) {
  const m = useMotionPrefs();
  const uid = useId();
  const viewportRef = useRef(null);
  const [viewport, setViewport] = useState(0);
  const [index, setIndex] = useState(0);
  const x = useMotionValue(0);
  const step = itemWidth + gap;
  const content = items.length * step - gap;
  const maxScroll = Math.max(0, content - viewport);
  const lastIndex = Math.max(0, Math.min(items.length - 1, Math.ceil(maxScroll / step)));
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setViewport(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const offsetFor = (i) => -Math.min(i * step, maxScroll);
  const goTo = (i, velocity = 0) => {
    const next = Math.max(0, Math.min(lastIndex, i));
    setIndex(next);
    animate(x, offsetFor(next), m.reduced ? { duration: 0 } : { ...spring.gentle, velocity });
  };
  useEffect(() => {
    if (viewport) x.set(offsetFor(Math.min(index, lastIndex)));
  }, [viewport, maxScroll]);
  const onDragEnd = (_, info) => {
    const projected = x.get() + info.velocity.x * 0.2;
    goTo(Math.round(-projected / step), info.velocity.x);
  };
  return /* @__PURE__ */ jsxs("section", { "aria-roledescription": "carousel", "aria-label": label, className, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: viewportRef,
        tabIndex: 0,
        onKeyDown: (e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            goTo(index - 1);
          } else if (e.key === "ArrowRight") {
            e.preventDefault();
            goTo(index + 1);
          }
        },
        className: "overflow-hidden rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "flex cursor-grab active:cursor-grabbing",
            style: { x, gap, touchAction: "pan-y" },
            drag: m.reduced ? false : "x",
            dragConstraints: { left: -maxScroll, right: 0 },
            dragElastic: 0.12,
            dragMomentum: false,
            onDragEnd,
            children: items.map((item, i) => /* @__PURE__ */ jsx(
              motion.div,
              {
                role: "group",
                "aria-roledescription": "slide",
                "aria-label": `${i + 1} of ${items.length}`,
                className: "shrink-0 overflow-hidden rounded-[8px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900",
                style: { width: itemWidth },
                initial: false,
                animate: { scale: i === index || m.reduced ? 1 : 0.94, opacity: i === index ? 1 : 0.65 },
                transition: m.spring("smooth"),
                children: item
              },
              i
            ))
          }
        )
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-center gap-1", role: "group", "aria-label": "Choose slide", children: Array.from({ length: lastIndex + 1 }, (_, i) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => goTo(i),
        "aria-label": `Go to slide ${i + 1}`,
        "aria-current": i === index ? "true" : void 0,
        className: "grid h-6 w-6 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        children: /* @__PURE__ */ jsx("span", { className: "relative block h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700", children: i === index && /* @__PURE__ */ jsx(
          motion.span,
          {
            layoutId: `${uid}-dot`,
            className: "absolute inset-0 rounded-full bg-neutral-900 dark:bg-neutral-100",
            transition: m.spring("snappy")
          }
        ) })
      },
      i
    )) })
  ] });
}
function ParallaxScroll({ children, className = "" }) {
  return /* @__PURE__ */ jsx("div", { className: `relative overflow-hidden ${className}`, children });
}
function ParallaxItem({ children, speed = 0.5, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  const y = useSpring(rawY, { stiffness: 100, damping: 20 });
  return /* @__PURE__ */ jsx(motion.div, { ref, style: { y }, className, children });
}
var shapes = {
  circle: "M 50,15 L 67,19 L 85,35 L 89,50 L 85,65 L 67,81 L 50,85 L 33,81 L 15,65 L 11,50 Z",
  square: "M 20,20 L 50,20 L 80,20 L 80,35 L 80,50 L 80,65 L 80,80 L 50,80 L 20,80 L 20,50 Z",
  triangle: "M 50,15 L 58,25 L 66,35 L 74,55 L 82,75 L 68,80 L 50,82 L 32,80 L 18,75 L 26,45 Z",
  star: "M 50,10 L 55,30 L 75,30 L 61,45 L 67,65 L 50,55 L 33,65 L 39,45 L 25,30 L 45,30 Z",
  diamond: "M 50,15 L 65,25 L 75,40 L 80,50 L 75,60 L 65,75 L 50,85 L 35,75 L 25,60 L 20,50 Z"
};
var shapeNames = ["circle", "square", "triangle", "star", "diamond"];
function MorphingShape({
  size = 200,
  color = "rgba(99, 102, 241, 0.15)",
  strokeColor = "#6366f1",
  className = ""
}) {
  const [shapeIndex, setShapeIndex] = useState(0);
  const currentShape = shapeNames[shapeIndex];
  const next = () => setShapeIndex((i) => (i + 1) % shapeNames.length);
  return /* @__PURE__ */ jsxs("div", { className: `flex flex-col items-center gap-4 ${className}`, children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: next,
        className: "cursor-pointer bg-transparent border-none p-0 hover:scale-105 transition-transform",
        "aria-label": "Morph to next shape",
        children: /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 100 100", children: /* @__PURE__ */ jsx(
          motion.path,
          {
            d: shapes[currentShape],
            fill: color,
            stroke: strokeColor,
            strokeWidth: 2,
            strokeLinejoin: "round",
            strokeLinecap: "round",
            animate: { d: shapes[currentShape] },
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 15,
              mass: 0.6,
              duration: 0.8
            }
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxs("span", { className: "text-xs text-neutral-400 capitalize", children: [
      currentShape,
      " \u2014 click to morph"
    ] })
  ] });
}

// src/components/component-switcher.tsx
var import_link = __toESM(require_link2());
var components = [
  { id: "button", name: "Button", path: "/playground/button", available: true },
  { id: "card", name: "Card", path: "/playground/card", available: false },
  { id: "tabs", name: "Tabs", path: "/playground/tabs", available: false },
  { id: "accordion", name: "Accordion", path: "/playground/accordion", available: false },
  { id: "modal", name: "Modal", path: "/playground/modal", available: false },
  { id: "tooltip", name: "Tooltip", path: "/playground/tooltip", available: false },
  { id: "carousel", name: "Carousel", path: "/playground/carousel", available: false },
  { id: "input", name: "Input", path: "/playground/input", available: false },
  { id: "dropdown", name: "Dropdown", path: "/playground/dropdown", available: false }
];
function ComponentSwitcher({ currentComponent }) {
  return /* @__PURE__ */ jsx("div", { className: "border-b border-neutral-800 bg-neutral-900", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center px-4 py-2", children: [
    /* @__PURE__ */ jsx("span", { className: "text-sm font-mono text-neutral-400 mr-4", children: "Components:" }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-1 overflow-x-auto", children: components.map((component) => {
      const isActive = component.id === currentComponent;
      const isAvailable = component.available;
      if (isAvailable) {
        return /* @__PURE__ */ jsx(import_link.default, { href: component.path, children: /* @__PURE__ */ jsx(
          motion.div,
          {
            className: `px-3 py-1.5 text-sm font-mono rounded transition-colors whitespace-nowrap ${isActive ? "bg-white text-black" : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white"}`,
            whileHover: { scale: isActive ? 1 : 1.02 },
            whileTap: { scale: 0.98 },
            children: component.name
          }
        ) }, component.id);
      } else {
        return /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "px-3 py-1.5 text-sm font-mono rounded bg-neutral-850 text-neutral-500 cursor-not-allowed whitespace-nowrap relative",
            title: "Coming soon",
            children: [
              component.name,
              /* @__PURE__ */ jsx("span", { className: "ml-2 text-xs text-neutral-600", children: "soon" })
            ]
          },
          component.id
        );
      }
    }) }),
    /* @__PURE__ */ jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsx(import_link.default, { href: "/", children: /* @__PURE__ */ jsx(
      motion.span,
      {
        className: "text-sm font-mono text-neutral-400 hover:text-white transition-colors",
        whileHover: { scale: 1.02 },
        children: "Back"
      }
    ) }) })
  ] }) });
}
function CustomSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = "",
  onChange
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const trackRef = useRef(null);
  const percentage = (value - min) / (max - min) * 100;
  const handleMouseMove = useCallback(
    (e) => {
      if (!trackRef.current || !isDragging) return;
      const rect = trackRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const newValue = min + x / rect.width * (max - min);
      const steppedValue = Math.round(newValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));
      onChange(clampedValue);
    },
    [isDragging, min, max, step, onChange]
  );
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  React9.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);
  const handleTrackClick = useCallback(
    (e) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const newValue = min + x / rect.width * (max - min);
      const steppedValue = Math.round(newValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));
      onChange(clampedValue);
    },
    [min, max, step, onChange]
  );
  const handleKeyDown = useCallback(
    (e) => {
      let newValue = value;
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
          newValue = Math.max(min, value - step);
          break;
        case "ArrowRight":
        case "ArrowUp":
          newValue = Math.min(max, value + step);
          break;
        case "Home":
          newValue = min;
          break;
        case "End":
          newValue = max;
          break;
        default:
          return;
      }
      e.preventDefault();
      onChange(newValue);
    },
    [value, min, max, step, onChange]
  );
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("label", { className: "text-sm font-mono text-neutral-300 select-none", children: label }),
      /* @__PURE__ */ jsxs("span", { className: "text-sm font-mono text-neutral-400 tabular-nums", children: [
        value,
        unit
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs(
      "div",
      {
        ref: trackRef,
        className: "relative h-2 bg-neutral-800 rounded-full cursor-pointer",
        onClick: handleTrackClick,
        children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute top-0 left-0 h-full bg-white rounded-full",
              style: { width: `${percentage}%` },
              layout: true
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: `absolute top-1/2 w-4 h-4 bg-white rounded-full -translate-y-1/2 cursor-grab active:cursor-grabbing ${isFocused ? "ring-2 ring-white ring-opacity-50" : ""}`,
              style: { left: `${percentage}%`, marginLeft: "-8px" },
              whileHover: { scale: 1.2 },
              whileTap: { scale: 0.9 },
              onMouseDown: (e) => {
                e.preventDefault();
                setIsDragging(true);
              },
              onFocus: () => setIsFocused(true),
              onBlur: () => setIsFocused(false),
              onKeyDown: handleKeyDown,
              tabIndex: 0,
              role: "slider",
              "aria-valuenow": value,
              "aria-valuemin": min,
              "aria-valuemax": max,
              "aria-label": label
            }
          )
        ]
      }
    ) })
  ] });
}
function CustomDropdown({
  label,
  value,
  options,
  onChange
}) {
  const [isOpen, setIsOpen] = useState(false);
  const currentOption = options.find((opt) => opt.value === value);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx("label", { className: "text-sm font-mono text-neutral-300 select-none", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs(
        motion.button,
        {
          className: "w-full px-3 py-2 bg-neutral-800 text-white rounded border border-neutral-700 text-left flex items-center justify-between text-sm font-mono",
          onClick: () => setIsOpen(!isOpen),
          whileTap: { scale: 0.98 },
          children: [
            /* @__PURE__ */ jsx("span", { children: currentOption?.label }),
            /* @__PURE__ */ jsx(
              motion.span,
              {
                className: "text-neutral-400",
                animate: { rotate: isOpen ? 180 : 0 },
                transition: { duration: 0.2 },
                children: "\u25BC"
              }
            )
          ]
        }
      ),
      isOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "fixed inset-0 z-10",
            onClick: () => setIsOpen(false)
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute top-full left-0 right-0 mt-1 bg-neutral-800 border border-neutral-700 rounded shadow-lg z-20",
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -10 },
            children: options.map((option) => /* @__PURE__ */ jsx(
              "button",
              {
                className: `w-full px-3 py-2 text-left text-sm font-mono hover:bg-neutral-700 transition-colors ${option.value === value ? "bg-neutral-700 text-white" : "text-neutral-300"}`,
                onClick: () => {
                  onChange(option.value);
                  setIsOpen(false);
                },
                children: option.label
              },
              option.value
            ))
          }
        )
      ] })
    ] })
  ] });
}
function ControlPanel({ title, config, controls, onChange }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-white", children: title }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: controls.map((control) => /* @__PURE__ */ jsx("div", { children: control.type === "slider" ? /* @__PURE__ */ jsx(
      CustomSlider,
      {
        label: control.label,
        value: config[control.key],
        min: control.min,
        max: control.max,
        step: control.step,
        unit: control.unit,
        onChange: (value) => onChange(control.key, value)
      }
    ) : control.type === "dropdown" && control.options ? /* @__PURE__ */ jsx(
      CustomDropdown,
      {
        label: control.label,
        value: config[control.key],
        options: control.options,
        onChange: (value) => onChange(control.key, value)
      }
    ) : null }, control.key)) }),
    /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-neutral-800", children: /* @__PURE__ */ jsxs("div", { className: "text-xs text-neutral-500 space-y-1", children: [
      /* @__PURE__ */ jsx("p", { children: "\u2022 Drag sliders to adjust values" }),
      /* @__PURE__ */ jsx("p", { children: "\u2022 Use arrow keys for precision" }),
      /* @__PURE__ */ jsx("p", { children: "\u2022 Try different presets for quick configs" })
    ] }) })
  ] });
}

export { Accordion, AnimatedBadge, AnimatedCounter, AnimatedTabs, Badge, Breadcrumbs, Button, Card, CardActions, CardContent, CardFooter, CardGrid, CardHeader, CardImage, CodeBlock, CodeDisplay, CommandPalette, ComponentSwitcher, ContextMenu, ControlPanel, CursorTrail, DateRangePicker, Dialog, DialogDescription, DialogFooter, DialogTitle, Drawer, DrawerContent, DrawerFooter, DrawerHeader, Dropdown, ExpandableCard, FlipCard, GlowCard, GradientBorder, Input, LiquidButton, MagneticButton, MagneticDock, Marquee, MarqueeItem, ModeSwitcher, MorphingHamburger, MorphingShape, MultiSelect, NavMenu, NotificationBadge, NumberTicker, ParallaxItem, ParallaxLayer, ParallaxScroll, ParallaxTiltCard, Popover, ProgressRing, ProgressRingGroup, RippleButton, SchedulePicker, ScrollReveal, Skeleton, Spotlight, SpringCarousel, StaggeredList, StatCard, Stepper, SwipeCards, Tabs, TextShimmer, ToastProvider, Toggle, Tooltip, Typewriter, WobbleCard, badgeVariants, breadcrumbPatterns, contextMenuItems, exit, fade, reducedTransition, sizePresets, spring, springValue, stagger, useMotionPrefs, useToast };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map