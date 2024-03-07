const express = require('express');
const router = express.Router();

const { Formation, Secretaire, FormationSecretaire, Professeur, ModuleCours, FormationModule, ProfesseurModule, Directeur, FormationDirecteur } = require('../models')

router.get("/", async (req, res) => {
    const formations = await Formation.findAll()
    res.json(formations);
})

router.get("/byRole", async (req, res) => {
    const parameters = req.query
    const formationsFilters = {}
    if(parameters.hasOwnProperty('role') && parameters.hasOwnProperty('roleId')){
        role = parameters.role
        roleId = parameters.roleId
        switch (role) {
            case "ROLE_PROFESSOR":
                formationsFilters['$ModuleCours.Professeurs.id$'] = parseInt(parameters.roleId)
                break;
            case "ROLE_SECRETARY":
                formationsFilters['$Secretaires.id$'] = parseInt(parameters.roleId)
                break;
            case "ROLE_DIRECTOR":
                formationsFilters['$Directeurs.id$'] = parseInt(parameters.roleId)
                break;
            case "ROLE_DEPARTMENT_DIRECTOR":
                formationsFilters['$Directeurs.id$'] = parseInt(parameters.roleId)
                break;
            default:
                console.log("get formations/byRole - Unhandled Role: "+role)
                break;
        } 
    }
    const formations = await Formation.findAll(
        {
            include: [
                {
                    model:ModuleCours,
                    through:{
                        model:FormationModule,
                        attributes:[]
                    },
                    attributes:["id","libelle"],
                    include: [
                        {
                            model:Professeur,
                            through : {
                                model: ProfesseurModule,
                                attributes:[]
                            },
                            attributes:["id"]
                        }
                    ]
                },
                {
                    model: Secretaire,
                    through : {
                        model: FormationSecretaire,
                        attributes:[]
                    },
                    attributes:["id"],
                },
                {
                    model: Directeur,
                    through : {
                        model: FormationDirecteur,
                        attributes:[]
                    },
                    attributes:["id"],
                }
            ],
            where: formationsFilters,
            attributes:["id","libelle"]
        }
    )
    res.json(formations);
})

module.exports = router