import React from 'react'
import { Icon, message } from 'antd'
import { Link } from 'react-router-dom'
import { getColumList} from '../../api/index'

export default class ColumList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columList: []
        }
    }

    getNewColums = data => {
        if(data.length === 0) return
        this.setState(state => {
            state.columList.push(...data)
            return {
                columList: state.columList
            }
        })
    }

    render() {
        return (
            <div id="columList" >
                <div className="list-container">
                    <nav>专栏列表</nav>
                    {this.state.columList.map(item => (
                        <section className="list-card" key={item.create_time}>
                            <span className="list-title">{item.title}</span>
                            <span className="list-icon">
                                <Link to={`/updateColum/${item.create_time}`}>
                                    <Icon type="edit"/>
                                </Link>
                            </span>
                        </section>
                    ))}
                </div>
            </div>
        )
    }

    componentWillMount() {
        getColumList().then(res => {
            this.getNewColums(res.data.colums)
        })
    }
}