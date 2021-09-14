import mongoose from 'mongoose'

const ProvidersSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    providerName: {
        type: String,
        required: true
    },
    providerContact: {
        type: String,
        required: true
    },
    providerService: {
        type: String,
        required: true
    },
    providerSalary: {
        type: Number,
        default: 0.00
    },
    shortDesc: {
        type: String,
        required: true
    },
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Provider = mongoose.model('Provider', ProvidersSchema)

export default Provider
