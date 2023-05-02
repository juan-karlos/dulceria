const {Schema,model}=require ('mongoose');

const proveedorSchema=new Schema({
    id:{
        type:String,
        require:true,
        unique:true
    },
    nombre:String,
    apellidos:String,
    empresa:String,
    telefono:String,
    rfc:String
},{
    versionKey:false,
    timestamps:true
});
module.exports=model('Proveedor',proveedorSchema);