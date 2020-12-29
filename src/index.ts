"use strict";
import acfunMain from "./acfun";

// scf run
exports.main_handler = async (event, context, callback) => {
  acfunMain();
  return "done";
};

// dev env run
if (process.env.RUNTIME_ENV !== "scf") {
  acfunMain();
}
