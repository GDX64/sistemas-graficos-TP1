clear all; close all; clc;

N=20;
n1=4;
w=[1,3,3,5; 0,0.5,4,0];
%w=rand(2,4);
resolution=20;

[pts] = eval_bezier(w,n1,N);

plot(pts(1,:),pts(2,:))
hold
plot(w(1,:),w(2,:),'*')
plot(w(1,:),w(2,:))

pts(3,:)=0;

new_pts=[];
for angle=linspace(0,2*pi, resolution)
    r=rot('x',angle);
    new_pts(:,:,end+1)=r(1:3,1:3)*pts;
    
end
new_pts=new_pts(:,:,2:resolution+1);

figure
hold on
for i=1:resolution
   plot3(new_pts(1,:,i),new_pts(2,:,i),new_pts(3,:,i))
    
end


X=new_pts(:);

fileID = fopen('vertex_data.js','w');
fprintf(fileID,'var vertex_data = [\n');
fprintf(fileID,'%6.2f,',X(1:end-1));
fprintf(fileID,'%6.2f ]', X(end));
fclose(fileID);