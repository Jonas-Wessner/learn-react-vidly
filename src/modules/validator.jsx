import { empty } from "./utils";

class Validator {
  validatorFunctions = [];
  #label = null;

  /**
   *
   * @param {} toValidate object to be validated
   * @param {*} schema object with keys: all properties to be validated values: ValidatorObject specifying the validation
   * @param {*} options
   * @returns error object: {property1: ["error message 1", "error message 2"], property2: ["error message 3"]...}
   */
  static validate = (toValidate, schema, options) => {
    this.#validateInput(toValidate, schema);
    const errors = {};

    for (const key in schema) {
      if (!schema.hasOwnProperty(key)) continue; // if the property is inherited

      const messages = this.#validateProperty(
        toValidate[key],
        key,
        schema[key].validatorFunctions
      );

      if (messages) {
        errors[key] = messages;
      }
    }

    console.log(errors);
    return errors;
  };

  // returns an array of error messages or null if no errors occurred
  static #validateProperty = (value, key, validatorFunctions) => {
    const messages = [];

    validatorFunctions.forEach(currFunc => {
      const message = currFunc(value, key);

      if (message) {
        messages.push(message);
      }
    });

    return messages.length === 0 ? null : messages;
  };

  static #validateInput = (toValidate, schema) => {
    Object.keys(schema).forEach(key => {
      if (!toValidate.hasOwnProperty(key)) {
        const message = `All keys in the 'schema' must be present in the object 'toValidate'. Could not find property '${key}' in 'toValidate'`;
        throw new TypeError(message);
      }
    });
    return true;
  };

  #getLabel = alternative => {
    const label = this.#label ? this.#label : alternative;
    return `"${label}"`;
  };

  #addValidatorFunction = (condition, message) => {
    this.validatorFunctions.push((value, key) => {
      return condition(value) ? null : `${this.#getLabel(key)} ${message}`;
    });
    return this;
  };

  /**
   *
   * @param {function(String)} func a function that takes a string and returns truthy if it is a valid input, otherwise falsy
   * @param {String} errorMessage e.g.: "is not allowed to include backticks". The label will at the front at the beginning automatically
   * @returns
   */
  custom = (func, errorMessage) => {
    return this.#addValidatorFunction(func, errorMessage);
  };

  /**
   *  specifies that a property cannot be null, undefined, or an empty string
   *  chainible
   */
  notEmpty = () => {
    // truthy if not null, undefined or empty string
    return this.#addValidatorFunction(
      value => value,
      `is not allowed to be empty`
    );
  };

  minLength = min => {
    return this.#addValidatorFunction(
      value => value.length >= min,
      `must have a minimum length of ${min} characters`
    );
  };

  maxLength = max => {
    return this.#addValidatorFunction(
      value => value.length <= max,
      `must have a maximum length of ${max} characters`
    );
  };

  minValue = min => {
    return this.#addValidatorFunction(
      value => value >= min,
      `must be greater than or equal to ${min}`
    );
  };

  maxValue = max => {
    return this.#addValidatorFunction(
      value => value <= max,
      `must be less than or equal to ${max}`
    );
  };

  email = () => {
    return this.#addValidatorFunction(
      value => value.includes("@"),
      `is not a valid email address`
    );
  };

  integer = () => {
    return this.#addValidatorFunction(value => {
      // parseInt returns also a number on floats, so if we check if it is equal to the result
      // of parseFloat we can see if the the input was initially a float (invalid) or not
      const int = parseInt(value);
      const float = parseFloat(value);
      return int !== NaN && int === float;
    }, `must be an integer`);
  };

  number = () => {
    return this.#addValidatorFunction(
      value => parseFloat(value) !== NaN, // truthy if value is convertible to float (which include all numbers including integers)
      `must be a number`
    );
  };

  /**
   * sets the label in the error messages
   * @param {} label
   * @returns the current Object => chainable
   */
  setLabel = label => {
    this.#label = label;
    return this;
  };
}

export default Validator;
