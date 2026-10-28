import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const eventSchema = new mongoose.Schema(
 {
 name: {
 type: String,
 required: true
 },
 description: {
 type: String,
 required: true
 },
 duration: {
 type: Number,
 required: true
 },
 price: {
 type: Number,
 required: true
 },
 category: {
 type: String,
 required: true,
 lowercase: true,
 enum: ["deportes","musica","programacion","games","juegos","varios","test"]
 },
 capacity:{
    type: Number,
    required: true,
    min:1
 },
 reserved:{
    type: Number,
    default:0,
    min:0
 },
 available: {
 type: Boolean,
 default: true
 }
 },
 {
 timestamps: true,
 versionKey: false
 }
 );
 

eventSchema.index({ name: 1 }, { unique: true });
eventSchema.index({ description: "text" });
eventSchema.index({ price: 1 });
eventSchema.index({ category: 1 });

eventSchema.index({ price: 1, category: 1 });

eventSchema.plugin(paginate);

export const EventModel = mongoose.model('events', eventSchema);