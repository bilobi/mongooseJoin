const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
function connect(){
    return mongoose.connect("mongodb://bilalatmaca:Silverstone0749@ds113200.mlab.com:13200/ag_gcp", { useCreateIndex: true, useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false  });   
}

module.exports = {
    connect
};
