var errorHandler = {
    hasErrorToGet,
    hasErrorToPost,
    isNoRecord,
    unexpectedDbError,
    ifJoiError,
    invalidUP,
    unexpectedError
}

function invalidUP(res){
    res.status(404).send({
        message:"Invalid email and password"
    })
}


function unexpectedError(err,res){
    console.log("\x1b[33m","//***unexpectedError***//")
    console.log(err)
    res.status(503).send({
        message:"Un expected database error " + tableTitle,
    })
}

function ifJoiError(joiReturn,res){
    if(joiReturn.error){
        res.status(503).send({
            message:joiReturn.error
        })
        return true;
    }
    return false;    
}

function unexpectedDbError(err,tableTitle,res){
    console.log("\x1b[33m","//***unexpectedDbError***//")
    console.log(err)
    console.log("There is some problem with queieng the data of " + tableTitle);
    res.status(503).send({
        message:"Un expected database error " + tableTitle,
    })
}

function hasErrorToGet(err,collection,res){
    if(err){
        console.log("There is some problem with queieng the data of " + collection);
        res.send("There is some problem with queieng the data of " + collection)
        return true;
    }
    return false;
}

function isNoRecord(data,collection,res){
    if((data instanceof Array && data.length>0) || 
       (data=0)){
        console.log("No record Found" + collection);
        res.status(404).send({
            "message":"No record found"
        })
        return true;
    }
    return false;
}

function hasErrorToPost(err,collection,res){
    if(err){
        console.log("There is some problem with queieng the data of " + collection);
        res.send("There is some problem with queieng the data of " + collection)
        return true;
    }
    return false;
}

module.exports = errorHandler;