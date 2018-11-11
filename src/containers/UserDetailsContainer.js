import React from "react";
import UserCard from "../components/UserCard";
import StatusForm from "../components/StatusForm";
import StatusList from './StatusList';

import {Grid} from 'semantic-ui-react'

export default class UserDetailsContainer extends React.Component {
    // Write out user details instead of calling UserCard

    render() {
        // debugger;
        // if(this.props.userObj){
        return (<Grid columns={3} divided>
            <Grid.Row>
                <Grid.Column>
                    <UserCard userObj={this.props.userObj}/>
                </Grid.Column>
                <Grid.Column>
                    <StatusForm user={this.props.userObj} addStatus={this.props.addStatus}/>
                    <StatusList allUserStatuses={this.props.allUserStatuses} userObj={this.props.userObj}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>)
        // }
        // else{
        //     return (<div>
        //       <UserCard userObj={JSON.parse(localStorage.users)} />
        //       <StatusForm user={this.props.userObj} addStatus={this.props.addStatus} />
        //
        //     </div>)
        // }

    }
}
