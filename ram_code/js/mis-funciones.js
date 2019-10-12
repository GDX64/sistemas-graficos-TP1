/*
Funciones propias para realización del TP1

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



function buildIndex (nrows,ncols){
                        var index_buffer= []
                        for (var i=0; i < nrows-1; i++){
                           for (var j=0; j < ncols; j++){
                                        
                                 if( i%2 == 0 ) {
                                        index_buffer.push(ncols*i+j);
                                        index_buffer.push(ncols*i+j+ncols);
                                                }
                                 else{  index_buffer.push( (i+1)*ncols -(j+1));
                                        index_buffer.push( (i+1)*ncols -(j+1)+ncols);
                                    }
                           }
                        }
			return index_buffer;
}

function makeTerrain(xmin,xmax,zmin,zmax,rows,cols){
		
		var pos = [];

			var dx = (xmax-xmin)/rows ;
			var dz = (zmax-zmin)/cols ;
	                                                     
		for (i=0;i<rows; i++) {
			for (j=0;j < cols; j++) {
				pos.push(xmin + i*dx);
				pos.push(Math.cos(i*j)*0.1);
				pos.push(zmin + j*dz);
			}
	                                                     
		}
		return pos;
}

function makeTerrainNormal(n3){
		var normal = [];
		for (i=0;i<=n3/3;i++){
			normal.push(0.0);
			normal.push(1.0);
			normal.push(0.0);
		}
		return normal;
	
}







