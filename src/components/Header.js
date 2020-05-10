import React from 'react';
import {Link} from 'react-router-dom'

class Header extends React.Component {
  render() {
   return (
      <header className="header">
          <div className="container">
            <div className="header__body">
              <div className="header__logo">
                <Link to="/" className="href__logo"><img src="./img/bee.png" alt=""></img></Link>
              </div>
              <nav className="header__menu">
                <ul className="header__list">               
                <li><Link to='/' className="header__link">Home</Link></li>               
                <li><Link to='/terms-of-service' className="header__link">Terms</Link></li>                 
                <li><Link to='/help' className="header__link">Contact</Link></li>                 
                </ul>
              </nav>
            </div>
          </div>
        </header>
   )
}}

export default Header;