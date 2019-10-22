clear all; close all; clc;

space=3;
total_angle=pi;
N=50;
resolution=30;
t=linspace(0,2*pi,N);
%circle
x=sin(t);
y=cos(t);
z=zeros(1,N);

pts=[x,;y;z];

w1=[1,3,3,7; 0,0.5,1,0];
w2=[7,8,9; 3,0,0];
w=[w1 w1(:,end) w2];

[curve_pts] = eval_bezier([w1; 0 0 0 0],4,resolution);

grd=gradient(curve_pts);
plot(curve_pts(1,:),curve_pts(2,:))
hold
plot(w1(1,:),w1(2,:),'*')
plot(w1(1,:),w1(2,:))
quiver(curve_pts(1,1:space:end),curve_pts(2,1:space:end),grd(1,1:space:end),grd(2,1:space:end))


normal_vector=[0,0,1];
pts(4,:)=ones(1,length(pts)); %agregando uma fila no final
curve_pts(4,:)=ones(1,length(curve_pts));

figure
hold on
for i=1:length(grd)
    
    transformMatrix=find_transform(grd(:,i),normal_vector);
    transformMatrix(:,end)=curve_pts(:,i)';
    transform_pts(:,:,i)=transformMatrix*pts;
    plot3(transform_pts(1,:,i),transform_pts(2,:,i),transform_pts(3,:,i))
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




