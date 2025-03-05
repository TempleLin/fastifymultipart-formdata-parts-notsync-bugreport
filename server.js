// server.js
const fastify = require('fastify')({ /*logger: true*/ });
const fastifyMultipart = require("@fastify/multipart");
const path = require('path');

const publicRoot = path.join(__dirname, 'public');
console.log(`Public root: ${publicRoot}`);

// Register the fastify-static plugin to serve files from the public folder
fastify.register(require('@fastify/static'), {
    root: publicRoot,
    prefix: '/', // optional: default '/'
});

fastify.register(fastifyMultipart, {  // Register fastify-multipart for parsing form data.
    limits: {
        fieldNameSize: 100, // Max field name size in bytes
        fieldSize: 1000000000000000,     // Max field value size in bytes
        fields: 10,         // Max number of non-file fields
        fileSize: 10000000000000,  // For multipart forms, the max file size in bytes
        files: 5,           // Max number of file fields
        headerPairs: 2000,  // Max number of header key=>value pairs
        parts: 1000         // For multipart forms, the max number of parts (fields + files)
    },
    // attachFieldsToBody: true
});

fastify.post('/api/upload/webpage-note', async (request, reply) => {
    // const formData = await request.formData();
    // console.log(formData);
    const parts = request.parts()
    for await (const part of parts) {
        console.log(part);
        if (part.type === 'file') {
            pipeline(part.file, fs.createWriteStream(part.filename))
        } else {
            // part.type === 'field
            console.log(part)
        }
    }
})

fastify.listen({ port: 3002 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Server listening on ${address}`);
});
