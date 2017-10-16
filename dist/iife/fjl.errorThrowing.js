this.fjl = this.fjl || {};
this.fjl.errorThrowing = (function (exports,fjl) {
'use strict';

/**
 * Content generated by '{project-root}/node-scripts/VersionNumberReadStream.js'.
 * Generated Sun Oct 15 2017 23:50:22 GMT-0400 (Eastern Daylight Time) 
 */

var version = '1.0.0';

/**
 * @module fjlErrorThrowing
 */
/**
 * Error message template function.
 * @typedef {Function} errorMessageCall
 * @param tmplContext {TemplateContext}
 * @returns {String}
 */

/**
 * @typedef {Object} TemplateContext
 */

/**
 * Used to ensure value matches passed in type.
 * @typedef {Function} errorIfNotType
 * @param valueName {String}
 * @param value {Any}
 * @param type {String|Function} - Constructor name or constructor.
 * @throws {Error} - If value doesn't match type.
 * @returns {Undefined}
 */

/**
 * Used to ensure a value matches one of one or more types passed in.
 * @typedef {Function} errorIfNotTypes
 * @param valueName {String}
 * @param value {Any}
 * @param valueTypes {...(String|Function)} - Constructor names or constructors.
 * @throws {Error} - If value doesn't match type.
 * @returns {Undefined}
 */

var getTypeName = function getTypeName(type) {
    if (fjl.isString(type)) {
        return type;
    } else if (fjl.isFunction(type)) {
        return type.name;
    }
    throw Error('`fjl.error.getTypeName` only accepts strings and/or constructors.  ' + 'Value type received: ' + fjl.typeOf(type) + ';  Value: ' + type);
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
var getErrorIfNotTypeThrower = function getErrorIfNotTypeThrower(contextName, errorMessageCall) {
    return function (valueName, value, ValueType) {
        var messageSuffix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        var expectedTypeName = getTypeName(ValueType),
            foundTypeName = fjl.typeOf(value);
        if (fjl._isType(expectedTypeName, value)) {
            return;
        }
        throw new Error(errorMessageCall({ contextName: contextName, valueName: valueName, value: value, expectedTypeName: expectedTypeName, foundTypeName: foundTypeName, messageSuffix: messageSuffix }));
    };
};
var getErrorIfNotTypesThrower = function getErrorIfNotTypesThrower(contextName, errorMessageCall) {
    return function (valueName, value) {
        for (var _len = arguments.length, valueTypes = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            valueTypes[_key - 2] = arguments[_key];
        }

        var expectedTypeNames = valueTypes.map(getTypeName),
            matchFound = expectedTypeNames.some(function (ValueType) {
            return fjl._isType(ValueType, value);
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
var errorIfNotTypeThrower = function errorIfNotTypeThrower(contextName) {
    return getErrorIfNotTypeThrower(contextName, defaultErrorMessageCall);
};
var errorIfNotTypesThrower = function errorIfNotTypesThrower(contextName) {
    return getErrorIfNotTypesThrower(contextName, defaultErrorMessageCall);
};

exports.getErrorIfNotTypeThrower = getErrorIfNotTypeThrower;
exports.getErrorIfNotTypesThrower = getErrorIfNotTypesThrower;
exports.errorIfNotTypeThrower = errorIfNotTypeThrower;
exports.errorIfNotTypesThrower = errorIfNotTypesThrower;
exports.version = version;

return exports;

}({},fjl));
//# sourceMappingURL=fjl.errorThrowing.js.map
