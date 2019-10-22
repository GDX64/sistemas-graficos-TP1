

var n=20; //"resolution"
var max_angle = Math.PI

function revolution(forma,ini_angle,fin_angle, n){
	var new_pts=[];
	var delta=(max_angle-ini_angle)/n;

	for (var i=0; i< n;i++){ 
	    var angle=ini_angle+delta*i;
	   
	    r=rot('x',angle); //resolver.(arma una matriz de rotacion??)
	
	    new_pts(:,:,end+1)=r(1:3,1:3)*pts; //resolver: aplica la transofrmacion??
	    
	}
	    new_pts=new_pts(:,:,2:resolution+1); //resolver
	return new_pts;
}
