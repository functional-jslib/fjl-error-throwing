define(['exports', './generated/version', 'fjl'], function (exports, _version, _fjl) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.getErrorIfNotTypesThrower = exports.getErrorIfNotTypeThrower = exports.errorIfNotTypes = exports.errorIfNotType = exports.defaultTypeChecker = exports.errorIfNotTypes$ = exports.errorIfNotType$ = exports.getErrorIfNotTypesThrower$ = exports.getErrorIfNotTypeThrower$ = exports.defaultErrorMessageCall = exports.multiTypesToString = exports.defaultTypeChecker$ = exports.getTypeName = exports.errorIfNotCheckableType = exports.isCheckableType = exports.version = undefined;
    Object.defineProperty(exports, 'version', {
        enumerable: true,
        get: function () {
            return _version.version;
        }
    });
    const

    /**
     * Checks if `type` is a string or a function (constructor or constructor name)
     * @function module:fjlErrorThrowing.isCheckableType
     * @param type {TypeRef}
     * @returns {Boolean}
     */
    isCheckableType = exports.isCheckableType = type => (0, _fjl.isString)(type) || (0, _fjl.isFunction)(type),


    /**
     * Throws an error if `type` is not a checkable type (can't be checked by the `TypeChecker` type)
     * @function module:fjlErrorThrowing.errorIfNotCheckableType
     * @param contextName {String}
     * @param type {TypeRef}
     * @returns {TypeRef} - Type passed in if `type` is checkable
     */
    errorIfNotCheckableType = exports.errorIfNotCheckableType = (contextName, type) => {
        if (!isCheckableType(type)) {
            throw new Error(`${contextName} expects \`type\` to be of type \`String\` or \`Function\`.` + `  Type received \`${(0, _fjl.typeOf)(type)}\`.  Value \`${type}\`.`);
        }
        return type;
    },


    /**
     * Resolves/normalizes a type name from either a string or a constructor.
     * @private
     * @function module:fjlErrorThrowing.getTypeName
     * @param type {Function|String} - String or function representing a type.
     * @returns {String}
     * @private
     */
    getTypeName = exports.getTypeName = type => errorIfNotCheckableType('getTypeName', type) && (0, _fjl.isString)(type) ? type : type.name,


    /**
     * Returns a boolean indicating whether given value matches given type.
     * @function module:fjlErrorThrowing.defaultTypeChecker$
     * @param Type {String|Function} - Type name, constructor and/or class.
     * @param value {*}
     * @returns {Boolean}
     */
    defaultTypeChecker$ = exports.defaultTypeChecker$ = (Type, value) => (0, _fjl._isType)(getTypeName(Type), value) || (0, _fjl.isFunction)(Type) && (0, _fjl.isset)(value) && value instanceof Type,


    /**
     * Pretty prints an array of types/type-strings for use by error messages;
     * Outputs "`SomeTypeName`, ..." from [SomeType, 'SomeTypeName', etc...]
     * @private
     * @function module:fjlErrorThrowing.multiTypesToString
     * @param types {Array|TypesArray}
     * @return {String}
     * @private
     */
    multiTypesToString = exports.multiTypesToString = types => (0, _fjl.length)(types) ? (0, _fjl.intercalate)(', ', (0, _fjl.map)(type => `\`${getTypeName(type)}\``, types)) : '',


    /**
     * Prints a message from an object.  Object signature:
     * {contextName, valueName, value, expectedTypeName, foundTypeName, messageSuffix}
     * @function module:fjlErrorThrowing.defaultErrorMessageCall
     * @param tmplContext {Object|TemplateContext} - Object to use in error template.
     * @returns {string}
     * @private
     */
    defaultErrorMessageCall = exports.defaultErrorMessageCall = tmplContext => {
        const {
            contextName, valueName, value, expectedTypeName,
            foundTypeName, messageSuffix
        } = tmplContext,
              isMultiTypeNames = (0, _fjl.isArray)(expectedTypeName),
              typesCopy = isMultiTypeNames ? 'of type' : 'of one of the types',
              typesToMatchCopy = isMultiTypeNames ? multiTypesToString(expectedTypeName) : expectedTypeName;
        return (contextName ? `\`${contextName}.` : '`') + `${valueName}\` is not ${typesCopy}: ${typesToMatchCopy}.  ` + `Type received: ${foundTypeName}.  Value: ${value};` + `${messageSuffix ? '  ' + messageSuffix + ';' : ''}`;
    },


    /**
     * Gets the error message thrower seeded with passed in errorMessage template call.
     * @function module:fjlErrorThrowing.getErrorIfNotTypeThrower$
     * @param errorMessageCall {Function|ErrorMessageCall}
     * @param typeChecker {Function|TypeChecker} - Function<Type, value>:Boolean
     * @returns {Function|ErrorIfNotType}
     */
    getErrorIfNotTypeThrower$ = exports.getErrorIfNotTypeThrower$ = (errorMessageCall, typeChecker = defaultTypeChecker$) => (ValueType, contextName, valueName, value, messageSuffix = null) => {
        const expectedTypeName = getTypeName(ValueType),
              foundTypeName = (0, _fjl.typeOf)(value);
        if (typeChecker(ValueType, value)) {
            return;
        } // Value matches type
        throw new Error(errorMessageCall({ contextName, valueName, value, expectedTypeName, foundTypeName, messageSuffix }));
    },


    /**
     * Gets the error message thrower seeded with passed in errorMessage template call.
     * @function module:fjlErrorThrowing.getErrorIfNotTypesThrower$
     * @param errorMessageCall {Function|ErrorMessageCall}
     * @param typeChecker {Function|TypeChecker} - Function<Type, value>:Boolean
     * @returns {Function|ErrorIfNotTypes}
     */
    getErrorIfNotTypesThrower$ = exports.getErrorIfNotTypesThrower$ = (errorMessageCall, typeChecker = defaultTypeChecker$) => (valueTypes, contextName, valueName, value) => {
        const expectedTypeNames = valueTypes.map(getTypeName),
              matchFound = valueTypes.some(ValueType => typeChecker(ValueType, value)),
              foundTypeName = (0, _fjl.typeOf)(value);
        if (matchFound) {
            return;
        }
        throw new Error(errorMessageCall({
            contextName, valueName, value,
            expectedTypeName: expectedTypeNames, foundTypeName
        }));
    },


    /**
     * Checks that passed in `value` is of given `type`.  Throws an error if value
     * is not of given `type`.  This is the un-curried version.  For the curried version
     * see `module:fjlErrorThrowing.errorIfNotType`.
     * @function module:fjlErrorThrowing.errorIfNotType$
     * @param type {String|Function} - Type's name or type itself.
     * @param contextName {String} - Name of context to attribute errors if thrown.
     * @param valueName {String} - String rep of value.
     * @param value {*}
     * @param [messageSuffix=null] {String} - Optional.
     * @returns {undefined}
     * @uncurried
     */
    errorIfNotType$ = exports.errorIfNotType$ = getErrorIfNotTypeThrower$(defaultErrorMessageCall),


    /**
     * Checks that passed in `value` is of one of the given `types`.  Throws an error if value
     *  is not of one of the given `types`.  This is the un-curried version.  For the curried version
     * see `module:fjlErrorThrowing.errorIfNotTypes`.
     * @type {Function|module:fjlErrorThrowing.errorIfNotTypes}
     * @function module:fjlErrorThrowing.errorIfNotTypes$
     * @param types {Array} - Array of one or more types or type names themselves.
     * @param contextName {String} - Name of context to attribute errors if thrown.
     * @param valueName {String} - String rep of value.
     * @param value {*}
     * @returns {undefined}
     * @uncurried
     */
    errorIfNotTypes$ = exports.errorIfNotTypes$ = getErrorIfNotTypesThrower$(defaultErrorMessageCall),


    /**
     * Same as `defaultTypeChecker$` except curried:
     *  "Returns a boolean indicating whether given value matches given type".
     * @curried
     * @function module:fjlErrorThrowing.defaultTypeChecker
     * @param Type {String|Function} - Type name, constructor and/or class.
     * @param value {*}
     * @returns {Boolean}
     */
    defaultTypeChecker = exports.defaultTypeChecker = (0, _fjl.curry)(defaultTypeChecker$),


    /**
     * Checks that passed in `value` is of given `type`.  Throws an error if value
     * is not of given `type`.  Curried.
     * @function module:fjlErrorThrowing.errorIfNotType
     * @param type {String|Function} - Type's name or type itself.
     * @param contextName {String} - Name of context to attribute errors if thrown.
     * @param valueName {String} - String rep of value.
     * @param value {*}
     * @param [messageSuffix=null] {String} - Optional.
     * @returns {undefined}
     * @curried
     */
    errorIfNotType = exports.errorIfNotType = (0, _fjl.curry)(errorIfNotType$),


    /**
     * Checks that passed in `value` is of one of the given `types`.  Throws an error if value
     *  is not of one of the given `types`.  Curried.
     * @function module:fjlErrorThrowing.errorIfNotTypes
     * @param types {Array} - Array of one or more types or type names themselves.
     * @param contextName {String} - Name of context to attribute errors if thrown.
     * @param valueName {String} - String rep of value.
     * @param value {*}
     * @returns {undefined}
     * @curried
     */
    errorIfNotTypes = exports.errorIfNotTypes = (0, _fjl.curry4)(errorIfNotTypes$),


    /**
     * Returns a function that can be used to ensure that values are of a given type.
     *   Also throws informative error messages containing the value types, names, expected type names,
     *   etc.
     * @function module:fjlErrorThrowing.getErrorIfNotTypeThrower
     * @param errorMessageCall {Function|ErrorMessageCall} - Template function (takes an info-object and returns a printed string).
     * @returns {Function|ErrorIfNotType} - Returns a function with the same signature as `errorIfNotType` though curried.
     */
    getErrorIfNotTypeThrower = exports.getErrorIfNotTypeThrower = errorMessageCall => (0, _fjl.curry)(getErrorIfNotTypeThrower$(errorMessageCall)),


    /**
     * Returns a function that can be used to ensure that a value is of one or more given types.
     *   The returned function is used in cases where informative error messages
     *   containing the value types, names, expected type names, are-required/should-be-used etc.
     * @function module:fjlErrorThrowing.getErrorIfNotTypesThrower
     * @param errorMessageCall {Function|ErrorMessageCall} - Template function (takes an info-object and returns a printed string).
     * @returns {Function|ErrorIfNotTypes} - Returns a function with the same signature as `errorIfNotTypes` though curried.
     */
    getErrorIfNotTypesThrower = exports.getErrorIfNotTypesThrower = errorMessageCall => (0, _fjl.curry4)(getErrorIfNotTypesThrower$(errorMessageCall));

    exports.default = {
        defaultTypeChecker$,
        defaultTypeChecker,
        getTypeName,
        multiTypesToString,
        defaultErrorMessageCall,
        errorIfNotType$,
        errorIfNotType,
        errorIfNotTypes$,
        errorIfNotTypes,
        getErrorIfNotTypeThrower$,
        getErrorIfNotTypeThrower,
        getErrorIfNotTypesThrower$,
        getErrorIfNotTypesThrower
    };
});