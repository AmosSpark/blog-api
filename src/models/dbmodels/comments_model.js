const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

// SCHEMAS

/* comment sub-document */

const postCommentSchema = new mongoose.Schema(
  {
    _id: Number,

    user: { type: String, required: true },

    comment: {
      type: String,
      required: function () {
        return this.user;
      },
    },

    date: {
      type: Date,
      default: Date.now,
      required: function () {
        return this.comment;
      },
    },
  },
  { _id: false }
);

/* comment document */

const commentsSchema = new mongoose.Schema(
  {
    _id: Number,

    data: [postCommentSchema],

    post: {
      type: Number,
      ref: "Post",
      required: function () {
        return this.data;
      },
    },
  },

  { _id: false }
);

// AUTO-INCREMENT PLUGINS

postCommentSchema.plugin(AutoIncrement, {
  id: "comments_sub-document_counter",
  inc_field: "_id",
});

commentsSchema.plugin(AutoIncrement, {
  id: "comments_document_counter",
  inc_field: "_id",
});

// MODELS

const Comment = new mongoose.model("Comment", commentsSchema);
const Post_Comment = new mongoose.model("Post_Comment", postCommentSchema);

exports.comment_models = {
  Comment,
  Post_Comment,
};
