import React from "react";

class StatusForm extends React.Component {


  handleFormSubmit = e => {
    e.preventDefault();
    this.props.addStatus(e, this.props.user.id)

  };

  render() {
    return (
      <div className="ui large transparent left icon input">
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="statusInput" placeholder="Set new status..." />
          <button className="ui outline icon button" type="submit">
            <i className="code icon"/>
          </button>
        </form>
      </div>
    );
  }
}
export default StatusForm;
