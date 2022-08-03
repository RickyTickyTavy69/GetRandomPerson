import { useState } from "react";

const UserTable = ({
  peoples,
  setUsersToChange,
  setPeoples,
  setUpdateMenu,
  setWhosNextClasses,
  setBannedPersons,
  bannedPersons,
}) => {
  const [newUser, setNewUser] = useState(null); // новый юзер, которого добавили
  const [newUserInputValue, setNewUserInputValue] = useState(newUser);

  const unBanThisPerson = async (username) => {
    const url = "/unBanUser";
    console.log("username @unBanUser", username);
    let usernameJson = JSON.stringify({ username: username }); /// если юзеров нету, то выводить только одну кнопку
    console.log("userJson @unBanUser", usernameJson); //добавить юзеров.
    try {
      const res = await fetch(url, {
        method: "POST",
        body: usernameJson,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      console.log("result @addUser", result.peoples);
      let users = result.peoples;
      //setUsersToChange(users);
      setPeoples(users);
      console.log("ready usersArr @addUser", users);
    } catch (error) {
      console.log("error", error);
    }
  };

  const banThisPerson = async (username) => {
    const url = "/banUser";
    console.log("username @banUser", username);
    let usernameJson = JSON.stringify({ username: username }); /// если юзеров нету, то выводить только одну кнопку
    console.log("userJson @banUser", usernameJson); //добавить юзеров.
    try {
      const res = await fetch(url, {
        method: "POST",
        body: usernameJson,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      console.log("result @addUser", result.peoples);
      let users = result.peoples;
      //setUsersToChange(users);
      setPeoples(users);
      console.log("ready usersArr @addUser", users);
    } catch (error) {
      console.log("error", error);
    }
  };

  const addUser = async (username) => {
    setNewUserInputValue("");
    const url = "/addUser";
    console.log("username", username);
    let usernameJson = JSON.stringify({ username: username }); /// если юзеров нету, то выводить только одну кнопку
    console.log("userJson", usernameJson); //добавить юзеров.
    try {
      const res = await fetch(url, {
        method: "POST",
        body: usernameJson,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      console.log("result @addUser", result.peoples);
      let users = result.peoples;
      //setUsersToChange(users);
      setPeoples(users);
      console.log("ready usersArr @addUser", users);
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteUser = async (user) => {
    const url = "/deleteUser";
    console.log("user", user);
    let userJson = JSON.stringify({ username: user }); /// если юзеров нету, то выводить только одну кнопку
    console.log("userJson", userJson); //добавить юзеров.
    try {
      const res = await fetch(url, {
        method: "POST",
        body: userJson,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      console.log("result @deleteUser", result.peoples);
      let users = result.peoples;
      setUsersToChange(users);
      setPeoples(users);
      console.log("ready usersArr @deleteUser", users);
    } catch (error) {
      console.log("error", error);
    }
  };

  let peoplesHTML = null;

  if (peoples.length) {
    console.log("peoples found", peoples);
    peoplesHTML = peoples.map((user) => {
      let isBanned = user.slice(user.length - 6, user.length);
      if (isBanned === "banned") {
        user = `${user.substr(0, user.length - 6)} (is banned)`;
        return (
          <div className="userContainer" key={user}>
            <p className="userName">Name: {user}</p>
            <button onClick={() => deleteUser(user)}> {user} löschen</button>
            <button
              onClick={() => {
                unBanThisPerson(user);
              }}
            >
              {user} Ban aufheben
            </button>
          </div>
        );
      }
      console.log("is Banned", isBanned);
      return (
        <div className="userContainer" key={user}>
          <p className="userName">Name: {user}</p>
          <button onClick={() => deleteUser(user)}> {user} löschen</button>
          <button
            onClick={() => {
              banThisPerson(user);
            }}
          >
            {user} Ban geben
          </button>
        </div>
      );
    });
  }

  return (
    <div id="usersTable" className="usersTable">
      {peoplesHTML && <div className="usersContainer">{peoplesHTML}</div>}
      <div className="usersInput">
        {!peoplesHTML && (
          <p>
            Sie haben noch keine Benutzer hinzugefügt. Das können Sie jetzt aba
            tun
          </p>
        )}
        {peoples.length === 1 && <p>Heute nur {peoples[0]}...?</p>}
        {peoplesHTML && <p>Sie können noch weitere Benutzer hinzufügen...</p>}
        <div className="addUserName">
          <input
            onChange={(event) => {
              setNewUser(event.target.value);
              setNewUserInputValue(event.target.value);
            }}
            type="text"
            value={newUserInputValue}
          />
          <button onClick={() => addUser(newUser)}>Jetzt Hinzufügen</button>
          <button
            onClick={() => {
              setUpdateMenu(false);
              setWhosNextClasses("whosNext");
            }}
          >
            fertig
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
