module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', { 
       content: {
        type: DataTypes.TEXT,
        allowNull: false,
       },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 이모티콘 저장
    });
    Post.associate = (db) => {
      db.Post.belongsTo(db.User);  //게시글 하나에 유저 하나
      db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });  //게시글과 해쉬태그간의 다대다 관계
      db.Post.hasMany(db.Comment); //게시글 하나에 댓글 여러개 
      db.Post.hasMany(db.Image); //게시글 하나에 이미지 여러개 
      db.Post.belongsToMany(db.User, { through: 'Like' }); // 유저와 게시글간 좋아요 관계 대다대 관계
      db.Post.belongsTo(db.Post, {as: 'Retweet'});
    };
       return Post;
    }