const express=require('express');
const morgan=require('morgan');
const mongoose =require('mongoose');
const app=express();
const dulce=require('./Dulce');
//setings
//que es ejs 
app.set('port',process.env.PORT||3400);
// aqui asignamos que utilice un motor de plantillas que nosotros creamos en la carpeta views
app.set('view engine','ejs')
// conexion a la base de datos mongooose es una libreria para poder conectsar la base de datps con expres 
//promesas en java script
mongoose.connect('mongodb+srv://juank21mal:gpUlTHOWU9Pak9F2@cluster0.xyimpq0.mongodb.net/Dulceria?retryWrites=true&w=majority')
.then(db=> console.log("conectado a mongo perro"))
.catch(err => console.error(err));    
//midewords
app.use (morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//Peticiones rutas  cuando se hace una peticion se hace mediante una ruta
  // rutes

//   mostrar productos
app.get("/",async(req,res)=>{
    const dulces= await dulce.find()
    //res.render('index',{dulces})
    res.json(dulces)
})

// guardar ducles
app.post("/insertar",async(req,res)=>{
    const dulceinsert= new dulce(req.body);
    await dulceinsert.save();
    res.json('{"estatus":"Producto Guardado"}');
    // res.redirect("/")
})
// mostrar dulces por codigo de barras
app.get("/editar/:cb",async(req,res)=>{
   const dulces= await dulce.findOne({codigobarras:req.params.cb})
   //res.render('editar',{dulce})
   res.json(dulces)
})

// eliminar por codigo de barras
app.delete("/eliminar/:cb",async(req,res)=>{
    await dulce.findOneAndDelete({codigobarras:req.params.cb})
    res.json('{"Estatus":eliminado}')
})


//acualizar

app.put("/actualizar/:cb",async(req,res)=>{
    await dulce.findOneAndUpdate({codigobarras:req.params.cb},req.body)
    // res.redirect("/")
    res.json('{"Estatus":"dulce Actualizado"}')
 })

app.listen(app.get('port'),()=>{
    console.log("servidor escuchando en el puerto 3400");
})
