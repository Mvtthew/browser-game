import AppBootstraper from './bootstrap/AppBootstraper';

const app = new AppBootstraper();
app.registerControllers();
app.registerListeners();
app.enableCors();
app.startOnPort(3001);
