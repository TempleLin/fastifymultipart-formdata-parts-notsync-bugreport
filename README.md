## Intro

This is a bug report for Fastify/Multipart plugin.

## Expected Behavior

When using {attachFieldsToBody: true}, everything is received. But when using .parts(), only the zip file is received,
while the image and all the text fields' values are missing.

## How to

Try switching between to using ```attachFieldsToBody``` to see the different results:

1. Uncomment 
```js
attachFieldsToBody: true
 ```

2. Change the post route into:

```js
fastify.post('/api/upload/webpage-note', async (request, reply) => {
    const formData = await request.formData();
    console.log(formData);
    // const parts = request.parts()
    // for await (const part of parts) {
    //     console.log(part);
    //     if (part.type === 'file') {
    //         pipeline(part.file, fs.createWriteStream(part.filename))
    //     } else {
    //         // part.type === 'field
    //         console.log(part)
    //     }
    // }
})
```
