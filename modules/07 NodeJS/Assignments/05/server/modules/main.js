const express = require('express');

const app = express();

app.use(express.json());

const messagesArr = [];

app.get('/',(request,response)=>{

    responseJson(response,messagesArr);

})

app.post('/',(request,response)=>{

const id = request.body.id;
const author = request.body.author;
const message = request.body.message;
 
messagesArr.push({
    id,
    author,
    message
})

responseJson(response,messagesArr);

})


app.put('/',(request,response)=>{

    const id = request.query.id;
    const index = getIndex(messagesArr,id);
    messagesArr[index].author = request.body.author;
    messagesArr[index].message =  request.body.message;

    responseJson(response,messagesArr);
})


app.delete('/',(request,response)=>{

const id = request.query.id;
const index = getIndex(messagesArr,id);
const deletedItem = messagesArr[index];
messagesArr.splice(index,1);

const info = {
    messagesArr,
    deletedItem
}

responseJson(response,info);

})


function getIndex(arr,id){
    return arr.findIndex(item=>item.id===id);
}

const responseJson = (response,resultJson)=>{

    response.json({
        resultJson
    });

}

















app.listen(3000,()=>console.log("server is running"));