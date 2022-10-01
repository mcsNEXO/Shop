import "./MyData.css";
import React, { useState } from "react";
import Input from "../../../components/Input/Input";
import useAuth from "../../../hooks/useAuth";
import { validate } from "../../../components/helpers/validations";
import axios from "../../../axios";

export default function MyData(props) {
  const avatar = process.env.PUBLIC_URL + "/img/jpg/avatar3.png";
  const [image, setImage] = useState("");
  const [auth, setAuth] = useAuth();
  const [form, setForm] = useState({
    email: {
      value: auth.email,
      error: "",
      rules: ["email", { rule: "min", number: 6 }, "required"],
    },
    password: {
      value: "",
      error: "",
      rules: [{ rule: "min", number: 6 }, "required"],
    },
    firstName: {
      value: auth.firstName,
      error: "",
      rules: ["required"],
    },
    lastName: {
      value: "",
      error: "",
      rules: ["required"],
    },
  });

  const changeHandler = (value, type) => {
    const { error } = validate(form[type].rules, value, type);
    setForm({
      ...form,
      [type]: {
        ...form[type],
        value,
        error: error,
      },
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: form.email.value,
      firstName: form.firstName.value,
      userId: auth.userId,
    };
    try {
      const res = await axios.put("edit-data", data);
      setAuth(res.data.user);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="md-container">
      <div className="md-box">
        <form onSubmit={onSubmit}>
          <div className="md-input-file">
            <div className="md-img">
              <img alt="avatar" src={avatar} />
            </div>
            <div className="md-center">
              <input
                type="file"
                id="md-file"
                accept="/image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file && file.type.substring(0, 5) === "image") {
                    setImage(file);
                  }
                }}
              />
              <label className="md-file" htmlFor="md-file">
                Edit
              </label>
            </div>
          </div>
          <hr className="md-hr"></hr>
          <div className="md-inputs">
            <Input
              type="email"
              name="email"
              value={form.email.value}
              onChange={(e) => changeHandler(e.target.value, "email")}
              placeholder="E-mail"
              class="md"
            ></Input>
            <div className="password-edit">
              <Input
                type="password"
                value="*************"
                disabled="true"
                // value={form.password.value}
                // onChange={(e) => changeHandler(e.target.value, "password")}
                name="password"
                placeholder="Password"
                class="md"
              ></Input>
              <button>Edit</button>
            </div>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName.value}
              onChange={(e) => changeHandler(e.target.value, "firstName")}
              class="md"
            ></Input>
          </div>
          <div className="md-final-btn">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
