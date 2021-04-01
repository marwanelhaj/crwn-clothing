import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';

import './App.css';

import Homepage from './components/pages/homepage/homepage.component'
import ShopPage from './components/pages/shop/shop.component.jsx'
import SignInAndSignUp from './components/pages/sing-in-and-sign-up/sing-in-and-sign-up.component'
import Header from './components/header/header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.action'
 


class App extends React.Component {
 
 unsubscribeFromAuth = null

 componentDidMount(){
   const {setCurrentUser} = this.props;

   this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if(userAuth){
      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot => {
        setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
        });
      });
    }

    setCurrentUser( userAuth )
   })
 }
 
 componentWillUnmount(){
   this.unsubscribeFromAuth();
 }

  render(){
    return (
      <div>
       <Header />
       <Switch>
         <Route exact path='/' component={Homepage} /> 
         <Route  path='/shop' component={ShopPage} /> 
         <Route  path='/signin' component={SignInAndSignUp} /> 
       </Switch> 
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(null, mapDispatchToProps)(App);
