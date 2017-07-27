function average(scores) {
    var sum = 0;
    scores.forEach(function(score) {
        sum += score;
    })
    return Math.round(sum / scores.length);
}

var scores = [50, 24, 95, 56, 28];
console.log(average(scores));