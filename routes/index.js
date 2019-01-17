var express = require('express');
var router = express.Router();

const DejBoxService = require('../services/dejbox');

let dejboxService = new DejBoxService("Numen");

router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express' ,
    dejbox: dejboxService.toArray(),
    opened: dejboxService.isOpen,
    selected: dejboxService.selectedUser,
  });
});

router.get('/feed.xml', function(req, res, next){
    res.set('Content-Type', 'text/xml');
    return res.send(dejboxService.getRssFeed());
})

router.post('/', function(req, res, next){
  let dejbox = Number.parseInt(req.body.dejbox);
  let name = req.body.name;
  let redirect = req.body.redirect;

  if(dejbox == undefined || name == undefined || isNaN(dejbox) || name.length == 0 || dejbox < 0){
    throw ({message: "Mauvais param", code: 400});
  };

  if(!dejboxService.addDejbox(dejbox, name)){
    throw ({message: "Impossible d'ajouter la dejbox", code: 400});
  }

  if(redirect != undefined && redirect.length > 0){
    return res.redirect(redirect);
  } else {
    return res.json(true);
  }
});

router.post('/finish', function(req, res, next){
  let redirect = req.body.redirect;
  if(!dejboxService.isOpen){
    throw ({message: "le tirage est deja fini"});
  }

  let selected = dejboxService.finish();


  if(redirect != undefined && redirect.length > 0){
    return res.redirect(redirect);
  } else {
    return res.json(selected);
  }
});

module.exports = router;
