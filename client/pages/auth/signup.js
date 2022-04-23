const SignUp = () => {
  return (
    <div class="container-md">
      <form>
        <h1>Sign Up</h1>
        <div className="form-group">
          <label>Email Address</label>
          <input className="form-control" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" />
        </div>
        <div class="pt-3">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
