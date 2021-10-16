import React, { useEffect, useState, Fragment } from 'react';
import * as axiosHelper from '../helpers/axiosHelper';

export default function UserList () {

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const response = await axios(axiosHelper.getAllUsers());
            setUsers(response.data);
        } catch(error) {
            errorCallback(error.response.data.errors);
        }
    };

    useEffect(() => { getUsers(); }, []);

    return (
        <Fragment>
            <div className="user-list">
                {users.map((user) =>
                    <div className="user-list__item" key={user.id} value={user.id}>{user.name}</div>
                )}
            </div>
        </Fragment>
    );
}
