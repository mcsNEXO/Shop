export function validateEmail(text) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(text);
}

export function validatePostalCode(value) {
  const re = /^[0-9]{2}-[0-9]{3}$/;
  return re.test(value);
}

export function validatePhoneNumber(value) {
  const re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]{8,14}$/g;
  return re.test(value);
}

const availableRules = {
  required(value, type) {
    return value ? "" : `${type} is required!`;
  },
  min(value, rule, type) {
    return value.length >= rule.number
      ? ""
      : `${type} must has ${rule.number} characters!`;
  },
  email(value, type) {
    return validateEmail(value) ? "" : "Email is invalid!";
  },
  postalCode(value) {
    return validatePostalCode(value) ? "" : "Postal code is invalid";
  },
  phoneNumber(value) {
    return validatePhoneNumber(value) ? "" : "Phone number is invalid";
  },
};

export function validate(rules = [], value, type) {
  let error = "";
  rules.forEach((rule) => {
    if (rule instanceof Object) {
      const errorMessage = availableRules[rule.rule](value, rule, type);
      if (errorMessage) {
        error = errorMessage;
      }
    } else {
      const errorMessage = availableRules[rule](value, type);
      if (errorMessage) {
        error = errorMessage;
      }
    }
  });
  return { error, typeError: error };
}
