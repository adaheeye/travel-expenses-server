// create instances of ActivityService and ActivityRouter classes.
// We will use them to add created endpoints to the server

import {TravelerService} from "./TravelerService.js";
import {TravelerDao} from "./TravelerDao.js";
import {TravelerRouter} from "./TravelerRouter.js";

export const travelerService = new TravelerService({
    dao: new TravelerDao()
});

export const travelerRouter = new TravelerRouter({
    service: travelerService
}).router;
