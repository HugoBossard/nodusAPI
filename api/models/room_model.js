const mongoose = require('../../services/moogosee.service').mongoose;
const Schema = mongoose.Schema;

const ROOMSCHEMA = new Schema({
    luminosite: Number,
    temperature: String,
    date_collecte: Date,
});

ROOMSCHEMA.virtual('id').get(function () {
    return this._id.toHexString();
});

ROOMSCHEMA.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => { 
        delete ret._id;
    }
});

const Room = mongoose.model('room', ROOMSCHEMA); 

exports.postDataRoom = (roomData) => {
    const room = new Room(roomData);
    return room.save();
};

exports.getLastDataRoom = async () => {
    let rooms = await Room.find();
    let room = rooms[rooms.length - 1];
    let room_json = room.toJSON();
    delete room_json.id;
    if (room_json.luminosite <= 6000){
        delete room_json.luminosite;
        room_json.allume = false;
    }
    else{
        delete room_json.luminosite;
        room_json.allume = true;
    }
    return room_json;
}