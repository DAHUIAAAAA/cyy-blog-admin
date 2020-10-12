import React, { Component } from 'react'
import { HashRouter, Route} from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout/AdminLayout'

export default class RouterWrap extends Component {
    render() {
        return (
            <div id="router">
                <HashRouter>
                    <Route path="/" component={AdminLayout}></Route>
                </HashRouter>
            </div>
        )
    }
}