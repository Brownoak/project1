import { body, param } from "express-validator";

/**
 *
 * @param {String} type
 * LOGIN | REGISTER
 */
 const validate = (type) => {
  switch (type) {
    case "LOGIN":

      return [
        body("email").isEmail().withMessage("Invalid email address"),
        body("password").not().isEmpty().withMessage("Password is required"),
      ];
    case "REGISTER":
      return [
        body("firstName").not().isEmpty().withMessage("First Name is required"),
        body("lastName").not().isEmpty().withMessage("Last Name is required"),
        body("email").isEmail().withMessage("Invalid email address"),
        body("password").not().isEmpty().withMessage("password required").isLength({ min: 6 }).withMessage("Password is at least 6 characters long"),
      ];


    default:
      return [];
  }
};

export default validate