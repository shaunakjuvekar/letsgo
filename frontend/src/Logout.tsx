import { useContext } from "react";
import UserContext from "./UserContext";
import APIService from "./APIService";
import React from "react";
import { Button } from "react-bootstrap";

const Logout: React.FunctionComponent = () => {
  const [, setUser] = useContext(UserContext);

  const logout = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await APIService.logout();
    } catch (error) {
      console.log(error);
    }

    setUser(null);
  };

  return (
    <form onSubmit={logout}>
      <Button style={{position: "absolute", right: '15px', marginRight: '20'}}variant="dark" type="submit">
        Logout
      </Button>
    </form>
  );
};

export default Logout;
