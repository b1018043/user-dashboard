const crypto=require("crypto");

function strtomd5(str){
    const md5=crypto.createHash('md5');
    return md5.update(str,"binary").digest('hex');
}

module.exports.strtomd5=strtomd5;