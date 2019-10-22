clear all
close all
clc

theta=zeros(1,2)+pi/4;
g=-10; L=4; Ts=1/100;
N=500;
t=(0:N-1)*Ts;
fx=0.5; x=2*cos(t*2*pi*fx); y=5*sin(t*2*pi*fx); %x=zeros(1,N);
figure('Position',[200 200 400 400])
x=[x];
y=[y];
for i=2:N-1
   alphax(i)= -(x(i+1)-2*x(i)+x(i-1))/Ts^2;
   alphay(i)= -(y(i+1)-2*y(i)+y(i-1))/Ts^2+g;
   ac=[alphax(i),alphay(i),0];
   r=[cos(theta(i)),-sin(theta(i)),0];
   theta(i+1)=2*theta(i)-theta(i-1)-cross(r,ac)*[0,0,1]'/L*Ts^2; 
   
   pause(0.01)
   plot(x,y); hold on;
   plot(x(i-1)+[0 L*cos(theta(i))],y(i-1)+[0 -L*sin(theta(i))], '-o'); hold off;
   axis(2*L*[-1 1 -1 1])
    
end

figure
plot(sin(theta(1:end-1)).*alphax/Ts^2)
hold
plot(theta,'r')