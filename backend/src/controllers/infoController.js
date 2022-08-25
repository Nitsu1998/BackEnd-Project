class InfoController {
    getInfoController(req, res) {
        try{
            const info = {
                inputArguments: (process.argv).slice(2, -1),
                operatingSystem: process.platform,
                nodeVersion: process.version,
                rss: process.memoryUsage(),
                ejecutionPath: process.execPath,
                processID: process.pid,
                proyectFolder: process.cwd(),
            }
            return res.json(info)
        }catch(err){
            console.log(err)
        }
    }
}


const infoController = new InfoController();
export default infoController;
