export class Validaciones {

    /* Variables Staticas Para validaciones */

    /* Letras */
    STR_LETTER_WITHOUT:String = '';
    STR_LETTER_SI:String = 'SI';
    STR_LETTER_NO:String = 'NO';
    /* Numeros */
    INT_NUMBER_0:number = 0;
    INT_NUMBER_1:number = 1;
    INT_NUMBER_2:number = 2;
    INT_NUMBER_3:number = 3;
    INT_NUMBER_4:number = 4;
    /* Booleanos */
    TRUE:Boolean = true;
    FALSE:Boolean = false;
    /* NULL */
    NULL = null;

    /* Funcion Para validar campo vacio */
    validaCampoObligatorio(variable:String) {
        if (variable.trim() == this.STR_LETTER_WITHOUT) {
            return this.TRUE;
        }
        return this.FALSE;
    }

    /* Funcion Para Validar nombre */
    validacionNombre(variable:String) {
        if (this.validaCampoObligatorio(variable) == this.TRUE) {
            return this.STR_LETTER_WITHOUT;
        } else if (this.validacionLetrasNumerosEspacios(variable)) {
            return this.STR_LETTER_WITHOUT;
        }
    }

    /* funcion para validar letras y numeros*/
    validacionLetrasNumerosEspacios(variable:String) {
        let letras:String = "abcdefghijklmnñopqrstuvwxyz0123456789 ";
        variable = variable.toLocaleLowerCase();
        for (let i = this.INT_NUMBER_0; i < variable.length; i++) {
            if (letras.indexOf(variable.charAt(i),this.INT_NUMBER_0) == -this.INT_NUMBER_1) {
                return this.TRUE;
            }
        }
        return this.FALSE;
    }

    /* funcion para validar numeros*/
    validacionNumeros(variable:String) {
        if (this.removerCerosInicio(variable).trim() == this.STR_LETTER_WITHOUT) {
            return this.TRUE
        } else {
            let letras:String = "0123456789";
            for (let i = this.INT_NUMBER_0; i < variable.length; i++) {
                if (letras.indexOf(variable.charAt(i),this.INT_NUMBER_0) == -this.INT_NUMBER_1) {
                    return this.TRUE;
                }
            }
            return this.FALSE;
        }
    }

    /* funcion para validar solo numeros con decimal  */
    validacionNumerico(variable:String) {
        let stringValor:string = variable.toString();
        let valor:any = parseFloat(stringValor); 
        if (this.validaCampoObligatorio(variable) == this.TRUE) {
            return variable = this.STR_LETTER_WITHOUT;
        } else {
            let sinCerosInicio = this.removerCerosInicio(variable);
            let sinCerosFinal = this.removerCerosAlFinal(sinCerosInicio);
            if (sinCerosFinal.length != valor.toString().length) {
                console.log('sinCerosFinal.length: ' + sinCerosFinal.length + ' != valor.toString().length: ' + valor.toString().length);
                return variable = this.STR_LETTER_WITHOUT;
            }
        }
    }

    /* Remover ceros al inicio */
    removerCerosInicio(variable:String) {
        let j:number = this.INT_NUMBER_0;
        let stringValor:string = variable.toString();
        let valor:any = parseFloat(stringValor); 
        if (this.validaCampoObligatorio(variable) == true) {
            return variable = this.STR_LETTER_WITHOUT;
        } else {
            if (valor < this.INT_NUMBER_1) {
                for (let i = this.INT_NUMBER_0; i < variable.length; i++) {
                    if (variable.charAt(i) == '0') {
                        j = j + this.INT_NUMBER_1;
                    } else {
                        j = j - this.INT_NUMBER_1;
                        i =  variable.length;
                    }
                }
                return variable.trim().substring(j);
            } else {
                for (let i = this.INT_NUMBER_0; i < variable.length; i++) {
                    if (variable.charAt(i) == '0') {
                        j = j + this.INT_NUMBER_1;
                    } else {
                        i =  variable.length;
                    }
                }
                return variable.trim().substring(j);
            }
        }
    }

    /* Remover ceros al inicio */
    removerCerosAlFinal(variable:String) {
        let j:number = this.INT_NUMBER_0;
        if (this.validaCampoObligatorio(variable) == true) {
            return variable = this.STR_LETTER_WITHOUT;
        } else {
            let tienePunto:Number = variable.indexOf('.');
            if (tienePunto >= this.INT_NUMBER_0) {
                for (let i = variable.length-this.INT_NUMBER_1; i > this.INT_NUMBER_0; i--) {
                    console.log('variable.charAt(i): '+variable.charAt(i)+'  == 0')
                    if (variable.charAt(i) == '0') {
                        j = j + this.INT_NUMBER_1;
                    } else {
                        i = this.INT_NUMBER_0;
                    }
                }

                if (variable.trim().substring(this.INT_NUMBER_0,variable.length - j).charAt(
                    variable.trim().substring(this.INT_NUMBER_0,variable.length - j).length - this.INT_NUMBER_1) == '.') {
                    return variable.trim().substring(this.INT_NUMBER_0,variable.length - (j + this.INT_NUMBER_1));
                } else {
                    return variable.trim().substring(this.INT_NUMBER_0,variable.length - j);
                }
            } else {
                return variable;
            }
        }
    }

    validaNull(numberNull:Number) {
        if (numberNull == this.NULL || numberNull == this.INT_NUMBER_0) {
            return this.STR_LETTER_WITHOUT;
        }
    }
}
