import { useState } from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Profile from "./Profile";
import CreateGroup from "./CreateGroup";
import ViewGroup from "./ViewGroup";
import GroupDetail from "./GroupDetail";
import Friends from "./Friends";
import "./App.css";
import UserContext from "./UserContext";
import { Container } from "react-bootstrap";
import SearchPage from "./SearchPage";
import Browse from "./Browse";
import Events from "./Events";
import DestinationDetail from "./DestinationDetail";
import ProfilePage from "./ProfilePage";
import RecentsPage from "./chat/RecentsPage";
import ChatPage from "./chat/ChatPage";

export default function App() {
  const [userId, setUserId] = useState(null);

  return (
    <Router>
      <UserContext.Provider value={[userId, setUserId]}>
        <Header />
        <div className="app-wrapper">
          <Container>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/search" element={<SearchPage />}></Route>
              <Route path="/browse" element={<Browse />}></Route>
              <Route
                path="/destination-detail"
                element={<DestinationDetail />}
              ></Route>
              <Route path="/profile/:userId" element={<ProfilePage />} />
              <Route path="/group" element={<ViewGroup />}></Route>
              <Route
                path="/group/createGroup"
                element={<CreateGroup />}
              ></Route>
              <Route path="/group/:groupId" element={<GroupDetail />}></Route>
              <Route path="/friends" element={<Friends />}></Route>
              <Route path="/chat" element={<RecentsPage />} />
              <Route path="/chat/:chatType/:chatId" element={<ChatPage />} />
              <Route path="/events" element={<Events />}></Route>
            </Routes>
          </Container>
        </div>
        <Footer />
      </UserContext.Provider>
    </Router>
  );
}

library.add(fab, fas, far);
