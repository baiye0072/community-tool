import requests from "./request";
import "@/mock/mock"


// 删除服务流程任务数据
export const deleteTask = (name) => requests({
    url: '/deleteTask', method: 'post', data: name
})
// 新建任务
export const createTask = (dataAll) => requests({
    url: '/createTask', method: 'post', data: dataAll,
    headers: {
        'Content-Type': 'application/json', // 设置Content-Type
    }
})
//获取任务数据
export const reqTask = () => requests({ url: '/getTask', method: 'get' })
//获取社区实例数据
export const reqSocietyInformation = () => requests({ url: '/getSociety', method: 'get' })
//获取特定社区实例数据
export const reqOneSocietyInformation = (name) => requests({ url: '/getSocietyInformation', method: 'get' , data: name})
// 保存社区服务流程数据
export const restoreSocietyServicePattern = (dataAll) => requests({
    url: '/restoreSocietyServicePattern', method: 'post', data: dataAll,
    headers: {
        'Content-Type': 'application/json', // 设置Content-Type
    }
})
// 保存社区特征模型
export const restoreSocietyMindMap = (dataAll) => requests({
    url: '/restoreSocietyMindMap2', method: 'post', data: dataAll,
    headers: {
        'Content-Type': 'application/json', // 设置Content-Type
    }
})
// 修改社区名字
export const reNameSociety = (dataAll) => requests({
    url: '/reNameSociety', method: 'post', data: dataAll,
    headers: {
        'Content-Type': 'application/json', // 设置Content-Type
    }
})
// 新建社区
export const createSociety = (dataAll) => requests({
    url: '/createSociety', method: 'post', data: dataAll,
    headers: {
        'Content-Type': 'application/json', // 设置Content-Type
    }
})
// 删除社区
export const deleteSociety = (name) => requests({
    url: '/deleteSociety', method: 'post', data: name
})
//获取服务流程数据
export const reqServicePatternInformation = () => requests({ url: '/getServicePattern', method: 'get' })
// 新建服务流程
export const createServicePattern = (dataAll) => requests({
    url: '/createServicePattern', method: 'post', data: dataAll,
    headers: {
        'Content-Type': 'application/json', // 设置Content-Type
    }
})
// 保存服务流程数据
export const restoreServicePattern = (dataAll) => requests({
    url: '/restoreServicePattern', method: 'post', data: dataAll,
    headers: {
        'Content-Type': 'application/json', // 设置Content-Type
    }
})
// 删除服务流程数据
export const deleteServicePattern = (name) => requests({
    url: '/deleteServicePattern', method: 'post', data: name
})
// 重命名服务流程数据
export const reNameServicePattern = (name) => requests({
    url: '/reNameServicePattern', method: 'post', data: name,
    headers: {
        'Content-Type': 'application/json', // 设置Content-Type
    }
})
//获取思维导图数据
export const reqMindMapInformation = () => requests({ url: '/getSocietyMindMap', method: 'get' })
// 上传思维导图数据
export const restoreMindMapInformation = (dataAll) => requests({
    url: '/restoreSocietyMindMap', method: 'post', data: dataAll,
    headers: {
        'Content-Type': 'application/json', // 设置Content-Type
    }
})
// 重命名思维导图数据
export const reNameMindMapInformation = (name) => requests({
    url: '/reNameSocietyMindMap', method: 'post', data: name,
    headers: {
        'Content-Type': 'application/json', // 设置Content-Type
    }
})
// 删除思维导图数据
export const deleteMindMapInformation = (name) => requests({
    url: '/deleteSocietyMindMap', method: 'post', data: name
})
// 下载元素
export const downLoadMindMapInformation = (name) => requests({
    url: '/downLoadSocietyMindMap', method: 'post', data: name
})
// 获取元素数据
export const getElements = () => requests({ url: '/elements', method: 'get' })
// 注册元素
export const installElement = (element) => requests({ url: '/element', method: 'post', data: element })
// 删除元素
export const deleteElement = (id) => requests({ url: `/element/${id}`, method: 'delete' })
// 更新元素
export const updateElement = (element, id) => requests({ url: `/element/${id}`, method: 'put', data: element })
// 注册元素icon
export const installIcon = (icon) => requests({
    url: '/icon', method: 'post', data: icon, headers: {
        'Content-Type': 'multipart/form-data'
    }
})
// 获取所有元素icon
export const getIcons = () => requests({ url: '/icons', method: 'get' })

//获取文件数据
export const reqFileInformation = () => requests({ url: '/fileinformation', method: 'get' })
//上传新建文件数据
export const putFileInformation = (filedata) => requests({
    url: '/fileinformation', method: 'post', data: filedata, headers: {
        'Content-Type': 'multipart/form-data'
    }
})
// 根据ID获取文件数据
export const getModelFile = (fileId) => requests({ url: '/modelFile/' + fileId, method: 'get' })
// 保存文件
export const saveModelFile = ({ fileId, modelFile }) => requests({
    url: '/modelFile/' + fileId, data: modelFile,
    method: 'put'
})
//下载文件数据
export const downloadFile = (fileId) => requests({ url: '/downloadFile', method: 'get', data: fileId })
//删除文件数据
export const deleteFileInformation = (fileId) => requests({ url: `/modelfile/${fileId}`, method: 'delete', data: fileId })
//更新文件信息
export const updateFileInformation = (fileId, filedata) => requests({ url: '/modelfile/' + fileId, method: 'put', data: filedata })
// export const baseURL = 'https://h552848p38.zicp.fun/'

export const baseURL = 'http://10.1.1.117:6001/'