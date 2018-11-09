import React from 'react'



export default class Status extends React.Component {


    render(){

        return (
            <div>
                Content: {this.props.statusObj.status}
            </div>)

    }


}
