import React from 'react'
import { Input, message, Button } from 'antd'
import {
    searchArticle,
    getEachColum,
    addArticleToColum
} from '../../api/index'

const { Search } = Input

export default class UpdateColum extends React.Component {

    state = {
        articleList: [],
        result: [],
        selectList: {}
    }

    search = value => {
        searchArticle(value)
            .then(res => {
                if (typeof res.data.result !== 'undefined') {
                    this.getSearchColumList(res.data.result)
                }
            })
    }

    getSearchColumList = data => {
        this.setState({
            result: data
        })
    }

    pushArticle = async (item) => {
        const { selectList } = this.state

        for (let i = 0; i < selectList.length; i++) {
            if (selectList[i].create_time === item.create_time) {
                message.error('你已添加过该文章')
                return
            }
        }

        await this.setState(state => {
            state.selectList[item.create_time] = item.title
            return {
                selectList: state.selectList
            }
        })
    }

    removeArticle = create_time => {
        this.setState(state => {
            let { selectList } = state
            for (let i = 0; i < selectList.length; i++) {
                if (selectList[i].create_time === create_time) {
                    selectList.splice(i, 1)
                    return {
                        selectList: state.selectList
                    }
                }
            }
        })
    }

    addArticle = () => {

        const articles = this.state.selectList,
            col_id = this.props.match.params.time

        addArticleToColum(col_id, articles)
            .then(res => {
                if (res.data.code === 0) {
                    message.success('添加成功')
                } else {
                    message.error('添加失败')
                }
            })
            .catch(err => {
                message.error('添加失败')
            })
    }

    render() {
        const selectList = this.state.selectList
        return (
            <div id="updateColum">
                <nav>添加专栏文章</nav>
                <Search
                    placeholder="输入文章标题或id号"
                    onSearch={value => this.search(value)}
                />

                <div className="article-list">
                    <label>已有文章</label>
                    {this.state.articleList.map(item => (
                        <span key={item.create_time}>
                            {item.title}
                        </span>
                    ))}
                </div>

                <div className="result">
                    <label>搜索结果</label>
                    {this.state.result.map(item => (
                        <span key={item.create_time} onClick={() => { this.pushArticle(item) }}>
                            {item.title}
                        </span>
                    ))}
                </div>

                <div className="check-list">
                    <label>已选文章</label>
                    {Object.keys(selectList).map(key => (
                        <span key={key} onClick={() => this.removeArticle(key)}>
                            {selectList[key]}
                        </span>
                    ))}
                </div>

                <Button type="primary" onClick={this.addArticle}>添加文章到专栏</Button>
            </div>
        )
    }

    componentWillMount() {
        const time = this.props.match.params.time
        getEachColum(time)
            .then(res => {
                this.setState({
                    articleList: res.data.articles
                })
            })
    }
}