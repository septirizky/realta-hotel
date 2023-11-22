import {Link, Outlet} from "react-router-dom";

export const TempNav = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                    {/* <a className="navbar-brand" href="javascript:void(0)">Logo</a> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link to='/' className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/hr' className="nav-link">HR</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/payment' className="nav-link">Payment</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="text" placeholder="Search"/>
                                <button className="btn btn-primary" type="button">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            <div className='container-fluid'>
                <Outlet/>
            </div>
        </div>
    )
}
