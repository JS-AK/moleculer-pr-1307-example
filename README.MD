# Stages to reproduce bug

1. Start NATS server at nats://localhost:4222
2. npm run api-gateway
3. npm run test-1
4. npm run test-2
5. curl 'http://localhost:3000/api/test-1'
6. after 3-5 secs terminate test-2 microservice
7. Map() -> this.pendingResStreams and this.pendingRequests at node_modules\moleculer\src\transit.js at api-gateway microservice is not been empty and have one danging and not ended stream
