import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ActorSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    gender: { type: String },
    popularity: { type: Number },
    profile_path: { type: String },
    movies: [{ type: Number }], 
});
ActorSchema.statics.findByActorDBId = function (id) {
    return this.findOne({ id: id });
};
export default mongoose.model('Actors', ActorSchema);