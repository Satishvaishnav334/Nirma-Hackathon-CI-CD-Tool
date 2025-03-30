import express from 'express'
import {fetchFigmaFile} from '../controllers/FigmaApi.js'

const figmarouter = express.Router();

figmarouter.get('/:fileId', fetchFigmaFile);
export {figmarouter};
