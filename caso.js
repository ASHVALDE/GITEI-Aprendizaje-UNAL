function splitMulti(str, tokens){
    var tempChar = tokens[0]; // We can use the first token as a temporary join character
    for(var i = 1; i < tokens.length; i++){
        str = str.split(tokens[i]).join(tempChar);
    }
    str = str.split(tempChar);
    return str;
}

function checkFactorComun(expresion){
    monomios=splitMulti(expresion,['+','-'])
    let temp = Array.from(monomios[0])
    monomios.forEach(monomio => {
        temp = temp.filter(value => Array.from(monomio).includes(value))
    });
    temp = temp.filter((item,index)=>{
        return temp.indexOf(item) === index;
    })
    return temp.filter(a => a !== '*' || a !== '/' || a !== ' ')
}
function identificar(expresion){
    
    let factores = checkFactorComun(expresion)
    return factores
}
module.exports = {
    identificar
}