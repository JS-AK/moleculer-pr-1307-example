import { PassThrough, Readable } from 'node:stream'
import { setTimeout } from "node:timers/promises";

export default {
  name: "test-1",
  actions: {
    stream: {
      async handler(ctx) {
        const inputStream = new Readable({
          read() { }
        });

        inputStream.on("data", (data) => this.logger.info('inputStream', Buffer.from(data).toString()));
        inputStream.on("error", (err) => this.logger.error('inputStream', err.message || 'Something went wrong!'));
        inputStream.on("end", () => this.logger.info('inputStream', 'end'));

        setImmediate(async () => {
          for (let i = 0; i <= 8; i++) {
            inputStream.push(JSON.stringify({ token: crypto.randomUUID() }) + '\n');

            await setTimeout(1000)
          }

          inputStream.push(null);
        });

        const outputStream = await ctx.call("test-2.stream", inputStream, { timeout: 3000 });

        outputStream.on("data", (data) => this.logger.info('outputStream', Buffer.from(data).toString()));
        outputStream.on("error", (err) => this.logger.error('outputStream', err.message || 'Something went wrong!'));
        outputStream.on("end", () => this.logger.info('outputStream', 'end'));

        return outputStream;
      },
    },
  }
};
