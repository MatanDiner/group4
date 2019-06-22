const express = require('express');
const app = express();
const cors  = require('cors'); 
app.use(cors());
app.use(express.json());


const data = {
    songs:[
        {
            id:1,
            title:"bb",
            singer:"xxxxxx",
            words:"xxxxxxxxxxx xxx xxxxx",
    },
    {
        id:2,
        title:"dd",
        singer:"yyyyyy",
        words:"yyyyy yyyy",
    },
    {
        id:3,
        title:"zzz",
        singer:"zzzzzzzz",
        words:"zzzzzz xxzzx xxxzzzzzzzzzzzxx",
    },
    {
        id:4,
        title:"cc",
        singer:"eeeeeeeeee",
        words:"eeeeeeeeeeeeeeee xxx xxxxx",
    },
    {
        id:5,
        title:"ee",
        singer:"rrrrrrrrrrr",
        words:"rrrrrrrrrrrrrrrrr xxx xxxxx",
    }
]
};



app.get('/songs',(req,res,next)=>{
    
const {sort} = req.query;
if(sort){
const songsArr = sortArray([...data.songs],sort);
res.json(songsArr);
}
else
next();
})

app.get('/songs',(req,res)=>{
    
res.json(data["songs"]);
    
})


function sortArray(arr,val){

    const mapped = arr.map((item,i)=>{
        return {index:i,value:item[val]};
    })

    mapped.sort(function( a, b ) {
        if ( a.value < b.value ){
          return -1;
        }
        if ( a.value > b.value ){
          return 1;
        }
        return 0;
      });

      return mapped.map(obj=>{
          return arr[obj.index];
      })

}




  app.post('/song',(req,res)=>{

    try{
        const id = Math.floor(Math.random()*100000);
        const {title,singer,words} = req.body;
        const newSong = {id,title,singer,words}
        data.songs.push(newSong);
        res.status(200);
        res.json(data.songs);
    }
    catch(ex){
        res.status(500);
    }

  })

  app.delete('/song/:id',(req,res)=>{

    try{
    const {id} = req.params;
    const index = getIndex(data.songs,+id);
    data.songs.splice(index,1);
    res.status(200);
    res.json(data.songs);
    }
    catch(ex){
        res.status(500);
    }
  })


  function getIndex(arr,identifyer){

   return arr.findIndex(s=>s.id===identifyer);

  }


  app.put('/song/:id',(req,res)=>{

    try{
        const {id} = req.params;
        const {title,singer,words} = req.body;
        const newSong = {id,title,singer,words}
        const index = getIndex(data.songs,+id);
        data.songs[index] = newSong;
        res.status(200);
        res.json(data.songs);
    }
    catch(ex){
        res.status(500);
    }
   

  })


  app.listen(8000,()=>{console.log("server is running!")})


 
