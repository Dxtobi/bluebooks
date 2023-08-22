

//c remove previos score  D new score
let score = []
let total = 0
function calculateScore(array) {
    
    for (let index = 0; index < array.length; index++) {
        
        if (array[index] === 'D') {
            
            score.push(score[score.length - 1] * 2)
        } else if (array[index] === 'C') {
            score.pop()
        } else if (array[index] === '+') {
           
            score.push( Number(score[score.length - 2]) + Number(score[score.length - 1]) )
            
            
        } else {
            score.push(array[index])
          
        }
        
    }

    total = score.reduce((acc, val) => {
        return Number(acc) + Number(val)
    })
    console.log(score) 
    console.log(total)
}


const array = ['5', '2', 'C', 'D', '+']
calculateScore(array)


let numberCount = {}
array.forEach(num => {
    if (numberCount[num]) {
        numberCount[num]++;
    } else {
        numberCount[num] = 1
    }
})

for (const num in numberCount) {
    if (numberCount[num] === 1) {
        return parseInt(num)
    }
}