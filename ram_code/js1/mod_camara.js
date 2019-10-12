/*
Funciones propias para realización del TP1
*/

	  // Manejo de Camara via MOUSE * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	
	    var CamaraPos=[0,-20,-20]	// variable para poner en lookAt()
	    var previousClientX = 0, previousClientY = 0, radio = 20, alfa = 0, beta = 0, factorVelocidad = 0.01;
	
	    var isMouseDown = false;
	    var actualEvent;
	
		var mouse = {x: 0, y: 0};
	
	    $("#mi-canvas").mousemove(function(e){ 
			mouse.x = e.clientX || e.pageX; 
			mouse.y = e.clientY || e.pageY 
		});
		
	    $('#mi-canvas').mousedown(function(event){		
	        isMouseDown = true;        
	    });
	
	    $('body').mouseup(function(event){
			isMouseDown = false;		
	    });
	
	    $('body').on("keydown",function(event){
	        console.log(event);
	
	        if (event.keyCode==67){
	            alert ("presionaron la tecla C !!!")
	        }
	             
	    });    
	
	
	    function rotarCamara()
	    {
	        var deltaX = mouse.x - previousClientX;
	        var deltaY = mouse.y - previousClientY;
	
	        previousClientX = mouse.x;
	        previousClientY = mouse.y;
	
	        alfa = alfa + deltaX * factorVelocidad;
	        beta = beta + deltaY * factorVelocidad;
	
			if (beta<0) beta=0 ;
			if (beta>Math.PI) beta=Math.PI;
	
	       CamaraPos=[ radio * Math.sin(alfa) * Math.sin(beta), radio * Math.cos(beta) ,radio * Math.cos(alfa) * Math.sin(beta)  ];
	
		return CamaraPos;

	    }
	  //  * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
