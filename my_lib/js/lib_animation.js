var rotate_angle = -1.57078;

var data1=[
0.0, 0.0, 0.0,
1.0, 0.0, 1.0,
0.5, 0.886, 1.0,
-0.5, 0.886, 1.0,
-1.0, 0.0, 1.0,
-0.5,-0.886, 1.0,
0.5,-0.886,1.0
];
var data_vector=create_plane_grid(ROWS_NUMBER,COLS_NUMBER);
var strip_index=create_index_buffer(ROWS_NUMBER,COLS_NUMBER);
var color=[
    1.0, 0.0, 0.0,      // r,g,b vertice 1
    1.0, 1.0, 0.0,
    0.0, 1.0, 0.0,

    0.0, 1.0, 1.0,
    0.0, 0.0, 1.0,
    1.0, 0.0, 1.0
];
var index = [ 0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 6, 0, 6, 1 ];
var obj2=new Obj3d(vertex_data,data_vector[0], strip_index, modelMatrix);
var obj1=new Obj3d(vertex_data,data_vector[0], strip_index, modelMatrix);
var obj3=new Obj3d(vertex_data,data_vector[0], strip_index, modelMatrix);

obj1.add_son(obj2);
obj1.add_son(obj3);

//mat4.translate(obj3.modelMatrix, modelMatrix, new vec3.fromValues(3,0,0));

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
        obj1.setupBuffers(gl);
        obj2.setupBuffers(gl);
				obj3.setupBuffers(gl);
        tick();

    }else{
        alert(  "Error: Your browser does not appear to support WebGL.");
    }

}

function setupVertexShaderMatrix(modelMatrix){
var modelMatrixUniform = gl.getUniformLocation(glProgram, "modelMatrix");
var viewMatrixUniform  = gl.getUniformLocation(glProgram, "viewMatrix");
var projMatrixUniform  = gl.getUniformLocation(glProgram, "projMatrix");

gl.uniformMatrix4fv(modelMatrixUniform, false, modelMatrix);
gl.uniformMatrix4fv(viewMatrixUniform, false, viewMatrix);
gl.uniformMatrix4fv(projMatrixUniform, false, projMatrix);
}

function animate_obj1(){
    var transformMatrix=mat4.create();
    rotate_angle += 0.01;
    mat4.identity(transformMatrix);
    mat4.translate(transformMatrix,transformMatrix, new vec3.fromValues(0,0,0));
    mat4.rotate(transformMatrix,transformMatrix, rotate_angle, [0.0, 1.0, 0.0]);
    scale_factor=0.5;
    mat4.scale(transformMatrix,transformMatrix,[scale_factor,scale_factor,scale_factor])
    obj1.modelMatrix=transformMatrix;
}

function animate_obj2(){
    var transformMatrix=mat4.create();
    rotate_angle += 0.01;
    mat4.identity(transformMatrix);
		mat4.translate(transformMatrix,transformMatrix, new vec3.fromValues(0,0.0,0));
    mat4.rotate(transformMatrix,transformMatrix, rotate_angle, [1.0, 0.0, 0.0]);
    scale_factor=0.6;
    mat4.scale(transformMatrix,transformMatrix,[scale_factor,scale_factor,scale_factor])
    obj2.modelMatrix=transformMatrix;
}

function animate_obj3(){
    var transformMatrix=mat4.create();
    rotate_angle += 0.01;
    mat4.identity(transformMatrix);
		mat4.translate(transformMatrix,transformMatrix, new vec3.fromValues(0,0.0,0));
    mat4.rotate(transformMatrix,transformMatrix, rotate_angle, [1.0, 1.0, 0.0]);
    scale_factor=0.3;
    mat4.scale(transformMatrix,transformMatrix,[scale_factor,scale_factor,scale_factor])
    obj3.setModelMatrix(transformMatrix);
}

function tick(){

requestAnimationFrame(tick);
drawAll();
animate_obj1();
animate_obj2();
animate_obj3()
}

function drawAll(){
	var mat=mat4.create();
	mat4.identity(mat);
    obj1.drawScene(glProgram,mat);
    //obj2.drawScene(glProgram,mat);
}
