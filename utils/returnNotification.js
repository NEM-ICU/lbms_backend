import nodemailer from "nodemailer";
import cron, { validate } from "node-cron";
import BorrowBook from "../models/borrowBookModel.js";
import { borrowBook } from "../controllers/borrowBookController.js";

// Send the Email

const sendMail = async (receiver, message) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "boredape47@gmail.com",
      pass: "yarhxbgwxvduxpqw",
    },
  });

  const info = await transporter.sendMail({
    from: "boredape47@gmail.com",
    to: receiver,
    subject: "Book Return Reminder and Late Fee Notice",
    text: message,
  });

  console.log(info.messageId, nodemailer.getTestMessageUrl(info));
};

// get the all data about non receiving books
const getNonReceivingbookData = async () => {
  const today = new Date().toISOString().split("T")[0];
  console.log(today);
  const data = await BorrowBook.find({
    $and: [{ returned: false }, { due_date: { $lte: today } }],
  });
  return data;
};

const calculateLateFee = (due_date) => {
  const currentDate = new Date();
  const dueDate = new Date(due_date);

  const lateFeeStartDate = new Date(dueDate);
  lateFeeStartDate.setDate(lateFeeStartDate.getDate() + 3);

  if (currentDate <= lateFeeStartDate) {
    return 0; // No late fee within the grace period
  } else {
    const timeDifference = currentDate.getTime() - lateFeeStartDate.getTime();
    const daysLate = Math.floor(timeDifference / (1000 * 3600 * 24));
    const lateFeePerDay = 2; // Change this to your specific late fee per day
    const lateFee = daysLate * lateFeePerDay;
    return lateFee;
  }
};

const sendNotification = async () => {
  const nonReceivingbookData = await getNonReceivingbookData();

  nonReceivingbookData.map((data) => {
    const lateFee = calculateLateFee(data.due_date);
    sendMail(
      data.userMail,
      `This is a reminder to return the book you borrowed from our library. The due date for returning the book was ${data.due_date}, and we noticed that the book has not been returned yet.
    As of today, your late fee for the book is ${lateFee}. Please return the book as soon as possible to avoid further late fees.
    
    Thank you,`
    );
    console.log(data);
  });
};

// scheduler
const runCronScheduler = () => {
  cron.schedule(" */5 * * * * *", () => {
    sendNotification();
  });
};
export default runCronScheduler;
