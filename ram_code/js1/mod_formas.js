function circulo(r,n){
        var dalpha=2*Math.PI/n;
        var x=[];
        for (var i=0; i<n ;i++){
                x.push([Math.cos(dalpha*i)*r, x.push(Math.sin(dalpha*i)*r,0.0]);
        };
        return x;
};

function rectangulo(wd,hg){
	x=[];
	x.push([(-wd*0.5), (-hg*0.5), 0.0]);
	x.push([(-wd*0.5), ( hg*0.5), 0.0]);
	x.push([( wd*0.5), ( hg*0.5), 0.0]);
 	x.push([( wd*0.5), (-hg*0.5), 0.0]);
	
	return x;
}


SeccionPista= function(){
	
	var n=20  // puntos por curva
	var x=[];
	var c1_puntos_control=[[  0.0,-0.5 ,0.0],
			       [ -0.3,-0.5 ,0.0],
			       [ -0.3,-0.25,0.0],
			       [ -0.8,-0.1 ,0.0]];
	var c2_puntos_control=[[ -0.8,-0.1 ,0.0],
			       [ -1.0,-0.1 ,0.0],
			       [ -1.0, 0.1 ,0.0],
			       [ -1.0, 0.25,0.0]];
	var c3_puntos_control=[[ -1.0, 0.3 ,0.0],
			       [ -1.0, 0.4 ,0.0],
			       [ -1.0, 0.5 ,0.0],
			       [ -0.8, 0.5 ,0.0]];
	var c4_puntos_control=[[ -0.8, 0.3 ,0.0], 
			       [ -0.3, 0.3 ,0.0],
			       [ -0.3, 0.2 ,0.0],
			       [  0.0, 0.2 ,0.0]];
	var c5_puntos_control=[[ 0.0, 0.2 , 0.0], [ 0.3, 0.2 ,0.0]  [0.3, 0.3,0.0] [0.8, 0.3,0.0]];
	var c6_puntos_control=[[ 0.8, 0.5 , 0.0], [ 1.0, 0.5 ,0.0]  [1.0, 0.4,0.0] [1.0, 0.3,0.0]];
	var c7_puntos_control=[[ 1.0, 0.25, 0.0], [ 1.0, 0.1 ,0.0]  [1.0,-0.1,0.0] [0.8,-0.1,0.0]];
	var c8_puntos_control=[[ 0.8,-0.1 , 0.0], [ 0.3,-0.25,0.0]  [0.3,-0.5,0.0] [0.0,-0.5,0.0]];

	x.concat( bezier3(n,c1_puntos_control) )
	x.concat( bezier3(n,c2_puntos_control) )
	x.concat( bezier3(n,c3_puntos_control) )
	x.concat( bezier3(n,c4_puntos_control) )
	x.concat( bezier3(n,c5_puntos_control) )
	x.concat( bezier3(n,c6_puntos_control) )
	x.concat( bezier3(n,c7_puntos_control) )
	x.concat( bezier3(n,c8_puntos_control) )

	return x;
}


function SeccionCarro(){
	var n=10;		//puntos por curva
	var x=[];

	var c1_p_control=[0.0,-0.5, -1.0,-0.5, -1.0,-0.5, -1.0,0.0];
		x= bezier3(n,c1_p_control) ;
	var c2_p_control=[-1.0,0.0, -1.0,0.5, -1.0,0.5,   0.0,0.5 ];
		x=x.concat( bezier3(n,c2_p_control) );
	var c3_p_control=[ 0.0,0.5,  1.0,0.5,  1.0,0.5,   1.0,0.0 ];
		x=x.concat( bezier3(n,c3_p_control) );
	var c4_p_control=[ 1.0,0.0,  1.0,-0.5,  1.0,-0.5,   0.0,-0.5 ];
		x=x.concat( bezier3(n,c4_p_control) );

	return x;
}



function bezier3(n,p_control){
	var du=1.0/n;
	var x=[];
	for (var i=0; i<n; i++){
		var u=i*du
		var B=[ (1-u)*(1-u)*(1-u) , 
		      3*(1-u)*(1-u)*u ,
		      3*(1-u)*u*u ,
		      u*u*u	];
				
		x.push(B[0]*p_control[0] +  B[1]*p_control[2] +  B[2]*p_control[4] +  B[3]*p_control[6] )
		x.push(B[0]*p_control[1] +  B[1]*p_control[3] +  B[2]*p_control[5] +  B[3]*p_control[7] )
	}
	
	return x;
}

function bspline3(n,p_control){
	var du=1.0/n;
	var x=[];
	for (var i=0; i<n; i++){
		var u=i*du
		var B=[ (1-3*u+3*u*u-u*u*u)*1/6 ,
			(4-6*u*u+3*u*u*u)*1/6,
			(1+3*u+3*u*u-3*u*u*u)*1/6,
			(u*u*u)*1/6];
				
		x.push(B[0]*p_control[0] +  B[1]*p_control[2] +  B[2]*p_control[4] +  B[3]*p_control[6] )
		x.push(B[0]*p_control[1] +  B[1]*p_control[3] +  B[2]*p_control[5] +  B[3]*p_control[7] )
	}
	return x;
}

