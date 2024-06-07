# PoC-Pod

## Proof of concept Nextjs app in Kubernetes with MongoDB.

Utilizes `make` to easily build and run locally. To start locally use `make dev` to start it on your local machine.

> Note: NextJS uses its own `.env` structure. Therefore, if you're opting to use nextjs on it's own with npm (i.e. `cd ./nextjs && npm run dev`) it is best to copy the `./nextjs/.env.example` file to `./nextjs/.env.development.local` to make changes before building. let docker handle the envs needed (`./docker/.env`) for the service.

# Environment Variables

NextJS utilizes it's own [.env structure](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables) and thus requires a copy in it's root folder. 

MongoDB utilizes the .env variables within the root docker folder `./docker/.env`

- `SERVER_URL` - this is used in production and is required if building the docker container. 
```
    http://dnsName-or-IP:3000
```

# NextJS Development

You can run NextJS locally by starting a local mongo database from the root directory `make db`, then from the `./nextjs` path run `npm run dev`.

# Containerization

## Docker

From the root path, use `make dev` to build the application with docker and run a containerized instance.

## Kubernetes
In `./docker/` you can run a `nextjs-k3s` namespaced deployment (`./docker/k8s-deployment.yaml`). There are basic an unsecure credentials provided to start the service quickly. You *must* use the `SERVER_URL` environment variable so nextjs can re-route you to it's public address.

You can create a deployment using a pre-built image at `docker.io/safehomejdev/nextjs-k3s:latest`.