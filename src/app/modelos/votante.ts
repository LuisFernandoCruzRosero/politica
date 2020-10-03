export class Votante {
    constructor(
        public id_votante:Number,
        public ced_votante:String,
        public id_lider:Number,
        public nom_votante:String,
        public id_lugar:Number,
        public id_mesa:Number,
        public id_usuario:Number,
        public id_barrio:Number,
        public tel_votante:String,
        public id_comunaB:Number,
        public id_comunaL:Number,
        public activo:Boolean,
        public municipio:String,
        public departamento:String 
    ){}
}
