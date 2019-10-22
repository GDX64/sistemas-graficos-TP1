function linspace(ini,fin,n){
        var x=[]
        var delta= (fin-ini)/n
        for (var i=0; i<n ;i++){
                 x.push(ini+delta*i);
                };
        return x;
};

function zeros(n){ return linspace(0,0,n);};

function ones(n){ return linspace(1,1,n);};

function rot(angle,axis){
	if (axis=='x'){
		R=[[1.00 ,0.00		 , 0.00		 ],
		   [0.00 ,Math.cos(angle),-Math.sin(angle)],
		   [0.00 ,Math.sin(angle), Math.cos(angle)]]
	}
	else if (axis =='y'){
		R=[[Math.cos(angle) ,0.00,-Math.sin(angle)],
	 	   [Math.sin(angle) ,1.00, Math.cos(angle)],
	  	   [0.00	    ,0.00, 1.00 	  ]]
	}
	else if (axis =='z'){
	
		R=[[Math.cos(angle),-Math.sin(angle),0.00],
	   	   [Math.sin(angle), Math.cos(angle),0.00],
	   	   [0.00  	   , 0.00 	    ,1.00]]
	}
	return R;
}

function distancia3D(pnt1,pnt2){
	var dx=(pnt1[0]-pnt2[0])
	var dy=(pnt1[1]-pnt2[1])
	var dz=(pnt1[2]-pnt2[2])

	return  Math.sqrt(dx*dx + dy*dy + dz*dz)  ;	
	};


function grad3D(pnts){
	var n= pnts.length();
	
	var dp=[[ pnts[1][0]-pnts[0][0],pnts[1][1]-pnts[0][1],pnts[1][2]-pnts[0][2]  ]];
	for (var i=1;i<n-1;i++){
		dp.push([0.5*(pnts[i+1][0]-pnts[i-1][0]),
			 0.5*(pnts[i+1][1]-pnts[i-1][1]),
		  	 0.5*(pnts[i+1][2]-pnts[i-1][2]) ])
	};

	dp.push([ pnts[n-1][0]-pnts[n-2][0],pnts[n-1][1]-pnts[n-2][1],pnts[n-1][2]-pnts[n-2][2]  ]);
	return dp;
}



//esta no es de matlab xD
function arrayToVec3(array){
	n=array.length();
	for (var i =0; i<n; i++){
		array[i]=vec3.fromValues(array[i]);
	}
	return array;
}
