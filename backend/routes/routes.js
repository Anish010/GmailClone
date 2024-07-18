import express from "express"
import { deleteEmails, getEmails, moveEmailsToBin, saveSentEmails, toggleStarredEmails, updateType } from "../controllers/email-controller.js";
import sendEmail from "../middleware/sendEmail.js";

const routes = express.Router();

routes.post('/save', sendEmail, saveSentEmails)
routes.get('/emails/:type', getEmails);
routes.post('/save-draft', saveSentEmails);
routes.post('/trash', moveEmailsToBin);
routes.post('/starred', toggleStarredEmails);
routes.delete('/delete', deleteEmails)
routes.put('/label', updateType);

export default routes;