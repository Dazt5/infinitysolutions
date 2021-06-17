import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Sidebar, Header } from '../../';
import {apiAxios} from '../../../../config/api';

const layout = ({ props, children }) => {

    if (!localStorage.getItem('token')) {
        props.history.push('/login');
    }

    const [user, saveUser] = useState({
        name: '...',
        lastname: '...'
    });

    useEffect(() => {

        const getUser = async () => {
            try {
                const { data } = await apiAxios.get('/user');

                const user = data.user;

                saveUser(user)

            } catch (error) {
                console.log(error);
            }
        }

        getUser();

    }, []);


    return (

        <Fragment>
            <Sidebar user={user} />
            <div className="main-content">
                <Header user={user} />
                {children}
            </div>
        </Fragment>
    )
}



export const Layout = withRouter(layout)