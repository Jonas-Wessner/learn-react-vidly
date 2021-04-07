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

  /**
   *  specifies that a property cannot be null, undefined, an empty array, or an empty object
   * @returns the current Object => chainable
   */
  notEmpty = () => {
    this.validatorFunctions.push((value, key) => {
      const message = `${this.#label || key} is not allowed to be empty`;
      if (!value || value === "" || empty(value)) {
        return message;
      }
      return null;
    });
    return this;
  };

  minMaxLength = (min, max) => {
    this.validatorFunctions.push((value, key) => {
      let type = null;
      if (value.length < min) {
        type = 0;
      } else if (value.length > max) {
        type = 1;
      }

      if (type === null) return null; // no errors

      const message = `${this.#label || key} must have a ${
        type === 0 ? "minimum" : "maximum"
      } length of ${type === 0 ? min : max} characters`;

      return message;
    });
    return this;
  };

  email = () => {
    this.validatorFunctions.push((value, key) => {
      if (!value.includes("@")) {
        const message = `${this.#label || key} is not a valid email address`;
        return message;
      }
      return null;
    });
    return this;
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
