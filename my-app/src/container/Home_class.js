import React from "react";
import "../css/Home.css";
import Card from "../components/Card.js";
import axios from "axios";

class Home extends React.Component {
  state = {
    isLoading: true,
    users: [],
  };
  get_users = async () => {
    var data = await axios.get("http://localhost:2400/pages");
    const users = data.data;
    this.setState({ users, isLoading: false });
  }; // getMovies라는 함수 정의

  componentDidMount() {
    console.log("component did mount");
    this.get_users();
  }
  render() {
    const { isLoading, users } = this.state;
    return (
      <div className="Home">
        <div className="container">
          <div className="row">
            <div className="col-1" />
            <div className="col-11">
              <h1>Main</h1>

              <div className="container">
                <div className="mt-3">
                  {isLoading ? (
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <div className="row">
                      {users.map(user => (
                        <div className="col-4" key={String(user.id)}>
                          <Card
                            key={user.id}
                            id={user.id}
                            title={user.name}
                            description={user.phone}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
