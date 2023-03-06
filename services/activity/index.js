import {ActivityService} from "./ActivityService.js";
import {ActivityDao} from "./ActivityDao.js";
import {ActivityRouter} from "./ActivityRouter.js";

// create instances of ActivityService and ActivityRouter classes.
// We will use them to add created endpoints to the server

export const activityService = new ActivityService({
    dao: new ActivityDao()
});

export const activityRouter = new ActivityRouter({
    service: activityService,
}).router;
