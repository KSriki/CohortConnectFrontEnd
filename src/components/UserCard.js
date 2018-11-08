import React from 'react'
import {Card, Icon, Image} from 'semantic-ui-react'

export default class UserCard extends React.Component {

    render() {

        let user = this.props.user;
        return (
            <Card>
                <Image src={user.avatar_url} alt="broken"/>
                <Card.Content>
                    <Card.Header>{user.name}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{user.login}</span>
                    </Card.Meta>
                    <Card.Description>{user.bio}</Card.Description>
                </Card.Content>
                <Card.Content extra="extra">
                    <a>
                        <Icon name='user'/>
                        {user.github_identifier}
                    </a>
                </Card.Content>
            </Card>
        )

    }

}
