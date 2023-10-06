import { container } from "@api/services";
import { inferAsyncReturnType } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export const createContext = async ({
  req,
  res,
}: CreateExpressContextOptions) => {
  return {
    req,
    res,
    container,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
