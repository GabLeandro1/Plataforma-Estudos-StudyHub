const multer = require('multer');

console.log('1. Multer:', typeof multer);

const storage = multer.memoryStorage();

console.log('2. Storage:', typeof storage);

const uploadImagem = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

console.log('3. Upload:', typeof uploadImagem);
console.log('4. Single:', typeof uploadImagem.single);

module.exports = uploadImagem;