const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Replicate = require("replicate");

const app = express();
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: true }));

const corsOption = {
  origin: "*",
  credential: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOption));
var text = { text: "" };
const port = 4000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

app.post("/", async (req, res) => {
  //const { name } = req.body;
  const { text, language, clean_voice, voice_sample } = req.body;

  const output = await runReplicate(text, language, clean_voice, voice_sample);

  res.json({ output: output });
});

////////////////////
async function runReplicate(text, language, clean_voice, voice_sample) {
  const replicate = new Replicate({
    auth: "r8_f8974kvfG5yAUiEilrRScMg7V3Ol75R2MkdVH",
  });

  try {
    console.log(
      `text:${text} language:${language}  clean_voice:${clean_voice}`
    );
    const output = await replicate.run(
      "lucataco/xtts-v2:684bc3855b37866c0c65add2ff39c78f3dea3f4ff103a436465326e0f438d55e",
      {
        input: {
          text: text,
          speaker: voice_sample,
          language: language,
          cleanup_voice: clean_voice,
        },
      }
    );
    console.log(output);
    return output;
  } catch (error) {
    console.error("Une erreur s'est produite:", error);
  }
}
