import React from 'react'
import './NavBar.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { fabell } from '@fortawesome/fontawesome-free-solid'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GitHubIcon from '@mui/icons-material/GitHub';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';

const NavBar = ({ user, setUser }) => {
  return (
    <>
      <div className='navbar'>
        <div className="left-nav" >
          {/* <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN0Uu0auB-_30X62d-vUYM-jhN4TkqPqgv6A&usqp=CAU"} height="42"
        className='nav-logo' alt="github ICon" /> */}
          <GitHubIcon className="nav-logo" fontSize="large" />
          <input
            className='input'
            type='text'
            placeholder='Search or jump to..'
            role='searchbox'
            value={user}
            onChange={(e) => {
              setUser(e.target.value)
              console.log(user);
            }}
          />

          {/* <button onClick={ e => searchUser(e)}>/</button> */}

          <div className="left-nav">
            <div>Pull requests</div>
            <div>Issues</div>
            <div>Marketplace</div>
            <div>Explore</div>
          </div>
        </div>
        <div className="right-nav">
          <NotificationsIcon />
          <p className="withdrop">
            <AddIcon />
            <ArrowDropDownIcon />
          </p>

          <p className="withdrop"><AccountCircleIcon />
            <ArrowDropDownIcon /></p>
        </div>
      </div>
    </>
  )
}

export default NavBar