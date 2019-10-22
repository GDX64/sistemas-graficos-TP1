function [pts] = eval_bezier(w,n1,N)
%EVAL_BEZIER Summary of this function goes here
%   Detailed explanation goes here
n=n1-1;

for i=0:1:n
    sigma(i+1)=factorial(n)/(factorial(i)*factorial(n-i));  % for calculating (x!/(y!(x-y)!)) values 
end

pts=[];
range=linspace(0,1,N);
for u=range
    for d=1:n1
        UB(d)=((1-u)^(n1-d))*(u^(d-1));
    end
    pts(:,end+1)=(UB.*sigma*w');
end


end

