// Aca va todo lo vinculado al objeto Monataña rusa

spline_points=bspline3(50,Array([0,0,0],[10,5,5],[-5,-5,-5],[10,10,10],[0,0,0],[10,10,10],
  [20,20,20]));
spline_vec_buffer=[];

for(var i=0; i<spline_points.length; i++){
  for(var j=0; j<spline_points[i].length; j++){
    spline_vec_buffer.push(spline_points[i][j]);
  }
}

spline_index=[...Array(spline_points.length).keys()];

var spline_line = new Line_obj(spline_vec_buffer,spline_vec_buffer,spline_index,mat4.create());

//rueda.add_son(spline_line);
function setupMR(gl){
  spline_line.setupBuffers(gl);
}

function drawMR(){
  spline_line.drawScene(glProgram,mat4.create());
}
