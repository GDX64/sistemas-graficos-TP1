clear all
close all
clc

theta=pi/6;
g=-10; L=5; Ts=1/100; amortecimento=0.9999; %parâmetros da simulaçao
N=30000;
t=(0:N-1)*Ts;
fx=0.2; 
x=0*cos(t*2*pi.*fx); y=0*sin(t*2*pi.*fx); z=zeros(1,N); %caminhos
caminho=[x;y;z];
caminho=rotx(0)*caminho; x=caminho(1,:);y=caminho(2,:); z=caminho(3,:);

figure('Position',[100 100 600 600])
x=[x(1) x(1) x]; %colocando ele parado no começo
y=[y(1) y(1) y];
z=[z(1) z(1) z];
r=[0 sin(theta) -cos(theta)]; v=[5 0 0]; w=cross(r,v)/L;
r=r*L/norm(r); %normalizando o r
for i=2:N
   alphax(i)= -(x(i+1)-2*x(i)+x(i-1))/Ts^2;
   alphay(i)= -(y(i+1)-2*y(i)+y(i-1))/Ts^2;
   alphaz(i)= -(z(i+1)-2*z(i)+z(i-1))/Ts^2+g;
   ac=[ alphax(i), alphay(i), alphaz(i)];
   
   w=w*amortecimento+cross(r,ac)*Ts/L^2; %calculando vel angular
   v=cross(w,r); %calculando vel escalar
   r=r+v*Ts; r=r/norm(r)*L; %movendo e normalizando raio
   
   caminho_pendulo(:,i)=caminho(:,i-1)+r';   
end

plot3(caminho_pendulo(1,2:end),caminho_pendulo(2,2:end),caminho_pendulo(3,2:end), 'k')
view(90,90)
