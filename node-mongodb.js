const MongoClient = require("mongodb").MongoClient

exports.connect = function(path){
    return new Promise((resolve,reject)=>{
        const ostr = path
        const ostrArr = ostr.split("/")
        exports.database = ostrArr[ostrArr.length-1]
        ostrArr.pop()
        exports.path = ostrArr.join("/")
        // resolve(path)
        MongoClient.connect(path,{ useNewUrlParser: true }).then(resolve,reject)
    })
}

exports.connectSync = function(path){
    const ostr = path
    const ostrArr = ostr.split("/")
    exports.database = ostrArr[ostrArr.length-1]
    ostrArr.pop()
    exports.path = ostrArr.join("/")
}

function __connect(path,callback){
    MongoClient.connect(path,{ useNewUrlParser:true },function(error,db){
        if(error){
            console.log(error)
        }else{
            callback(db)
        }
    })
}

function __connect_database(path,database,collection,callback){
    __connect(path,function(db){
        callback(db.db(database).collection(collection))
    })
}

// 查询数据

// find()
exports.findSync = function(collection,data,callback,limitValue,skipValue=0,sortObj={},path=exports.path,database=exports.database){
    __connect_database(path,database,collection,function(database){
        if(limitValue){
            // 说明要使用 limit
            database.find(data).limit(limitValue).skip(skipValue).sort(sortObj).toArray(function(err,docs){
                if(err){
                    console.log(err)
                }else{
                    callback(docs)
                }
            })
        }else{
            // 说明不使用 limit
            database.find(data).skip(skipValue).sort(sortObj).toArray(function(err,docs){
                if(err){
                    console.log(err)
                }else{
                    callback(docs)
                }
            })
        }
    })
}

exports.find = function(collection,data,limitValue,skipValue=0,sortObj={},path=exports.path,database=exports.database){
    return new Promise((resolve,reject)=>{
        __connect_database(path,database,collection,function(database){
            if(limitValue){
                // 说明要使用 limit
                database.find(data).limit(limitValue).skip(skipValue).sort(sortObj).toArray(function(err,docs){
                    if(err){
                        // console.log(err)
                        reject(err)
                    }else{
                        // callback(docs)
                        resolve(docs)
                    }
                })
            }else{
                // 说明不使用 limit
                database.find(data).skip(skipValue).sort(sortObj).toArray(function(err,docs){
                    if(err){
                        // console.log(err)
                        reject(err)
                    }else{
                        // callback(docs)
                        resolve(docs)
                    }
                })
            }
        })
    })
}

// findOneSync() 同步的方法
exports.findOneSync = function(collection,data,callback,path=exports.path,database=exports.database){
    __connect_database(path,database,collection,function(database){
        // .sort(sortObj.type ? 1:-1,sortObj.attr)
        database.findOne(data,function(err,data){
            if(err){
                console.log(err)
            }else{
                callback(data)
            }
        })
    })
}

// findOne 
exports.findOne = function(collection,data,path=exports.path,database=exports.database){
    return new Promise((resolve,reject)=>{
        __connect_database(path,database,collection,function(database){
            // .sort(sortObj.type ? 1:-1,sortObj.attr)
            database.findOne(data,function(err,data){
                if(err){
                    // console.log(err)
                    reject(err)
                }else{
                    // callback(data)
                    resolve(data)
                }
            })
        })
    })
}


// 更新数据

// updateOne()
exports.updateOneSync = function(collection,data1,data2,callback,path=exports.path,database=exports.database){
    __connect_database(path,database,collection,function(database){
        database.updateOne(data1,data2,function(err,result){
            if(err){
                console.log(err)
            }else{
                callback(result)
            }
        })
    })
}

exports.updateOne = function(collection,data1,data2,path=exports.path,database=exports.database){
    return new Promise((resolve,reject)=>{
        __connect_database(path,database,collection,function(database){
            database.updateOne(data1,data2,function(err,result){
                if(err){
                    // console.log(err)
                    reject(err)
                }else{
                    // callback(result)
                    resolve(result)
                }
            })
        })
    })
}

