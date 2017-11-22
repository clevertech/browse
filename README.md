# Browse

Command line utility to open links found in package.json

## Usage

Put in your `package.json` file a bunch of links with any tree strcuture you prefer. The leaves must be URLs.

```json
"browse": {
  "website": "https://example.com/",
  "sentry": "https://sentry.example.com/example/project-name/",
  "development": {
    "server": {
      "api": "https://api-dev.example.com/",
      "frontend": "https://dev-dev.example.com/"
    },
    "sumologic": {
      "api": "https://www.sumologic.com/whatever",
      "cms": "https://www.sumologic.com/whatever",
      "frontend": "https://www.sumologic.com/whatever"
    }
  }
}
```

Now you have a few options:

### Using npx

Just run this in the directory where your `package.json` file is:

```
npx github:clevertech/browse [path]
```

### Installing locally

Install by using either:

```
npm install @clevertech.biz/browse -D
yarn install @clevertech.biz/browse -D
```

Add a local script in your `package.json`:

```json
"scripts": {
  "browse": "browse"
}
```

Then run:

```
npm/yarn run browse [path]
```

### Installing globally

```
npm/yarn install @clevertech.biz/browse -g
```

Then just run

```
browse [path]
```

## Autocomplete

`browse` works in two different ways. If you don't provide any command line argument it will print all available links and an autocomplete interface.

If you provide the path, it will open the link right away.
