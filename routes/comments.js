const express = require("express");
const router = express.Router();
const Comment = require("../models/comments");

// Getting comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating Commet
router.post("/", async (req, res) => {
  const comment = new Comment({
    id: req.body.id,
    content: req.body.content,
    createdAt: req.body.createdAt,
    score: 0,
    replyingTo: req.body.replyingTo,
    user: {
      image: {
        png: req.body.user.image.png,
        webp: req.body.user.image.webp,
      },
      username: req.body.user.username,
    },
    replies: [],
  });
  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (e) {
    res.status(400).json(e);
    console.log(e);
  }
});

// Updating Comment
router.patch("/:id", getComment, async (req, res) => {
  if (req.body.content != null) {
    res.comment.content = req.body.content;
  }
  try {
    const updatedComment = await res.comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting Comment
router.delete("/:id", getComment, async (req, res) => {
  try {
    await res.comment.remove();
    res.json({ message: "Deleted Comment" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating Reply
router.patch("/:id/reply", getComment, async (req, res) => {
  try {
    const reply = {
      id: req.body.id,
      content: req.body.content,
      createdAt: req.body.createdAt,
      score: 0,
      replyingTo: req.body.replyingTo,
      user: {
        image: {
          png: req.body.user.image.png,
          webp: req.body.user.image.webp,
        },
        username: req.body.user.username,
      },
    };
    res.comment.replies = [...res.comment.replies, reply];
    const newReply = await res.comment.save();
    res.json(newReply);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating Reply
router.patch("/reply/:id", async (req, res) => {
  const replyId = JSON.parse(req.params.id);
  let comment = await Comment.findOne({ "replies.id": replyId });
  const replyIndex = comment.replies.findIndex(
    (reply) => reply.id === replyId
  );
  if (req.body.content != null) {
    comment.replies[replyIndex].content = req.body.content;
  }
  try {
    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Deleting Reply
router.delete("/reply/:id", async (req, res) => {
  try {
    const replyId = JSON.parse(req.params.id);

    let comment = await Comment.findOne({ "replies.id": replyId });
    const filter = comment.replies.filter((reply) => reply.id !== replyId);
    comment.replies = filter;

    const newReplies = await comment.save();
    res.status(201).json(newReplies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware
async function getComment(req, res, next) {
  let comment;
  try {
    comment = await Comment.findOne({ id: req.params.id });

    if (comment === null) {
      return res.status(400).json({ message: "Cannot find comment" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.comment = comment;
  next();
}

module.exports = router;
