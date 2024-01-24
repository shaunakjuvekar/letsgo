import UserContext from "./UserContext";
import { useState, useEffect, useContext } from "react";
import APIService from "./APIService";
import FriendList from "./FriendList";
import SuggestedFriendList from "./SuggestedFriendList";
import { Navigate } from "react-router-dom";

const Friends = () => {
  const [userid] = useContext(UserContext);
  const [friend, setFriend] = useState(null);
  const [suggestedfriend, setSuggestedFriend] = useState(null);

  useEffect(() => {
    (async () => {
      let response = await APIService.fetchFriends();

      if (response.status === 200) {
        const jsonData = await response.json();

        setFriend(jsonData);
      }
    })();
  }, [userid]);

  useEffect(() => {
    (async () => {
      let response = await APIService.fetchSuggestedFriends();

      if (response.status === 200) {
        const jsonData = await response.json();

        setSuggestedFriend(jsonData);
      }
    })();
  }, [userid]);

  if (!userid) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {friend === null ? (
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ marginBottom: "20px" }}>You don't have friends yet</h1>
        </div>
      ) : (
        <>
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            Your Friends
          </h1>

          <FriendList data={friend} />
        </>
      )}

      {suggestedfriend === null || !suggestedfriend.length ? (
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h5 style={{ marginBottom: "20px" }}>
            You don&rsquo;t have any suggestions as of now
          </h5>
        </div>
      ) : (
        <>
          <h5
            style={{
              textAlign: "center",
              marginBottom: "50px",
              marginTop: "350px",
            }}
          >
            Your Suggested Friends based on your Travel Destination
          </h5>

          <SuggestedFriendList data={suggestedfriend} />
          <div style={{ marginBottom: "50px" }} />
        </>
      )}
    </div>
  );
};

export default Friends;
