import React from 'react'
import { Icon, message } from 'antd'
import { Link } from 'react-router-dom'
import { getArticleList, deleteArticle } from '../../api/index'

export default class ArticleList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articleList: [],
            loading: 'arrow-down',
            noDate: false
        }
    }

    getNewArticle = data => {
        this.setState(state => {
            state.articleList.push(...data)
            return {
                articleList: state.articleList
            }
        })
    }

    loadMore = () => {

        const list = this.state.articleList,
            time = list[list.length - 1]['create_time']

        this.setState({
            loading: 'loading'
        })

        getArticleList(time, 20).then(res => {
            this.getNewArticle(res.data)
            if (res.data.length < 20) {
                this.setState({
                    noData: true
                })
                return
            }
            this.setState({
                loading: 'arrow-down'
            })
        })
    }

    deleteArticle = (create_time) => {
        deleteArticle(create_time)
            .then(res => {
                message.success('删除成功')

                this.setState(state => {
                    const { articleList } = state
                    for (let i = 0; i < articleList.length; i++) {
                        if (articleList[i]['create_time'] === create_time) {
                            articleList.splice(i, 1)
                            return {
                                articleList: articleList
                            }
                        }
                    }
                })
            })
            .catch(err => {
                message.error('删除失败')
            })
    }

    updateArticle = (create_time) => {
        window.hash = '/uploadArticle'
    }

    render() {
        return (
            <div id="articleList" >
                <div className="list-container">
                    <nav>编辑文章</nav>
                    {this.state.articleList.map(item => (
                        <section className="list-card" key={item.create_time}>
                            <span className="list-title">{item.title}</span>
                            <span className="list-icon">
                                <Link to={`${this.props.match.url}updateArticle/${item.create_time}`}>
                                    <Icon type="edit" onClick={e => this.updateArticle(item.create_time)} />
                                </Link>
                                <Icon type="delete" onClick={e => this.deleteArticle(item.create_time)} />
                            </span>
                        </section>
                    ))}
                    {!this.state.noData &&
                        <footer className="list-load" onClick={this.loadMore}>
                            <Icon type={this.state.loading} />
                            点击加载更多
                        </footer>
                    }
                    {this.state.noData &&
                        <footer className="list-load">
                            全部加载完毕
                        </footer>
                    }

                </div>
            </div>
        )
    }

    componentWillMount() {
        getArticleList(1, 20).then(res => {
            if (res.data < 20) {
                this.setState({
                    noData: true
                })
            }
            this.getNewArticle(res.data)
        })
    }
}