import { Meeting, Book } from "../models/index.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc Fetch all meetings
// @route GET /api/meeting
// @access Private
const getAllMeets = asyncHandler(async (req, res) => {
  try {
    const meets = await Meeting.findAll({
      include: Book,
    });
    if (meets) {
      res.status(200).json(meets);
    } else {
      res.status(400).json({ error: "No meetings on file" });
    }
  } catch (error) {
    console.error(error); // Log the actual error message
    res.status(500).json({ error: "Server error" });
  }
});

// @desc Fetch the latest meeting
// @route GET /api/meeting/latest
// @access Private
const getNextMeet = asyncHandler(async (req, res) => {
  try {
    const nextMeet = await Meeting.findOne({
      include: Book,
      order: [["id", "DESC"]],
    });
    if (nextMeet) {
      res.status(200).json(nextMeet);
    } else {
      res.status(400).json({ error: "No meetings on file" });
    }
  } catch (error) {
    console.error(error); // Log the actual error message
    res.status(500).json({ error: "Server error" });
  }
});

// @desc Create Next Meeting
// @route Post /api/meeting
// @access Admin
const createMeeting = asyncHandler(async (req, res) => {
  const { date, time, location, book_id } = req.body;
  try {
    const newMeeting = await Meeting.create({
      date,
      time,
      location,
      book_id,
    });

    const selectedBook = await Book.findByPk(book_id);
    if (selectedBook) {
      selectedBook.update({ finished: true });
    }
    const meetingAndBook = await Meeting.findOne({
      where: { id: newMeeting.id },
      include: Book,
    });
    res.status(201).json(meetingAndBook);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

// @desc Update Next Meeting
// @route PUT /api/meeting
// @access Admin
const updateMeeting = asyncHandler(async (req, res) => {
  const { id, date, time, location, book_id } = req.body;
  try {
    const meetingEdit = await Meeting.findByPk(id);
    if (meetingEdit) {
      await meetingEdit.update({
        date: date,
        time: time,
        location: location,
        book_id: book_id,
      });
      const meetingAndBook = await Meeting.findOne({
        where: { id: id },
        include: Book,
      });
      res.status(201).json(meetingAndBook);
    } else {
      res.status(404);
      throw new Error("Meeting not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

// @desc Delete meeting
// @route DELETE /api/meeting
// @access Admin
const deleteMeeting = asyncHandler(async (req, res) => {
  console.log("req body:", req.body);
  const { id, book_id } = req.body;
  try {
    const book = await Book.findByPk(book_id);
    if (book) {
      book.update({ finished: false });
    }
    const meeting = await Meeting.findByPk(id);
    meeting.destroy();
    res.status(201).json("Meeting Deleted");
  } catch (error) {
    res.status(404);
    throw new Error("Book not found");
  }
});

export {
  getAllMeets,
  getNextMeet,
  createMeeting,
  updateMeeting,
  deleteMeeting,
};
