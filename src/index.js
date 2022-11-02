const express = require("express");
const route = require("./routes/route.js");
const mongoose = require("mongoose");
const app = express();
const multer = require("multer");
const { response } = require("express");
// 1const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(multer().any())
app.set('port', (process.env.PORT||5000))

mongoose
    .connect(
        "mongodb+srv://Atul_0901:Hfwt2iFlfIJLT4Kt@cluster0.7iymhpk.mongodb.net/preinterview1",
        {
            useNewUrlParser: true,
        }
    )
    .then(() => console.log("MongoDb is Connected"))
    .catch((err) => console.log(chalk.red(err)));

app.use("/", route);

app.get('/',function(request , reesponse){
    var result ='app is running'
    response.send(result);
}).listen(app.get('port'),function(){
    console.log('App is running ', 'server is listening on port ' , app.get('port'));
})




// app.listen(process.env.PORT || 3000, function () {
//     console.log(chalk.blue("Express app running on port " PORT);
// });

// app.listen(PORT, () => {
//     console.log(`server started on port ${PORT}`);
// });