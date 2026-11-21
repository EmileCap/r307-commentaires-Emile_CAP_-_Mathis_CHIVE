// CONTROLEUR des commentaires : traduction entre HTTP et le service.

const service = require('../services/commentaires.service');
const ErreurHttp = require('../utils/erreur-http');

function lister(req, res, next) {
  service.lister(Number(req.params.id))
    .then((commentaires) => res.json(commentaires))
    .catch(next);
}

function creer(req, res, next) {
  const { nom, texte } = req.body || {};
  if (!nom || !texte) return next(new ErreurHttp(400, 'CHAMP_MANQUANT', 'Les champs nom et texte sont obligatoires.'));
  service.creer(Number(req.params.id), { nom, texte })
    .then((commentaire) => res.status(201).json(commentaire))
    .catch(next);
}

function parVisiteur(req, res, next) {
  const { nom } = req.query;
  if (!nom) return next(new ErreurHttp(400, 'NOM_MANQUANT', 'Le paramètre nom est obligatoire.'));
  service.parVisiteur(nom)
    .then((commentaires) => res.json(commentaires))
    .catch(next);
}

function trouver(req, res, next) {
  service.trouver(Number(req.params.id))
    .then((commentaire) => res.json(commentaire))
    .catch(next);
}

function modifier(req, res, next) {
  const { texte } = req.body || {};
  if (!texte) return next(new ErreurHttp(400, 'TEXTE_MANQUANT', 'Le champ texte est obligatoire.'));
  service.modifier(Number(req.params.id), { texte })
    .then((commentaire) => res.json(commentaire))
    .catch(next);
}

function supprimer(req, res, next) {
  service.supprimer(Number(req.params.id))
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = { lister, creer, parVisiteur, trouver, modifier, supprimer };
