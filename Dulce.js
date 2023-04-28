const {schema, model, Schema}=require ('mongoose');
const productoSchema=new Schema({

    codigobarras:{
        require:true,
        unique:true,
        type:String
    },
    nombre:String,
    marca:String,
    contenido_neto:String,
    precioVenta:String
},{
    versionKey:false,
    timestamps:true
});
module.exports=model('dulce',productoSchema);