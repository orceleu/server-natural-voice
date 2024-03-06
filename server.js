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
  const { text, language, clean_voice } = req.body;

  const output = await runReplicate(text, language, clean_voice);

  res.json({ output: output });
});

////////////////////
async function runReplicate(text, language, clean_voice) {
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
          //https://firebasestorage.googleapis.com/v0/b/my-saas-1.appspot.com/o/ElevenLabs_2024-03-03T21_40_50_Daniel.mp3?alt=media&token=3f0c18be-b49e-4221-ab20-129756932fc3
          speaker:
            "https://firebasestorage.googleapis.com/v0/b/my-saas-1.appspot.com/o/lobservateur.mp3.mp3?alt=media&token=8985ed8c-a960-4631-95f9-ed3ce9db476d",
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
