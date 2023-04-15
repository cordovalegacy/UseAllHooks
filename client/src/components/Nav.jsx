import { Link } from "react-router-dom"

const Nav = (props) => {

    return(
        <nav>
            <Link to={'/'}>Form</Link>
            <Link id="clock">{props.children}</Link>
            <Link to={'/displayAll'}>Display</Link>
        </nav>
    )

}

export default Nav