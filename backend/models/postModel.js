const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    iduser: { type: mongoose.Schema.Types.ObjectId,
        ref: 'Infor',
        // required: [true],
      },
  title: {
    type: String,
    required: [true, 'Please enter post name'],
  },

  name: {
    type: String,
    required: [true],
  },
 
  content: {
    type: String,
    required: [true],
    
  },

  image: {
    type: String,
   
    
  },

  like: {
    type: Number,
   
    
  },
  status: {
    type: String,
    required: [true],
    
  },
  
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Post', postSchema);