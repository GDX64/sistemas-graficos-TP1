/*
Defino la clase MiObjeto3d
*/
function MiObjeto3D(){
	        
	// Si los buffers son nulos, el objeto actua solo como contenedor
                var vertexBuffer=null;
                var normalBuffer=null;
                var indexBuffer=null;

                // var matrizModelado;
                // var matrizPadre;

                // var hijos=[];

                var posicion;           // x,y,z
                var ejeRotacion;        // x,y,z
                var anguloRotacion      // angulo
                var escala;             // x,y,z


                this.setGeometria=function(vBuffer,nBuffer,iBuffer){

                        // cargar el vertexBuffer, normalBuffer e indexBuffer;
                	this.vertexBuffer = gl.createBuffer();
                		gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
                		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vBuffer), gl.STATIC_DRAW);    

                	this.normalBuffer = gl.createBuffer();
                		gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
                		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(nBuffer), gl.STATIC_DRAW);

                	this.indexBuffer = gl.createBuffer();
                	this.indexBuffer.number_vertex_point = iBuffer.length;
                		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(iBuffer), gl.STATIC_DRAW); 

                }

		this.dibujar=function(){ //(m)
//
//                        var mat; // guardo la matriz de transformacion final que voy a usar para dibujar el objeto
//
//                        matrizPadre=m;
//
//                        // actualizar matrizModelado segun posicion, ejeRotacion,anguloRotacion y escala
//                        // matrizModelado =  matTraslacion * matRotacion * matEscalado;
//                        // calcular matriz final
//                        // mat = matrizPadre * matrizModelado                   
//
                        if (this.vertexBuffer && this.indexBuffer) {

                                // dibujar la geometria del objeto, segun la tranformacion de "mat"
					vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
						gl.enableVertexAttribArray(vertexPositionAttribute);
						gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
						gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
					vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
						gl.enableVertexAttribArray(vertexNormalAttribute);
						gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
						gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
					                                                                                                 
						gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
						gl.drawElements( gl.TRIANGLE_STRIP, this.indexBuffer.number_vertex_point, gl.UNSIGNED_SHORT, 0);
   			}
//
//                        if (hijos.length>0) {
//
//                                for (var i=0;i<hijos.lenght;i++){
//
//                                        hijos[i].dibujar(mat);
//                                }
//                        }
//
                }

                this.setPosicion=function(x,y,z){
                        // guarda la posicion
			this.posicion=[x,y,z];
                }

                this.setRotacion=function(angulo,x,y,z){
                        // guarda la rotacion
			this.ejeRotacion=[x,y,z];
			this.anguloRotacion=alpha;
                }

                this.setEscala=function(x,y,z){
                        // guarda la escala
			this.escala=[x,y,z]
                }

                this.agregarHijo=function(obj){

                        // agregar obj a hijos
                }


                this.quitarHijo=function(obj){

                        // quitar obj de hijos;
                }

}
