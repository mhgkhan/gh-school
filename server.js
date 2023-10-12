import os, { cpus } from 'os'
import cluster from 'cluster'
import app from './app.js'

const cpsLength = os.cpus().length
console.log("cpus length is ", cpsLength)

if(cluster.isPrimary){
    if(cpsLength<=5){
        for(let i =0; i<cpsLength; i++){
            cluster.fork()
        }
    }
    else{
        for(let i =0; i<6; i++){
            cluster.fork()
        }
    }
}
else{
    app.listen(process.env.PORT || 80, () => console.log("SERVER ARE LISTENNING ON PORT " + process.env.PORT || 80))
}