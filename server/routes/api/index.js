const router = require("express").Router()
const bookRoutes = require("./book.routes")
const nextRoutes = require("./groupStatus.routes")
const userRoutes = require("./user.routes")
const voteRoutes = require("./vote.routes")

router.use("/book", bookRoutes)
router.use("/groupStatus", nextRoutes)
router.use("/user", userRoutes)
router.use("/vote", voteRoutes)

module.exports = router