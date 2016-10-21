**Firehash - A JavaScript object with array powers.**

Use Firehash like you would an associative array. Created to support data transfer to and from Firebase databases (hence the name).

## Methods

Return value type in *italics*.

**set(path,value)** Set a value.

Unlike traditional arrays and objects, Firehash can set multiple values based on the type of _path_:

* Scalar: Set one field.
* Function: Transform target.
* Array: Set more than one field to the same value.
* Object: Set multiple fields at the same time.

**setDefault(path.value)** Set the field to the given value only if it is not already set.

**get(path)** Get a value.

* Scalar: Get one field.
* Function: To be determined.
* Array: Get the values of multiple fields, returned as an object.
* Object: Get the values of multiple fields, returned as an object.

## Adding Data to a Firehash

**import(...)** Import one or more objects into the Firehash.

**push(level1,level2,value)** Treat the key at `level1` like an associative array (creating it if it is null), and set its `level2` member to the given value.

**fix(singular,plural)** If the Firehash has a single value at `singular`, creates a new object at the `plural` value.

**extract(fieldSlug,collection,transformFn)** Extract values from a collection by a particular field, applying an optional transformation.

## Retrieving Data from a Firehash

**export()** _(object)_ Create a plain object containing the data of the Firehash.

**count()** _(integer)_ Number of data elements in the Firehash.

**keys()** _(array)_ Returns the keys of the Firehash as an array.

**values()** _(array)_ Returns the values of the Firehash as an array.

## Array Powers

**forEach(callback)** Apply a callback function (signature `(key,value)`) to each value in the Firehash.

**map()** TODO

**reduce()** TODO


## Internal Logging and Debugging

Firehash has logging and debugging features built right into it.

## Data Value functions

**title()** _(any)_ If the Firehash has a `title` value, returns that value.
