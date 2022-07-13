const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
 
//? 모델 모듈
const Member = require('./member');
// const Questions = require('./questions');
// const Category = require('./category');
 
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);
 
//? db객체에 모델 정보들 넣음
db.sequelize = sequelize;
db.Member = Member;
// db.Questions = Questions;
// db.Category = Category;
 
//? 모델 - 테이블 연결
Member.init(sequelize);
// Questions.init(sequelize);
// Category.init(sequelize);
 
//? 모델 관계 설정
Member.associate(db);
// Questions.associate(db);
// Category.associate(db);
 
module.exports = db;