export function validateEmail(text) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(text);
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
  return { error };
}
