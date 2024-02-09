import { Effect, Queue } from "effect"

// $ExpectType Effect<Chunk<number>, never, never>
const polled = Effect.gen(function* (_) {
  const queue = yield* _(Queue.bounded<number>(100))
  yield* _(Queue.offer(queue, 10))
  yield* _(Queue.offer(queue, 20))
  yield* _(Queue.offer(queue, 30))
  const chunk = yield* _(Queue.takeUpTo(queue, 2))
  return chunk
})

Effect.runPromise(polled).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [ 10, 20 ]
}
*/