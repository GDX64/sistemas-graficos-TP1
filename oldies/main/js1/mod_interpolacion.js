function bezier3(n,p_control){
	var du=1.0/n;
	var x=[];
	for (var i=0; i<n; i++){
		var u=i*du
		var B=[ (1-u)*(1-u)*(1-u) , 
		      3*(1-u)*(1-u)*u ,
		      3*(1-u)*u*u ,
		      u*u*u	];
				
		x.push( [ (B[0]*p_control[0][0]+  B[1]*p_control[1][0] +  B[2]*p_control[2][0] +  B[3]*p_control[3][0] ),
			  (B[0]*p_control[0][1]+  B[1]*p_control[1][1] +  B[2]*p_control[2][1] +  B[3]*p_control[3][1] ),
			  (B[0]*p_control[0][2]+  B[1]*p_control[1][2] +  B[2]*p_control[2][2] +  B[3]*p_control[3][2] ) ])
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
		x.push( [ (B[0]*p_control[0][0]+  B[1]*p_control[1][0] +  B[2]*p_control[2][0] +  B[3]*p_control[3][0] ),
			  (B[0]*p_control[0][1]+  B[1]*p_control[1][1] +  B[2]*p_control[2][1] +  B[3]*p_control[3][1] ),
			  (B[0]*p_control[0][2]+  B[1]*p_control[1][2] +  B[2]*p_control[2][2] +  B[3]*p_control[3][2] ) ])
		
	}
	return x;
}
