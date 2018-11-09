import React from "react";
import UserCard from "./UserCard";
import StatusForm from "./StatusForm";
import StatusList from '../containers/StatusList';

export default class UserDetails extends React.Component {
  // Write out user details instead of calling UserCard

  render() {
      // debugger;
      // if(this.props.userObj){
          return (<div>
            <UserCard userObj={this.props.userObj} />
            <StatusForm user={this.props.userObj} addStatus={this.props.addStatus} />
            <StatusList allUserStatuses={this.props.allUserStatuses} />
          </div>)
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
