close all; clear  all; clc

vec=[1 3 1];
d_vec=[1,2,6];

figure
quiver3(0,0,0,vec(1),vec(2),vec(3))
hold on
quiver3(0,0,0,d_vec(1),d_vec(2),d_vec(3),'g')

[theta, phi, R]=cart2sph(vec(1),vec(2),vec(3));
theta=theta/pi*180
phi=phi/pi*180

t_vec=roty(phi)*rotz(-theta)*vec'

quiver3(0,0,0,t_vec(1),t_vec(2),t_vec(3),'r')

[theta, phi, R]=cart2sph(d_vec(1),d_vec(2),d_vec(3));
theta=theta/pi*180
phi=phi/pi*180

t_vec2=rotz(theta)*roty(-phi)*t_vec

quiver3(0,0,0,t_vec2(1),t_vec2(2),t_vec2(3),'y')


%%

transformMarix=find_transform(d_vec,vec);

vec=[vec 0];
t_vec=transformMarix*vec';

figure
quiver3(0,0,0,d_vec(1),d_vec(2),d_vec(3))
hold
quiver3(0,0,0,t_vec2(1),t_vec2(2),t_vec2(3),'y')








