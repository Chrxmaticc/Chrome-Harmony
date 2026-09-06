const Engine = require('./src/engine');

try {
    const e = new Engine();
    console.log(e.renderFile('bullshi.ch', 'bullshi.wav'));
    console.log("Successfully compiled bullshi.ch to bullshi.wav!");
} catch (error) {
    console.error("Error running the engine:", error);
}
