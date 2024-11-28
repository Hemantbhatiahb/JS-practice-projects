
const obj = {
    fname: 'Hemant'
}

Object.defineProperty(obj, 'lname', {
    value: 'Bhatia',
    enumerable: true
})

for(let key in obj){
    console.log(`${key} : ${obj[key]}`) 
}
