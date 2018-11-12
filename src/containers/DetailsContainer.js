import React from 'react'

import { Route, Switch } from 'react-router-dom';

import UserDetailsContainer from './UserDetailsContainer'



 export default class DetailsContainer extends React.Component {



     render(){

         //full details for everyone
         //or details for one person
         //// <Route exact path='/details' component={FullRoster}/>
         return (
             <Switch>
             <Route path='/details/:number' component={(props) => <UserDetailsContainer {...props} addStatus={this.props.addStatus} users={this.props.users} />}/>
             </Switch>
         );

     }

 }
