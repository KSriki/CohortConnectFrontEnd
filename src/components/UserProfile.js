import React from "react";
import { Icon } from "semantic-ui-react";

const UserProfile = props => {
  let avatar_url = "Loading avatar url";
  let name = "Loading name";
  let login = "Username";
  let html_url = "link...";
  let bio = "Programmer bio";

  if (props.userObj) {
    avatar_url = props.userObj.avatar_url;
    name = props.userObj.name;
    login = props.userObj.login;
    html_url = props.userObj.html_url;
    if (props.userObj.bio) {
      bio = props.userObj.bio;
    } else {
      bio = "Web Dev Immersive Student @flatiron-school DC 082718 Cohort";
    }
  }
  return (
    <div>
      <img src={avatar_url} alt="Github Profile Pic" />
      <h3>{name}</h3>
      <p>
        <Icon name="user" />
        <strong>
          <a href={html_url}>{login}</a>
        </strong>
      </p>

      <p>{bio}</p>
    </div>
  );
};

export default UserProfile;
