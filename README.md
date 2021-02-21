## Description

Upload to S3 using aws-sdk and based on NestJs.

Reference:
- [aws-sdk](https://www.npmjs.com/package/aws-sdk)
- [upload docs](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html)
- [NestJS file upload example](https://docs.nestjs.com/techniques/file-upload)


## Installation

```bash
$ npm install
```


## Execution
```bash
npm run start # OR npm run start:dev
# in another terminal
curl http://localhost:3000/aws/file-upload -F 'file=@./package.json' -F 'name=test'
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

For this app, use [issues](https://github.com/petrind/S3-nestjs-upload/issues)

### Nest Support
Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Petrus F. Subekti](https://github.com/petrind)
- Based on Nest [https://nestjs.com](https://nestjs.com/)

## License

Nest is [MIT licensed](LICENSE).
