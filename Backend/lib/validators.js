import { body, param, validationResult } from "express-validator";

const validateHandler = (req, res, next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg).join(", ");
      return res.status(400).json({ message: errorMessages });
    }
  
    next();
  };
  

const registerValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("email", "Please Enter Username").notEmpty(),
  body("role", "Please Enter Role") .notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
  body("gender", "Please Enter Gender").notEmpty(),
];

const loginValidator = () => [
  body("email", "Please Enter Email").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

const newGroupValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 2, max: 200 })
    .withMessage("Members must be 2-100"),
];

const addMemberValidator = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 1, max: 97 })
    .withMessage("Members must be 1-97"),
];

const removeMemberValidator = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),
  body("userId", "Please Enter User ID").notEmpty(),
];

// const sendAttachmentsValidator = () => [
//   body("chatId", "Please Enter Chat ID").notEmpty(),
// ];

const chatIdValidator = () => [param("id", "Please Enter Chat ID").notEmpty()];

const renameValidator = () => [
  param("id", "Please Enter Chat ID").notEmpty(),
  body("name", "Please Enter New Name").notEmpty(),
];

const sendRequestValidator = () => [
  body("userId", "Please Enter User ID").notEmpty(),
];

const acceptRequestValidator = () => [
  body("requestId", "Please Enter Request ID").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Please Add Accept")
    .isBoolean()
    .withMessage("Accept must be a boolean"),
];

const adminLoginValidator = () => [
  body("secretKey", "Please Enter Secret Key").notEmpty(),
];

export {
  acceptRequestValidator,
  addMemberValidator,
  adminLoginValidator,
  chatIdValidator,
  loginValidator,
  newGroupValidator,
  registerValidator,
  removeMemberValidator,
  renameValidator,
  //sendAttachmentsValidator,
  sendRequestValidator,
  validateHandler,
};