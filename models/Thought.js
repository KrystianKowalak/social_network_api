const {Schema, model} = require("mongoose");
const {formatDate} = require("../utils/helpers");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionText: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAt => formatDate(createdAt)
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAt => formatDate(createdAt)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
)

thoughtSchema.virtual("reactionCount")
  .get(function () {
    return this.reactions.length;
  })

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
