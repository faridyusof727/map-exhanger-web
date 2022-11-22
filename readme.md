# Exchanger Rate Frontend

## Step to deploy

### Build image

```shell
docker build . -t map-exchanger-web:latest --build-arg API_ENDPOINT=http://localhost:8081/
```

### Run container

```shell
docker run -d -p 8082:80 map-exchanger-web:latest
```
