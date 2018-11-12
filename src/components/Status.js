import React from "react";

import { Feed, Icon } from "semantic-ui-react";

//finds the difference in todays date and the date the post was made
function getDifference(status_date) {
  //get todays date
  let today = new Date();

  //default value to return is
  //the posts creation date in a readable format using toLocaleDateString
  //example: 11/7/2018
  let ago = status_date.toLocaleDateString();

  //gets the difference in milliseconds
  let difference = today - status_date;

  //get seconds from milliseconds and round down
  let seconds = Math.floor(difference / 1000);

  //
  if (seconds === 0) {
    ago = "Just now";
  } else {
    //get minutes from seconds
    let minutes = Math.floor(seconds / 60);
    if (minutes === 0) {
      if (seconds === 1) {
        ago = `${seconds} second ago`;
      } else {
        ago = `${seconds} seconds ago`;
      }
    } else {
      //get hours from minutes
      let hours = Math.floor(minutes / 60);
      if (hours === 0) {
        if (minutes === 1) {
          ago = `${minutes} minute ago`;
        } else {
          ago = `${minutes} minutes ago`;
        }
      } else {
        //get days from hours
        let days = Math.floor(hours / 24);
        if (days === 0) {
          if (hours === 1) {
            ago = `${hours} hour ago`;
          } else {
            ago = `${hours} hours ago`;
          }
        } else {
          //1 day vs many days
          if (days === 1) {
            ago = `${days} day ago`;
          } else {
            ago = `${days} days ago`;
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

    return (
      <Feed.Event>
        <Feed.Label image={user.avatar_url} />
        <Feed.Content>
          <Feed.Summary>
            <a onClick={()=> window.open(user.html_url, "_blank")}>{user.login}</a>{" "}
            <Feed.Date>{ago}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>{thisStatus.status}</Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    );
  }
}
