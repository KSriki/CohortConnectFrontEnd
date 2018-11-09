import React from "react";

class StatusForm extends React.Component {


  handleFormSubmit = e => {
    e.preventDefault();
    console.log("made new status");
  };

  render() {
    return (
      <div className="ui large transparent left icon input">
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" placeholder="Set status..." />
          <button className="ui outline icon button" type="submit">
          <i className="code icon"/>
          </button>
        </form>
      </div>
    );
  }
}
export default StatusForm;
