// 전역객체
// - console : 콘솔과 관련된 기능
// - process : 프로그램과 관련된 기능
// - exports : 모듈과 관련된 기능
console.log("Hello");

console.log(process.version);
console.log(process.env);
console.log(process.arch);
console.log(process.platform);

// 실행 매개 변수
console.log(process.argv[0]);

// for-each
process.argv.forEach(function (item, index) {
    console.log(index + " : " + item);
});

process.exit();

console.log("찍을까?");