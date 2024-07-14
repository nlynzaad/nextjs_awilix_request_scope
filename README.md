This is a sample project [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) using [Awilix](https://github.com/jeffijoe/awilix) for Dependency Injection.

## Problem

While we do have access to transient and singleton injected objects we do not have access to objects that is scoped to the request itself.

Since we cannot attach a conatiner to the the request object in Nextjs middleware we need to use [AsyncLocalStorage](https://nodejs.org/api/async_context.html) to store a scoped container that can be created and disposed off with each request.

The next problem, is that as it stands currenly, is that there is no way to execute node runtime specific functions in NextJS middleware eiter ([discussion](https://github.com/vercel/next.js/discussions/46722)).

This in essence means that we can't use NextJS middleware as a way to create/attach a request specific scoped container.

So where can we then get access to the request and attach a container to it or atleast get notified of the incoming request and create a scoped container specific to this event.

## Solution

The only option I could see was to eject into a custom server for the NextJS project.

While we can use express for this, this project aimed to make use of the [`NodeJS http server`](https://nodejs.org/api/http.html) as similar to how it shown in the NextJS documentation for [`pages router`](https://nextjs.org/docs/pages/building-your-application/configuring/custom-server).

While Awilix does have a express adapter it does not have one for a node server and hence a custom DiService implementation was built to accept the incoming request, creating a async local storage object linked to the request and completing the request.

## Side note

This implementation does mean that it cannot run on Vercel serverless but can still be hosted on any other self-hosted or cloud hosted VM/Baremetal server.

## To Run the project

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page showcases 3 sets of random values:

1. The first set showcases values gathered from a scoped container. These should only change between requests as the container is re-initialized with each request.
2. The second set showcases values gathered from a singleton container. The container is initialized at application startup and hence the number should always remain constant.
3. The last set showcases values gathered from a transient container. The container is initialized with each call made to it and hence the values should not only change with each request but the values itself should be different as it is gathered with two seperate calls to the container.
