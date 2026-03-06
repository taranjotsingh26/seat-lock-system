import { getRedisClient } from "../config/redis.js";
import { v4 as uuidv4 } from "uuid";

// acquire lock
export const acquireLock = async (key, ttl = 10) => {
  const client = getRedisClient();
  const token = uuidv4();

  const result = await client.set(key, token, {
    NX: true,
    EX: ttl
  });

  if (result === null) {
    return null;
  }

  return token;
};

// release lock
export const releaseLock = async (key, token) => {
  const client = getRedisClient();

  const currentToken = await client.get(key);

  if (currentToken === token) {
    await client.del(key);
  }
};