import React from 'react'
import HeaderIn from './HeaderIn';
import HeaderOut from './HeaderOut';
import { useAuth } from '../../hooks/AuthContext';

const Header = () => {
const {isLoggedIn} = useAuth();

  return (
     isLoggedIn ? <HeaderIn /> : <HeaderOut />
  )
}

export default Header