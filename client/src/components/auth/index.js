import Navbar from "./navbar";
import Login from "./login";
import Register from "./register";
export default function Index() {
  return (
    <div>
      <Navbar />
      {/* login and register  */}
      <div className="container mt-5">
        {/* center div  */}
        <div className="d-flex justify-content-center">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#loginTab"
                type="button"
                role="tab"
                aria-controls="loginTab"
                aria-selected="true"
              >
                Login
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#registerTab"
                type="button"
                role="tab"
                aria-controls="registerTab"
                aria-selected="false"
              >
                Register
              </button>
            </li>
          </ul>
        </div>
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="loginTab"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
            tabindex="0"
          >
            {/* login container  */}
            <Login />
          </div>
          <div
            class="tab-pane fade"
            id="registerTab"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
            tabindex="0"
          >
            {/* register container  */}
            <Register />
          </div>
        </div>
      </div>
    </div>
  );
}
