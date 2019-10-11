function transform_pts = eval_varrido(curve_pts, pts, normal_vector)

grd=gradient(curve_pts);
pts(4,:)=ones(1,length(pts)); %agregando uma fila de 1 no final
curve_pts(4,:)=ones(1,length(curve_pts));

for i=1:length(grd)
    transformMatrix=find_transform(grd(:,i),normal_vector);
    transformMatrix(:,end)=curve_pts(:,i)';
    transform_pts(:,:,i)=transformMatrix*pts;
end


end

