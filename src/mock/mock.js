const Mock = require('mockjs')

// 元素数据
import mockFileInformation from '@/mock/mockFileInformation'
import mockmodelfileurl from '@/mock/mockmodelfileurl'
import mockSocietyMindMap from '@/mock/mockSocietyMindMap'
import mockServicePattern from '@/mock/mockServicePattern'
import mockSociety from '@/mock/mockSociety'
import mockTask from '@/mock/mockTask'

// 注册路由
Mock.mock('/mock/api/fileinformation', 'get', (config) => {
    console.log(2)
    return {
        code: 200, data: mockFileInformation
    }
})
Mock.mock('/mock/api/fileinformation', 'post', (config) => {
    console.log(config.body)
    return {
        code: 200, data: mockFileInformation
    }
})

Mock.mock('/mock/api/downfile', 'get', { code: 200, data: mockmodelfileurl })
Mock.mock('/mock/api/downfile', 'get', { code: 200, data: mockmodelfileurl })
Mock.mock('http://localhost:8081//test', 'post', (config) => {
    console.log(config)
    return {
        code: 200, data: mockFileInformation
    }
})
Mock.mock('/mock/api/getSocietyMindMap', 'get', (config) => {
    return {
        code: 200, data: mockSocietyMindMap
    }
})
Mock.mock('/mock/api/restoreSocietyMindMap', 'post', (config) => {
    var tempMindMap=JSON.parse(config.body)
    // console.log(tempMindMap)
    // console.log(JSON.parse(config.body,'utf-8'))
    var flag=false
    for(let i=0;i<mockSocietyMindMap.length;i++){
        if(mockSocietyMindMap[i].societyPattern==tempMindMap.societyPattern){
            mockSocietyMindMap[i]=tempMindMap
            flag=true
        }
    }
    if(flag==false){
        mockSocietyMindMap[mockSocietyMindMap.length]=tempMindMap
    }
    // console.log(mockSocietyMindMap)
    return {
        code: 200
    }
})
Mock.mock('/mock/api/reNameSocietyMindMap', 'post', (config) => {
    var name=JSON.parse(config.body)
    // console.log(tempMindMap)
    // console.log(JSON.parse(config.body,'utf-8'))
    console.log(name)
    for(let i=0;i<mockSocietyMindMap.length;i++){
        if(mockSocietyMindMap[i].societyPattern==name.oldName){
            mockSocietyMindMap[i].societyPattern=name.newName
        }
    }
    console.log(mockSocietyMindMap)
    return {
        code: 200
    }
})
Mock.mock('/mock/api/deleteSocietyMindMap', 'post', (config) => {
    var name=config.body
    // console.log(tempMindMap)
    // console.log(JSON.parse(config.body,'utf-8'))
    for(let i=0;i<mockSocietyMindMap.length;i++){
        if(mockSocietyMindMap[i].societyPattern==name){
            mockSocietyMindMap.splice(i,1)
        }
    }
    console.log(mockSocietyMindMap)
    return {
        code: 200
    }
})
Mock.mock('/mock/api/downLoadSocietyMindMap', 'post', (config) => {
    var name=config.body
    var returnData=null
    // console.log(tempMindMap)
    // console.log(JSON.parse(config.body,'utf-8'))
    for(let i=0;i<mockSocietyMindMap.length;i++){
        if(mockSocietyMindMap[i].societyPattern==name){
            returnData=mockSocietyMindMap[i]
        }
    }
    console.log(returnData)
    return {
        code: 200, data: returnData
    }
})
//服务模式接口
Mock.mock('/mock/api/getServicePattern', 'get', (config) => {
    return {
        code: 200, data: mockServicePattern
    }
})

Mock.mock('/mock/api/createServicePattern', 'post', (config) => {
    console.log(config.body)
    var tempServicePattern=JSON.parse(config.body)
    mockServicePattern[mockServicePattern.length]=tempServicePattern
    console.log(mockServicePattern)
    return {
        code: 200
    }
})

