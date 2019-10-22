clear all; close all; clc;

total_angle=2*pi;
N=20;
n1=4;
w1=[1,3,3,5; 0,0.5,4,0.3];
w2=[7,8,9; 3,0,0];
w=[w1 w1(:,end) w2];
%w=rand(2,8);
resolution=30;

[pts] = cubic_bezier_cat(w,N);

plot(pts(1,:),pts(2,:))
hold
plot(w(1,:),w(2,:),'*')
plot(w(1,:),w(2,:))

%tirando a media
pts(1,:)=pts(1,:)-mean(pts(1,:));
pts(3,:)=0;


[new_pts] = revolution(pts, total_angle, resolution)

figure
hold on
for i=1:resolution
   plot3(new_pts(1,:,i),new_pts(2,:,i),new_pts(3,:,i))
    
end


X=new_pts(:);

fileID = fopen('vertex_data.js','w');
fprintf(fileID,'var vertex_data = [\n');
fprintf(fileID,'%6.2f,',X(1:end-1));
fprintf(fileID,'%6.2f ]\n', X(end));

fprintf(fileID,'var ROWS_NUMBER = %i;\n var COLS_NUMBER = %i \n', resolution, length(pts));
fclose(fileID);