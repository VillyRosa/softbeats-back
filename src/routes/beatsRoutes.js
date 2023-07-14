const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const beatController = require('../controllers/beatsController');
const beatMiddleware = require('../middlewares/beatsMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let destinationFolder = '';
        if (file.fieldname === 'image') {
            destinationFolder = 'uploads/images';
        } else if (file.fieldname === 'audio') {
            destinationFolder = 'uploads/audios';
        } else {
            return cb(new Error('Campo inválido'));
        }
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

const upload = multer({ storage: storage });

router.get('/beats/:userid', beatMiddleware.ValidatorUserid, beatController.selectAllController);
router.post('/beats', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), beatMiddleware.ValidatorCreate, (req, res, next) => {

    const { body } = req;
    const imageFile = req.files['image'] ? req.files['image'][0] : null;
    const audioFile = req.files['audio'] ? req.files['audio'][0] : null;

    if (!body.name) return res.status(400).send('Falta o nome')

    if (imageFile && audioFile) {
        // O arquivo é uma imagem, faça o processamento necessário
        res.status(201).send({ message: 'Beat cadastrado com sucesso!.'});
    } else {
        return res.status(400).send({ message: 'Nenhum arquivo foi enviado.'});
    }

    // Continue com o processamento da requisição ou chame o próximo middleware
    next();
});

// router.delete('/beats/:id', beatMiddleware.ValidatorCategoryId, beatController.deleteController);
// router.patch('/beats', beatMiddleware.validatorEdit, beatController.editController);

module.exports = router;