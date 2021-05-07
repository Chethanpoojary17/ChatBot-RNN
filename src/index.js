const express = require("express");
var app = express();
const { PythonShell } = require("python-shell");

app.get("/", function (req, res) {
  //Here are the option object in which arguments can be passed for the python_test.js.
  let options = {
    mode: "text",
    pythonOptions: ["-u"], // get print results in real-time
    scriptPath: "src", //If you are having python_test.py script in same folder, then it's optional.
    args: ["Where can we locate you?"], //An argument which can be accessed in the script using sys.argv[1]
  };

  PythonShell.run("chatbot.py", options, function (err, result) {
    if (err) throw err;
    // result is an array consisting of messages collected
    //during execution of script.
    const str = result.toString();
    var res1 = str.substring(str.indexOf("%") + 3, str.length);
    console.log("result: ", res1.trim());
    res.send(res1.trim());
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
