import { db } from "../models/dashboardModels.mjs";

const createUser = async (userInfoArr) => {
  try {
    // if all keys are defined, save into db and save returned row into res.locals.user
    const createdUser = await db.query(
      "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      userInfoArr
    );
    return createdUser;
  } catch (error) {
    console.log(error, "error in createUser queries");
  }
};
const login = async (userInfoArr) => {
  try {
    // if all keys are defined, save into db and save returned row into res.locals.user
    const loggedInUser = await db.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      userInfoArr
    );
    return loggedInUser.rows;
  } catch (error) {
    console.log(error, "error in login queries");
  }
};

const saveBook = async (bookInfoArr) => {
  try {
    // if all keys are defined, save into db and save returned row into res.locals.book
    const savedBook = await db.query(
      "INSERT INTO books (title, author, user_id, in_custody, is_read) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      bookInfoArr
    );
    return savedBook;
  } catch (error) {
    console.log(error, "error in saveBook queries");
  }
};

const fetchLibrary = async (userIdArr) => {
  try {
    // fetch all books in bd
    const fetchedBooks = await db.query(
      "SELECT * FROM books WHERE books.user_id = $1",
      userIdArr
    );
    console.log(fetchedBooks, "fetchedBooks");
    return fetchedBooks.rows;
  } catch (error) {
    console.log(error, "error in fetchLibrary queries");
  }
};

const deleteBook = async (bookInfoArr) => {
  try {
    // delete book of user
    const deletedBook = await db.query(
      "DELETE FROM books WHERE books._id = $1 AND books.user_id = $2 RETURNING *",
      bookInfoArr
    );
    return deletedBook;
  } catch (error) {
    console.log(error, "error in deleteBook queries");
  }
};

const lendBookOut = async (bookInfoArr) => {
  try {
    // delete book of user
    const deletedBook = await db.query(
      "UPDATE books SET in_custody = $3 WHERE books._id = $1 AND books.user_id = $2 RETURNING *",
      bookInfoArr
    );
    return deletedBook;
  } catch (error) {
    console.log(error, "error in deleteBook queries");
  }
};

export { createUser, deleteBook, fetchLibrary, lendBookOut, login, saveBook };
