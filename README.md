ant-pro-x：另一种技术风格的 ant pro 实现
===

# Why

## 目标

希望用更简单，更组件化的方式去实现 ant pro。

## 与官方实现的区别

1. 开发技术栈上：
    
    - ant-pro-x 使用了redux + redux-thunk。
    
    - 官方使用了dva，对redux + redux-saga 进行了封装。

2. 概念上：
    
    - ant-pro-x 沿袭redux已有概念，同时使用了[redux-duck](https://github.com/erikras/ducks-modular-redux)约定来解决reducer，actionType，actionCreator等部件分散的问题。
    
    - 官方实现基于dva封装，需要理解dva额外引入的概念，同时异步操作封装了redux-saga，需要理解saga的很多概念，这点个人认为**及其不简单**。 

3. 项目目录组织风格上：  
  
     - ant-pro-x 基于domain-style组织，便于大型项目的维护扩展，以及未来的业务组件化，[具体目录约定](https://github.com/Exodia/x-react-scripts#domain-style%E7%9A%84%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84)
   
     - 官方似乎主要基于rails-style组织，很难从目录结构直观区分业务模块

4. 数据mock：

    - ant-pro-x 封装了[json-server](https://github.com/typicode/json-server/)，
  
    - 官方使用roadhog

# 安装使用

1. 安装：npm install

2. 启动应用：```npm start```，或者启用mock环境：```npm run start:mock```

3. 启用mock server：```npm run mock```; 可在页面url后增加 ?__mock__ 参数启用mock数据，或者使用步骤2的方式在命令行启用moc
