const RUNTIME_PUBLIC_PATH = "server/chunks/[turbopack]_runtime.js";
const RELATIVE_ROOT_PATH = "..";
const ASSET_PREFIX = "/";
/**
 * This file contains runtime types and functions that are shared between all
 * TurboPack ECMAScript runtimes.
 *
 * It will be prepended to the runtime code of each runtime.
 */ /* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="./runtime-types.d.ts" />
const REEXPORTED_OBJECTS = new WeakMap();
/**
 * Constructs the `__turbopack_context__` object for a module.
 */ function Context(module, exports) {
    this.m = module;
    // We need to store this here instead of accessing it from the module object to:
    // 1. Make it available to factories directly, since we rewrite `this` to
    //    `__turbopack_context__.e` in CJS modules.
    // 2. Support async modules which rewrite `module.exports` to a promise, so we
    //    can still access the original exports object from functions like
    //    `esmExport`
    // Ideally we could find a new approach for async modules and drop this property altogether.
    this.e = exports;
}
const contextPrototype = Context.prototype;
const hasOwnProperty = Object.prototype.hasOwnProperty;
const toStringTag = typeof Symbol !== 'undefined' && Symbol.toStringTag;
function defineProp(obj, name, options) {
    if (!hasOwnProperty.call(obj, name)) Object.defineProperty(obj, name, options);
}
function getOverwrittenModule(moduleCache, id) {
    let module = moduleCache[id];
    if (!module) {
        // This is invoked when a module is merged into another module, thus it wasn't invoked via
        // instantiateModule and the cache entry wasn't created yet.
        module = createModuleObject(id);
        moduleCache[id] = module;
    }
    return module;
}
/**
 * Creates the module object. Only done here to ensure all module objects have the same shape.
 */ function createModuleObject(id) {
    return {
        exports: {},
        error: undefined,
        id,
        namespaceObject: undefined
    };
}
const BindingTag_Value = 0;
/**
 * Adds the getters to the exports object.
 */ function esm(exports, bindings) {
    defineProp(exports, '__esModule', {
        value: true
    });
    if (toStringTag) defineProp(exports, toStringTag, {
        value: 'Module'
    });
    let i = 0;
    while(i < bindings.length){
        const propName = bindings[i++];
        const tagOrFunction = bindings[i++];
        if (typeof tagOrFunction === 'number') {
            if (tagOrFunction === BindingTag_Value) {
                defineProp(exports, propName, {
                    value: bindings[i++],
                    enumerable: true,
                    writable: false
                });
            } else {
                throw new Error(`unexpected tag: ${tagOrFunction}`);
            }
        } else {
            const getterFn = tagOrFunction;
            if (typeof bindings[i] === 'function') {
                const setterFn = bindings[i++];
                defineProp(exports, propName, {
                    get: getterFn,
                    set: setterFn,
                    enumerable: true
                });
            } else {
                defineProp(exports, propName, {
                    get: getterFn,
                    enumerable: true
                });
            }
        }
    }
    Object.seal(exports);
}
/**
 * Makes the module an ESM with exports
 */ function esmExport(bindings, id) {
    let module;
    let exports;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
        exports = module.exports;
    } else {
        module = this.m;
        exports = this.e;
    }
    module.namespaceObject = exports;
    esm(exports, bindings);
}
contextPrototype.s = esmExport;
function ensureDynamicExports(module, exports) {
    let reexportedObjects = REEXPORTED_OBJECTS.get(module);
    if (!reexportedObjects) {
        REEXPORTED_OBJECTS.set(module, reexportedObjects = []);
        module.exports = module.namespaceObject = new Proxy(exports, {
            get (target, prop) {
                if (hasOwnProperty.call(target, prop) || prop === 'default' || prop === '__esModule') {
                    return Reflect.get(target, prop);
                }
                for (const obj of reexportedObjects){
                    const value = Reflect.get(obj, prop);
                    if (value !== undefined) return value;
                }
                return undefined;
            },
            ownKeys (target) {
                const keys = Reflect.ownKeys(target);
                for (const obj of reexportedObjects){
                    for (const key of Reflect.ownKeys(obj)){
                        if (key !== 'default' && !keys.includes(key)) keys.push(key);
                    }
                }
                return keys;
            }
        });
    }
    return reexportedObjects;
}
/**
 * Dynamically exports properties from an object
 */ function dynamicExport(object, id) {
    let module;
    let exports;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
        exports = module.exports;
    } else {
        module = this.m;
        exports = this.e;
    }
    const reexportedObjects = ensureDynamicExports(module, exports);
    if (typeof object === 'object' && object !== null) {
        reexportedObjects.push(object);
    }
}
contextPrototype.j = dynamicExport;
function exportValue(value, id) {
    let module;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
    } else {
        module = this.m;
    }
    module.exports = value;
}
contextPrototype.v = exportValue;
function exportNamespace(namespace, id) {
    let module;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
    } else {
        module = this.m;
    }
    module.exports = module.namespaceObject = namespace;
}
contextPrototype.n = exportNamespace;
function createGetter(obj, key) {
    return ()=>obj[key];
}
/**
 * @returns prototype of the object
 */ const getProto = Object.getPrototypeOf ? (obj)=>Object.getPrototypeOf(obj) : (obj)=>obj.__proto__;
