const UserModel = require('../models/UserModel');
const UserAddessModel = require('../models/UserAddressModel');
const PostsModel = require('../models/PostsModel');
const TagsModel = require('../models/TagsModel');
const PostsTagsModel = require('../models/PostsTagsModel');



async function migration() {
    await UserModel.sync();
    await UserAddessModel.sync();
    await PostsModel.sync({alter: true});
    await TagsModel.sync();
    await PostsTagsModel.sync();
}

migration();