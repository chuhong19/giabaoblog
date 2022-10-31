
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Game = new Schema({
    _id: { type: Number },
    name: { type: String, require: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, require: true },
    level: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    cost: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: {},
},
{
    _id: false,
},
  );

// Add plugins
mongoose.plugin(slug);
Game.plugin(mongooseDelete, {overrideMethods: 'all' });
Game.plugin(AutoIncrement);
module.exports = mongoose.model('Game', Game);
