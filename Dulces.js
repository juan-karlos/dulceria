const {Schema,model}=require ('mongoose');

const dulcesSchema=new Schema({
    codigobarras:{
        type:String,
        require:true,
        unique:true
    },
    nombre:String,
    marca:String,
    contenido_neto:String,
    precioventa:String,
    existencias:String
},{
    versionKey:false,
    timestamps:true
});
module.exports=model('Dulces',dulcesSchema);