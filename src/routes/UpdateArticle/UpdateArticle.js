import React, { Component } from 'react'
import { Input, Select, Form, Button, Upload, Icon, message } from 'antd'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import { updateArticle } from '../../api/index'

const { Option } = Select

const renderer = new marked.Renderer()

class UpdateArticle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fileList: [],
            content: ''
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (!err) {

                if (values['content']) {
                    Object.assign(values, {
                        content: this.state.content
                    })
                }
            }

            for(let key in values) {
                if(!values[key]) {
                    delete values[key]
                }
            }

            values.create_time = this.props.match.params.time

            console.log(values)

            updateArticle(values).then(res => { 
                message.success('更新成功')
            })
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form

        const title = <nav>编辑文章</nav>

        const desc = getFieldDecorator('desc', {
            rules: [],
        })(<Input placeholder="添加文章描述" />)

        const tags = getFieldDecorator('tags', {
            rules: [],
        })(
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="select tags"
                onChange={this.handleChange}
                optionLabelProp="label"
            >
                <Option value="javascript" label="javascript">
                    <span role="img" aria-label="javascript">
                        javascript
                    </span>
                </Option>
                <Option value="node.js" label="node.js">
                    <span role="img" aria-label="node.js">
                        node.js
                    </span>
                </Option>
                <Option value="html" label="html">
                    <span role="img" aria-label="html">
                        html
                    </span>
                </Option>
            </Select>,
        )

        const { fileList } = this.state

        const props = {
            onRemove: file => {
                this.setState(state => {
                    const newFileList = state.fileList.slice();
                    newFileList.splice(0, 1);
                    return {
                        fileList: newFileList,
                        content: ''
                    };
                });
            },
            beforeUpload: file => {
                const that = this
                const fr = new FileReader()
                fr.readAsText(file, {
                    encoding: 'utf-8'
                })
                fr.onload = function () {
                    that.setState({ content: fr.result })
                }
                this.setState(state => ({
                    fileList: [file],
                }));
                return false;
            },
            fileList,
        };

        const content = <Upload {...props}>
            <Button>
                <Icon type="upload" /> Select File
            </Button>
        </Upload>

        const button = <Button type="primary" htmlType="submit" className="login-form-button">更新文章</Button>

        const { className } = this.props

        return (
            <div id="upload" className={[`upload-upload`, `${className}`].join(' ')}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {title}
                    </Form.Item>
                    <Form.Item>
                        {desc}
                    </Form.Item>
                    <Form.Item>
                        {tags}
                    </Form.Item>
                    <Form.Item>
                        {content}
                        <div className="content" dangerouslySetInnerHTML={
                            {
                                __html: marked(this.state.content,
                                    { renderer: renderer })
                            }}>
                        </div>
                    </Form.Item>
                    <Form.Item>
                        {button}
                    </Form.Item>
                </Form>
            </div>
        )
    }

    componentWillMount() {

        hljs.initHighlightingOnLoad()

        marked.setOptions({
            renderer: renderer,
            gfm: true,
            pedantic: false,
            sanitize: false,
            tables: true,
            breaks: true,
            smartLists: true,
            smartypants: true,
            highlight: code => hljs.highlightAuto(code).value
        })

    }
}

const uploadForm = Form.create({ name: 'upload_form' })(UpdateArticle)

export default uploadForm
