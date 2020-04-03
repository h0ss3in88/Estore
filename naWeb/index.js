const http = require('http');
const cluster = require('cluster');
const os = require('os');
const cpuNumbers= os.cpus().length;
const {app} = require('./src/server/app');
if(cluster.isMaster) {
    for (let i = 0; i < cpuNumbers; i++) {
        cluster.fork();
    }
    cluster.on("online", worker => {
        console.log(`process forked successfully with ${worker.process.pid} process id`);
    });
    cluster.on("disconnect", worker => {
        console.log(`process  disconnected with process id ${worker.process.pid}`);
    });
    cluster.on("exit", (worker,code,signal) => {
        console.log(`process killed with ${worker.process.pid} process id \r\n code: ${code} \r\n signal: ${signal}`);
    });
} else if (cluster.isWorker) {
    let server = http.createServer(app);
    server.listen(app.get('port'), () => {
        console.log(`server is up and running at ${server.address().address}:${server.address().port}`);
    });
}
