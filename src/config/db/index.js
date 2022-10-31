const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/board_game');
        console.log("Connect successfully");
    }
    catch (error){
        console.log("Fail to connect database");
    }
}

module.exports = {connect};
