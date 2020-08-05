export class UsuarioFindAll {
    constructor(
        public id_usuario:Number,
        public ced_usuario:String,
        public nom_usuario:String,
        public id_lugar:Number,
        public id_mesa:Number,
        public id_barrio:Number,
        public login:String,
        public contrasena:String,
        public id_tipo_usuario:Number,
        public tel_usuario:String,
        public activo:Boolean,
        public id_comunaB:Number,
        public id_comunaL:Number,
        public municipio:String,
        public departamento:String,
    ){}
}
