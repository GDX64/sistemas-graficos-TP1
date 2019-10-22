function ObjetoForma(){

	this.vertices=null;
	this.normales=null;

	this.VecTangen=[1.0,0.0,0.0];
	this.VecBiNorm=[0.0,1.0,0.0];
	this.VecNormal=[0.0,0.0,1.0];
}


function circulo(r,n){
        var dalpha=2*Math.PI/n;
        var x=[];
        for (var i=0; i<n ;i++){
                x.push([Math.cos(dalpha*i)*r, Math.sin(dalpha*i)*r, 0.0]);
        };
        return x;
};
function circuloNormales(r,n){
        var dalpha=2*Math.PI/n;
        var x=[];
        for (var i=0; i<n ;i++){
		
                x.push([Math.cos(dalpha*i)*r, Math.sin(dalpha*i)*r, 0.0]);
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
	var c1_p_control=[[ 0.0,-0.5 ,0.0],
		          [-0.3,-0.5 ,0.0],
		          [-0.3,-0.25,0.0],
		          [-0.8,-0.1 ,0.0]];
	var c2_p_control=[[-0.8,-0.1 ,0.0],
		          [-1.0,-0.1 ,0.0],
		          [-1.0, 0.1 ,0.0],
		          [-1.0, 0.25,0.0]];
	var c3_p_control=[[-1.0, 0.3 ,0.0],
		          [-1.0, 0.4 ,0.0],
		          [-1.0, 0.5 ,0.0],
		          [-0.8, 0.5 ,0.0]];
	var c4_p_control=[[-0.8, 0.3 ,0.0], 
		          [-0.3, 0.3 ,0.0],
		          [-0.3, 0.2 ,0.0],
		          [ 0.0, 0.2 ,0.0]];
	var c5_p_control=[[ 0.0, 0.2 , 0.0], [ 0.3, 0.2 ,0.0], [ 0.3, 0.3,0.0], [0.8, 0.3,0.0]];
	var c6_p_control=[[ 0.8, 0.5 , 0.0], [ 1.0, 0.5 ,0.0], [ 1.0, 0.4,0.0], [1.0, 0.3,0.0]];
	var c7_p_control=[[ 1.0, 0.25, 0.0], [ 1.0, 0.1 ,0.0], [ 1.0,-0.1,0.0], [0.8,-0.1,0.0]];
	var c8_p_control=[[ 0.8,-0.1 , 0.0], [ 0.3,-0.25,0.0], [ 0.3,-0.5,0.0], [0.0,-0.5,0.0]];

	x.concat( bezier3(n,c1_p_control) )
	x.concat( bezier3(n,c2_p_control) )
	x.concat( bezier3(n,c3_p_control) )
	x.concat( bezier3(n,c4_p_control) )
	x.concat( bezier3(n,c5_p_control) )
	x.concat( bezier3(n,c6_p_control) )
	x.concat( bezier3(n,c7_p_control) )
	x.concat( bezier3(n,c8_p_control) )

	return x;
}


function SeccionCarro(){
	var n=10;		//puntos por curva
	var x=[];

	var c1_p_control=[[0.0,-0.5,0.0],  [-1.0,-0.5,0.0],  [-1.0,-0.5,0.0], [-1.0,0.0,0.0]];
		x= bezier3(n,c1_p_control) ;
	var c2_p_control=[[-1.0,0.0,0.0], [-1.0,0.5,0.0], [-1.0,0.5,0.0],   [0.0,0.5,0.0]];
		x=x.concat( bezier3(n,c2_p_control) );
	var c3_p_control=[[ 0.0,0.5,0.0],  [1.0,0.5,0.0], [1.0,0.5,0.0],   [1.0,0.0,0.0 ]];
		x=x.concat( bezier3(n,c3_p_control) );
	var c4_p_control=[[ 1.0,0.0,0.0],  [1.0,-0.5,0.0],  [1.0,-0.5,0.0],  [ 0.0,-0.5,0.0 ]];
		x=x.concat( bezier3(n,c4_p_control) );
	
	x.concat( bezier3(n,c1_p_control) )
	x.concat( bezier3(n,c2_p_control) )
	x.concat( bezier3(n,c3_p_control) )
	x.concat( bezier3(n,c4_p_control) )
	
	return x;
}
