import { useState, useContext, useEffect, useCallback } from "react";
import { AccessTokenContext } from "../contexts/AccessTokenContext";
import axios from "axios";

interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

interface IPaginatedUsers {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: IUser[];
}

function Home() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  /**
   * Getting access token from the Context API
   */
  const { getToken, logout } = useContext(AccessTokenContext);

  return (
    <div className="container mt-2 mb-5">
      <div className="d-flex justify-content-between">
        <h1 className="h2">You are logged in!</h1>
        <button
          type="button"
          className="btn btn-primary mb-2"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
      {users.map((user) => {
        const key = `user-${user.id}`;
        const name = `${user.firstName} ${user.lastName}`;
        return (
          <div key={key}>
            <img src={user.avatar} alt={name} />
            <p>{name}</p>
          </div>
        );
      })}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default Home;
