// global.d.ts
import mongoose from "mongoose"

// Declare the mongooseCache variable globally

declare global {
    // eslint-disable-next-line no-var
    var mongooseCache:
        | {
              conn: mongoose.Connection | null
              promise: Promise<mongoose.Connection> | null
          }
        | undefined

    function handleError(err: unknown): void
    function handleErrorWithAxios(err: unknown): void
    function logError(title: string, details: unknown): void
}
