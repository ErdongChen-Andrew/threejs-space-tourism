const express = require("express");
const path = require("path")

const app = express();

app.use(express.static("public"));
app.use("/build/", express.static(path.join(__dirname, "node_modules/three/build")))
app.use("/jsm/", express.static(path.join(__dirname, "node_modules/three/examples/jsm")))
app.use("/gsap/", express.static(path.join(__dirname, "node_modules/gsap")))

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running");
});
