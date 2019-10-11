function [transformMatrix] = find_transform(refVec,trasformVec)
%FIND_TRANSFORM Summary of this function goes here
%   Detailed explanation goes here
[theta, phi, R]=cart2sph(trasformVec(1),trasformVec(2),trasformVec(3));

[theta2, phi2, R]=cart2sph(refVec(1),refVec(2),refVec(3));

transformMatrix=makehgtform('zrotate',theta2)*makehgtform('yrotate',phi-phi2)*makehgtform('zrotate',-theta);


end

