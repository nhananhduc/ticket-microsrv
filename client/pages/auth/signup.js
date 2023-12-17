import { useState } from "react";
import useRequest from "../../hooks/use-request";
import { useRouter } from "next/router";

export default () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: () => router.push('/')
  })

  const onSubmit = async (e) => {
    e.preventDefault();
    await doRequest();

  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input value={email} className="form-control" onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input value={password} type="password" className="form-control" onChange={e => setPassword(e.target.value)} />
      </div>
      {errors}
      <button className="btn btn-primary mt-2">Sign Up</button>
    </form>
  );
};