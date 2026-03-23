import { getAuth } from "@clerk/express";

export const requireAuth = () => {
  return (req, res, next) => {
    try {
      const { userId } = getAuth(req);

      if (!userId) {
        res.status(401).json({
          statusCode: 401,
          message: "Unauthorized",
        });
        return;
      }

      next();
    } catch (error) {
      console.error("[requireAuth] Error:", error.message);
      res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  };
};
