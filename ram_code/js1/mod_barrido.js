function SuperficieDeBarrido(){
	this.Vertices=null;
	this.Normales=null;
	this.rows=0;
	this.cols=0;
};


var n=100;	// "cols"
var m=50;	// "rows"

// Forma/ perfil do varrido
var forma=ObjetoForma();
	forma.vertices=circulo(n,1.0);
	forma.normales=circuloNormales(n,1.0);

//Trayectoria
var tray=ObjetoTrayectoria();
	pnts=[[0,0,0],[0,1,0.5],[1,2,1],[-1,0.5,2]];
	tray.vertices = bezier3(m,pnts);
	tray.tangentes= bezier3_deriv_normalizadas(m,pnts);

SuperfBarrida = barrer(forma,trayectoria,tray_tangente,tray_binormal);

function barrer(forma,tray,tray_tang,tray_binorm){
	var n=forma.length();
	var m=trayectoria.length();

	var vertex=[];
	for (var i=0; i<m;i++){
		norm  = vec3.CrossProd(forma.normal, tray.tangentes[i])
		angulo= Math.acos( vec3.dot((forma.normal, tray.tangentes[i]))  / vec3.norm(forma.normal, tray.tangentes[i]) )
		
		M=mat4.create();
		
		scale(M,M,tray.escalado[i];
		translate(M,M,tray.vertices[i]);
		rotate(M,M,angulo, norm)
		
		for (j=0;j<n;j++){
		
			vertex.push( mat4.transform() );
						
		};
	};
}

//	grd=gradient(curve_pts);
//	pts(4,:)=ones(1,length(pts)); %agregando uma fila de 1 no final
//	curve_pts(4,:)=ones(1,length(curve_pts));

for i=1:length(grd)
    transformMatrix=find_transform(grd(:,i),normal_vector); %encontrando rotacion
    transformMatrix(:,end)=curve_pts(:,i)'; %Translacion 
    transform_pts(:,:,i)=transformMatrix*pts;
end


end

