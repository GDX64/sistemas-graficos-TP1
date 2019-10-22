function [total_pts] = cubic_bezier_cat(w,N)

total_pts=[];
n_curves=(length(w)-4)/3+1;
for i=1:n_curves
    total_pts = [total_pts eval_bezier(w(:,(i-1)*3+1:3*i+1),4,N)];
end


end

