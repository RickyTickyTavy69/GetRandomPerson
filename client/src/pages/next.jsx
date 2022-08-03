import useSomePerson from "../hooks/useSomePerson";
import { useState } from "react";
import UserTable from "../components/usersTable";
import heartLoader from "../assets/gif/loading-heart.gif";

const Next = () => {
  const [person, setPerson] = useState(".........");
  const { getSomePerson, peoples, setPeoples } = useSomePerson();
  const [loading, setLoading] = useState("");
  const [usersToChange, setUsersToChange] = useState(null);
  const [updateMenu, setUpdateMenu] = useState(null); // cтейт отвечает за появление меню только.
  const [whosNextClasses, setWhosNextClasses] = useState("whosNext"); // wenn "updating" wird der Button ausgeblendet
  const [bannedPersons, setBannedPersons] = useState([]); // wenn man auf Ban geben drückt, wird die gebannte Person hier eingetragen.

  const setSomePerson = () => {
    console.log("banned Persons", bannedPersons);
    setPerson("");
    setLoading(heartLoader);

    const getRandomPerson = () => {
      const randomPerson = getSomePerson();
      if (
        randomPerson.slice(randomPerson.length - 6, randomPerson.length) ===
        "banned"
      ) {
        return "gebannt, nochmal Boom drücken";
      } else {
        console.log("got person", randomPerson);
        return randomPerson;
      }
    };

    let intervalSetting = setInterval(() => {
      let randomPerson = getRandomPerson();
      console.log("its you turn", randomPerson);
      setLoading("");
      setPerson(randomPerson);

      clearInterval(intervalSetting); /// нужно поместить интервал в отдельную функцию и вызывать clearInterval, чтобы она остановилась
    }, 1000); ///иначе будет бесконечный луп.
  };

  const saveUsers = () => {
    // это надо переделать, я не сохраняю больше пользователей.
    setUpdateMenu(true);
    setWhosNextClasses("whosNext updating");
  };

  return (
    <div className={whosNextClasses}>
      <div className="container">
        <h1>Who's Next?...</h1>
        <div className="display w-25">
          {person}
          <img className="heartLoader" src={loading} alt="" />
        </div>
        <button onClick={setSomePerson} className="btn btn-danger btn-lg w-25">
          Boom
        </button>
        <button onClick={saveUsers} className="btn btn-success btn-lg w-25">
          change Names
        </button>
      </div>
      <aside>
        {updateMenu && (
          <UserTable
            peoples={peoples}
            setPeoples={setPeoples}
            usersToChange={usersToChange}
            setUsersToChange={setUsersToChange}
            setUpdateMenu={setUpdateMenu}
            setWhosNextClasses={setWhosNextClasses}
            setBannedPersons={setBannedPersons}
            bannedPersons={bannedPersons}
          />
        )}
      </aside>
    </div>
  );
};

export default Next;
