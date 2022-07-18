const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
 
//? 모델 모듈
const Member = require('./member');
const Questions = require('./questions');
const MainCategory = require('./mainCategory');
const SubCategory = require('./subCategory');
const Recording = require('./recording');
 
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);
 
//? db객체에 모델 정보들 넣음
db.sequelize = sequelize;
db.Member = Member;
db.Questions = Questions;
db.MainCategory = MainCategory;
db.SubCategory = SubCategory;
db.Recording = Recording;
 
//? 모델 - 테이블 연결
Member.init(sequelize);
Questions.init(sequelize);
MainCategory.init(sequelize);
SubCategory.init(sequelize);
Recording.init(sequelize);
 
//? 모델 관계 설정
Member.associate(db);
Questions.associate(db);
MainCategory.associate(db);
SubCategory.associate(db);
Recording.associate(db);
 
module.exports = db;