import express from 'express';
import asyncHandler from 'express-async-handler';
import Actor from './actorModel.js';
import { getActorDetails, 
         getActorMovies,
         getActorsByName,
         getActorsByGender,
         getActorsByPopularityRange,
         getActorsByPopularityThreshold 
        } from '../tmdb-api'; 
const router = express.Router();
//TMDB

//Get cast details
router.get('/tmdb/actor/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const actorDetails = await getActorDetails(id);
    res.status(200).json(actorDetails);
}));

//Get films with actors in them
router.get('/tmdb/actor/:id/movies', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const actorMovies = await getActorMovies(id);
    res.status(200).json(actorMovies);
}));

//Get actors by name
router.get('/tmdb/name/:name', asyncHandler(async (req, res) => {
    const { name } = req.params;
    const actors = await getActorsByName(name);
    res.status(200).json(actors);
}));
// Get actors by gender
router.get('/tmdb/gender/:gender', asyncHandler(async (req, res) => {
    const { gender } = req.params;
    const genderNormalized = gender.toLowerCase();
    const genderCode = genderNormalized === 'male' ? 2 : genderNormalized === 'female' ? 1 : null;
    if (!genderCode) {
        return res.status(400).json({ message: "Invalid gender. Use 'male' or 'female'." });
    }
    const actors = await getActorsByGender(genderCode);
    const filteredActors = actors.results.filter(actor => actor.gender === genderCode);
    res.status(200).json({
        total_results: filteredActors.length,
        results: filteredActors
    });
}));
// Get actors based on popularity range
router.get('/tmdb/popularity/:min/:max', asyncHandler(async (req, res) => {
    const { min, max } = req.params; 
    if (!min || !max || isNaN(min) || isNaN(max)) {
        return res.status(400).json({ message: "Both 'min' and 'max' popularity values are required and must be numbers." });
    }
    const actors = await getActorsByPopularityRange(min, max);
    if (actors.results.length > 0) {
        res.status(200).json({
            total_results: actors.results.length,
            results: actors.results
        });
    } else {
        res.status(404).json({
            message: `No actors found with popularity between ${min} and ${max}.`,
            status_code: 404
        });
    }
}));
//Get actors whose popularity is above a certain value 
router.get('/tmdb/popularity/:threshold', asyncHandler(async (req, res) => {
    const { threshold } = req.params;
    if (!threshold || isNaN(threshold)) {
        return res.status(400).json({ message: "'threshold' value is required and must be a number." });
    }
    const actors = await getActorsByPopularityThreshold(threshold);
    if (actors.results.length > 0) {
        res.status(200).json({
            total_results: actors.results.length,
            results: actors.results
        });
    } else {
        res.status(404).json({
            message: `No actors found with popularity above ${threshold}.`,
            status_code: 404
        });
    }
}));


//MongoDB
//Get all actors (Pagination)
router.get('/', asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const [total_results, results] = await Promise.all([
        Actor.estimatedDocumentCount(),
        Actor.find().limit(+limit).skip((page - 1) * limit),
    ]);
    const total_pages = Math.ceil(total_results / limit);
    res.status(200).json({ page, total_pages, total_results, results });
}));
//Get details of specific actors
router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const actor = await Actor.findByActorDBId(id);
    if (actor) {
        res.status(200).json(actor);
    } else {
        res.status(404).json({ message: 'Actor not found in MongoDB.' });
    }
}));
//Get actors by name (pagination support)
router.get('/name/:name', asyncHandler(async (req, res) => {
    const { name } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const [total_results, results] = await Promise.all([
        Actor.countDocuments({ name: { $regex: name, $options: 'i' } }),
        Actor.find({ name: { $regex: name, $options: 'i' } })
            .skip((page - 1) * limit)
            .limit(+limit)
    ]);
    const total_pages = Math.ceil(total_results / limit);
    res.status(200).json({ page, total_pages, total_results, results });
}));
//Get actors by gender (pagination support)
router.get('/gender/:gender', asyncHandler(async (req, res) => {
    const { gender } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const genderNormalized = gender.toLowerCase();
    if (!['male', 'female'].includes(genderNormalized)) {
        return res.status(400).json({ message: "Invalid gender. Use 'male' or 'female'." });
    }
    const dbGenderValue = genderNormalized === 'male' ? 'Male' : 'Female';
    const [total_results, results] = await Promise.all([
        Actor.countDocuments({ gender: dbGenderValue }), 
        Actor.find({ gender: dbGenderValue }) 
            .skip((page - 1) * limit)
            .limit(+limit)
    ]);
    if (results.length === 0) {
        return res.status(404).json({ message: `No actors found with gender '${genderNormalized}'.` });
    }
    const total_pages = Math.ceil(total_results / limit); 
    res.status(200).json({ page, total_pages, total_results, results });
}));
//Get actors by popularity range
router.get('/popularity/:min/:max', asyncHandler(async (req, res) => {
    const { min, max } = req.params; 
    if (!min || !max || isNaN(min) || isNaN(max)) {
        return res.status(400).json({ message: "Both 'min' and 'max' popularity values are required and must be numbers." });
    }
    const actors = await Actor.find({
        popularity: { $gte: +min, $lte: +max }
    }).sort({ popularity: -1 }); 
    if (actors.length > 0) {
        res.status(200).json(actors);
    } else {
        res.status(404).json({
            message: `No actors found with popularity between ${min} and ${max}.`,
            status_code: 404
        });
    }
}));
//Get actors based on popularity above a certain value
router.get('/popularity/:threshold', asyncHandler(async (req, res) => {
    const { threshold } = req.params;
    if (!threshold || isNaN(threshold)) {
        return res.status(400).json({ message: "'threshold' value is required and must be a number." });
    }
    const actors = await Actor.find({
        popularity: { $gt: +threshold } 
    }).sort({ popularity: -1 }); 
    if (actors.length > 0) {
        res.status(200).json(actors);
    } else {
        res.status(404).json({
            message: `No actors found with popularity above ${threshold}.`,
            status_code: 404
        });
    }
}));






export default router;