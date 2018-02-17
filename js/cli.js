function CLI() {

}
CLI.prototype.getArguments = function () {
    var result = [];
    var i = 0;
    process.argv.forEach(function (val, i, array) {
        result[i] = val;
        i++;
    });
    return result;
}
CLI.prototype.printArguments = function (index) {
    process.argv.forEach(function (val, index, array) {
        console.log(index + ': ' + val);
    });
}
CLI.prototype.print = function (index) {
    process.argv.forEach(function (val, index, array) {
        console.log(index + ': ' + val);
    });
}
CLI.prototype.Pause = function (func) {
    console.log('Press any key to continue.');
    process.stdin.once('data', function () {
        func();
    });
}
module.exports = CLI;