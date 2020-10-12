import React, { Component } from 'react'
import Sider from '../../components/Sider/Sider'
import UploadArticle from '../../routes/UploadArticle/UploadArticle'
import UpdateArticle from '../../routes/UpdateArticle/UpdateArticle'
import ArticleList from '../../routes/ArticleList/ArticleList'
import CreateSpecialColumn from '../../routes/createSpecialColumn/createSpecialColumn'
import ColumList from '../../routes/ColumList/ColumList'
import UpdateColum from '../../routes/UpdateColum/UpdateColum'
import { Route } from 'react-router-dom'

export default class AdminLayout extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div id="admin" className="layout-adminLayout">
                <div className="layout-siderPosition"></div>
                <Sider className="layout-sider" />
                <aside className="layout-right">
                    <Route path={this.props.match.url} exact component={ArticleList} />
                    <Route path={this.props.match.url + 'uploadArticle'} component={UploadArticle} />
                    <Route path={`${this.props.match.url}updateArticle/:time`} component={UpdateArticle} />
                    <Route path={`${this.props.match.url}createSpecialColumn`} component={CreateSpecialColumn} />
                    <Route path={`${this.props.match.url}columList`} component={ColumList} />
                    <Route path={`${this.props.match.url}updateColum/:time`} component={UpdateColum} />
                </aside>
            </div>
        )
    }
}