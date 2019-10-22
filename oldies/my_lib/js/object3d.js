class Obj3d{
  constructor(vertexData, normal, index, modelMatrix){
    this.data=vertexData;
    this.normal=normal;
    this.index=index;
    this.modelMatrix=mat4.create();
		mat4.copy(this.modelMatrix,modelMatrix);
		this.preModelMatrix=mat4.create();
    this.fatherMatrix=null;
		this.finalMatrix=null;
    this.sons=[];
		this.sons_length=0;
    //this.program=program;
  }

	setModelMatrix(modelMatrix){
		mat4.copy(this.modelMatrix,modelMatrix);
	}
  add_son(obj){
      this.sons.push(obj);
  }
  hello(){
    console.log("hi, I'm alive");
  }
  drawScene(glProgram,fatherMatrix){
  	this.fatherMatrix=fatherMatrix;
	this.finalMatrix=mat4.create();

	mat4.multiply(this.finalMatrix,this.fatherMatrix,this.modelMatrix);

	this.sons_length=this.sons.length;
  	if (this.sons_length>0) {

		for (var i=0;i<this.sons_length;i++){
			console.log('fine');
			this.sons[i].drawScene(glProgram,this.finalMatrix);
		}
	}

	//aplicando premodelo
	mat4.multiply(this.finalMatrix,this.finalMatrix,this.preModelMatrix);
	this.drawMe(glProgram);
  }
  drawMe(glprogram){
      this.setupVertexShaderMatrix(mat4.create(), this.finalMatrix, glProgram);

      this.vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
      gl.enableVertexAttribArray(this.vertexPositionAttribute);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.trianglesVerticeBuffer);
      gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

      this.vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
      gl.enableVertexAttribArray(this.vertexNormalAttribute);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.trianglesNormalBuffer);
      gl.vertexAttribPointer(this.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.trianglesIndexBuffer);
      //gl.drawElements( gl.TRIANGLES, this.trianglesIndexBuffer.number_vertex_point, gl.UNSIGNED_SHORT, 0);
	  	gl.drawElements(gl.TRIANGLE_STRIP, this.trianglesIndexBuffer.number_vertex_point, gl.UNSIGNED_SHORT, 0);
      //gl.drawArrays(gl.TRIANGLES, 0,6);
  }
  setupBuffers(gl){

	  this.trianglesVerticeBuffer = gl.createBuffer();                               // creo el buffer
	  gl.bindBuffer(gl.ARRAY_BUFFER, this.trianglesVerticeBuffer);                   // activo el buffer
	  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.data), gl.STATIC_DRAW);   // cargo los datos en el buffer

	  this.trianglesNormalBuffer = gl.createBuffer();
	  gl.bindBuffer(gl.ARRAY_BUFFER, this.trianglesNormalBuffer);
	  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal), gl.STATIC_DRAW);

    this.trianglesIndexBuffer = gl.createBuffer();
    this.trianglesIndexBuffer.number_vertex_point = this.index.length;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.trianglesIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index), gl.STATIC_DRAW);
  }

	setupVertexShaderMatrix(normalMatrix,modelMatrix, glProgram){
		var modelMatrixUniform = gl.getUniformLocation(glProgram, "modelMatrix");
		var normalMatrixUniform = gl.getUniformLocation(glProgram, "normalMatrix");
		var viewMatrixUniform  = gl.getUniformLocation(glProgram, "viewMatrix");
		var projMatrixUniform  = gl.getUniformLocation(glProgram, "projMatrix");

		gl.uniformMatrix4fv(modelMatrixUniform, false, modelMatrix);
		gl.uniformMatrix4fv(normalMatrixUniform, false, normalMatrix);
		gl.uniformMatrix4fv(viewMatrixUniform, false, viewMatrix);
		gl.uniformMatrix4fv(projMatrixUniform, false, projMatrix);
	}
}

//====================  Not mine =======================

var gl = null,
    canvas = null,
    glProgram = null,
    fragmentShader = null,
    vertexShader = null;

var vertexPositionAttribute = null,
    trianglesVerticeBuffer = null,
    vertexNormalAttribute = null,
    trianglesNormalBuffer = null;

var modelMatrix = mat4.create();
mat4.identity(modelMatrix);
var viewMatrix = mat4.create();
var projMatrix = mat4.create();

// ========================== Uniform Grid ================================

//Crea un grid uniforme para el triangle strip. Utilizado en superficies de varrido y revolucion.
function create_index_buffer(rows,cols){

	COLUNAS=cols;
	LINHAS=rows;

	n_line=0;
	n_col=0;

	buffer=[0, COLUNAS];
	while(true){
		 if(n_col>=COLUNAS-1){
				 if(n_line==LINHAS-2){
						break;
				 }
				n_line=n_line+1;
				buffer.push(buffer[buffer.length-1]);
				buffer.push(n_line*COLUNAS);
				buffer.push(n_line*COLUNAS);
				buffer.push((n_line+1)*COLUNAS);
				n_col=0;
		 }

		 n_col=n_col+1;
		 buffer.push(n_line*COLUNAS+n_col);
		 buffer.push((n_line+1)*COLUNAS+n_col);

	}

	return buffer;
}

function create_plane_grid(rows,cols){

		position_buffer = [];
		color_buffer = [];

		for (var i = 0.0; i < rows; i++) {
			 for (var j = 0.0; j < cols; j++) {

					 // Para cada v�rtice definimos su posici�n
					 // como coordenada (x, y, z=0)
					 position_buffer.push(i/rows*2);
					 position_buffer.push(j/cols*2);
					 position_buffer.push(0);

					 // Para cada v�rtice definimos su color
					 color_buffer.push(1.0/rows * i);
					 color_buffer.push(0.2);
					 color_buffer.push(1.0/cols * j);

			 };
		};

		//retorna el color y posicion de los buffers
		return [position_buffer, color_buffer];
}
