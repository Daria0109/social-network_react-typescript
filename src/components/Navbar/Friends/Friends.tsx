import React from 'react';
import c from './Friends.module.css'
import Friend from './Friend/Friend';
import {FriendType} from '../../../redux/types/types';

type FriendsPropsType = {
        friends: Array<FriendType>
}
const Friends = function (props: FriendsPropsType) {

    const friendElement = props.friends.map(friend =>
        <Friend key={friend.id} id={friend.id} name={friend.name} avatar={friend.avatar}/>)

    return (
        <div className={c.friends}>
            <h3>Friends</h3>
            <div className={c.friends__section}>
                {friendElement}
            </div>

        </div>
    )
}
export default Friends;