Mock.mock('/mock/api/restoreServicePattern', 'post', (config) => {
    var tempServicePattern=JSON.parse(config.body)
    var flag=false
    console.log(tempServicePattern.servicePatternName)
    for(let i=0;i<mockServicePattern.length;i++){
        if(mockServicePattern[i].servicePatternName==tempServicePattern.servicePatternName){
            mockServicePattern[i]=tempServicePattern
            console.log(i)
        }
    }
    return {
        code: 200
    }
})
Mock.mock('/mock/api/deleteServicePattern', 'post', (config) => {
    var name=config.body
    // console.log(tempMindMap)
    // console.log(JSON.parse(config.body,'utf-8'))
    for(let i=0;i<mockServicePattern.length;i++){
        if(mockServicePattern[i].servicePatternName==name){
            mockServicePattern.splice(i,1)
        }
    }
    console.log(mockServicePattern)
    return {
        code: 200
    }
})
Mock.mock('/mock/api/reNameServicePattern', 'post', (config) => {
    var name=JSON.parse(config.body)
    // console.log(tempMindMap)
    // console.log(JSON.parse(config.body,'utf-8'))
    console.log(name)
    for(let i=0;i<mockServicePattern.length;i++){
        if(mockServicePattern[i].servicePatternName==name.oldName){
            mockServicePattern[i].servicePatternName=name.newName
        }
    }
    console.log(mockServicePattern)
    return {
        code: 200
    }
})

//社区实例接口
Mock.mock('/mock/api/getSociety', 'get', (config) => {
    return {
        code: 200, data: mockSociety
    }
})
Mock.mock('/mock/api/getSocietyInformation', 'get', (config) => {
    var name=config.body
    // console.log(tempMindMap)
    // console.log(JSON.parse(config.body,'utf-8'))
    console.log(name)
    var returnData=null
    for(let i=0;i<mockSociety.length;i++){
        if(mockSociety[i].societyName==name){
            returnData=mockSociety[i]
        }
    }
    console.log(returnData)
    return {
        code: 200, data: returnData
    }
})
Mock.mock('/mock/api/restoreSocietyServicePattern', 'post', (config) => {
    var tempServicePattern=JSON.parse(config.body)
    var flag=false
    console.log(tempServicePattern)
    for(let i=0;i<mockSociety.length;i++){
        if(mockSociety[i].societyName==tempServicePattern.societyName){
            console.log(mockSociety[i].servicePatternData.length)
            for(let j=0;j<mockSociety[i].servicePatternData.length;j++){
                console.log(mockSociety[i].servicePatternData[j])
                if(mockSociety[i].servicePatternData[j].servicePatternName==tempServicePattern.servicePatternName){
                    mockSociety[i].servicePatternData[j].servicePatternData=tempServicePattern.data
                }
            }
        }
    }
    return {
        code: 200
    }
})
Mock.mock('/mock/api/restoreSocietyMindMap2', 'post', (config) => {
    var tempData=JSON.parse(config.body)
    var flag=false
    console.log(tempData)
    for(let i=0;i<mockSociety.length;i++){
        if(mockSociety[i].societyName==tempData.societyName){
            mockSociety[i].MindMapData.data=tempData.data
            mockSociety[i].MindMapData.children=tempData.children
        }
    }
    return {
        code: 200
    }
})
Mock.mock('/mock/api/reNameSociety', 'post', (config) => {
    var tempData=JSON.parse(config.body)
    console.log(tempData)
    for(let i=0;i<mockSociety.length;i++){
        if(mockSociety[i].societyName==tempData.oldName){
            mockSociety[i].societyName=tempData.newName
        }
    }
    console.log(mockSociety)
    return {
        code: 200
    }
})
Mock.mock('/mock/api/createSociety', 'post', (config) => {
    var tempData=JSON.parse(config.body)
    console.log(tempData)
    mockSociety[mockSociety.length]=tempData
    console.log(mockSociety)
    return {
        code: 200
    }
})
Mock.mock('/mock/api/deleteSociety', 'post', (config) => {
    var name=config.body
    console.log(name)
    // console.log(tempMindMap)
    // console.log(JSON.parse(config.body,'utf-8'))
    for(let i=0;i<mockSociety.length;i++){
        if(mockSociety[i].societyName==name){
            mockSociety.splice(i,1)
        }
    }
    console.log(mockSociety)
    return {
        code: 200
    }
})
Mock.mock('/mock/api/getTask', 'get', (config) => {
    console.log(mockTask)
    return {
        code: 200, data: mockTask
    }
})
Mock.mock('/mock/api/createTask', 'post', (config) => {
    var tempData=JSON.parse(config.body)
    console.log(tempData)
    mockTask[mockTask.length]=tempData
    console.log(mockTask)
    return {
        code: 200
    }
})
Mock.mock('/mock/api/deleteTask', 'post', (config) => {
    var name=config.body
    // console.log(tempMindMap)
    // console.log(JSON.parse(config.body,'utf-8'))
    for(let i=0;i<mockTask.length;i++){
        if(mockTask[i].name==name){
            mockTask.splice(i,1)
        }
    }
    console.log(mockTask)
    return {
        code: 200
    }
})