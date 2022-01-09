import AppBootstraper from './bootstrap/AppBootstraper';

const app = new AppBootstraper();
app.enableCors();
app.startOnPort(8080);
