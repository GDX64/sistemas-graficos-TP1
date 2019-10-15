// La clase silla es una extension de Obj3d con la funcion de animacion y el angulo adecuado
// en la rueda giratoria
class Silla extends Obj3d {
  constructor(vertexData, color, index, modelMatrix, angle) {
    super(vertexData, color, index, modelMatrix);
    this.angle = angle;
  }
	animate(){
	    var transformMatrix=mat4.create();
			var transform2=mat4.create();
	    mat4.identity(transformMatrix);
	  	mat4.translate(transformMatrix, transformMatrix, new vec3.fromValues(5,0,0));
			mat4.rotate(transformMatrix,transformMatrix, rotate_speed*5, [0.0, 0.0, 1.0]);
			mat4.rotate(transform2,transform2, this.angle, [0,1,0])
			mat4.multiply(transformMatrix, transform2, transformMatrix)
	    this.modelMatrix=transformMatrix;
	}
}


var rotate_speed = 0.03;
var rotate_angle = 0;
var elevation = 0.01;

var data_vector=create_plane_grid(ROWS_NUMBER,COLS_NUMBER);
var strip_index=create_index_buffer(ROWS_NUMBER,COLS_NUMBER);
var index = [ 0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 6, 0, 6, 1 ];
var rueda=new Obj3d(vertex_data,data_vector[0], strip_index, modelMatrix);
mat4.rotate(rueda.preModelMatrix,rueda.preModelMatrix, Math.PI/2, [1.0, 0.0, 0.0]);
scale_factor=1;
mat4.scale(rueda.preModelMatrix,rueda.preModelMatrix,[scale_factor,scale_factor,scale_factor])

var data_vector=create_plane_grid(CARR_ROWS_NUMBER,CARR_COLS_NUMBER);
var strip_index=create_index_buffer(CARR_ROWS_NUMBER,CARR_COLS_NUMBER);

//Palo en el centro de las sillas voladoras
var palo_rueda=new Obj3d(carr_data,data_vector[0], strip_index, modelMatrix);
mat4.rotate(palo_rueda.preModelMatrix, palo_rueda.preModelMatrix, -Math.PI*(1/2),[0,0,1]);
var scale_factor=1.5;
mat4.scale(palo_rueda.preModelMatrix,palo_rueda.preModelMatrix,[1,scale_factor,scale_factor]);

palo_rueda.add_son(rueda);
//============= Loop para crear todas las sillas: ==========================
var sillas=[];
var NUMERO_SILLAS = 10;
for(var i=0;i<NUMERO_SILLAS;i++){
	sillas.push(new Silla(carr_data,data_vector[0], strip_index, modelMatrix, Math.PI*2/NUMERO_SILLAS*i));
	mat4.rotate(sillas[i].preModelMatrix, sillas[i].preModelMatrix, -Math.PI*(1/2),[0,0,1]);
	scale_factor=0.5;
	mat4.scale(sillas[i].preModelMatrix,sillas[i].preModelMatrix,[1,scale_factor,scale_factor])

	rueda.add_son(sillas[i]);
}

function animate_sillas(){
	for(var i=0;i<NUMERO_SILLAS;i++){
		sillas[i].animate();
	}
}
function setup_sillas(){
	for(var i=0;i<NUMERO_SILLAS;i++){
		sillas[i].setupBuffers(gl);
	}
}


//funcion que inicia el WebGL ejecurando funciones del archivo webGL_functions
function initWebGL(){
    canvas = document.getElementById("my-canvas");
    try{
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch(e) {
        alert("Error al obtener el contexto");
    }

    if(gl){

        setupWebGL();
        initShaders();
        rueda.setupBuffers(gl);
				palo_rueda.setupBuffers(gl);
        setup_sillas(gl);
        tick();

    }else{
        alert(  "Error: Your browser does not appear to support WebGL.");
    }

}

//=============== Funciones de animacion ========================
//Cada objecto para ser animado necesita una funcion de animacion que va a modificar su matriz de modelado

function animate_rueda(){
    var transformMatrix=mat4.create();
		var tr2=mat4.create();
		elevation+=0.05;
    rotate_angle += rotate_speed;
    mat4.rotate(transformMatrix,transformMatrix, rotate_angle, [0.0, 1.0, 0.0])
		mat4.rotate(tr2,tr2, Math.sin(elevation)*0.3, [0.0, 0.0, 1.0]);
		mat4.multiply(rueda.modelMatrix, tr2, transformMatrix);

}



// Funcion llamada a cada frame
function tick(){

requestAnimationFrame(tick);
drawAll(); //esta funcion llama a los objectos que van a ser dibujados
//Las funciones de animacion deben ser llamadas acá
animate_rueda();
animate_sillas();
}

function drawAll(){
	var mat=mat4.create(); //esta matriz es pasada a los objectos padres (porque todos los objectos la necesitan receber)
	mat4.identity(mat);
	palo_rueda.drawScene(glProgram,mat);
  //obj2.drawScene(glProgram,mat);
}
