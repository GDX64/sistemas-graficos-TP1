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

/*
Funciones para obtener posicion y normales del suelo
*/
function getPosSuelo(rows,cols,xmin,xmax,zmin,zmax){
		
		var pos = [];

			var dx = (xmax-xmin)/rows ;
			var dz = (zmax-zmin)/cols ;
	                                                     
		for (i=0;i<rows; i++) {
			for (j=0;j < cols; j++) {
				pos.push(xmin + i*dx);
				pos.push(0.0);
				pos.push(zmin + j*dz);
			}
	                                                     
		}
		return pos;
}


function getNormSuelo(rows,cols,xmin,xmax,zmin,zmax){
		var normal = [];		
			var dx = (xmax-xmin)/rows ;
			var dz = (zmax-zmin)/cols ;

		for (var i=0;i<rows;i++){
        	for (var j=0;j<cols;j++){
			
						var p=[	xmin + i*dx,  Math.cos(i*j)*0.5  ,zmin + j*dz ];

                		var v=vec3.create();
                		vec3.normalize(v,p);

						var delta=0.05;
                		var p1=[xmin + i*dx +delta,  Math.cos(i*j)*0.5  ,zmin + j*dz ];
                		var p2=[xmin + i*dx,  Math.cos(i*j)*0.5 +delta ,zmin + j*dz ];
                		var p3=[xmin + i*dx,  Math.cos(i*j)*0.5  ,zmin + j*dz +delta];

                		var v1=vec3.fromValues(p2[0]-p1[0],p2[1]-p1[1],p2[2]-p1[2]);
                		var v2=vec3.fromValues(p3[0]-p1[0],p3[1]-p1[1],p3[2]-p1[2]);

                		vec3.normalize(v1,v1);
                		vec3.normalize(v2,v2);
                
                		var n=vec3.create();
                		vec3.cross(n,v1,v2);
                		vec3.scale(n,n,1);

						normal.push(n[0]);
						normal.push(n[1]);
						normal.push(n[2]);

					}
				}














//		var normal = [];
//		for (i=0;i<=n3/3;i++){
//			normal.push(0.0);
//			normal.push(1.0);
//			normal.push(0.0);
//		}
		return normal;
	
}



/*
Funciones para obtener posicion y normales del Cielo
*/
            
function getPosCielo(rows,cols, r){
			var pos=[];

			for (var i=0;i<rows;i++){
                    for (var j=0;j<cols;j++){

						var alfa=j/(cols-1)*Math.PI*2;
                        var beta=(0.1+i/(rows-1)*0.99)*Math.PI*0.5;

                		pos.push(Math.sin(beta)*Math.sin(alfa)*r);
                		pos.push(Math.cos(beta)*r);
                		pos.push(Math.sin(beta)*Math.cos(alfa)*r);
					}
				}
                return pos;
}

         

function getNormCielo(rows,cols,r){
			var normal=[];

			for (var i=0;i<rows;i++){
                    for (var j=0;j<cols;j++){

						var alfa=j/(cols-1)*Math.PI*2;
                        var beta=(0.1+i/(rows-1)*0.99)*Math.PI*0.5;
						
						var p=[Math.sin(beta)*Math.sin(alfa)*r,
							   Math.cos(beta)*r,
							   Math.sin(beta)*Math.cos(alfa)*r];

                		var v=vec3.create();
                		vec3.normalize(v,p);

						var delta=0.05;
                		var p1=[Math.sin(beta)*Math.sin(alfa)*r,
							   Math.cos(beta)*r,
							   Math.sin(beta)*Math.cos(alfa)*r];
                		var p2=[Math.sin(beta+delta)*Math.sin(alfa)*r,
							   Math.cos(beta+delta)*r,
							   Math.sin(beta+delta)*Math.cos(alfa)*r];
                		var p3=[Math.sin(beta)*Math.sin(alfa+delta)*r,
							   Math.cos(beta)*r,
							   Math.sin(beta)*Math.cos(alfa+delta)*r];

                		var v1=vec3.fromValues(p2[0]-p1[0],p2[1]-p1[1],p2[2]-p1[2]);
                		var v2=vec3.fromValues(p3[0]-p1[0],p3[1]-p1[1],p3[2]-p1[2]);

                		vec3.normalize(v1,v1);
                		vec3.normalize(v2,v2);
                
                		var n=vec3.create();
                		vec3.cross(n,v1,v2);
                		vec3.scale(n,n,1);

						normal.push(n[0]);
						normal.push(n[1]);
						normal.push(n[2]);

					}
				}
                return normal;

}





