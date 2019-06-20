#### Introduction mongodb-plus
- **This is a plugin that was created to make it easy to operate the mongodb database in nodejs**，Maybe everyone has heard of mongoose, indeed mongoose is also very good, but there are model objects in mongoose that limit the input data. I don't like this limitation very much, so I created this plugin 23333.
- **I am encapsulating based on the native method of mongodb**，It is highly compatible with the original method, but it is more convenient，**The method is named the same as the native method, so that you can get started directly**，The method I divided into two types:**One is an improved native method (with Sync ending)**，**The other is based on Promise encapsulation (without Sync)**，Can be used in conjunction with async asynchronous function (comfortable with **koa**)
- **This plugin is essentially a syntactic sugar**，Is that you can use nodejs to operate the mongodb database more convenient，But essentially the native mongodb method, so there is no change in performance

#### Use of mongodb-plus

##### 1. installation
>npm i mongodb-plus 
##### 2. Connect mongodb
```javascript
//import mongodb-plus
const db = require("mongodb-plus")
//The way to connect to the database is the same as the native,I don't make too many changes here
db.connect("mongodb://localhost:10086/demo1").then(()=>{
    console.log("connected...")
}).catch(err=>{
    console.log(err)
})
```
#### 3. For the use of the method, see the table below:
|method|parameter|way|
|---|---|---|
|`insert`|insert(`collection`,`data`)|Based on Promise|
|insertSync|insertSync(`collection`,`data`,`callback`)|native-based|
|`insertOne`|insertOne(`collection`,`data`)|Based on Promise|
|insertOneSync|insertOneSync(`collection`,`data`,`callback`)|native-based|
|`insertMany`|insertMany(`collection`,`data`)|Based on Promise|
|insertManySync|insertManySync(`collection`,`data`,`callback`)|native-based|
|`find`|find(`collection`,`data`[,`limitValue`,`skipValue`,`sort`])|Based on Promise|
|findSync|findSync(`collection`,`data`,`callback`[,`limitValue`,`skipValue`,`sort`])|native-based|
|`findOne`|findOne(`collection`,`data`)|Based on Promise|
|findOneSync|findOneSync(`collection`,`data`,`callback`)|native-based|
|`updateOne`|updateOne(`collection`,`data1`,`data2`)|Based on Promise|
|updateOneSync|updateOneSync(`collection`,`data1`,`data2`,`callback`)|native-based|
|`updateMany`|updateMany(`collection`,`data1`,`data2`)|Based on Promise|
|updateManySync|updateManySync(`collection`,`data1`,`data2`,`callback`)|native-based|
|`deleteOne`|deleteOne(`collection`,`data`)|Based on Promise|
|deleteOneSync|deleteOneSync(`collection`,`data`,`callback`)|native-based|
|`deleteMany`|deleteMany(`collection`,`data`)|Based on Promise|
|deleteManySync|deleteManySync(`collection`,`data`,`callback`)|native-based|
|deleteCollection|deleteCollection(`collection`)|native-based|
#### 4. for example
```javascript
const db = require("mongodb-plus")
//db.connect("mongodb://localhost:10086/demo1")
db.connect("mongodb://localhost:10086/demo1").then(()=>{
    console.log("connected...")
}).catch(err=>{
    console.log(err)
})

//Use the native-based method findSync
db.findSync("people",{},data=>{
    console.log(data)
})
//Use the Promise-based method find
db.find("people",{}).then(data=>{
    console.log(data)
}).catch(err=>{
    console.log(err)
})

//You can also use it with async asynchronous functions
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

//Or use insertSync
db.insertSync("people",{ username:"laodi", password:"ld12345" },function(){
    console.log("insert successful...")
})
```
- mongodb-plus allows you to operate mongodb using node and become very free and simple，Want to know more can look at the following address：
>npm： **https://www.npmjs.com/package/mongodb-plus**
>github： **https://github.com/shataniya/mongodb-plus**