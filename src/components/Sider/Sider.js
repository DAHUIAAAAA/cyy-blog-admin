import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

const { SubMenu } = Menu

export default class Sider extends Component {

    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
        }
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {

        const { className } = this.props
        return (
            <div id="sider" className={[`sider-sider`, `${className}`].join(' ')}>
                <Menu
                    onClick={this.handleClick}
                    style={{ width: 256, height: 100 + '%' }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['g1']}
                    mode="inline"
                    theme="dark"
                >
                    <SubMenu
                        key="g1"
                        title={
                            <span>
                                <Icon type="setting" />
                                <span>文章</span>
                            </span>
                        }
                    >
                        <Menu.Item key="1">
                            <Link to="/">首页</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/uploadArticle">文章上传</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/createSpecialColumn">新建专栏</Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/columList">专栏列表</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}