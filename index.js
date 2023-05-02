const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Dulces = require('./Dulces');
const app=express();
//Settings 
app.set('port',process.env.PORT||3400);
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));

//Middlewares
app.use(morgan('dev'));
app.use(express.json()); 
//Conexión a mongodb atlas
mongoose.connect("mongodb+srv://juank21mal:gpUlTHOWU9Pak9F2@cluster0.xyimpq0.mongodb.net/Dulceria?retryWrites=true&w=majority")
.then(db=> console.log("Mongodb atlas connected"))
.catch(err=> console.error(err));

//Routes
app.get("/",async(req,res)=>{
    const dulces=await Dulces.find();
    res.render('index',{dulces});
});
app.get("/consola",async(req,res)=>{
    const dulces=await Dulces.find();
    res.json(dulces)
});

//Insertar dulces
app.post("/insertarDulce",async(req,res)=>{
    const dulceInsertado=new Dulces(req.body);
    await dulceInsertado.save();
    res.redirect("/");
}); 

//Editar
app.get("/:cb",async(req,res)=>{
    const dulces = await Dulces.findOne({codigobarras:req.params.cb});
    res.render('editar',{dulces});
})

//Actualizar
app.post("/actualizar/:cb",async(req,res)=>{
    await Dulces.findOneAndUpdate({codigobarras:req.params.cb},req.body);
    res.redirect("/");
});

//Eliminar
app.get("/eliminar/:cb",async(req,res)=>{
    await Dulces.findOneAndDelete({codigobarras:req.params.cb},req.body);
    res.redirect("/");
})

//Consultar un solo Dulce
app.get("/consultar",async (req, res)=>{
    const dulce = await Dulces.findOne({codigobarras:req.params.cb});
    res.json(dulce);
});

//Eliminar todos los dulces
app.get("/eliminartodoslosdulces",async(req,res)=>{
    await Dulces.deleteMany();
    res.redirect("/");
});

app.listen(app.get('port'),()=>{
    console.log("servidor escuchando en el puerto 3400");
})