/** Prototypes that are not expanded for exports */ const LEAF_PROTOTYPES = [
    null,
    getProto({}),
    getProto([]),
    getProto(getProto)
];
/**
 * @param raw
 * @param ns
 * @param allowExportDefault
 *   * `false`: will have the raw module as default export
 *   * `true`: will have the default property as default export
 */ function interopEsm(raw, ns, allowExportDefault) {
    const bindings = [];
    let defaultLocation = -1;
    for(let current = raw; (typeof current === 'object' || typeof current === 'function') && !LEAF_PROTOTYPES.includes(current); current = getProto(current)){
        for (const key of Object.getOwnPropertyNames(current)){
            bindings.push(key, createGetter(raw, key));
            if (defaultLocation === -1 && key === 'default') {
                defaultLocation = bindings.length - 1;
            }
        }
    }
    // this is not really correct
    // we should set the `default` getter if the imported module is a `.cjs file`
    if (!(allowExportDefault && defaultLocation >= 0)) {
        // Replace the binding with one for the namespace itself in order to preserve iteration order.
        if (defaultLocation >= 0) {
            // Replace the getter with the value
            bindings.splice(defaultLocation, 1, BindingTag_Value, raw);
        } else {
            bindings.push('default', BindingTag_Value, raw);
        }
    }
    esm(ns, bindings);
    return ns;
}
function createNS(raw) {
    if (typeof raw === 'function') {
        return function(...args) {
            return raw.apply(this, args);
        };
    } else {
        return Object.create(null);
    }
}
function esmImport(id) {
    const module = getOrInstantiateModuleFromParent(id, this.m);
    // any ES module has to have `module.namespaceObject` defined.
    if (module.namespaceObject) return module.namespaceObject;
    // only ESM can be an async module, so we don't need to worry about exports being a promise here.
    const raw = module.exports;
    return module.namespaceObject = interopEsm(raw, createNS(raw), raw && raw.__esModule);
}
contextPrototype.i = esmImport;
function asyncLoader(moduleId) {
    const loader = this.r(moduleId);
    return loader(esmImport.bind(this));
}
contextPrototype.A = asyncLoader;
// Add a simple runtime require so that environments without one can still pass
// `typeof require` CommonJS checks so that exports are correctly registered.
const runtimeRequire = // @ts-ignore
typeof require === 'function' ? require : function require1() {
    throw new Error('Unexpected use of runtime require');
};
contextPrototype.t = runtimeRequire;
function commonJsRequire(id) {
    return getOrInstantiateModuleFromParent(id, this.m).exports;
}
contextPrototype.r = commonJsRequire;
/**
 * Remove fragments and query parameters since they are never part of the context map keys
 *
 * This matches how we parse patterns at resolving time.  Arguably we should only do this for
 * strings passed to `import` but the resolve does it for `import` and `require` and so we do
 * here as well.
 */ function parseRequest(request) {
    // Per the URI spec fragments can contain `?` characters, so we should trim it off first
    // https://datatracker.ietf.org/doc/html/rfc3986#section-3.5
    const hashIndex = request.indexOf('#');
    if (hashIndex !== -1) {
        request = request.substring(0, hashIndex);
    }
    const queryIndex = request.indexOf('?');
    if (queryIndex !== -1) {
        request = request.substring(0, queryIndex);
    }
    return request;
}
/**
 * `require.context` and require/import expression runtime.
 */ function moduleContext(map) {
    function moduleContext(id) {
        id = parseRequest(id);
        if (hasOwnProperty.call(map, id)) {
            return map[id].module();
        }
        const e = new Error(`Cannot find module '${id}'`);
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    }
    moduleContext.keys = ()=>{
        return Object.keys(map);
    };
    moduleContext.resolve = (id)=>{
        id = parseRequest(id);
        if (hasOwnProperty.call(map, id)) {
            return map[id].id();
        }
        const e = new Error(`Cannot find module '${id}'`);
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    };
    moduleContext.import = async (id)=>{
        return await moduleContext(id);
    };
    return moduleContext;
}
contextPrototype.f = moduleContext;
/**
 * Returns the path of a chunk defined by its data.
 */ function getChunkPath(chunkData) {
    return typeof chunkData === 'string' ? chunkData : chunkData.path;
}
function isPromise(maybePromise) {
    return maybePromise != null && typeof maybePromise === 'object' && 'then' in maybePromise && typeof maybePromise.then === 'function';
}
function isAsyncModuleExt(obj) {
    return turbopackQueues in obj;
}
function createPromise() {
    let resolve;
    let reject;
    const promise = new Promise((res, rej)=>{
        reject = rej;
        resolve = res;
    });
    return {
        promise,
        resolve: resolve,
        reject: reject
    };
}
// Load the CompressedmoduleFactories of a chunk into the `moduleFactories` Map.
// The CompressedModuleFactories format is
// - 1 or more module ids
// - a module factory function
// So walking this is a little complex but the flat structure is also fast to
// traverse, we can use `typeof` operators to distinguish the two cases.
function installCompressedModuleFactories(chunkModules, offset, moduleFactories, newModuleId) {
    let i = offset;
    while(i < chunkModules.length){
        let moduleId = chunkModules[i];
        let end = i + 1;
        // Find our factory function
        while(end < chunkModules.length && typeof chunkModules[end] !== 'function'){
            end++;
        }
        if (end === chunkModules.length) {
            throw new Error('malformed chunk format, expected a factory function');
        }
        // Each chunk item has a 'primary id' and optional additional ids. If the primary id is already
        // present we know all the additional ids are also present, so we don't need to check.
        if (!moduleFactories.has(moduleId)) {
            const moduleFactoryFn = chunkModules[end];
            applyModuleFactoryName(moduleFactoryFn);
            newModuleId?.(moduleId);
            for(; i < end; i++){
                moduleId = chunkModules[i];
                moduleFactories.set(moduleId, moduleFactoryFn);
            }
        }
        i = end + 1; // end is pointing at the last factory advance to the next id or the end of the array.
    }
}
// everything below is adapted from webpack
// https://github.com/webpack/webpack/blob/6be4065ade1e252c1d8dcba4af0f43e32af1bdc1/lib/runtime/AsyncModuleRuntimeModule.js#L13
const turbopackQueues = Symbol('turbopack queues');
const turbopackExports = Symbol('turbopack exports');
const turbopackError = Symbol('turbopack error');
function resolveQueue(queue) {
    if (queue && queue.status !== 1) {
        queue.status = 1;
        queue.forEach((fn)=>fn.queueCount--);
        queue.forEach((fn)=>fn.queueCount-- ? fn.queueCount++ : fn());
    }
}
function wrapDeps(deps) {
    return deps.map((dep)=>{
        if (dep !== null && typeof dep === 'object') {
            if (isAsyncModuleExt(dep)) return dep;
            if (isPromise(dep)) {
                const queue = Object.assign([], {
                    status: 0
                });
                const obj = {
                    [turbopackExports]: {},
                    [turbopackQueues]: (fn)=>fn(queue)
                };
                dep.then((res)=>{
                    obj[turbopackExports] = res;
                    resolveQueue(queue);
                }, (err)=>{
                    obj[turbopackError] = err;
                    resolveQueue(queue);
                });
                return obj;
            }
        }
        return {
            [turbopackExports]: dep,
            [turbopackQueues]: ()=>{}
        };
    });
}
function asyncModule(body, hasAwait) {
    const module = this.m;
    const queue = hasAwait ? Object.assign([], {
        status: -1
    }) : undefined;
    const depQueues = new Set();
    const { resolve, reject, promise: rawPromise } = createPromise();
    const promise = Object.assign(rawPromise, {
        [turbopackExports]: module.exports,
        [turbopackQueues]: (fn)=>{
            queue && fn(queue);
            depQueues.forEach(fn);
            promise['catch'](()=>{});
        }
    });
    const attributes = {
        get () {
            return promise;
        },
        set (v) {
            // Calling `esmExport` leads to this.
            if (v !== promise) {
                promise[turbopackExports] = v;
            }
        }
    };
    Object.defineProperty(module, 'exports', attributes);
    Object.defineProperty(module, 'namespaceObject', attributes);
    function handleAsyncDependencies(deps) {
        const currentDeps = wrapDeps(deps);
        const getResult = ()=>currentDeps.map((d)=>{
                if (d[turbopackError]) throw d[turbopackError];
                return d[turbopackExports];
            });
        const { promise, resolve } = createPromise();
        const fn = Object.assign(()=>resolve(getResult), {
            queueCount: 0
        });
        function fnQueue(q) {
            if (q !== queue && !depQueues.has(q)) {
                depQueues.add(q);
                if (q && q.status === 0) {
                    fn.queueCount++;
                    q.push(fn);
                }
            }
        }
        currentDeps.map((dep)=>dep[turbopackQueues](fnQueue));
        return fn.queueCount ? promise : getResult();
    }
    function asyncResult(err) {
        if (err) {
            reject(promise[turbopackError] = err);
        } else {
            resolve(promise[turbopackExports]);
        }
        resolveQueue(queue);
    }
    body(handleAsyncDependencies, asyncResult);
    if (queue && queue.status === -1) {
        queue.status = 0;
    }
}
contextPrototype.a = asyncModule;
/**
 * A pseudo "fake" URL object to resolve to its relative path.
 *
 * When UrlRewriteBehavior is set to relative, calls to the `new URL()` will construct url without base using this
 * runtime function to generate context-agnostic urls between different rendering context, i.e ssr / client to avoid
 * hydration mismatch.
 *
 * This is based on webpack's existing implementation:
 * https://github.com/webpack/webpack/blob/87660921808566ef3b8796f8df61bd79fc026108/lib/runtime/RelativeUrlRuntimeModule.js
 */ const relativeURL = function relativeURL(inputUrl) {
    const realUrl = new URL(inputUrl, 'x:/');
    const values = {};
    for(const key in realUrl)values[key] = realUrl[key];
    values.href = inputUrl;
    values.pathname = inputUrl.replace(/[?#].*/, '');
    values.origin = values.protocol = '';
    values.toString = values.toJSON = (..._args)=>inputUrl;
    for(const key in values)Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        value: values[key]
    });
};
relativeURL.prototype = URL.prototype;
contextPrototype.U = relativeURL;
/**
 * Utility function to ensure all variants of an enum are handled.
 */ function invariant(never, computeMessage) {
    throw new Error(`Invariant: ${computeMessage(never)}`);
}
/**
 * A stub function to make `require` available but non-functional in ESM.
 */ function requireStub(_moduleId) {
    throw new Error('dynamic usage of require is not supported');
}
contextPrototype.z = requireStub;
// Make `globalThis` available to the module in a way that cannot be shadowed by a local variable.
contextPrototype.g = globalThis;
function applyModuleFactoryName(factory) {
    // Give the module factory a nice name to improve stack traces.
    Object.defineProperty(factory, 'name', {
        value: 'module evaluation'
    });
}
/// <reference path="../shared/runtime-utils.ts" />
/// A 'base' utilities to support runtime can have externals.
/// Currently this is for node.js / edge runtime both.
/// If a fn requires node.js specific behavior, it should be placed in `node-external-utils` instead.
async function externalImport(id) {
    let raw;
    try {
        switch (id) {
  case "next/dist/compiled/@vercel/og/index.node.js":
    raw = await import("next/dist/compiled/@vercel/og/index.edge.js");
    break;
  default:
    raw = await import(id);
};
    } catch (err) {
        // TODO(alexkirsz) This can happen when a client-side module tries to load
        // an external module we don't provide a shim for (e.g. querystring, url).
        // For now, we fail semi-silently, but in the future this should be a
        // compilation error.
        throw new Error(`Failed to load external module ${id}: ${err}`);
    }
    if (raw && raw.__esModule && raw.default && 'default' in raw.default) {
        return interopEsm(raw.default, createNS(raw), true);
    }
    return raw;
}
contextPrototype.y = externalImport;
function externalRequire(id, thunk, esm = false) {
    let raw;
    try {
        raw = thunk();
    } catch (err) {
        // TODO(alexkirsz) This can happen when a client-side module tries to load
        // an external module we don't provide a shim for (e.g. querystring, url).
        // For now, we fail semi-silently, but in the future this should be a
        // compilation error.
        throw new Error(`Failed to load external module ${id}: ${err}`);
    }
    if (!esm || raw.__esModule) {
        return raw;
    }
    return interopEsm(raw, createNS(raw), true);
}
externalRequire.resolve = (id, options)=>{
    return require.resolve(id, options);
};
contextPrototype.x = externalRequire;
/* eslint-disable @typescript-eslint/no-unused-vars */ const path = require('path');
const relativePathToRuntimeRoot = path.relative(RUNTIME_PUBLIC_PATH, '.');
// Compute the relative path to the `distDir`.
const relativePathToDistRoot = path.join(relativePathToRuntimeRoot, RELATIVE_ROOT_PATH);
const RUNTIME_ROOT = path.resolve(__filename, relativePathToRuntimeRoot);
// Compute the absolute path to the root, by stripping distDir from the absolute path to this file.
const ABSOLUTE_ROOT = path.resolve(__filename, relativePathToDistRoot);
/**
 * Returns an absolute path to the given module path.
 * Module path should be relative, either path to a file or a directory.
 *
 * This fn allows to calculate an absolute path for some global static values, such as
 * `__dirname` or `import.meta.url` that Turbopack will not embeds in compile time.
 * See ImportMetaBinding::code_generation for the usage.
 */ function resolveAbsolutePath(modulePath) {
    if (modulePath) {
        return path.join(ABSOLUTE_ROOT, modulePath);
    }
    return ABSOLUTE_ROOT;
}
Context.prototype.P = resolveAbsolutePath;
/* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="../shared/runtime-utils.ts" />
function readWebAssemblyAsResponse(path) {
    const { createReadStream } = require('fs');
    const { Readable } = require('stream');
    const stream = createReadStream(path);
    // @ts-ignore unfortunately there's a slight type mismatch with the stream.
    return new Response(Readable.toWeb(stream), {
        headers: {
            'content-type': 'application/wasm'
        }
    });
}
async function compileWebAssemblyFromPath(path) {
    const response = readWebAssemblyAsResponse(path);
    return await WebAssembly.compileStreaming(response);
}
async function instantiateWebAssemblyFromPath(path, importsObj) {
    const response = readWebAssemblyAsResponse(path);
    const { instance } = await WebAssembly.instantiateStreaming(response, importsObj);
    return instance.exports;
}
/* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="../shared/runtime-utils.ts" />
/// <reference path="../shared-node/base-externals-utils.ts" />
/// <reference path="../shared-node/node-externals-utils.ts" />
/// <reference path="../shared-node/node-wasm-utils.ts" />
var SourceType = /*#__PURE__*/ function(SourceType) {
    /**
   * The module was instantiated because it was included in an evaluated chunk's
   * runtime.
   * SourceData is a ChunkPath.
   */ SourceType[SourceType["Runtime"] = 0] = "Runtime";
    /**
   * The module was instantiated because a parent module imported it.
   * SourceData is a ModuleId.
   */ SourceType[SourceType["Parent"] = 1] = "Parent";
    return SourceType;
}(SourceType || {});
process.env.TURBOPACK = '1';
const nodeContextPrototype = Context.prototype;
const url = require('url');
const moduleFactories = new Map();
nodeContextPrototype.M = moduleFactories;
const moduleCache = Object.create(null);
nodeContextPrototype.c = moduleCache;
/**
 * Returns an absolute path to the given module's id.
 */ function resolvePathFromModule(moduleId) {
    const exported = this.r(moduleId);
    const exportedPath = exported?.default ?? exported;
    if (typeof exportedPath !== 'string') {
        return exported;
    }
    const strippedAssetPrefix = exportedPath.slice(ASSET_PREFIX.length);
    const resolved = path.resolve(RUNTIME_ROOT, strippedAssetPrefix);
    return url.pathToFileURL(resolved).href;
}
nodeContextPrototype.R = resolvePathFromModule;
function loadRuntimeChunk(sourcePath, chunkData) {
    if (typeof chunkData === 'string') {
        loadRuntimeChunkPath(sourcePath, chunkData);
    } else {
        loadRuntimeChunkPath(sourcePath, chunkData.path);
    }
}
const loadedChunks = new Set();
const unsupportedLoadChunk = Promise.resolve(undefined);
const loadedChunk = Promise.resolve(undefined);
const chunkCache = new Map();
function clearChunkCache() {
    chunkCache.clear();
}
function loadRuntimeChunkPath(sourcePath, chunkPath) {
    if (!isJs(chunkPath)) {
        // We only support loading JS chunks in Node.js.
        // This branch can be hit when trying to load a CSS chunk.
        return;
    }
    if (loadedChunks.has(chunkPath)) {
        return;
    }
    try {
        const resolved = path.resolve(RUNTIME_ROOT, chunkPath);
        const chunkModules = requireChunk(chunkPath);
        installCompressedModuleFactories(chunkModules, 0, moduleFactories);
        loadedChunks.add(chunkPath);
    } catch (cause) {
        let errorMessage = `Failed to load chunk ${chunkPath}`;
        if (sourcePath) {
            errorMessage += ` from runtime for chunk ${sourcePath}`;
        }
        const error = new Error(errorMessage, {
            cause
        });
        error.name = 'ChunkLoadError';
        throw error;
    }
}
function loadChunkAsync(chunkData) {
    const chunkPath = typeof chunkData === 'string' ? chunkData : chunkData.path;
    if (!isJs(chunkPath)) {
        // We only support loading JS chunks in Node.js.
        // This branch can be hit when trying to load a CSS chunk.
        return unsupportedLoadChunk;
    }
    let entry = chunkCache.get(chunkPath);
    if (entry === undefined) {
        try {
            // resolve to an absolute path to simplify `require` handling
            const resolved = path.resolve(RUNTIME_ROOT, chunkPath);
            // TODO: consider switching to `import()` to enable concurrent chunk loading and async file io
            // However this is incompatible with hot reloading (since `import` doesn't use the require cache)
            const chunkModules = requireChunk(chunkPath);
            installCompressedModuleFactories(chunkModules, 0, moduleFactories);
            entry = loadedChunk;
        } catch (cause) {
            const errorMessage = `Failed to load chunk ${chunkPath} from module ${this.m.id}`;
            const error = new Error(errorMessage, {
                cause
            });
            error.name = 'ChunkLoadError';
            // Cache the failure promise, future requests will also get this same rejection
            entry = Promise.reject(error);
        }
        chunkCache.set(chunkPath, entry);
    }
    // TODO: Return an instrumented Promise that React can use instead of relying on referential equality.
    return entry;
}
contextPrototype.l = loadChunkAsync;
function loadChunkAsyncByUrl(chunkUrl) {
    const path1 = url.fileURLToPath(new URL(chunkUrl, RUNTIME_ROOT));
    return loadChunkAsync.call(this, path1);
}
contextPrototype.L = loadChunkAsyncByUrl;
function loadWebAssembly(chunkPath, _edgeModule, imports) {
    const resolved = path.resolve(RUNTIME_ROOT, chunkPath);
    return instantiateWebAssemblyFromPath(resolved, imports);
}
contextPrototype.w = loadWebAssembly;
function loadWebAssemblyModule(chunkPath, _edgeModule) {
    const resolved = path.resolve(RUNTIME_ROOT, chunkPath);
    return compileWebAssemblyFromPath(resolved);
}
contextPrototype.u = loadWebAssemblyModule;
function getWorkerBlobURL(_chunks) {
    throw new Error('Worker blobs are not implemented yet for Node.js');
}
nodeContextPrototype.b = getWorkerBlobURL;
function instantiateModule(id, sourceType, sourceData) {
    const moduleFactory = moduleFactories.get(id);
    if (typeof moduleFactory !== 'function') {
        // This can happen if modules incorrectly handle HMR disposes/updates,
        // e.g. when they keep a `setTimeout` around which still executes old code
        // and contains e.g. a `require("something")` call.
        let instantiationReason;
        switch(sourceType){
            case 0:
                instantiationReason = `as a runtime entry of chunk ${sourceData}`;
                break;
            case 1:
                instantiationReason = `because it was required from module ${sourceData}`;
                break;
            default:
                invariant(sourceType, (sourceType)=>`Unknown source type: ${sourceType}`);
        }
        throw new Error(`Module ${id} was instantiated ${instantiationReason}, but the module factory is not available.`);
    }
    const module1 = createModuleObject(id);
    const exports = module1.exports;
    moduleCache[id] = module1;
    const context = new Context(module1, exports);
    // NOTE(alexkirsz) This can fail when the module encounters a runtime error.
    try {
        moduleFactory(context, module1, exports);
    } catch (error) {
        module1.error = error;
        throw error;
    }
    module1.loaded = true;
    if (module1.namespaceObject && module1.exports !== module1.namespaceObject) {
        // in case of a circular dependency: cjs1 -> esm2 -> cjs1
        interopEsm(module1.exports, module1.namespaceObject);
    }
    return module1;
}
/**
 * Retrieves a module from the cache, or instantiate it if it is not cached.
 */ // @ts-ignore
