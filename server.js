var http=require("http");
var fs=require("fs");
var path=require("path");
var mime=require("mime");
var cache={};

//404处理
function send404(res){
    res.writeHead(404,{"content-type":"text/plain"});
    res.write("Error:404,resource not found");
    res.end();
}

//文件数据服务
function sendFile(res,filePath,fileContents){
    res.writeHead(200,{"content-type":mime.lookup(path.basename(filePath))});
    res.end(fileContents);
}

//静态文件服务
function serveStatic(res,cache,absPath){
    if(cache[absPath]){
        sendFile(res,absPath,cache[absPath]);
    }else{
        fs.exists(absPath,function(exists){
            if(exists){
                fs.readFile(absPath,function(err,data){
                    if(err){
                        send404(res);
                    }
                })
            }
        })
    }
}

//创建http服务
var server=http.createServer(function(req,res){

})