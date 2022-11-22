# Exchanger Rate Frontend

## Step to deploy

### Build image

```shell
docker build . -t map-exchanger-web:latest --build-arg API_ENDPOINT=http://localhost:8081/
```

Note: Build argument `API_ENDPOINT` should point to the backend base URL with **traling slash**.

### Run container

```shell
docker run -d -p 8082:80 map-exchanger-web:latest
```
