import React, { Component } from 'react'
import { Input, Select, Form, Button, Upload, Icon, message } from 'antd'
import { createColum } from '../../api/index'
import { host, port } from '../../api/config'

const { Option } = Select
const uploadUrl = `http://${host}:${port}/api/imgs/upload`

class CreateSpecialColumn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            imgUrl: null,
            loading: false
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (err) {
                message.error('尚未填写完整！')
                return;
            }

            if (!err) {

                Object.assign(values, {
                    img: this.state.imgUrl
                })
            }

            createColum(values)
            .then(res => {
                message.success('上传成功')
            })
            .catch(err => {
                message.error('上传失败')
            })
        });
    }

    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.setState({
                imgUrl: info.file.response.imgUrl,
                loading: false
            })
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form

        const bigTitle = <nav>新建专栏</nav>

        const title = getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入题目!' }],
        })(<Input placeholder="添加标题" />)

        const uploadButton = (
            <div>
                {!this.state.loading ? <Icon type="upload" /> : <Icon type="loading" />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const uploadImage = <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action= {uploadUrl}
            method="post"
            beforeUpload={this.beforeUpload}
            onChange={this.handleChange}
        >
            {this.state.imgUrl ?
                <img src={this.state.imgUrl}
                    alt="avatar"
                    style={{ width: '100%' }} />
                : uploadButton}
        </Upload>

        const button = <Button type="primary" htmlType="submit" className="login-form-button">新建专栏</Button>

        const { className } = this.props

        return (
            <div id="upload" className={[`upload-upload`, `${className}`].join(' ')}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {bigTitle}
                    </Form.Item>
                    <Form.Item>
                        {title}
                    </Form.Item>
                    <Form.Item>
                        {uploadImage}
                    </Form.Item>
                    <Form.Item>
                        {button}
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const uploadForm = Form.create({ name: 'upload_form' })(CreateSpecialColumn)

export default uploadForm