// updateMany()
exports.updateManySync = function(collection,data1,data2,callback,path=exports.path,database=exports.database){
    __connect_database(path,database,collection,function(database){
        database.updateMany(data1,data2,function(err,result){
            if(err){
                console.log(err)
            }else{
                callback(result)
            }
        })
    })
}

exports.updateMany = function(collection,data1,data2,path=exports.path,database=exports.database){
    return new Promise((resolve,reject)=>{
        __connect_database(path,database,collection,function(database){
            database.updateMany(data1,data2,function(err,result){
                if(err){
                    // console.log(err)
                    reject(err)
                }else{
                    // callback(result)
                    resolve(result)
                }
            })
        })
    })
}

// 删除数据

// deleteOne()
exports.deleteOneSync = function(collection,data,callback,path=exports.path,database=exports.database){
    __connect_database(path,database,collection,function(database){
        database.deleteOne(data,function(err,result){
            if(err){
                console.log(err)
            }else{
                callback(result)
            }
        })
    })
}

exports.deleteOne = function(collection,data,path=exports.path,database=exports.database){
    return new Promise((resolve,reject)=>{
        __connect_database(path,database,collection,function(database){
            database.deleteOne(data,function(err,result){
                if(err){
                    // console.log(err)
                    reject(err)
                }else{
                    // callback(result)
                    resolve(result)
                }
            })
        })
    })
}

// deleteMany()
exports.deleteManySync = function(collection,data,callback,path=exports.path,database=exports.database){
    __connect_database(path,database,collection,function(database){
        database.deleteMany(data,function(err,result){
            if(err){
                console.log(err)
            }else{
                callback(result)
            }
        })
    })
}

exports.deleteMany = function(collection,data,path=exports.path,database=exports.database){
    return new Promise((resolve,reject)=>{
        __connect_database(path,database,collection,function(database){
            database.deleteMany(data,function(err,result){
                if(err){
                    // console.log(err)
                    reject(err)
                }else{
                    // callback(result)
                    resolve(result)
                }
            })
        })
    })
}



// 添加数据

// insert()
exports.insertSync = function(collection,data,callback,path=exports.path,database=exports.database){
    __connect_database(path,database,collection,function(database){
        database.insert(data,function(err,result){
            if(err){
                console.log(err)
            }else{
                callback(result)
            }
        })
    })
}

exports.insert = function(collection,data,path=exports.path,database=exports.database){
    return new Promise((resolve,reject)=>{
        __connect_database(path,database,collection,function(database){
            database.insert(data,function(err,result){
                if(err){
                    // console.log(err)
                    reject(err)
                }else{
                    // callback(result)
                    resolve(result)
                }
            })
        })
    })
}

// insertOne()
exports.insertOneSync = function(collection,data,callback,path=exports.path,database=exports.database){
    __connect_database(path,database,collection,function(database){
        database.insertOne(data,function(err,result){
            if(err){
                console.log(err)
            }else{
                callback(result)
            }
        })
    })
}

exports.insertOne = function(collection,data,path=exports.path,database=exports.database){
    return new Promise((resolve,reject)=>{
        __connect_database(path,database,collection,function(database){
            database.insertOne(data,function(err,result){
                if(err){
                    // console.log(err)
                    reject(err)
                }else{
                    // callback(result)
                    resolve(result)
                }
            })
        })
    })
}

// insertMany()
exports.insertManySync = function(collection,data,callback,path=exports.path,database=exports.database){
    __connect_database(path,database,collection,function(database){
        database.insertMany(data,function(err,result){
            if(err){
                console.log(err)
            }else{
                callback(result)
            }
        })
    })
}

exports.insertMany = function(collection,data,path=exports.path,database=exports.database){
    return new Promise((resolve,reject)=>{
        __connect_database(path,database,collection,function(database){
            database.insertMany(data,function(err,result){
                if(err){
                    // console.log(err)
                    reject(err)
                }else{
                    // callback(result)
                    resolve(result)
                }
            })
        })
    })
}



// 删除collection

exports.deleteCollection = function(collection,path=exports.path,database=exports.database){
    __connect_database(path,database,collection,function(database){
        database.drop()
    })
}


