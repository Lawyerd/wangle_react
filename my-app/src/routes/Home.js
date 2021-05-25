import React, { useState, useEffect } from "react";
import "../css/Home.css";
import Card from "../components/Card.js";
import axios from "axios";

function Home() {
  const [users, setUsers] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    birth: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    get_users();
  }, []);
  const get_users = async () => {
    var data = await axios.get("http://localhost:2400/pages");
    setUsers(data.data);
    setIsLoading(false);
  }; // getMovies라는 함수 정의

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
export default Home;
