import express from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express();
app.use(express.json()); //add this middleware so that we can parse JSON in the request body

app.post("/process-video", (req, res) => {
  let inputFilePath = req.body.inputFilePath;
  let outputFilePath = req.body.outputFilePath;

  if (!inputFilePath || !outputFilePath) {
    res.status(400).send("Please provide inputFilePath and outputFilePath");
  }
  ffmpeg(inputFilePath)
    .outputOptions("-vf", "scale=-1:360")
    .on("end", () => {
      res.status(200).send("Video processed successfully");
    })
    .on("error", (err) => {
      res.status(500).send("Error processing video: " + err.message);
    })
    .save(outputFilePath);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Video processing service listening on port ${port}`);
});
