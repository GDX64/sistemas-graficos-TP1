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



//esta no es de matlab xD
function arrayToVec3(array){
	n=array.length();
	for (var i =0; i<n; i++){
		array[i]=vec3.fromValues(array[i]);
	}
	return array;
}
