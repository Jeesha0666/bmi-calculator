const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/calculate-bmi", (req, res) => {
  const { height, weight } = req.body;

  if (!height || !weight) {
    return res.status(400).json({ error: "Height and weight are required." });
  }

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  let category = "";

  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  res.json({ bmi: bmi.toFixed(2), category });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
