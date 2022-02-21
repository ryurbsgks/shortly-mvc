const utils = require("../../modules/utils"); // 여기 utils지워보고 체크
const { url: URL } = require("../../models");

module.exports = {
    get: (req, res) => {

        URL.findAll().then( result => {
            res.status(200).send(result);
        }).catch( error => {
            res.status(500).send("Internal Server Error");
        })
    },
    post: (req, res) => {

        utils.getUrlTitle(req.body.url, (err, title) => {
            if(err){
                res.status(400).send("Bad Request");
            }

            URL.findOrCreate({
                where: {
                    url: req.body.url
                },
                defaults: {
                    title: title
                }
            }).then( ([url, created]) => {  
                res.status(201).send(url);
            }).catch( error => {
                res.status(500).send("Internal Server Error");
            })
        });
    },
    redirect: (req, res) => {

        URL.findOne({
            where: {
                id: req.params.id
            }
        }).then( result => {
            if(result){
                result.update({visits: result.visits + 1});
                res.redirect(result.url);
                res.status(302).send(result);
            }
        }).catch( error => {
            res.status(500).send("Internal Server Error");
        })
        
    }
};
