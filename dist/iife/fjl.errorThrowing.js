this.fjl = this.fjl || {};
this.fjl.errorThrowing = (function (exports,fjl) {
'use strict';

/**
 * @memberOf module:fjlErrorThrowing
 * @property {String} version - Semantic version string.
 * @note Content generated by '{project-root}/node-scripts/VersionNumberReadStream.js'.
 * @generated Tue Nov 21 2017 11:56:13 GMT-0500 (Eastern Standard Time) 
 */

var version = '0.7.5';

/**
 * @module fjlErrorThrowing
 * @description Contains error throwing facilities for when a value doesn't match a type.
 *  In addition gives you curried and uncurried versions of the multi arity functions included.
 */
var isCheckableType = function isCheckableType(type) {
    return fjl.isString(type) || fjl.isFunction(type);
};
var errorIfNotCheckableType = function errorIfNotCheckableType(contextName, type) {
    if (!isCheckableType(type)) {
        throw new Error(contextName + ' expects Types to be checked against to be of type `String` or `Function`.' + ('  Type received `' + fjl.typeOf(type) + '`.  Value `' + type + '`.'));
    }
    return type;
};
var getTypeName = function getTypeName(type) {
    return errorIfNotCheckableType('getTypeName', type) && fjl.isString(type) ? type : type.name;
};
var defaultTypeChecker$ = function defaultTypeChecker$(Type, value) {
    return fjl._isType(getTypeName(Type), value) || fjl.isFunction(Type) && fjl.isset(value) && value instanceof Type;
};
var multiTypesToString = function multiTypesToString(types) {
    return fjl.length(types) ? fjl.intercalate(', ', fjl.map(function (type) {
        return '`' + getTypeName(type) + '`';
    }, types)) : '';
};
var defaultErrorMessageCall = function defaultErrorMessageCall(tmplContext) {
    var contextName = tmplContext.contextName,
        valueName = tmplContext.valueName,
        value = tmplContext.value,
        expectedTypeName = tmplContext.expectedTypeName,
        foundTypeName = tmplContext.foundTypeName,
        messageSuffix = tmplContext.messageSuffix,
        isMultiTypeNames = fjl.isArray(expectedTypeName),
        typesCopy = isMultiTypeNames ? 'of type' : 'of one of the types',
        typesToMatchCopy = isMultiTypeNames ? multiTypesToString(expectedTypeName) : expectedTypeName;

    return (contextName ? '`' + contextName + '.' : '`') + (valueName + '` is not ' + typesCopy + ': ' + typesToMatchCopy + '.  ') + ('Type received: ' + foundTypeName + '.  Value: ' + value + ';') + ('' + (messageSuffix ? '  ' + messageSuffix + ';' : ''));
};
var getErrorIfNotTypeThrower$ = function getErrorIfNotTypeThrower$(errorMessageCall) {
    var typeChecker = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultTypeChecker$;
    return function (ValueType, contextName, valueName, value) {
        var messageSuffix = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

        var expectedTypeName = getTypeName(ValueType),
            foundTypeName = fjl.typeOf(value);
        if (typeChecker(ValueType, value)) {
            return;
        } // Value matches type
        throw new Error(errorMessageCall({ contextName: contextName, valueName: valueName, value: value, expectedTypeName: expectedTypeName, foundTypeName: foundTypeName, messageSuffix: messageSuffix }));
    };
};
var getErrorIfNotTypesThrower$ = function getErrorIfNotTypesThrower$(errorMessageCall) {
    var typeChecker = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultTypeChecker$;
    return function (valueTypes, contextName, valueName, value) {
        var expectedTypeNames = valueTypes.map(getTypeName),
            matchFound = valueTypes.some(function (ValueType) {
            return typeChecker(ValueType, value);
        }),
            foundTypeName = fjl.typeOf(value);
        if (matchFound) {
            return;
        }
        throw new Error(errorMessageCall({
            contextName: contextName, valueName: valueName, value: value,
            expectedTypeName: expectedTypeNames, foundTypeName: foundTypeName
        }));
    };
};
var errorIfNotType$ = getErrorIfNotTypeThrower$(defaultErrorMessageCall);
var errorIfNotTypes$ = getErrorIfNotTypesThrower$(defaultErrorMessageCall);
var defaultTypeChecker = fjl.curry(defaultTypeChecker$);
var errorIfNotType = fjl.curry(errorIfNotType$);
var errorIfNotTypes = fjl.curry4(errorIfNotTypes$);
var getErrorIfNotTypeThrower = function getErrorIfNotTypeThrower(errorMessageCall) {
    return fjl.curry(getErrorIfNotTypeThrower$(errorMessageCall));
};
var getErrorIfNotTypesThrower = function getErrorIfNotTypesThrower(errorMessageCall) {
    return fjl.curry4(getErrorIfNotTypesThrower$(errorMessageCall));
};

var fjl_errorThrowing = {
    defaultTypeChecker$: defaultTypeChecker$,
    defaultTypeChecker: defaultTypeChecker,
    getTypeName: getTypeName,
    multiTypesToString: multiTypesToString,
    defaultErrorMessageCall: defaultErrorMessageCall,
    errorIfNotType$: errorIfNotType$,
    errorIfNotType: errorIfNotType,
    errorIfNotTypes$: errorIfNotTypes$,
    errorIfNotTypes: errorIfNotTypes,
    getErrorIfNotTypeThrower$: getErrorIfNotTypeThrower$,
    getErrorIfNotTypeThrower: getErrorIfNotTypeThrower,
    getErrorIfNotTypesThrower$: getErrorIfNotTypesThrower$,
    getErrorIfNotTypesThrower: getErrorIfNotTypesThrower
};

exports.isCheckableType = isCheckableType;
exports.errorIfNotCheckableType = errorIfNotCheckableType;
exports.getTypeName = getTypeName;
exports.defaultTypeChecker$ = defaultTypeChecker$;
exports.multiTypesToString = multiTypesToString;
exports.defaultErrorMessageCall = defaultErrorMessageCall;
exports.getErrorIfNotTypeThrower$ = getErrorIfNotTypeThrower$;
exports.getErrorIfNotTypesThrower$ = getErrorIfNotTypesThrower$;
exports.errorIfNotType$ = errorIfNotType$;
exports.errorIfNotTypes$ = errorIfNotTypes$;
exports.defaultTypeChecker = defaultTypeChecker;
exports.errorIfNotType = errorIfNotType;
exports.errorIfNotTypes = errorIfNotTypes;
exports.getErrorIfNotTypeThrower = getErrorIfNotTypeThrower;
exports.getErrorIfNotTypesThrower = getErrorIfNotTypesThrower;
exports['default'] = fjl_errorThrowing;
exports.version = version;

return exports;

}({},fjl));
//# sourceMappingURL=fjl.errorThrowing.js.map
