const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const db_url = process.env.MONGO_LINK;

const PORT = process.env.PORT || 8000;

const projectsSchema = new mongoose.Schema({
    title: String,
    description: String,
    img: String,
    alt: String,
    imgWidth: String,
    titleFontSize: String,
    repo: String
});
const Projects = mongoose.model("Projects", projectsSchema);

const skillsSchema = new mongoose.Schema({
    title: String,
    description: String,
    img: String
});
const Skills = mongoose.model("Skills", skillsSchema);

app.use(cors());

app.get("/", (req, res) => {
    res.json({
        API: "Portfolio-v2 API",
	    version: "0.0.1"
    });
})

app.get("/projects", async (req, res) => {
    let projectsMongoDB = await Projects.find({});
    let projects = [];
    for(let project of projectsMongoDB) {
            projects.push({
	        key: project._id.toString(),
	        title: project.title,
	        titleFontSize: project.titleFontSize,
	        description: project.description,
	        alt: project.alt,
	        img: project.img,
	        imgWidth: project.imgWidth,
	        repo: project.repo
	    });
    }
    //console.log(projects[0])
    res.json(projects);
});

app.get("/skills", async (req, res) => {
    let skillsMongoDB = await Skills.find({});
    let skills = [];
    for(let skill of skillsMongoDB) {
	    skills.push({
	        key: skill._id.toString(),
	        title: skill.title,
	        description: skill.description,
	        img: skill.img
	    })
    }
    res.json(skills);
})

mongoose.connect(db_url)
    .then( () => {
        app.listen(PORT, () => {
            console.log(`Server online on port: ${PORT}`);
        })
    })
    .catch ( err => {
        console.error(err);
    })
