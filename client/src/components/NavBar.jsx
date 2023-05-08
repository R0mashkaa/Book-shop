import { Link } from 'react-router-dom';

const NavBar = ({ search, setSearch }) => {
    return (
        <nav className="Nav">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
              
                <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
           
        </nav>
    )
}

export default NavBar