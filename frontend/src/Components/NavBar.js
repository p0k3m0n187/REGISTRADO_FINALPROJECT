import { Link } from "react-router-dom"


const NavBar = () => {

    return(
        <header>
            <div className="container">
                <Link to = "/">
                    <h1>Apply Here</h1>
                </Link>
                <nav>
      <ul>
        <li>
          <a href="/jobs">Hiring</a>
        </li>
      </ul>
    </nav>
            </div>
        </header>
    )
}

export default NavBar;