var http=require("http");
var fs=require("fs");
var path=require("path");
var mime=require("mime");
var cache={};

//404����
function send404(res){
    res.writeHead(404,{"content-type":"text/plain"});
    res.write("Error:404,resource not found");
    res.end();
}

//�ļ����ݷ���
function sendFile(res,filePath,fileContents){
    res.writeHead(200,{"content-type":mime.lookup(path.basename(filePath))});
    res.end(fileContents);
}

//��̬�ļ�����
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

//����http����
var server=http.createServer(function(req,res){

})