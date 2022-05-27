import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import './navigation.styles.scss';
import { useContext } from 'react';
import { signOutUser } from '../../utils/firebase/firebase.utils';

const Navigation = () => {
    
    const { currentUser, setCurrentUser } = useContext(UserContext);

    //signs out the user, sets currentUser to null when sign out button is clicked
    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
     }

    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo className='logo'/>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>
                            ) : (<Link className='nav-link' to='/auth'>
                            SIGN IN
                        </Link>
                    )}
                    
                </div>                
            </div>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;