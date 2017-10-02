function CommonOptions(){

    var commonBefore = function commonBefore(req,res,next){
        next()
    }
    var commonAfter = function commonAfter(req,res,next){
        next()
    }

    return {
                middleware:{
                    get:{
                        ALL : {
                            before:commonBefore,
                            after:commonAfter
                        },
                        ONE : {
                            before:commonBefore,
                            after:commonAfter
                        }
                    },
                    post:{
                        ONE:{
                            before:commonBefore,
                            after:commonAfter
                        }
                    },
                    patch:{
                        ONE:{
                            before:commonBefore,
                            after:commonAfter
                        }
                    }
                }
            }
}

module.exports = CommonOptions;