import loadApp from "./app";
import loadServer from "./server";
import db from "./src/configs/db.config";
import routesInstance from "./src/factories/route.factories";

const routes = routesInstance(db);
const app = loadApp(routes);
db.sync();
const io = loadServer(db, app);

export default {app, io};
