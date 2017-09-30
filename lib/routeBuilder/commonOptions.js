
var CommonOptions = {
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



function commonBefore(req,res,next){
    next()
}
function commonAfter(req,res,next){
    next()
}

module.exports = CommonOptions;