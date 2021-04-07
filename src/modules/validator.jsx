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

  getLabel = alternative => {
    const label = this.#label ? this.#label : alternative;
    return `"${label}"`;
  };

  /**
   *  specifies that a property cannot be null, undefined, an empty array, or an empty object
   * @returns the current Object => chainable
   */
  notEmpty = () => {
    this.validatorFunctions.push((value, key) => {
      const message = `${this.getLabel(key)} is not allowed to be empty`;
      if (!value || value === "" || empty(value)) {
        return message;
      }
      return null;
    });
    return this;
  };

  minLength = min => {
    this.validatorFunctions.push((value, key) => {
      const message = `${this.getLabel(
        key
      )} must have a minimum length of ${min} characters`;

      console.log(value, min);
      return value.length < min ? message : null;
    });
    return this;
  };

  maxLength = max => {
    this.validatorFunctions.push((value, key) => {
      const message = `${this.getLabel(
        key
      )} must have a maximum length of ${max} characters`;

      return value.length > max ? message : null;
    });
    return this;
  };

  minValue = min => {
    this.validatorFunctions.push((value, key) => {
      const message = `${this.getLabel(
        key
      )} must be greater than or equal to ${min}`;

      return value < min ? message : null;
    });
    return this;
  };

  maxValue = max => {
    this.validatorFunctions.push((value, key) => {
      const message = `${this.getLabel(
        key
      )} must be less than or equal to ${max}`;

      return value > max ? message : null;
    });
    return this;
  };

  email = () => {
    this.validatorFunctions.push((value, key) => {
      if (!value.includes("@")) {
        const message = `"${this.getLabel(key)}" is not a valid email address`;
        return message;
      }
      return null;
    });
    return this;
  };

  integer = () => {
    this.validatorFunctions.push((value, key) => {
      const message = `${this.getLabel(key)} must be an integer`;
      const int = parseInt(value);
      const float = parseFloat(value);

      // parseInt also works with floats, if we compare it to the float we can see if the value initially was a float or not
      return !int || int !== float ? message : null;
    });
    return this;
  };

  number = () => {
    this.validatorFunctions.push((value, key) => {
      const message = `${this.getLabel(key)} must be a number`;
      const float = parseFloat(value);

      // parseInt also works with floats, if we compare it to the float we can see if the value initially was a float or not
      return !float ? message : null;
    });
    console.log(this.validatorFunctions);
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
