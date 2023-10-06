import { app } from "@api/server/app";
import { serverConfig } from "./utils/config";

app.listen(serverConfig.app.PORT, () => {
  console.log(`Server running on port ${serverConfig.app.PORT}`);
});
