# Deno_POC

This repository is a Proof of Concept made to discover Deno. 

The code is based off an other exercice where we needed to use Node.js to make an API. 
Since Deno seems to be Node.js's successor I wanted to try to translate what we did with Node.js to Deno.

## Key differences between Node and Deno & what I've learned

- In Deno you use Oak instead of Express
- In Deno you use UUID instead of ObjectID()
- You can include tasks in the json 

## How does it work ? 

Once you have cloned this repository you should [install deno if it's not already done]([https://link-url-here.org](https://docs.deno.com/runtime/getting_started/installation/))

You can test if you have deno by typing the following in your terminal

```
deno --version

```

Then simply run the script by typing the following in your terminal
```
deno task start

```

Once this is done the server should be up and runnig on http://localhost:3000 and you can send your requests. I suggest using Postman to do so.
