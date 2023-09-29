import "../components/EditAdressModal.scss";
import Input from "../../../components/Input/Input";
import { useEffect, useState } from "react";
import { validate } from "../../../components/helpers/validations";
import axios from "../../../axios";
import Select from "react-select";
import { useDeliveryOption } from "../../../context/deliveryOptionContext";

const EditAdressModal = (props) => {
  const { deliveryOption, setDeliveryOption } = useDeliveryOption();
  const [form, setForm] = useState({
    firstName: {
      value: "",
      error: "",
      rules: ["required"],
    },
    lastName: {
      value: "",
      error: "",
      rules: ["required"],
    },
    address: {
      value: "",
      error: "",
      rules: ["required"],
    },
    postalCode: {
      value: "",
      error: "",
      rules: ["required", "postalCode"],
    },
    locality: {
      value: "",
      error: "",
      rules: ["required"],
    },
    country: {
      value: "",
      error: "",
      rules: ["required"],
    },
    email: {
      value: "",
      error: "",
      rules: ["email", "required"],
    },
    phoneNumber: {
      value: "",
      error: "",
      rules: ["required", "phoneNumber"],
    },
  });
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);

  const getCountries = async () => {
    setLoadingCountries(true);
    try {
      const res = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(
        res.data
          .map((el) => {
            return el.name;
          })
          .sort((a, b) => {
            const nameA = a.common.toUpperCase();
            const nameB = b.common.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            return 0;
          })
      );
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingCountries(false);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handleFormValue = (value, type) => {
    const { error, typeError } = validate(form[type].rules, value, type);
    setForm({
      ...form,
      [type]: {
        ...form[type],
        value,
        error: error,
      },
    });
  };
  const saveDeliveryData = () => {
    const existError = Object.values(form).find((x) =>
      x.error || !x.value || (x.error && !x.value) ? true : false
    );
    if (existError) return;
    localStorage.setItem(
      "deliveryOption",
      setDeliveryOption({
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        address: form.address.value,
        postalCode: form.postalCode.value,
        locality: form.locality.value,
        country: form.country.value,
        email: form.email.value,
        phoneNumber: form.phoneNumber.value,
      })
    );
    props.closeAdressModal();
  };

  return (
    <div
      className={`container-edit-adress-modal ${
        props.openedAdressModal || !JSON.stringify(deliveryOption)
          ? "open-modal"
          : ""
      }`}
    >
      <div className="flex-gap">
        <Input
          type="text"
          name="firstName"
          value={form.firstName.value}
          onChange={(e) => handleFormValue(e.target.value, "firstName")}
          classContainer="flex"
          classInput="width"
          id="first-name-input"
          class="usuall"
          placeholder="First name"
          error={form.firstName.error}
        />
        <Input
          type="text"
          name="lastName"
          value={form.lastName.value}
          onChange={(e) => handleFormValue(e.target.value, "lastName")}
          classContainer="flex"
          classInput="width"
          id="last-name-input"
          class="usuall"
          placeholder="Last name"
          error={form.lastName.error}
        />
      </div>
      <div>
        <Input
          type="text"
          name="address"
          value={form.address.value}
          onChange={(e) => handleFormValue(e.target.value, "address")}
          classInput="width"
          id="adress-input"
          class="usuall"
          placeholder="Adress"
          error={form.address.error}
        />
      </div>
      <div className="flex-gap">
        <Input
          type="text"
          name="postalCode"
          value={form.postalCode.value}
          onChange={(e) => handleFormValue(e.target.value, "postalCode")}
          classInput="width"
          classContainer="flex"
          id="postal-code-input"
          class="usuall"
          placeholder="Postal code"
          error={form.postalCode.error}
        />
        <Input
          type="text"
          name="locality"
          value={form.locality.value}
          onChange={(e) => handleFormValue(e.target.value, "locality")}
          classInput="width"
          classContainer="flex"
          id="locality-input"
          class="usuall"
          placeholder="Locality"
          error={form.locality.error}
        />
        <div className="flex usuall-con-input">
          <select
            className="usuall-input width"
            value={form.country.value}
            onChange={(e) => handleFormValue(e.target.value, "country")}
          >
            <option value="">Select country</option>
            {countries?.map((item, index) => {
              return (
                <option
                  key={index}
                  value={item.common}
                  className="option-country"
                >
                  {item.common}
                </option>
              );
            })}
          </select>
          {form.country.error ? (
            <div className="error">{form.country.error}</div>
          ) : null}
        </div>
      </div>
      <div className="flex-gap">
        <Input
          type="email"
          name="email"
          value={form.email.value}
          onChange={(e) => handleFormValue(e.target.value, "email")}
          classInput="width"
          classContainer="flex"
          id="email-input"
          class="usuall"
          placeholder="Email"
          error={form.email.error}
        />
        <Input
          type="tel"
          name="phoneNumber"
          value={form.phoneNumber.value}
          onChange={(e) => handleFormValue(e.target.value, "phoneNumber")}
          classInput="width"
          classContainer="flex"
          class="usuall"
          id="phone-number-input"
          placeholder="Phone number"
          error={form.phoneNumber.error}
        />
      </div>
      <div className="buttons">
        <button
          onClick={saveDeliveryData}
          disabled={Object.values(form).find((x) =>
            x.error || !x.value || (x.error && !x.value) ? true : false
          )}
        >
          Save and continue
        </button>
        <button onClick={props.closeAdressModal}>Cancel</button>
      </div>
    </div>
  );
};

export default EditAdressModal;
