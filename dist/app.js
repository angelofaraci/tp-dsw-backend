import express from 'express';
import { reviewRouter } from './review/review.routes.js';
import { gameRouter } from './game/game.routes.js';
const app = express();
app.use(express.json());
app.use('/api/reviews', reviewRouter);
app.use('/api/games', gameRouter);
app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' });
});
app.listen(3000, () => {
    console.log('Server runnning on http://localhost:3000/');
});
//# sourceMappingURL=app.js.map