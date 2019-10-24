// Aca va todo lo vinculado al objeto Monataña rusa
var a=5
p_control=Array([0,2,0],[0,2,0],[0,6,0],[-5,6,0],[-6,4,5],[-6,0,4],[-3,-3,3],[0,-5,1],[0,2,0],[0,2,0]);

spline_points=bspline3_cat(10,p_control);

var spline_vec_buffer=get_spline_buffer(spline_points);

var spline_line = new Line_obj(spline_vec_buffer[0],spline_vec_buffer[0],spline_vec_buffer[1],mat4.create());

//rueda.add_son(spline_line);
function setupMR(gl){
  spline_line.setupBuffers(gl);
}

function drawMR(){
  spline_line.drawScene(glProgram,mat4.create());
}
