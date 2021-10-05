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

    channel.assertQueue(queue, { // 큐 지정
      durable: true
    });

    channel.prefetch(1); // 최대 허용 가능한 수 제한, 너무 과도한 작업을 하지 않도록 하여 워커의 급격한 시스템 자원 고갈을 막음

    console.log(`[*] Waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.consume(queue, (msg) => { // 큐에서 데이터 꺼냄 
      console.log(`[x] Received ${msg.content.toString()}1`);
    }, {
      noAck: true // 메시지를 꺼내서 잘 받았다는 응답을 해주지 않겠다고 설정
    });
  });
});
