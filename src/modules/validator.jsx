class Validator {
  validatorFunctions = [];
  label = null;
  // example:
  // errors = {
  //   username: ["Username cannot be empty"],
  //   password: ["Password cannot be empty"],
  //   email: ["Email must include an @-sign", "Email cannot include number"],
  // };

  // // example:
  // schema = {
  //   username: new Validator().notEmpty(),
  //   password: new Validator().notEmpty(),
  //   email: new Validator().noNumbers().email(),
  // };

  // // example:
  // toValidate = {
  //   username: "",
  //   password: "",
  //   email: "1234.de",
  // };

  // TODO: every validate function in the Validator-object that is a value in the schema must be called once
  // for every corresponding value in the toValidate-object
  // TODO: if the toValidate-object does not have all keys that the schema has we want to throw an error

  static validate = (toValidate, schema, options) => {
    const errors = {};

    for (const key in schema) {
      if (!Object.hasOwnProperty.call(schema, key)) continue; // if the property is inherited

      console.log("1:", schema, key);

      schema[key].validatorFunctions.reduce((accErr, currFunc) => {
        const message = currFunc(toValidate, key);

        if (!message) return accErr; // leave errors as is if message is null

        accErr[key] = accErr[key] ? accErr[key] : []; // create property if it does not exist yet

        accErr[key].push(message);
      }, errors);
    }

    return errors;
  };

  // returns an error message or null
  notEmpty = () => {
    this.validatorFunctions.push((toValidate, key) => {
      const message = `${this.label || key} is not allowed to be empty`;
      if (!toValidate[key] || toValidate[key] === "") {
        return message;
      }
      return null;
    });
    return this;
  };

  setLabel = str => {
    this.label = str;
    return this;
  };
}

export default Validator;
