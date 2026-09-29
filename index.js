const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", {
    joke: null,
    name: null,
    error: null
  });
});

app.post("/joke", async (req, res) => {
  const name = req.body.name;
  const category = req.body.category;

  try {
    const response = await axios.get(
      `https://v2.jokeapi.dev/joke/${category}?safe-mode`
    );

    let joke;

    if (response.data.type === "single") {
      joke = response.data.joke;
    } else {
      joke = `${response.data.setup} ${response.data.delivery}`;
    }

    res.render("index", {
      joke: joke,
      name: name,
      error: null
    });

  } catch (error) {
    res.render("index", {
      joke: null,
      name: name,
      error: "Something went wrong. Please try again."
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});