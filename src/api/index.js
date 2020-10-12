import axios from 'axios'
import { host, port } from './config'

const baseUrl = `http://${host}:${port}/api`

const uploadArticle = (form) => {
    return axios({
        url: `${baseUrl}/article/list/upload`,
        method: 'post',
        data: form
    })
}

const getArticleList = (time, length) => {
    return axios({
        url: `${baseUrl}/article/list?time=${time}&length=${length}`,
        method: 'get'
    })
}

const deleteArticle = (create_time) => {
    return axios({
        url: `${baseUrl}/article/delete`,
        data: { create_time },
        method: 'delete'
    })
}

const updateArticle = data => {
    return axios({
        url: `${baseUrl}/article/update`,
        data: data,
        method: 'put'
    })
}

const createColum = data => {
    return axios({
        url: `${baseUrl}/colum/create`,
        data: data,
        method: 'post'
    })
}

const getColumList = () => {
    return axios({
        url: `${baseUrl}/colum/all`,
        method: 'get'
    })
}

const searchArticle = key => {
    return axios({
        url: `${baseUrl}/article/search?key=${key}`,
        method: 'get'
    })
}

const getEachColum = time => {
    return axios({
        url: `${baseUrl}/colum/each/${time}`,
        method: 'get'
    })
}

const addArticleToColum = (col_id, articles) => {
    return axios({
        url: `${baseUrl}/colum/add`,
        method: 'put',
        data: {
            col_id,
            articles
        }
    })
}

export {
    uploadArticle,
    getArticleList,
    deleteArticle,
    updateArticle,
    createColum,
    getColumList,
    searchArticle,
    getEachColum,
    addArticleToColum
}