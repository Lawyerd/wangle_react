import React from "react";
import "../css/Detail.css";
import { Link } from "react-router-dom";
import axios from "axios";

class Detail extends React.Component {
  state = {
    id: "",
    isLoading: true,
    name: "",
    phone: "",
    email: "",
    country: "",
    birth: "",
  };

  handleClick(id) {
    if (window.confirm("Are You Sure?")) {
      axios({
        method: "post",
        url: "http://localhost:2400/delete",
        data: { id: id },
      });
      this.props.history.push("/");
    }
  }

  // axios({
  //   method: "post",
  //   url: "http://localhost:2400/delete",
  //   data: id,
  // });

  get_user = async id => {
    var data = await axios.get(`http://localhost:2400/${id}`);
    const name = data.data[0].name;
    const phone = data.data[0].phone;
    const email = data.data[0].email;
    const country = data.data[0].country;
    const birth = data.data[0].birth;
    this.setState({ id, name, phone, email, country, birth, isLoading: false });
  }; // getMovies라는 함수 정의
  componentDidMount() {
    const state = this.props.location.state;
    if (state === undefined) {
      // 만약에 location이 없으면 (= 넘어온 데이터가 없으면, id가 없으면)
      this.props.history.push("/"); // 이 histroy는 도대체 뭐지?
      // history란 porps로 같이 넘어오는 정보인데 이 기능을 사용하면 쉽게 리다이렉션 할 수 있어서 사용했다.
    } else {
      this.get_user(state.id);
      console.log(`component did mount in ${state.id}`);
    }
  }

  render() {
    const { id, name, phone, email, country, birth, isLoading } = this.state;

    return (
      <div className="detail">
        <div className="row">
          <div className="col-2" />

          <div className="col-8">
            {isLoading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <div className="card bg-light mb-3">
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text">{phone}</p>
                  <p className="card-text">{email}</p>
                  <p className="card-text">{country}</p>
                  <p className="card-text">{birth}</p>

                  <button
                    type="button"
                    onClick={() => this.handleClick(id)}
                    className="btn btn-dark"
                    style={{ margin: "10px" }}
                  >
                    delete
                  </button>

                  <Link to={{ pathname: `/update/${id}`, state: { id } }}>
                    <button
                      type="button"
                      className="btn btn-dark"
                      style={{ margin: "30px" }}
                    >
                      update
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
