import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

//Context
import { AuthContext } from "./helpers/AuthContext";

//CSS
import "./App.css";

//Importing components
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Write from "./components/Write";
import ViewPost from "./components/ViewPost";
import PostTags from "./components/PostTags";

function App() {
  //Initializing auth context values
  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    name: "",
    status: false,
  });

  useEffect(() => {
    axios
      .get("https://blog-amaru.herokuapp.com/user/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            email: response.data.email,
            id: response.data.id,
            name: response.data.name,
            status: true,
          });
        }
      });
  }, []);

  return (
    <div>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Switch>
            {/*Home route*/}
            <Route path="/" exact>
              <Header />
              <Home />
            </Route>

            {/* Login route */}
            <Route path="/login" exact>
              <Header />
              <Login />
            </Route>

            {/* Sign up route */}
            <Route path="/signup" exact>
              <Header />
              <SignUp />
            </Route>

            {/*Create post route*/}
            <Route path="/write" exact>
              <Header />
              <Write />
            </Route>

            {/*View specific post route*/}
            <Route path="/article/:id">
              <Header />
              <ViewPost />
            </Route>

            {/*View specific post route*/}
            <Route path="/tags/:id">
              <Header />
              <PostTags />
            </Route>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
