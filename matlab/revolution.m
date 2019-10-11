function [new_pts] = revolution(pts, total_angle, resolution)
%REVOLUTION Summary of this function goes here
%   Detailed explanation goes here
new_pts=[];
for angle=linspace(0,total_angle, resolution)
    r=rot('x',angle);
    new_pts(:,:,end+1)=r(1:3,1:3)*pts;
    
end
new_pts=new_pts(:,:,2:resolution+1);



end

