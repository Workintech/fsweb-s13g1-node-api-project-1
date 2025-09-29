// SUNUCUYU BU DOSYAYA KURUN

const express = require('express');
const Users = require('./users/model'); 

const server = express();
server.use(express.json());


function requireNameAndBioForCreate(req, res, next) {
  const { name, bio } = req.body || {};
  if (typeof name !== 'string' || name.trim() === '' ||
      typeof bio  !== 'string' || bio.trim()  === '') {
    return res.status(400).json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
  }
  req.body.name = name.trim();
  req.body.bio  = bio.trim();
  next();
}

function requireNameAndBioForUpdate(req, res, next) {
  const { name, bio } = req.body || {};
  if (typeof name !== 'string' || name.trim() === '' ||
      typeof bio  !== 'string' || bio.trim()  === '') {
    return res.status(400).json({ message: "Lütfen kullanıcı için name ve bio sağlayın" });
  }
  req.body.name = name.trim();
  req.body.bio  = bio.trim();
  next();
}

async function ensureUser(req, res, next) {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      req._notFound = true; 
      return next();
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}



server.post('/api/users', requireNameAndBioForCreate, async (req, res) => {
  try {
    const created = await Users.insert({ name: req.body.name, bio: req.body.bio });
    res.status(201).json(created);
  } catch {
    res.status(500).json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
  }
});


server.get('/api/users', async (_req, res) => {
  try {
    const list = await Users.find();
    res.json(list);
  } catch {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});


server.get('/api/users/:id', ensureUser, (req, res) => {
  if (req._notFound) {
    return res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
  }
  res.json(req.user);
});


server.delete('/api/users/:id', ensureUser, async (req, res) => {
  if (req._notFound) {
   
    return res.status(404).json({ message: "Belirtilen ID li kullanıcı bulunamadı" });
  }
  try {
    const deleted = await Users.remove(req.params.id);
    res.json(deleted);
  } catch {
    res.status(500).json({ message: "Kullanıcı silinemedi" });
  }
});


server.put('/api/users/:id', ensureUser, requireNameAndBioForUpdate, async (req, res) => {
  if (req._notFound) {
    return res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
  }
  try {
    const updated = await Users.update(req.params.id, { name: req.body.name, bio: req.body.bio });
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Kullanıcı bilgileri güncellenemedi" });
  }
});

module.exports = {}; // SERVERINIZI EXPORT EDİN {}
module.exports = server;
