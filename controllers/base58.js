var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var base = alphabet.length; // base is the length of the alphabet (58 in this case)

// function to convert base 10 integer to base 58
function encode(num){
    var encoded = '';
    while(num){
        var remainder = num%base;
        encoded = alphabet[remainder].toString()+encoded;
        num=Math.floor(num/base);
    }
    return encoded;
};

// function to convert base 58 integer to base 10
function decode(str){
    var decoded=0;
    while(str){
        var index = alphabet.indexOf(str[0]);
        var power = str.length-1;
        decoded += index*(Math.pow(base,power));
        str=str.substring(1);
    }
    return decoded;
};

module.exports.encode = encode;
module.exports.decode = decode;