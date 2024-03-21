const { Schema, model } = require('mongoose');

// Schema to create a course model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    responseBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
    username: {
      type: String,
      require:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (Date) => {
            if (Date) return Date.toIsoString("T")[0];
          }
      },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
