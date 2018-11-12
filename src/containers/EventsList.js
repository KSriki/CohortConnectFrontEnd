import React from 'react'

import Event from '../components/Event'
import { Feed} from 'semantic-ui-react'

export default class EventsList extends React.Component {

    render(){

        return (<Feed>
            <h1>Recent Activity</h1>
            {this.props.eventsList.map(event => {return (<Event eventObj={event}/>)})}
            </Feed>)
    }
}
