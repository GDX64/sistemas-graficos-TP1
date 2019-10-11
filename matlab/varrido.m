clear all; close all; clc;

space=3;
total_angle=pi;
N=100;
resolution=30;
t=linspace(0,2*pi,N);

%circle / perfil do varrido
x=sin(t);
y=cos(t);
z=zeros(1,N);
pts=[x,;y;z]; normal_vector=[0 0 1];

%pontos de controle
w1=[1,3,5,7; 0,1,1,0];
w1(3,1)=0; %agregando linha de 0
[curve_pts] = cubic_bezier_cat(w1,N);

%plotando curva do caminho
figure
plot(curve_pts(1,:),curve_pts(2,:))
hold
plot(w1(1,:),w1(2,:),'*')
plot(w1(1,:),w1(2,:))

transform_pts = eval_varrido(pts*5, pts, normal_vector);

figure
hold on
for i=1:size(transform_pts,3)
    plot3(transform_pts(1,:,i),transform_pts(2,:,i),transform_pts(3,:,i), 'k')
    grid on
    xlabel('X'); ylabel('Y'); zlabel('Z')
end

%% export
X=transform_pts(1:3,:);
X=X(:);

fileID = fopen('vertex_data.js','w');
fprintf(fileID,'var vertex_data = [\n');
fprintf(fileID,'%6.2f,',X(1:end-1));
fprintf(fileID,'%6.2f ]\n', X(end));

fprintf(fileID,'var ROWS_NUMBER = %i;\n var COLS_NUMBER = %i \n', size(transform_pts,3), size(transform_pts,2));
fclose(fileID);




