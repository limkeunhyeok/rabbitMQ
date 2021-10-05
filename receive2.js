const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (error, connection) => {
  if (error) {
    throw error;
  }
  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }

    let queue = "hello";

    channel.assertQueue(queue, {
      durable: false
    });

    console.log(`[*] Waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.consume(queue, async (msg) => {
      console.log(`[x] Received ${msg.content.toString()}2`);
      await setTimeout(() => {
        console.log("??????")
      }, 50000);
      console.log(JSON.parse(msg.content));
    }, {
      noAck: true
    });
  });
});
