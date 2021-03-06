# fjl-error-throwing
**Deprecated** - This library is more thoroughly tested and is included 
as part of 'functional-jslib/fjl'.  It is recommended you use that version of the "error-throwing" functions instead.

Error throwing helpers.  In particular for when a type doesn't match an expected type (or one of one or more expected types).

## Stars of the show:
`errorIfNotType` and `errorIfNotTypes` (and their variants (
uncurried versions (same function names though with trailing '$'
 character))).
 
## Docs
See inline 'readme' docs below or go to the jsdocs page:
https://functional-jslib.github.io/fjl-error-throwing/

## Install 
`npm install fjl-error-throwing`

## Methods

**Note**: For un-curried versions of the methods below access them with a trailing '$' character;
    Example `errorIfNotType$(...)` etc..

**Note**: For more extensive docs see jsdocs located at './jsdocs' (in the repo (currently))

### `errorIfNotType<Type, contextName, valueName, value, messageSuffix=null> {Undefined}` -
    Curried.  Throws an error when your `value` doesn't match given `type`.

### `errorIfNotTypes<Types, contextName, valueName, value> : {Undefined}` -
    Curried.  Throws an error when your `value` doesn't match one of the given `types` passed in.

### `getErrorIfNotTypeThrower<messageTmplFunction, typeChecker = defaultTypeChecker> : errorIfNotType` - Gives an `errorIfNotType`
    function (curried version) that uses the passed message template function to generate the error message string.

### `getErrorIfNotTypesThrower<messageTmplFunction, typeChecker = defaultTypeChecker> : errorIfNotTypes` - Gives an `errorIfNotTypes`
    function (curried version) that uses the passed message template function to generate the error message string.

## Docs
More extensive docs can be found in './jsdocs' folder.
Docs will go up somewhere later. @todo

### Types:
```
TemplateContext     {Object<value, valueName, expectedTypeName, foundTypeName, messageSuffix>}
Type                {String|Function} - Constructor name or constructor itself.
TypesArray          {Array<Type>}
TypeChecker         {Function<Type, Any>}
ErrorMessageCall    {Function<TemplateContext>}
ErrorIfNotType      {Function<Type, contextName, valueName, value>:Undefined}
ErrorIfNotTypes     {Function<TypesArray, contextName, valueName, value>:Undefined}
```

### Usage 
@todo add more extensive usage examples
```
import {
    getErrorIfNotTypeThrower, // For passing your own error string renderer
    getErrorIfNotTypesThrower, // For passing your own error string renderer
    errorIfNotType,
    errorIfNotTypes
} from 'fjl-errorThrowing';

const errorIfNotFunction = errorIfNotType(Function); // curried so makes for useful usage
    
function someFunc (fn) {
    errorIfNotFunction('someFunc', 'fn', fn); // Will throw well detailed error when `value` is not a function
    // Do something here ...
}

someFunc(_ => 1 + 1);  // No error here
someFunc(99);   // Error here type doesn't match expected type.
```

## Development
1.  `npm install`
2.  Look at node scripts in package.json.

## Testing
1. `npm test` (after `npm install`).

## License
GNU v2, v3
