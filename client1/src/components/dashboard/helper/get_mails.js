import React from "react";
import axios from "axios";
export default function get_mails(user) {
  try {
    return axios
      .post("http://localhost:5000/composemail", user)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    return err;
  }
}
