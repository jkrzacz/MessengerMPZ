import "./App.css";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { useSelector } from "react-redux";
import MainHeader from "./components/UI/MainHeaderPage";

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdmin = useSelector((state) => state.user.isAdmin);

  return (
    <>
      <MainHeader />
      <main>
        <Switch>
          <Route path="/" exact>
            {!isLoggedIn && <Redirect to="/login" />}
            {/* {isLoggedIn && <Redirect to="/chat" />} */}
          </Route>
          <Route path="/login">
            {!isLoggedIn && <Login />}
            {/* {isLoggedIn && <Redirect to="/chat" />} */}
          </Route>
          <Route path="/register">
            {!isLoggedIn && <Register />}
            {/* {isLoggedIn && <Redirect to="/chat" />} */}
          </Route>
          <Route path="/chat" exact>
            {!isLoggedIn && <Redirect to="/login" />}
            {/* {isLoggedIn && <ChatPage />} */}
          </Route>
          <Route path="/user-info">
            {!isLoggedIn && <Redirect to="/login" />}
            {/* {isLoggedIn && <UserDetails />} */}
          </Route>
          <Route path="/chat/:id">
            {!isLoggedIn && <Redirect to="/login" />}
            {/* {isLoggedIn && <ChatDetailsWrapper />} */}
          </Route>
          <Route path="/admin-panel">
            {(!isLoggedIn || !isAdmin) && <Redirect to="/login" />}
            {/* {isLoggedIn && isAdmin && <AdminPanel />} */}
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
    </>
  );
}

const NotFound = () => (
  <div style={{ textAlign: "center", marginTop: "10%", fontSize: "20px" }}>
    <h1>404 - Not Found!</h1>
    <NavLink to="/">GO HOME</NavLink>
  </div>
);

export default App;
