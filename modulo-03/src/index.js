'use strict'

const fibonacci = () => {
    let array = [0,1];
    let next = 0;
    do
    {
        next = array[array.length - 1] + array[array.length - 2];     
        array.push(next);
    }
    while(next < 350);
    return array;
}

const isFibonnaci = (num) => fibonacci().indexOf(num) > 0;

module.exports = {
    fibonacci,
    isFibonnaci
}
