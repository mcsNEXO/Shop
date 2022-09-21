import "./MyData.css";
import React, { useState } from "react";
import Input from "../../../components/Input/Input";

export default function MyData(props) {
  const avatar = process.env.PUBLIC_URL + "/img/jpg/avatar3.png";
  const [image, setImage] = useState("");
  return (
    <div className="md-container">
      <div className="md-box">
        <div className="md-input-file">
          <div className="md-img">
            <img alt="avatar" src={avatar} />
          </div>
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
        <div className="md-inputs">
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            class="md"
          ></Input>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            class="md"
          ></Input>
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            class="md"
          ></Input>
        </div>
      </div>
    </div>
  );
}
