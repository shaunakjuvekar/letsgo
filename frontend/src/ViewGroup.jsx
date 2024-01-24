import { useEffect, useState, useContext } from "react";
import UserContext from "./UserContext";
import APIService from "./APIService";
import { Link } from "react-router-dom";
import GroupList from "./GroupList";
import { Button } from "react-bootstrap";

const ViewGroup = () => {
  const [group, getGroup] = useState(null);
  const [userid] = useContext(UserContext);
  console.log(userid);

  useEffect(() => {
    (async () => {
      let response = await APIService.fetchGroupById(userid.id);

      if (response.status === 200) {
        const jsonData = await response.json();
        console.log("this");
        console.log(jsonData);
        getGroup(jsonData);
      }
    })();
  }, [userid]);

  return (
    <div>
      {group === null ? (
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ marginBottom: "20px" }}>
            You are not a part of any group
          </h1>
          <Link to="/group/createGroup">
            <Button
              type="submit"
              style={{
                marginTop: "20px",
                backgroundColor: "#E5751F",
                border: "none",
              }}
            >
              <span style={{ color: "black" }}>Create Group</span>
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            Your Groups
          </h1>
          <GroupList data={group} />
          <div
            style={{
              marginTop: "50px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link to="/group/createGroup">
              <Button style={{ backgroundColor: "#E5751F", border: "none" }}>
                <span style={{ color: "black", fontSize: "24px" }}>
                  Create a new Group
                </span>
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewGroup;
