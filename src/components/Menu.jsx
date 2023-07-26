import { Link } from 'react-router-dom'
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { useAuth } from '../hooks/auth/useAuth';

export const Menu = () => {
  const { user } = useSelector(state => state.auth)
  const { doLogout } = useAuth()

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>Welcome, {user?.name || "friend"}</MDBNavbarBrand>
        
        <MDBNavbarNav>
          <Link className='menu__link' to='/'>
            Gallery
          </Link>
          <Link className='menu__link_right' to='#logout' onClick={doLogout}>
            Log Out
          </Link>
        </MDBNavbarNav>

      </MDBContainer>
    </MDBNavbar>
  );
}