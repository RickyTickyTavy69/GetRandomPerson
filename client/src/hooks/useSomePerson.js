import { useState, useEffect } from "react";

const useSomePerson = () => {
  const [peoples, setPeoples] = useState([]);

  useEffect(() => {
    getUsersList();
  }, []);

  const getUsersList = async () => {
    const url = "/getUsers";
    let body = { peoples: null };
    let bodyJson = JSON.stringify(body);
    try {
      const res = await fetch(url, {
        method: "POST",
        body: bodyJson,
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();
      console.log("result @getUsers", result.peoples);
      if (result.peoples) {
        let users = result.peoples[0].usersArray;
        //setUsersToChange(users);
        setPeoples(users);
        console.log("ready usersArr @getUsers", users);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const getSomePerson = () => {
    let randomNumber = getRandomNumber(0, peoples.length);
    let randomPerson = peoples[randomNumber];
    return randomPerson;
  };

  return {
    getSomePerson,
    peoples,
    setPeoples,
  };
};

export default useSomePerson;
