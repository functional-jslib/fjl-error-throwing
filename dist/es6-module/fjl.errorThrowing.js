import { _isType, curry, curry4, intercalate, isArray, isFunction, isString, length, map, typeOf } from 'fjl';

/**
 * Content generated by '{project-root}/node-scripts/VersionNumberReadStream.js'.
 * Generated Mon Oct 16 2017 16:47:07 GMT-0400 (Eastern Daylight Time) 
 */

let version = '0.5.0';

/**
 * @module fjlErrorThrowing
 */
/**
 * @typedef {*} Any - Synonym for 'any value'.
 * @typedef {Object<value, valueName, expectedTypeName, foundTypeName, messageSuffix>} TemplateContext
 */

/**
 * Error message template function.
 * @typedef {Function} errorMessageCall
 * @param tmplContext {TemplateContext}
 * @returns {String}
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

const getTypeName = type => {
        if (isString(type)) { return type; }
        else if (isFunction(type)) { return type.name; }
        throw Error('`fjlErrorThrowing.getTypeName` only accepts strings and/or constructors.  ' +
            'Value type received: ' + typeOf(type) + ';  Value: ' + type);
    };
const multiTypesToString = types => length(types) ?
             intercalate(', ', map(type => `\`${getTypeName(type)}\``, types)) : '';
const defaultErrorMessageCall = tmplContext => {
        const {
            contextName, valueName, value, expectedTypeName,
            foundTypeName, messageSuffix
        } = tmplContext,
            isMultiTypeNames = isArray(expectedTypeName),
            typesCopy = isMultiTypeNames ? 'of type' : 'of one of the types',
            typesToMatchCopy = isMultiTypeNames ? multiTypesToString(expectedTypeName) : expectedTypeName;
        return (contextName ? `\`${contextName}.` : '`') +
            `${valueName}\` is not ${typesCopy}: ${typesToMatchCopy}.  ` +
            `Type received: ${foundTypeName}.  Value: ${value};` +
            `${messageSuffix ?  '  ' + messageSuffix + ';' : ''}`;
    };
const getErrorIfNotTypeThrower$ = errorMessageCall => (contextName, valueName, value, ValueType, messageSuffix = null) => {
        const expectedTypeName = getTypeName(ValueType),
            foundTypeName = typeOf(value);
        if (_isType(expectedTypeName, value)) { return; }
        throw new Error(errorMessageCall(
            {contextName, valueName, value, expectedTypeName, foundTypeName, messageSuffix}
        ));
    };
const getErrorIfNotTypesThrower$ = errorMessageCall => (contextName, valueName, value, ...valueTypes) => {
        const expectedTypeNames = valueTypes.map(getTypeName),
            matchFound = expectedTypeNames.some(ValueType => _isType(ValueType, value)),
            foundTypeName = typeOf(value);
        if (matchFound) { return; }
        throw new Error(
            errorMessageCall({
                contextName, valueName, value,
                expectedTypeName: expectedTypeNames, foundTypeName
            })
        );
    };
const errorIfNotType$ = getErrorIfNotTypeThrower$(defaultErrorMessageCall);
const errorIfNotTypes$ = getErrorIfNotTypesThrower$(defaultErrorMessageCall);
const errorIfNotType = curry(errorIfNotType$);
const errorIfNotTypes = curry4(errorIfNotTypes$);
const getErrorIfNotTypeThrower = errorMessageCall => curry(getErrorIfNotTypeThrower$(errorMessageCall));
const getErrorIfNotTypesThrower = errorMessageCall => curry4(getErrorIfNotTypesThrower$(errorMessageCall));

export { getTypeName, multiTypesToString, defaultErrorMessageCall, getErrorIfNotTypeThrower$, getErrorIfNotTypesThrower$, errorIfNotType$, errorIfNotTypes$, errorIfNotType, errorIfNotTypes, getErrorIfNotTypeThrower, getErrorIfNotTypesThrower, version };
