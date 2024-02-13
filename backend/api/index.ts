import express from 'express';
import * as config from '../config';
import cors from 'cors';
import mongoose from 'mongoose';
import * as tools from '../tools';
import { bookRouter } from './routers/bookRouter';
import { userRouter } from './routers/userRouter';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
	res.send('<h1>Book Site API</h1>');
});

app.use('/books', bookRouter);
app.use('/users', userRouter);

(async () => {
	try {
		const connectionOptions = {
			dbName: 'booksite'
		}
		mongoose.set("strictQuery", false);
		await mongoose.connect(config.dbUrl(), connectionOptions);
		app.listen(config.backendPort(), () => {
			tools.clearConsole();
			console.log(`---`);
			console.log(`FRONTEND SITE is running at: http://localhost:${config.frontendPort()}`)
			console.log(`BACKEND API is running at: http://localhost:${config.backendPort()}`)
		});
	}
	catch (error) {
		console.log(`SERVER IS NOT RUNNING BECAUSE: ${error.message}`);
	}
})();

// const connectToDb = async () => {
//   try {
//     await mongoose.connect(config.dbUrl());
//   } catch (e) {
//     console.error(e);
//   }
// };

// connectToDb().then(() =>
//   app.listen(config.backendPort(),() => console.log(`server is running on ${config.backendPort()}`))
// );
