import React from 'react'

import Status from '../components/Status'


export default class StatusList extends React.Component{



    render(){

        return (<div>
            {this.props.allUserStatuses.map(status => {
                return (<Status key={status.id} statusObj={status}/>)
            })}
            </div>)


    }
}
