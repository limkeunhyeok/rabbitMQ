const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (error, connection) => { // 메시지 큐 연결
  if (error) {
    throw error;
  }

  connection.createChannel((err, channel) => { // 채널 생성
    if (err) {
      throw err;
    }

    let queue = "hello";
    let msg = {
      profile: "eedor",
      date: "20210910",
      refreshToken: "atxgjf",
    };

    channel.assertQueue(queue, { // 큐 지정
      durable: true, // 메시지 큐가 죽어도 큐가 사라지지 않고 보존
    });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), { // 작업 요청
      persistent: true // 메시지 큐가 죽어도 사라지지 않고 보존
    });

    console.log(`[x] sent ${msg}`);
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  })
})