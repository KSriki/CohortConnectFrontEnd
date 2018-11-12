import React from 'react'

import Status from '../components/Status'

import { Feed} from 'semantic-ui-react'

export default class StatusList extends React.Component{



    render(){

        return (<Feed>
            {this.props.allUserStatuses.map(status => {
                return (<Status key={status.id} statusObj={status} userObj={this.props.userObj}/>)
            })}
            </Feed>)


    }
}
