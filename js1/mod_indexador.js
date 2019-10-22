/*
Funcion para indexar vertices utilizables para superficies por TRIANGLE.STRIP
*/

function getIndex(nrows,ncols){
                        var index_buffer= []
                        for (var i=0; i < nrows-1; i++){
                           for (var j=0; j < ncols; j++){

                                 if( i%2 == 0 ) {
                                        index_buffer.push(ncols*i+j);
                                        index_buffer.push(ncols*i+j+ncols);
                                                }
                                 else{  index_buffer.push( (i+1)*ncols -(j+1));
                                        index_buffer.push( (i+1)*ncols -(j+1)+ncols);
                                    }
                           }
                        }
                        return index_buffer;
}

