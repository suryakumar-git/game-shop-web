import logo from './logo.svg';
import '../app/App.css';

function Header() {
    return (
        <>
        <div className="row" >
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Game Shop</h2>
        </div>   
        </>
    );
}

export default Header;