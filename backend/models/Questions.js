// const Sequelize = require('sequelize');

// module.exports = class Questions extends Sequelize.Model{
//     static init(sequelize){
//         return super.init(
//             {
//                 question_id: {
//                     type: Sequelize.INTEGER,
//                     autoIncrement: true,
//                     primaryKey: true
//                 },
//                 sns_id: {
//                     type: Sequelize.STRING(50)
//                 },
//                 provider: {
//                     type: Sequelize.STRING(50)
//                 },
//                 name: {
//                     type: Sequelize.STRING(50),
//                 },
//             }, {
//                 sequelize,
//                 charset: "utf8", // 한국어 설정
//                 collate: "utf8_bin", // 한국어 설정
//                 tableName: "member", // 테이블 이름 정의
//                 timestamps: false, // createAt, updateAt 활성화
//                 paranoid: false, // deleteAt 옵션
//             },
//         );
//     }

//     static associate(db) {

//     }
// };