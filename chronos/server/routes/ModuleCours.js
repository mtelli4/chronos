const express = require('express');
const router = express.Router();

const db = require('../models')

router.get("/", async (req, res) => {
    const modules = await db.ModuleCours.findAll()
    res.json(modules);
})

router.get("/byFormation", async (req, res) => {
    const id = parseInt(req.query.id)
    const modules = await db.ModuleCours.findAll(
        {
            include: db.Formation,
            where: {
                '$Formations.id$': id
            }
        }
    )
    res.json(modules);
})

router.get("/byFilter", async (req, res) => {
    const parameters = req.query
    const modulesFilters = {}
    if (parameters.hasOwnProperty('role') && parameters.hasOwnProperty('roleId')) {
        role = parameters.role
        roleId = parameters.roleId
        switch (role) {
            case "ROLE_USER":
                modulesFilters['$Formations.Eleves.id$'] = parseInt(parameters.roleId)
                break;
            case "ROLE_PROFESSOR":
                modulesFilters['$Professeurs.id$'] = parseInt(parameters.roleId)
                break;
            default:
                console.log("get modules/byFilter - Unhandled Role: "+role)
                break;
        }
    }
    if (parameters.hasOwnProperty('formation')) {
        modulesFilters['$Formations.id$'] = parseInt(parameters.formation)
    }

    const modules = await db.ModuleCours.findAll(
        {
            include: [
                {
                    model:db.Formation,
                    through:{
                        model:db.FormationModule,
                        attributes:[]
                    },
                    attributes:["id","libelle"],
                    include: [
                        {
                            model:db.Eleve,
                            attributes:["id"]
                        }
                    ]
                },
                {
                    model: db.Professeur,
                    attributes:["id"],
                }
            ],
            where: modulesFilters,
            attributes:["id","libelle","codeApogee"]
        }
    )
    res.json(modules);
})

module.exports = router