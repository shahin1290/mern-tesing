## npm i -D typescript tsc-watch eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin @types/node @types/express

## npm i express dotenv module-alias

## npx tsc --init

## ts-config

     "baseUrl": "./src",  "outDir": "dist",  "paths": {
        "@/resources/*" : ["resources/*"],
        "@/utils/*" : ["utils/*"],
        "@/middleware/*" : ["middleware/*"],
        }, 
## scripts
   
    "start": "node dist/index.js",
    "dev": "tsc-watch --onSuccess \"node ./dist/index.js\"",
    "build": "tsc",
    "postinstall": "npm run build"

## package.json
    "_moduleAliases": {
    "@/resources": "dist/resources",
    "@/utils": "dist/utils",
    "@/middleware": "dist/middleware"
  }
