import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.send("hoi");
});

export { router as currentUserRouter };
