module.exports = (sequelize, DataTypes) => {

    const Member = sequelize.define("Member", {
        member_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        sns_id: {
            type: DataTypes.STRING(50)
        },
        provider: {
            type: DataTypes.STRING(50)
        },
        name: {
            type: DataTypes.STRING(50),
        },
    }, {
        charset: "utf8", // 한국어 설정
        collate: "utf8_bin", // 한국어 설정
        tableName: "member", // 테이블 이름 정의
        timestamps: false, // createAt, updateAt 활성화
        paranoid: false, // deleteAt 옵션
    });

    return Member;
};