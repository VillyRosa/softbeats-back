const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const beatController = require('../controllers/beatsController');
const beatMiddleware = require('../middlewares/beatsMiddleware');

const router = express.Router();

// Configuração do multer para upload de imagem
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationFolder = 'uploads/images';
        cb(null, destinationFolder);
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, raw) => {
            if (err) return cb(err);

            const ext = path.extname(file.originalname);
            const fileName = raw.toString('hex') + ext;
            cb(null, fileName);
        });
    }
});

// Configuração do multer para upload de áudio
const audioStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationFolder = 'uploads/audios';
        cb(null, destinationFolder);
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, raw) => {
            if (err) return cb(err);

            const ext = path.extname(file.originalname);
            const fileName = raw.toString('hex') + ext;
            cb(null, fileName);
        });
    }
});

const uploadAudio = multer({ storage: audioStorage }).single('audio');
const uploadImage = multer({ storage: imageStorage }).single('image');

router.post('/beats/image', uploadImage, (req, res) => {
    if (!req.file) {
        return res.status(201).send({ message: 'Nenhuma imagem foi enviada.', imageName: 'logo-padrao.png' });
    }
    const imageName = req.file.filename;
    res.status(201).send({ message: 'Imagem enviada com sucesso.', imageName });
});

router.post('/beats/audio', uploadAudio, (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'Nenhum arquivo de áudio foi enviado.' });
    }
    const audioName = req.file.filename;
    res.status(201).send({ message: 'Áudio enviado com sucesso.', audioName });
});

router.post('/beats', beatMiddleware.ValidatorCreate, beatController.createController);
router.get('/beats/:userid', beatMiddleware.ValidatorUserid, beatController.selectAllController);
router.delete('/beats/:id', beatMiddleware.ValidatorBeatId, beatController.deleteController);
router.patch('/beats', beatMiddleware.validatorEdit, beatController.editController);
router.get('/beats/image/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '..', '..', 'uploads', 'images', filename);
    res.sendFile(imagePath);
});
router.get('/beats/audio/:filename', (req, res) => {
    const filename = req.params.filename;
    const audioPath = path.join(__dirname, '..', '..', 'uploads', 'audios', filename);
    res.sendFile(audioPath);
});

module.exports = router;