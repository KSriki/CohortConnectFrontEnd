import React from 'react'

import {Feed, Icon} from 'semantic-ui-react'


function getDifference(status_date){

    let today = new Date();

    let ago = status_date.toLocaleDateString();

    let difference = today - status_date;
    let seconds = Math.floor(difference / 1000);

    console.log(seconds)

    if (seconds === 0) {
        ago = "Just now";
    } else {
        let minutes = Math.floor(seconds / 60);
        if (minutes === 0) {
            if (seconds === 1) {
                ago = `${seconds} second ago`
            } else {
                ago = `${seconds} seconds ago`
            }

        } else {
            let hours = Math.floor(minutes / 60);
            if (hours === 0) {
                if (minutes === 1) {
                    ago = `${minutes} minute ago`
                } else {
                    ago = `${minutes} minutes ago`
                }
            } else {
                let days = Math.floor(hours / 24);
                if (days === 0) {
                    if (hours === 1) {
                        ago = `${hours} hour ago`
                    } else {
                        ago = `${hours} hours ago`
                    }
                } else {
                    if (days === 1) {
                        ago = `${days} day ago`
                    } else {
                        ago = `${days} days ago`
                    }
                }
            }
        }

    }

    return ago;


}


export default class Status extends React.Component {

    render() {

        // debugger;
        //replace the a href to be a link in our app
        //(to that persons specific page or something)

        let user = this.props.userObj;
        let thisStatus = this.props.statusObj;
        let status_date = new Date(thisStatus.created_at);

        // (((((new Date()) -status_date) / 1000) / 60) / 60) / 24

        let ago = getDifference(status_date);

        return (<Feed.Event>
            <Feed.Label image={user.avatar_url}/>
            <Feed.Content>
                <Feed.Summary>
                    <a href={user.html_url}>{user.login}</a> <Feed.Date>{ago}</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text="text">
                    {thisStatus.status}
                </Feed.Extra>
            </Feed.Content>
        </Feed.Event>)

    }

}
