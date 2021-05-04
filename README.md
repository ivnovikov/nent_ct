Hej

I tried to keep things in a pretty standard and obvious way.

#run app

```
docker-compose up
```

App will start in dev mode
I changed the output comparing to the task definition to clearly see if returned value comes from cache or not. I also designed the API endpoint so it could be used for any movie not just one :)

Of course code should be cleaned up, hardcoded values should moved to .env file, API keys should be removed, express should be supplied with more middlewares like helmet, morgan etc. There also should be better error handling and more checks in cascade http requests.

#test app

```
npm run testing
```

I implemented integration test with redis and axios calls mocked, as it gives the overall picture. I skipped unit tests as most obvious, but for sure there should be redis get/set and cascade axios calls test.
