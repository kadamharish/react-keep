import React from 'react'

import {
    Route
} from "react-router-dom";
import { Layout } from 'antd';
import CustomHeader from '../header/header';
import Home from '../home/home';
import Archived from "../archived/archived";
import Deleted from "../deleted/deleted";
const { Content } = Layout;

// Exporting Dashboard component with routing.
export default function Dashboard() {

    return (
        <Layout>
            <CustomHeader />
            <Content>
                <Route exact path="/" component={Home}>
                </Route>
                <Route exact path="/archived" component={Archived} >
                </Route>
                <Route exact path="/deleted" component={Deleted}>
                </Route>
            </Content>
        </Layout>

    );

}
