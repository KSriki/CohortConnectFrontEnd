import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import UserDetails from '../components/UserDetails'



 export default class DetailsContainer extends React.Component {



     render(){

         //full details for everyone
         //or details for one person
         //// <Route exact path='/details' component={FullRoster}/>
         return (
             <Switch>
             <Route path='/details/:number' component={(props) => <UserDetails {...props} users={this.props.users} />}/>
             </Switch>
         );

     }

 }
