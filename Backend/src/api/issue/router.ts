import { Server } from "@hapi/hapi";
import { createIssueHandler, deleteIssueHandler, getIssueByIdHandler, getIssuesHandler, updateIssueStatusHandler } from "./hander";

export const issueRoutes = (server: Server) => {

 server.route({
  method: "POST",
  path: "/api/issues",
  options: {
    payload: {
      output: "stream",
      parse: true,
      multipart: true,
      maxBytes: 5 * 1024 * 1024,
    },
  },
  handler: createIssueHandler,
});


  server.route({
  method: "GET",
  path: "/api/issues",
  handler: getIssuesHandler,
});


  server.route({
  method: "PATCH",
  path: "/api/issues/{id}",
  handler: updateIssueStatusHandler,
});

server.route({
  method: "GET",
  path: "/api/issues/{id}",
  handler: getIssueByIdHandler,
});


server.route({
    method: "DELETE",
    path: "/api/issues/{id}",
    handler: deleteIssueHandler,
  });



};
