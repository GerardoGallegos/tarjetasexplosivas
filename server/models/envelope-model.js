import mongoose from 'mongoose'
import shortid from 'shortid'

const Envelope = new mongoose.Schema({
  _id: { type: String, 'default': shortid.generate },
  author: { type: String, ref: 'User' },
  coverKey: String,
  imageKey: String,
  // Es la ruta de la cubierta de ejemplo
  coverLocation: String,
  // Es la ruta de imagen real
  imageLocation: String,
  position: { type: Number, default: 0 },
  active: Boolean
}, { timestamps: true })

Envelope.methods.toJSON = function () {
  return {
    _id: this._id,
    coverKey: this.coverKey,
    coverLocation: this.coverLocation,
    imageKey: this.imageKey,
    imageLocation: this.imageLocation,
    createdAt: this.createdAt,
    position: this.position,
    active: this.active
  }
}

export default mongoose.model('Envelope', Envelope)
