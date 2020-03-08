const calculateTip = (total, tipPercent) => {
    const tip = total * tipPercent;
    return total + tip;
}

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a < 0 || b < 0) 
                reject('Numbers must be non-negative!');

            resolve(a + b);
        }, 1000);
    })
}
module.exports = { calculateTip, add };