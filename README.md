#### 介绍 mongodb-plus
- **这是一个为了让操作在node里方便操作mongodb数据库而诞生的插件**，可能大家也听说过mongoose，确实mongoose也挺好，但是mongoose里面有模型对象对输入的数据进行了限制，我不怎么喜欢这个限制，于是就诞生了这个插件23333
- **我是基于mongodb原生的方法进行封装的**，用起来首先和原生的方法契合度很高，但是更方便，**方法的命名也和原生的方法一样，目的是为了让你可以直接入手**，方法我分为了两种：**一种是改进的原生方法（带Sync结尾的）**，**一种是基于Promise封装的方法（不带Sync结尾的）**，可以结合async异步函数使用（配合koa框架更爽）
- **这个插件本质上也是一个语法糖**，就是可以让你使用node操作mongodb数据库更加方便，但是本质上还是原生的mongodb方法，因此性能上来说没什么改变

#### mongodb-plus的使用

##### 1. mongodb-plus的安装
>npm i mongodb-plus 
##### 2. 连接mongodb数据库
```javascript
//引入 mongodb-plus
const db = require("mongodb-plus")
//连接数据库和原生的方式是一样的，这里我不做太多的改变
db.connect("mongodb://localhost:10086/demo1").then(()=>{
    console.log("connected...")
}).catch(err=>{
    console.log(err)
})
```
#### 3. 方法的使用，看下表：
|方法|参数|性质|
|---|---|---|
|`insert`|insert(`collection`,`data`)|基于Promise|
|insertSync|insertSync(`collection`,`data`,`callback`)|原生|
|`insertOne`|insertOne(`collection`,`data`)|基于Promise|
|insertOneSync|insertOneSync(`collection`,`data`,`callback`)|原生|
|`insertMany`|insertMany(`collection`,`data`)|基于Promise|
|insertManySync|insertManySync(`collection`,`data`,`callback`)|原生|
|`find`|find(`collection`,`data`[,`limitValue`,`skipValue`,`sort`])|基于Promise|
|findSync|findSync(`collection`,`data`,`callback`[,`limitValue`,`skipValue`,`sort`])|原生|
|`findOne`|findOne(`collection`,`data`)|基于Promise|
|findOneSync|findOneSync(`collection`,`data`,`callback`)|原生|
|`updateOne`|updateOne(`collection`,`data1`,`data2`)|基于Promise|
|updateOneSync|updateOneSync(`collection`,`data1`,`data2`,`callback`)|原生|
|`updateMany`|updateMany(`collection`,`data1`,`data2`)|基于Promise|
|updateManySync|updateManySync(`collection`,`data1`,`data2`,`callback`)|原生|
|`deleteOne`|deleteOne(`collection`,`data`)|基于Promise|
|deleteOneSync|deleteOneSync(`collection`,`data`,`callback`)|原生|
|`deleteMany`|deleteMany(`collection`,`data`)|基于Promise|
|deleteManySync|deleteManySync(`collection`,`data`,`callback`)|原生|
|deleteCollection|deleteCollection(`collection`)|原生|
#### 4. 使用事例
```javascript
const db = require("mongodb-plus")
//db.connect("mongodb://localhost:10086/demo1")
db.connect("mongodb://localhost:10086/demo1").then(()=>{
    console.log("connected...")
}).catch(err=>{
    console.log(err)
})

//使用基于原生的方法findSync
db.findSync("people",{},data=>{
    console.log(data)
})
//使用基于Promise的方法find
db.find("people",{}).then(data=>{
    console.log(data)
}).catch(err=>{
    console.log(err)
})

//你还可以配合async异步函数使用
async function show(){
    const data = await db.find("people",{})
    console.log(data)
}
show()

//insert
db.insert("people",{ username:"laowang", password:"lw12345" }).then(result=>{
    console.log(result)
}).catch(err=>{
    console.log(err)
})

//或者使用 insertSync
db.insertSync("people",{ username:"laodi", password:"ld12345" },function(){
    console.log("insert successful...")
})
```
- mongodb-plus 可以让你使用node操作mongodb变得很自由，也很简单，想了解更多的可以看看以下地址：
>npm 地址： **https://www.npmjs.com/package/mongodb-plus**
>github 地址： **https://github.com/shataniya/mongodb-plus**