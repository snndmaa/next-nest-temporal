Prerequistes
- Temporal CLI
- NestJs
- NextJs
- Node

Instructions
In a separate tab run: temporal server start-dev.
When the server successfully runs you can visit http://localhost:8233 in your browser view your workflows in real time.

In a separate browser and from the monorepo project root run the following commands i.e next-nest-temporal/:
1.) npm run install-all (This installs all nextjs, temporal and nestjs dependencies )
2.) npm run dev (This concurrently runs our next and nest servers for our api and frontend to be ready)

3.) Open localhost:3000 in browser. You can see 2 items that can be ordered. Once you click order you should be able to see that the order has been placed. What happens is we make a post request to our nestjs backend and it triggers a signal to be sent to our temporal server creating a workflow for an order that was just placed as well as its parameters.

Further Insight:
- Another way to make this dependent on user input another method is a websocket resource in our nestjs app that shows a possible implementation of this however is not in use due to simplicity.
- An order is not made unless the workflow is created and signal is sent to temporal, After this on our frontend the order state is change to be purchased.
- Initially activities were used in the workflow however signals proved to be a better use since we are handling the orderCreate logic on our nestJS server.
