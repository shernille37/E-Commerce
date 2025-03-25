import { isValidObjectId } from "mongoose";

/**
 * Checks if the req.params.id is a valid Mongoose ObjectId.
 */

const _isValidObjectId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error(`Invalid ObjectId of:  ${req.params.id}`);
  }
  next();
};

export default _isValidObjectId;
