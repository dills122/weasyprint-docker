# WeasyPrint Docker Service

A small stand alone WeasyPrint service

## Endpoints

* `/convert/stream` - Given an input string, streams pdf to client
* `/convert/base64` - Given an input string, will return converted pdf as base64 string

Both endpoints accept both a `url` or an `html` string as the incoming document

## Getting Started

```bash
git clone https://github.com/dills122/weasyprint-docker.git
```
Once the repo has been cloned you will need to build the docker container

```bash
sudo docker build -t "repo:tagHere" ./
```

### Once the container is built you can run it locally

To run as a background process to test the service

```bash
sudo docker run -p 8080:8080 "containerId" &
```

If you needed to run the container and test stuff inside

```bash
sudo docker run -it "containerId" /bin/bash
```

#### Testing Node App Locally

if you wanted to change the api without worrying about docker

```bash
node index.js # npm start
```