function getOrInstantiateModuleFromParent(id, sourceModule) {
    const module1 = moduleCache[id];
    if (module1) {
        if (module1.error) {
            throw module1.error;
        }
        return module1;
    }
    return instantiateModule(id, 1, sourceModule.id);
}
/**
 * Instantiates a runtime module.
 */ function instantiateRuntimeModule(chunkPath, moduleId) {
    return instantiateModule(moduleId, 0, chunkPath);
}
/**
 * Retrieves a module from the cache, or instantiate it as a runtime module if it is not cached.
 */ // @ts-ignore TypeScript doesn't separate this module space from the browser runtime
function getOrInstantiateRuntimeModule(chunkPath, moduleId) {
    const module1 = moduleCache[moduleId];
    if (module1) {
        if (module1.error) {
            throw module1.error;
        }
        return module1;
    }
    return instantiateRuntimeModule(chunkPath, moduleId);
}
const regexJsUrl = /\.js(?:\?[^#]*)?(?:#.*)?$/;
/**
 * Checks if a given path/URL ends with .js, optionally followed by ?query or #fragment.
 */ function isJs(chunkUrlOrPath) {
    return regexJsUrl.test(chunkUrlOrPath);
}
module.exports = (sourcePath)=>({
        m: (id)=>getOrInstantiateRuntimeModule(sourcePath, id),
        c: (chunkData)=>loadRuntimeChunk(sourcePath, chunkData)
    });


//# sourceMappingURL=%5Bturbopack%5D_runtime.js.map

  function requireChunk(chunkPath) {
    switch(chunkPath) {
      case "server/chunks/ssr/[root-of-the-server]__047865a2._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__047865a2._.js");
      case "server/chunks/ssr/[root-of-the-server]__296a25b5._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__296a25b5._.js");
      case "server/chunks/ssr/[root-of-the-server]__7f68cf2f._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__7f68cf2f._.js");
      case "server/chunks/ssr/[root-of-the-server]__c0554449._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__c0554449._.js");
      case "server/chunks/ssr/[root-of-the-server]__cda8c002._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__cda8c002._.js");
      case "server/chunks/ssr/[root-of-the-server]__efd3fc70._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__efd3fc70._.js");
      case "server/chunks/ssr/[turbopack]_runtime.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[turbopack]_runtime.js");
      case "server/chunks/ssr/_6139f1ce._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_6139f1ce._.js");
      case "server/chunks/ssr/_next-internal_server_app__not-found_page_actions_554ec2bf.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app__not-found_page_actions_554ec2bf.js");
      case "server/chunks/ssr/app_b9b1292a._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/app_b9b1292a._.js");
      case "server/chunks/ssr/node_modules_next_dist_6607e1c8._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_6607e1c8._.js");
      case "server/chunks/ssr/node_modules_next_dist_client_components_9774470f._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_client_components_9774470f._.js");
      case "server/chunks/ssr/node_modules_next_dist_client_components_builtin_forbidden_45780354.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_client_components_builtin_forbidden_45780354.js");
      case "server/chunks/ssr/node_modules_next_dist_esm_build_templates_app-page_b8e1111a.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_esm_build_templates_app-page_b8e1111a.js");
      case "server/chunks/ssr/node_modules_next_dist_esm_eedfc1fd._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_esm_eedfc1fd._.js");
      case "server/chunks/ssr/node_modules_sonner_dist_index_mjs_1addfdea._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_sonner_dist_index_mjs_1addfdea._.js");
      case "server/chunks/ssr/[root-of-the-server]__29a3ee6e._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__29a3ee6e._.js");
      case "server/chunks/ssr/[root-of-the-server]__6ad8f095._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__6ad8f095._.js");
      case "server/chunks/ssr/[root-of-the-server]__a457c799._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__a457c799._.js");
      case "server/chunks/ssr/[root-of-the-server]__a8b9ddde._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__a8b9ddde._.js");
      case "server/chunks/ssr/[root-of-the-server]__c6225425._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__c6225425._.js");
      case "server/chunks/ssr/_000cadf5._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_000cadf5._.js");
      case "server/chunks/ssr/_349cb252._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_349cb252._.js");
      case "server/chunks/ssr/_d9614cba._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_d9614cba._.js");
      case "server/chunks/ssr/_next-internal_server_app_(admin)_analytics_page_actions_edd39567.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_(admin)_analytics_page_actions_edd39567.js");
      case "server/chunks/ssr/components_analytics_AnalyticsDashboard_tsx_6095a4f9._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/components_analytics_AnalyticsDashboard_tsx_6095a4f9._.js");
      case "server/chunks/ssr/lib_db_index_ts_bab9fa88._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/lib_db_index_ts_bab9fa88._.js");
      case "server/chunks/ssr/node_modules_jose_dist_webapi_jwt_verify_a3efd756.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_jose_dist_webapi_jwt_verify_a3efd756.js");
      case "server/chunks/ssr/node_modules_lucide-react_dist_esm_icons_eaf3e446._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_lucide-react_dist_esm_icons_eaf3e446._.js");
      case "server/chunks/ssr/node_modules_next_920e7746._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_920e7746._.js");
      case "server/chunks/ssr/node_modules_next_9fd4e52a._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_9fd4e52a._.js");
      case "server/chunks/ssr/node_modules_next_dist_852965c2._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_852965c2._.js");
      case "server/chunks/ssr/node_modules_next_dist_client_components_builtin_global-error_ece394eb.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_client_components_builtin_global-error_ece394eb.js");
      case "server/chunks/ssr/node_modules_next_dist_client_components_builtin_unauthorized_15817684.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_client_components_builtin_unauthorized_15817684.js");
      case "server/chunks/ssr/[root-of-the-server]__51f6c505._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__51f6c505._.js");
      case "server/chunks/ssr/_1cea3956._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_1cea3956._.js");
      case "server/chunks/ssr/_68b7df95._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_68b7df95._.js");
      case "server/chunks/ssr/_next-internal_server_app_(admin)_guide_page_actions_74415dde.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_(admin)_guide_page_actions_74415dde.js");
      case "server/chunks/ssr/[root-of-the-server]__8aa9ceb0._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__8aa9ceb0._.js");
      case "server/chunks/ssr/_05f9ab2b._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_05f9ab2b._.js");
      case "server/chunks/ssr/_4ed9ce82._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_4ed9ce82._.js");
      case "server/chunks/ssr/_a9335957._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_a9335957._.js");
      case "server/chunks/ssr/_bc559dcb._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_bc559dcb._.js");
      case "server/chunks/ssr/_bd64c6c1._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_bd64c6c1._.js");
      case "server/chunks/ssr/_next-internal_server_app_(admin)_social_page_actions_b8b83b40.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_(admin)_social_page_actions_b8b83b40.js");
      case "server/chunks/ssr/components_social_SocialClient_tsx_50236cdf._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/components_social_SocialClient_tsx_50236cdf._.js");
      case "server/chunks/ssr/components_ui_input_tsx_010b4c1c._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/components_ui_input_tsx_010b4c1c._.js");
      case "server/chunks/ssr/node_modules_@base-ui_dba95f69._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_@base-ui_dba95f69._.js");
      case "server/chunks/ssr/[root-of-the-server]__7a648fc7._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__7a648fc7._.js");
      case "server/chunks/ssr/_6216a9a5._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_6216a9a5._.js");
      case "server/chunks/ssr/_ecafaa99._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_ecafaa99._.js");
      case "server/chunks/ssr/_next-internal_server_app_(admin)_terminal_page_actions_c1f864b1.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_(admin)_terminal_page_actions_c1f864b1.js");
      case "server/chunks/ssr/components_terminal_TerminalClient_tsx_74f2af49._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/components_terminal_TerminalClient_tsx_74f2af49._.js");
      case "server/chunks/ssr/node_modules_@base-ui_f31dac2b._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_@base-ui_f31dac2b._.js");
      case "server/chunks/ssr/[root-of-the-server]__b9356576._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__b9356576._.js");
      case "server/chunks/ssr/_next-internal_server_app__global-error_page_actions_75761787.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app__global-error_page_actions_75761787.js");
      case "server/chunks/ssr/node_modules_next_dist_f21d913a._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_f21d913a._.js");
      case "server/chunks/[root-of-the-server]__5a841c44._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__5a841c44._.js");
      case "server/chunks/[root-of-the-server]__8f5ebbc3._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__8f5ebbc3._.js");
      case "server/chunks/[turbopack]_runtime.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[turbopack]_runtime.js");
      case "server/chunks/_next-internal_server_app_api_auth_login_route_actions_d02a8f19.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_auth_login_route_actions_d02a8f19.js");
      case "server/chunks/node_modules_jose_dist_webapi_jwt_sign_399c59bb.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/node_modules_jose_dist_webapi_jwt_sign_399c59bb.js");
      case "server/chunks/node_modules_next_1402a1da._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/node_modules_next_1402a1da._.js");
      case "server/chunks/[root-of-the-server]__85283e6e._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__85283e6e._.js");
      case "server/chunks/_next-internal_server_app_api_auth_logout_route_actions_5aa6c6ca.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_auth_logout_route_actions_5aa6c6ca.js");
      case "server/chunks/[root-of-the-server]__bdcbf86d._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__bdcbf86d._.js");
      case "server/chunks/_next-internal_server_app_api_cards_[id]_route_actions_af75db7e.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_cards_[id]_route_actions_af75db7e.js");
      case "server/chunks/lib_db_index_ts_6bbf9ad2._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/lib_db_index_ts_6bbf9ad2._.js");
      case "server/chunks/[root-of-the-server]__587f2e1f._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__587f2e1f._.js");
      case "server/chunks/_next-internal_server_app_api_cards_[id]_video_route_actions_1bdfd654.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_cards_[id]_video_route_actions_1bdfd654.js");
      case "server/chunks/[root-of-the-server]__9545a2b1._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__9545a2b1._.js");
      case "server/chunks/_next-internal_server_app_api_cron_publish_route_actions_10cff014.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_cron_publish_route_actions_10cff014.js");
      case "server/chunks/[root-of-the-server]__00b679e9._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__00b679e9._.js");
      case "server/chunks/_next-internal_server_app_api_media_route_actions_1da0e80c.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_media_route_actions_1da0e80c.js");
      case "server/chunks/[root-of-the-server]__acc6fde3._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__acc6fde3._.js");
      case "server/chunks/_next-internal_server_app_api_onboard_file_[id]_route_actions_5c1968d0.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_onboard_file_[id]_route_actions_5c1968d0.js");
      case "server/chunks/[root-of-the-server]__370bdcb0._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__370bdcb0._.js");
      case "server/chunks/_next-internal_server_app_api_onboard_file_route_actions_f0fbc8e5.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_onboard_file_route_actions_f0fbc8e5.js");
      case "server/chunks/[root-of-the-server]__91e9d337._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__91e9d337._.js");
      case "server/chunks/_fe57f4bd._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_fe57f4bd._.js");
      case "server/chunks/_next-internal_server_app_api_onboard_submit_route_actions_2c782ebd.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_onboard_submit_route_actions_2c782ebd.js");
      case "server/chunks/[root-of-the-server]__876c76f2._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__876c76f2._.js");
      case "server/chunks/_next-internal_server_app_api_projects_[id]_route_actions_6fd2e5a5.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_projects_[id]_route_actions_6fd2e5a5.js");
      case "server/chunks/[root-of-the-server]__ca0e6d4a._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__ca0e6d4a._.js");
      case "server/chunks/_next-internal_server_app_api_projects_[id]_send_route_actions_3299d7c5.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_projects_[id]_send_route_actions_3299d7c5.js");
      case "server/chunks/[root-of-the-server]__220db18b._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__220db18b._.js");
      case "server/chunks/_next-internal_server_app_api_projects_[id]_send-connect_route_actions_ea544fe8.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_projects_[id]_send-connect_route_actions_ea544fe8.js");
      case "server/chunks/[root-of-the-server]__61ef2f7d._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__61ef2f7d._.js");
      case "server/chunks/_next-internal_server_app_api_projects_[id]_token_route_actions_946a8413.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_projects_[id]_token_route_actions_946a8413.js");
      case "server/chunks/[root-of-the-server]__87f765e4._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__87f765e4._.js");
      case "server/chunks/_next-internal_server_app_api_projects_route_actions_38c611ee.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_projects_route_actions_38c611ee.js");
      case "server/chunks/[root-of-the-server]__0ef5077a._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__0ef5077a._.js");
      case "server/chunks/_next-internal_server_app_api_review_approve_route_actions_1946de76.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_review_approve_route_actions_1946de76.js");
      case "server/chunks/[root-of-the-server]__da9742d6._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__da9742d6._.js");
      case "server/chunks/_next-internal_server_app_api_review_deny_route_actions_b0c67a3f.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_review_deny_route_actions_b0c67a3f.js");
      case "server/chunks/[root-of-the-server]__f622bd83._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__f622bd83._.js");
      case "server/chunks/_next-internal_server_app_api_review_descriptions_route_actions_fec6d72b.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_review_descriptions_route_actions_fec6d72b.js");
      case "server/chunks/[root-of-the-server]__d8b311bb._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__d8b311bb._.js");
      case "server/chunks/_next-internal_server_app_api_review_session_route_actions_ede3f34b.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_review_session_route_actions_ede3f34b.js");
      case "server/chunks/[root-of-the-server]__f3ef67be._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__f3ef67be._.js");
      case "server/chunks/_next-internal_server_app_api_social_data-deletion_route_actions_fbc22be8.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_social_data-deletion_route_actions_fbc22be8.js");
      case "server/chunks/[root-of-the-server]__052a0175._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__052a0175._.js");
      case "server/chunks/_next-internal_server_app_api_social_insights_sync_route_actions_5df3fb9a.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_social_insights_sync_route_actions_5df3fb9a.js");
      case "server/chunks/[root-of-the-server]__59640af7._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__59640af7._.js");
      case "server/chunks/_next-internal_server_app_api_social_instagram_callback_route_actions_f92369d5.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_social_instagram_callback_route_actions_f92369d5.js");
      case "server/chunks/[root-of-the-server]__c505fd0f._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__c505fd0f._.js");
      case "server/chunks/_next-internal_server_app_api_social_instagram_connect_route_actions_3214a59f.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_social_instagram_connect_route_actions_3214a59f.js");
      case "server/chunks/[root-of-the-server]__1a3132fc._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__1a3132fc._.js");
      case "server/chunks/_next-internal_server_app_api_social_instagram_disconnect_route_actions_0d1afd51.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_social_instagram_disconnect_route_actions_0d1afd51.js");
      case "server/chunks/[root-of-the-server]__d2d19da1._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__d2d19da1._.js");
      case "server/chunks/_next-internal_server_app_api_social_posts_[id]_route_actions_34308509.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_social_posts_[id]_route_actions_34308509.js");
      case "server/chunks/[root-of-the-server]__80446184._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__80446184._.js");
      case "server/chunks/_next-internal_server_app_api_social_posts_route_actions_e2918bb4.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_social_posts_route_actions_e2918bb4.js");
      case "server/chunks/[root-of-the-server]__05c59c67._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__05c59c67._.js");
      case "server/chunks/_next-internal_server_app_api_social_reddit_callback_route_actions_79581a2c.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_social_reddit_callback_route_actions_79581a2c.js");
      case "server/chunks/[root-of-the-server]__e158bd45._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__e158bd45._.js");
      case "server/chunks/_next-internal_server_app_api_social_reddit_connect_route_actions_86baa1db.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_social_reddit_connect_route_actions_86baa1db.js");
      case "server/chunks/[root-of-the-server]__f5e2716c._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__f5e2716c._.js");
      case "server/chunks/_next-internal_server_app_api_social_reddit_subreddits_route_actions_21afaba0.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_social_reddit_subreddits_route_actions_21afaba0.js");
      case "server/chunks/[root-of-the-server]__d24a9845._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__d24a9845._.js");
      case "server/chunks/_next-internal_server_app_api_social_youtube_callback_route_actions_e2bb717b.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_social_youtube_callback_route_actions_e2bb717b.js");
      case "server/chunks/[root-of-the-server]__b6233dff._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__b6233dff._.js");
      case "server/chunks/_next-internal_server_app_api_social_youtube_connect_route_actions_202f5f52.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_social_youtube_connect_route_actions_202f5f52.js");
      case "server/chunks/[root-of-the-server]__bd6c3f01._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__bd6c3f01._.js");
      case "server/chunks/_next-internal_server_app_api_social_zernio_callback_route_actions_745a80a8.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_social_zernio_callback_route_actions_745a80a8.js");
      case "server/chunks/[root-of-the-server]__088e3943._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__088e3943._.js");
      case "server/chunks/_next-internal_server_app_api_social_zernio_connect_route_actions_7036ed77.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_social_zernio_connect_route_actions_7036ed77.js");
      case "server/chunks/ssr/[root-of-the-server]__981ad998._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__981ad998._.js");
      case "server/chunks/ssr/_8fd11bc9._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_8fd11bc9._.js");
      case "server/chunks/ssr/_f7540c3b._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_f7540c3b._.js");
      case "server/chunks/ssr/_next-internal_server_app_blog_ai-video-ads-pricing-2026_page_actions_8393b8a9.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_blog_ai-video-ads-pricing-2026_page_actions_8393b8a9.js");
      case "server/chunks/ssr/app_blog_ai-video-ads-pricing-2026_page_tsx_1315c55e._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/app_blog_ai-video-ads-pricing-2026_page_tsx_1315c55e._.js");
      case "server/chunks/ssr/[root-of-the-server]__44ced293._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__44ced293._.js");
      case "server/chunks/ssr/_dcf1260f._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_dcf1260f._.js");
      case "server/chunks/ssr/ce889_server_app_blog_best-ai-video-agency-for-coaches_page_actions_1c7162df.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/ce889_server_app_blog_best-ai-video-agency-for-coaches_page_actions_1c7162df.js");
      case "server/chunks/ssr/_48d4ff0c._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_48d4ff0c._.js");
      case "server/chunks/ssr/app_blog_done-for-you-ai-video-content_page_tsx_5a037909._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/app_blog_done-for-you-ai-video-content_page_tsx_5a037909._.js");
      case "server/chunks/ssr/ce889_server_app_blog_done-for-you-ai-video-content_page_actions_6d480bea.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/ce889_server_app_blog_done-for-you-ai-video-content_page_actions_6d480bea.js");
      case "server/chunks/ssr/_89590670._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_89590670._.js");
      case "server/chunks/ssr/_next-internal_server_app_blog_heygen-vs-custom-ai-avatars_page_actions_8989df21.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_blog_heygen-vs-custom-ai-avatars_page_actions_8989df21.js");
      case "server/chunks/ssr/app_blog_heygen-vs-custom-ai-avatars_page_tsx_bb8fcc3c._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/app_blog_heygen-vs-custom-ai-avatars_page_tsx_bb8fcc3c._.js");
      case "server/chunks/ssr/[root-of-the-server]__453fc5a0._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__453fc5a0._.js");
      case "server/chunks/ssr/_62a1c3e7._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_62a1c3e7._.js");
      case "server/chunks/ssr/bec2d_app_blog_linkedin-video-strategy-for-business-owners_page_actions_b8c841c6.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/bec2d_app_blog_linkedin-video-strategy-for-business-owners_page_actions_b8c841c6.js");
      case "server/chunks/ssr/[root-of-the-server]__b37f8699._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__b37f8699._.js");
      case "server/chunks/ssr/_f41be247._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_f41be247._.js");
      case "server/chunks/ssr/_next-internal_server_app_blog_page_actions_cb4aaadc.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_blog_page_actions_cb4aaadc.js");
      case "server/chunks/ssr/[root-of-the-server]__3acda3aa._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__3acda3aa._.js");
      case "server/chunks/ssr/_29c7b71c._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_29c7b71c._.js");
      case "server/chunks/ssr/_next-internal_server_app_book_page_actions_fd0dd983.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_book_page_actions_fd0dd983.js");
      case "server/chunks/ssr/[root-of-the-server]__5c86cb9d._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__5c86cb9d._.js");
      case "server/chunks/ssr/_5a59ae80._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_5a59ae80._.js");
      case "server/chunks/ssr/_672f0d15._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_672f0d15._.js");
      case "server/chunks/ssr/_next-internal_server_app_connect_page_actions_b6137cf2.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_connect_page_actions_b6137cf2.js");
      case "server/chunks/ssr/[root-of-the-server]__c590fc9e._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__c590fc9e._.js");
      case "server/chunks/ssr/_a1f5cb93._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_a1f5cb93._.js");
      case "server/chunks/ssr/_next-internal_server_app_data-deletion_page_actions_c9807dd4.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_data-deletion_page_actions_c9807dd4.js");
      case "server/chunks/[externals]_next_dist_5d827350._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/[externals]_next_dist_5d827350._.js");
      case "server/chunks/_next-internal_server_app_favicon_ico_route_actions_353150a5.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_favicon_ico_route_actions_353150a5.js");
      case "server/chunks/node_modules_next_dist_esm_build_templates_app-route_d6a474cc.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/node_modules_next_dist_esm_build_templates_app-route_d6a474cc.js");
      case "server/chunks/ssr/[root-of-the-server]__51639b1c._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__51639b1c._.js");
      case "server/chunks/ssr/[root-of-the-server]__e1b2e646._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__e1b2e646._.js");
      case "server/chunks/ssr/_30e06fe7._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_30e06fe7._.js");
      case "server/chunks/ssr/_3ae53a05._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_3ae53a05._.js");
      case "server/chunks/ssr/_next-internal_server_app_login_page_actions_0e9aafc0.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_login_page_actions_0e9aafc0.js");
      case "server/chunks/ssr/[root-of-the-server]__da9b3952._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__da9b3952._.js");
      case "server/chunks/ssr/_37482583._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_37482583._.js");
      case "server/chunks/ssr/_45c471e7._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_45c471e7._.js");
      case "server/chunks/ssr/_next-internal_server_app_onboard_page_actions_658215a0.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_onboard_page_actions_658215a0.js");
      case "server/chunks/ssr/app_onboard_OnboardClient_tsx_99306868._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/app_onboard_OnboardClient_tsx_99306868._.js");
      case "server/chunks/ssr/[root-of-the-server]__35cfe2f6._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__35cfe2f6._.js");
      case "server/chunks/ssr/_27f38564._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_27f38564._.js");
      case "server/chunks/ssr/_6798d0e6._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_6798d0e6._.js");
      case "server/chunks/ssr/_next-internal_server_app_page_actions_39d4fc33.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_page_actions_39d4fc33.js");
      case "server/chunks/ssr/app_page_tsx_5c04f47b._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/app_page_tsx_5c04f47b._.js");
      case "server/chunks/ssr/[root-of-the-server]__6f086a1e._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__6f086a1e._.js");
      case "server/chunks/ssr/_bb28d496._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_bb28d496._.js");
      case "server/chunks/ssr/_next-internal_server_app_pricing_page_actions_61c195a2.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_pricing_page_actions_61c195a2.js");
      case "server/chunks/ssr/[root-of-the-server]__fbd011d6._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__fbd011d6._.js");
      case "server/chunks/ssr/_190bd073._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_190bd073._.js");
      case "server/chunks/ssr/_next-internal_server_app_privacy_page_actions_78bfea85.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_privacy_page_actions_78bfea85.js");
      case "server/chunks/ssr/app_privacy_page_tsx_4e5615af._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/app_privacy_page_tsx_4e5615af._.js");
      case "server/chunks/ssr/[root-of-the-server]__9cd2fb01._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__9cd2fb01._.js");
      case "server/chunks/ssr/_934a439b._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_934a439b._.js");
      case "server/chunks/ssr/_b816406f._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_b816406f._.js");
      case "server/chunks/ssr/_f00c6e4b._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_f00c6e4b._.js");
      case "server/chunks/ssr/_next-internal_server_app_review_page_actions_b42d6f91.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_review_page_actions_b42d6f91.js");
      case "server/chunks/ssr/components_review_ReviewClient_tsx_c6598b9d._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/components_review_ReviewClient_tsx_c6598b9d._.js");
      case "server/chunks/_next-internal_server_app_sitemap_xml_route_actions_12658ace.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_sitemap_xml_route_actions_12658ace.js");
      case "server/chunks/node_modules_next_dist_26075311._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/node_modules_next_dist_26075311._.js");
      case "server/chunks/ssr/[root-of-the-server]__062b4ad1._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__062b4ad1._.js");
      case "server/chunks/ssr/_6b06d5f5._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_6b06d5f5._.js");
      case "server/chunks/ssr/_next-internal_server_app_terms_page_actions_3b82705a.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_terms_page_actions_3b82705a.js");
      case "server/chunks/ssr/[root-of-the-server]__1467b0e7._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__1467b0e7._.js");
      case "server/chunks/ssr/_6cac1b2d._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_6cac1b2d._.js");
      case "server/chunks/ssr/_86462a5a._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_86462a5a._.js");
      case "server/chunks/ssr/_next-internal_server_app_tools_ai-video-tools_page_actions_9a541c4e.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_tools_ai-video-tools_page_actions_9a541c4e.js");
      case "server/chunks/ssr/app_tools_ai-video-tools_page_tsx_a8170603._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/app_tools_ai-video-tools_page_tsx_a8170603._.js");
      case "server/chunks/ssr/[root-of-the-server]__021dc6e8._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__021dc6e8._.js");
      case "server/chunks/ssr/_04f3a2da._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_04f3a2da._.js");
      case "server/chunks/ssr/_96c4bccf._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_96c4bccf._.js");
      case "server/chunks/ssr/_next-internal_server_app_tools_hook-generator_page_actions_c9c4c5de.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_tools_hook-generator_page_actions_c9c4c5de.js");
      case "server/chunks/ssr/[root-of-the-server]__b8fa8cd1._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__b8fa8cd1._.js");
      case "server/chunks/ssr/_6ed2ff14._.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_6ed2ff14._.js");
      case "server/chunks/ssr/_next-internal_server_app_tools_page_actions_3bc858b5.js": return require("/Users/atlas/repo/assurgit/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_tools_page_actions_3bc858b5.js");
      default:
        throw new Error(`Not found ${chunkPath}`);
    }
  }
