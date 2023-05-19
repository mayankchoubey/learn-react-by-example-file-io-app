function Header() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-secondary sticky-top">
      <span className="display-6 text-white">File.io</span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse align-middle">
        <ul className="navbar-nav">
          <li className="nav-item active text-white tech-sub-heading">
            (React)
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
