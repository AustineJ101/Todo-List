import "./reset.css";
import "./styles.css";
import { renderProjects } from "./dom.js";
import { projects } from "./store.js";

localStorage.setItem("projects", JSON.stringify(projects)) //Send default project to local storage

renderProjects();
renderProjects();

