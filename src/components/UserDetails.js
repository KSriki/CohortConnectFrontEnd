import React from 'react'
import UserCard from './UserCard'

export default class UserDetails extends React.Component {

    render() {
        console.log(this.props.users)

        if (this.props.users.length !== 0) {
            if (this.props.users.find(user => user.id === parseInt(this.props.match.params.number))) {
                console.log("Found id")
                let detail = this.props.users.find(user => user.id === parseInt(this.props.match.params.number));
                return (<UserCard user={detail}/>);
            } else {
                console.log("cant find id")
                return (<div>FAILED</div>)
            }
        }
        else{
            return (<div>Loading - Please use the application links!</div>)
        }

    }

}
